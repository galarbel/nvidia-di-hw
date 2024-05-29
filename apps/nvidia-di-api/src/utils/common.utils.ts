// this file can potentially move to it's own lib to be shared by multiple FE/BE apps.
// eslint-disable-next-line import/prefer-default-export
export const strArrToDict = (arr: string[]) => arr.reduce((acc, key) => { acc[key] = key; return acc; }, {});

