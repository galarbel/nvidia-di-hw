import { Parser, type ParserOptions } from "@json2csv/plainjs";
import { TAPIRequestQueryParams } from "@nvidia-di/interfaces";
import { FilterQuery } from "mongoose";
import MnfModel, { IMnf } from "../models/mnf.model";
import { strArrToDict } from "../utils/common.utils";
import { getMnfFields } from "../utils/mnf.utils";

const CURSOR_BATCH_SIZE = 200;

const GROUP_ID_BY_GRANULARITY = {
  h: {
    year: { $year: "$TEST_DATE" },
    month: { $month: "$TEST_DATE" },
    day: { $dayOfMonth: "$TEST_DATE" },
    hour: { $hour: "$TEST_DATE" },
  },
  d: {
    year: { $year: "$TEST_DATE" },
    month: { $month: "$TEST_DATE" },
    day: { $dayOfMonth: "$TEST_DATE" },
  },
  w: {
    year: { $year: "$TEST_DATE" },
    week: { $week: "$TEST_DATE" },
  },
  m: {
    year: { $year: "$TEST_DATE" },
    month: { $month: "$TEST_DATE" },
  },
} as const;

const validateStartEndDate = (startDate, endDate) => {
  const errors = [];
  !startDate && errors.push("startDate is mandatory");
  !endDate && errors.push("endDate is mandatory");
  startDate && Number.isNaN(new Date(startDate).getTime()) && errors.push("Invalid startDate");
  endDate && Number.isNaN(new Date(endDate).getTime()) && errors.push("Invalid endDate");
  return errors;
};

const getAggregatedDataValidationErrors = (req) => {
  const { startDate, endDate, granularity }: TAPIRequestQueryParams = req.query;

  const errors = [...validateStartEndDate(startDate, endDate)];
  !GROUP_ID_BY_GRANULARITY[granularity] && errors.push("Invalid granularity. Must be \"h\", \"d\", \"w\", or \"m\".");
  return errors.length > 0 ? errors : null;
};

const getDownloadRawDataErrors = (req) => {
  const { startDate, endDate }: TAPIRequestQueryParams = req.query;
  const res = validateStartEndDate(startDate, endDate);
  return res.length > 0 ? res : null;
};

export const downloadRawData = async (req, res) => {
  const { startDate, endDate, pnName, testType }: TAPIRequestQueryParams = req.query;

  const errors = getDownloadRawDataErrors(req);
  if (errors) {
    return res.status(400).json({ status: "error", errors });
  }

  const match: FilterQuery<IMnf> = {
    TEST_DATE: { $gte: new Date(startDate), $lte: new Date(endDate) },
  };

  // TODO pnName being regex potentially is a problem. need to consider auto complete field UI, and not regex search here
  pnName?.trim() && (match.PN = { $regex: pnName, $options: "i" });
  testType?.trim() && (match.TEST_TYPE = testType);

  try {
    const cursor = MnfModel.find(match).cursor();

    const fields = getMnfFields();

    const opts: ParserOptions = { fields, header: false };
    const parser = new Parser(opts);

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=\"data.csv\"");

    res.write(parser.parse(strArrToDict(fields))); // write the header row

    try {
      await cursor.eachAsync((docs) => {
        docs.forEach((doc) => {
          const csvRow = parser.parse(doc.toObject());
          res.write(`\n${csvRow}`);
        });
      }, { batchSize: CURSOR_BATCH_SIZE });
      return res.end();
    } catch (e) {
      console.error(e);
      return res.status(500).send("Error retrieving data");
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send("Error processing request");
  }
};


export const getAggregatedData = async (req, res) => {
  const { startDate, endDate, granularity, pnName, testType }: TAPIRequestQueryParams = req.query;

  const errors = getAggregatedDataValidationErrors(req);
  if (errors) {
    return res.status(400).json({ status: "error", errors });
  }

  const match: FilterQuery<IMnf> = {
    TEST_DATE: { $gte: new Date(startDate), $lte: new Date(endDate) },
  };

  // TODO pnName being regex potentially is a problem. need to consider auto complete field UI, and not regex search here
  pnName?.trim() && (match.PN = { $regex: pnName, $options: "i" });
  testType?.trim() && (match.TEST_TYPE = testType);

  const groupId = GROUP_ID_BY_GRANULARITY[granularity];
  try {
    const result = await MnfModel.aggregate([
      { $match: match },
      {
        $group: {
          _id: groupId,
          totalTests: { $sum: 1 },
          passTests: { $sum: { $cond: [{ $eq: ["$PASS", 1] }, 1, 0] } },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1, "_id.hour": 1, "_id.week": 1 } },
    ]);

    return res.json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Error processing request");
  }
};


export const getAllTestTypes = async (req, res) => {
  try {
    const testTypes = await MnfModel.distinct("TEST_TYPE");
    return res.json(testTypes);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Error processing request");
  }
};
