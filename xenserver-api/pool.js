const xenServer = require('./index');

const getAllPoolRecords = async (host) => {
  const records = await xenServer.callMethod(host, 'pool.get_all_records');
  return records;
};

module.exports = {
  getAllPoolRecords,
};