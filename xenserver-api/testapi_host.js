const index = require('./index');
const imports = require('./importsForTests');

const testGetAll = async (host) => {
  await index.login(host, 'root', '!Cargotec!');
  const refs = await imports.host.getAll(host);
  console.log(refs);
};

const testGetAllRecords = async (host) => {
  await index.login(host, 'root', '!Cargotec!');
  const records = await imports.host.getAllRecords(host);
  console.log(records);
};

const testGetAddress = async (host) => {
  await index.login(host, 'root', '!Cargotec!');
  const hostRefs = refs = await imports.host.getAll(host);
  const address = await imports.host.getAddress(host, hostRefs[1]);
  console.log(address);
};

const testGetByNameLabel = async (host) => {
  await index.login(host, 'root', '!Cargotec!');
  const hostByName = await imports.host.getByNameLabel(host, 'xenserver-dellr650-70');
  console.log(hostByName);
};

const testGetHostname = async (host) => {
  await index.login(host, 'root', '!Cargotec!');
  const hostRefs = refs = await imports.host.getAll(host);
  const hostName = await imports.host.getHostName(host, hostRefs[0]);
  console.log(hostName);
};

// const testGetLastSoftwareUpdate = async (host) => {
//   await index.login(host, 'root', '!Cargotec!');
//   const hostRefs = refs = await imports.host.getAll(host);
//   const lastSoftwareUpdate = await imports.host.getLastSoftwareUpdate(host, hostRefs);
//   console.log(lastSoftwareUpdate);
// };

const testGetResidentVMs = async (host) => {
  await index.login(host, 'root', '!Cargotec!');
  const hostRefs = refs = await imports.host.getAll(host);
  const residentVMs = await imports.host.getResidentVMs(host, hostRefs[0]);
  console.log(residentVMs);
};

// testGetAll('192.168.232.3');
// testGetAllRecords('192.168.232.3');
// testGetAddress('192.168.232.3');
// testGetByNameLabel('192.168.232.3');
// testGetHostname('192.168.232.3');
// testGetLastSoftwareUpdate('192.168.228.253');
testGetResidentVMs('192.168.228.253');