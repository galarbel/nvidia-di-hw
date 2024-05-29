import { Parser } from '@json2csv/plainjs';
import { Request, Response } from 'express';
import { default as MnfModel, default as mnfModel } from '../models/mnf.model';


interface IRequestQueryParams {
  startDate?: string, 
  endDate?: string, 
  pnName?: string, 
  testType?: string,
}

export const getMnfs = async (req: Request, res: Response) => {
  try {
    const { startDate, endDate, pnName, testType }: IRequestQueryParams = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({ error: 'start and end date are mandatory' });
    }

    const startDateObj = new Date(startDate as string);
    const endDateObj = new Date(endDate as string);
    if (isNaN(startDateObj.getTime()) || isNaN(endDateObj.getTime())) {
      return res.status(400).json({ error: 'Invalid start or end date' });
    }

    const mnfs = await getMnfsGroupedByDate(startDateObj, endDateObj, pnName, testType);
   
    res.json(mnfs);
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

async function getMnfsGroupedByDate(startDate: Date, endDate: Date, pnName?: string, testType?: string): Promise<any[]> {
  const matchFilters = {
    TEST_DATE: { $gte: startDate, $lte: endDate }
  };

  pnName?.trim() && (matchFilters["PN"] = { $regex: pnName, $options: 'i' });
  testType?.trim() && (matchFilters["TEST_TYPE"] = testType);

  try {
    const mnfsAggregated = await MnfModel.aggregate([
      {
        $match: matchFilters
      },
      {
        $addFields: {
          date: { $dateToString: { format: '%Y-%m-%d', date: '$TEST_DATE' } }
        }
      },
      {
        $group: {
          _id: '$date',
          totalCount: { $sum: 1 }, // Count of documents for each date
          passCount: { $sum: { $cond: [{ $eq: ['$PASS', 1] }, 1, 0] } } // Count of documents where PASS is 1
        }
      },
      {
        $sort: { _id: 1 } // Optional: Sort by date
      }
    ])
    
    

    .exec(); // Add .exec() to execute the aggregation

    return mnfsAggregated;
  } catch (error) {
    throw new Error('Failed to fetch aggregated mnfs');
  }
}

export const downloadRawData = async (req, res) => {
  const { startDate, endDate, pnName, testType } = req.query;

  const query = {};
  if (startDate || endDate) {
    query["TEST_DATE"] = {};
    if (startDate) query["TEST_DATE"].$gte = new Date(startDate);
    if (endDate) query["TEST_DATE"].$lte = new Date(endDate);
  }
  if (pnName) query["PN"] = pnName;
  if (testType) query["TEST_TYPE"] = testType;

  try {
    const cursor = MnfModel.find(query).cursor();

    const fields = Object.keys(mnfModel.schema.paths);
    fields.pop();

    const opts = { fields, header: false };
    const parser = new Parser(opts);
    let csv = '';

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="data.csv"');
    res.write(parser.parse(fields.reduce((acc, key) => { acc[key] = key; return acc; }, {}))); // write the header row

    cursor.eachAsync(doc => {
      debugger;
      const csvRow = parser.parse(doc.toObject());
      res.write('\n' + csvRow);
    }).then(() => {
      res.end();
    }).catch(err => {
      console.error(err);
      res.status(500).send('Error retrieving data');
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error processing request');
  }
};

export const getAggregatedData = async (req, res) => {
  const { startDate, endDate, granularity, pnName, testType } = req.query;

  // Validate granularity
  if (!['h', 'd', 'w', 'm'].includes(granularity)) {
    return res.status(400).send('Invalid granularity. Must be "h", "d", "w", or "m".');
  }

  const match = {};
  if (startDate) match["TEST_DATE"] = { $gte: new Date(startDate) };
  if (endDate) match["TEST_DATE"] = { ...match["TEST_DATE"], $lte: new Date(endDate) };
  
  pnName?.trim() && (match["PN"] = { $regex: pnName, $options: 'i' });
  testType?.trim() && (match["TEST_TYPE"] = testType);

  let groupId;
  if (granularity === 'h') {
    groupId = {
      year: { $year: '$TEST_DATE' },
      month: { $month: '$TEST_DATE' },
      day: { $dayOfMonth: '$TEST_DATE' },
      hour: { $hour: '$TEST_DATE' },
    };
  } else if (granularity === 'd') {
    groupId = {
      year: { $year: '$TEST_DATE' },
      month: { $month: '$TEST_DATE' },
      day: { $dayOfMonth: '$TEST_DATE' },
    };
  } else if (granularity === 'w') {
    groupId = {
      year: { $year: '$TEST_DATE' },
      week: { $week: '$TEST_DATE' },
    };
  } else if (granularity === 'm') {
    groupId = {
      year: { $year: '$TEST_DATE' },
      month: { $month: '$TEST_DATE' },
    };
  }

  try {
    const result = await MnfModel.aggregate([
      { $match: match },
      {
        $group: {
          _id: groupId,
          totalTests: { $sum: 1 },
          passTests: { $sum: { $cond: [{ $eq: ['$PASS', 1] }, 1, 0] } },
        },
      },
      { $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1, '_id.hour': 1, '_id.week': 1 } },
    ]);

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error processing request');
  }
};

export const getAllTestTypes = async (req, res) => {
  try {
    const testTypes = await MnfModel.distinct('TEST_TYPE');
    res.json(testTypes);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error processing request');
  }
};