const callMethod = require('./index').callMethod;

const getAll = async (host) => {
  const refs = await callMethod(host, 'host.get_all');
  return refs.Value;
};

const getAllRecords = async (host) => {
  const records = await callMethod(host, 'host.get_all_records');
  return records.Value;
};

const getAddress = async (host, hostRef) => {
  const address = await callMethod(host, 'host.get_address', [hostRef]);
  return address.Value;
};

// Returns the OpaqueRef of the server/host by the nameLabel
const getByNameLabel = async (host, nameLabel) => {
  const hostByNameLabel = await callMethod(host, 'host.get_by_name_label', [nameLabel]);
  return hostByNameLabel.Value;
};

const getHostName = async (host, hostRef) => {
  const hostName = await callMethod(host, 'host.get_hostname', [hostRef]);
  return hostName.Value;
};

// const getLastSoftwareUpdate = async (host, hostRef) => {
//   const lastSoftwareUpdate = await callMethod(host, 'host.get_last_software_update', [hostRef]);
//   return lastSoftwareUpdate;
// };

// Returns a list of resident VMs in the server with the given hostRef
const getResidentVMs = async (host, hostRef) => {
  const residentVMs = await callMethod(host, 'host.get_resident_VMs', [hostRef]);
  return residentVMs.Value;
};

// TODO
const addTags = async () => {};

// TODO
const addToGuestVCPUsParams = async () => {};

// TODO
const addToLicenseServer = async () => {};

// TODO 
const addToLogging = async () => {};

// TODO 
const addToOtherConfig = async () => {};

// TODO 
const applyEdition = async () => {};

// TODO 
const applyRecommendedGuidance = async () => {};

// TODO 
const applyUpdates = async () => {};

// TODO 
const assertCanEvacuate = async () => {};

// TODO 
const backupRrds = async () => {};

// TODO 
const bugReportUpload = async () => {};

// TODO
const callExtension = async () => {};

// TODO 
const callPlugin = async () => {};

// TODO 
const computeFreeMemory = async () => {};

module.exports = {
  getAll,
  getAllRecords,
  getAddress,
  getByNameLabel,
  getHostName,
  // getLastSoftwareUpdate,
  getResidentVMs
};
