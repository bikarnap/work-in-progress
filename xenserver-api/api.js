const callMethod = require('./index').callMethod;

const getAll = async (poolMaster, className, reference=[]) => {
  const method = className + '.get_all';
  const allRefs = await callMethod(poolMaster, method, reference)
  return allRefs.Value;
};

const getAllRecords = async (poolMaster, className, reference) => {
  const method = className + '.get_all_records';
  const allRecords = await callMethod(poolMaster, method, reference)
  return allRecords.Value;
};

module.exports = {
  getAll,
  getAllRecords
};