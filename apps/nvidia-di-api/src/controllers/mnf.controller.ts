import { Request, Response } from 'express';
import MnfModel from '../models/mnf.model';

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