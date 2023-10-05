const callMethod = require('./index').callMethod;

const getAll = async (host, ref) => {
  const record = await callMethod(host, 'VM_guest_metrics.get_all', [ref]);
  return record.Value;
};

const getNetworks = async (host, ref) => {
  const record = await callMethod(host, 'VM_guest_metrics.get_networks', [ref]);
  return record.Value;
}


module.exports = {
  getAll,
  getNetworks
}
