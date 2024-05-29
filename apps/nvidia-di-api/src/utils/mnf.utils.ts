import mnfModel from "../models/mnf.model";

export const getMnfFields = () => {
  const fields = Object.keys(mnfModel.schema.paths);
  fields.pop(); // remove last field? it's something called "__V" that is not defined?...
  return fields;
};

export const moo = 1;
