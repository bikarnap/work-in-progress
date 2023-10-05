const index = require('./index');
const imports = require('./importsForTests');
const { getOtherConfig } = require('./vm');

const testVMGetAllVmRefs = async (host) => {
  await index.login(host, 'root', '!Cargotec!');
  const vmRefs = await imports.vm.getAllVmRefs(host);
  return vmRefs;
};

const testVMGetByNameLabel = async (host) => {
  await index.login(host, 'root', '!Cargotec!');
  const vm = await imports.vm.getByNameLabel(host, 'pokhabi_PROJECT_X2_ADMIN');
  console.log(vm.Value);
};

const testGetNameLabel = async (host) => {
  const vmRefs = await testVMGetAllVmRefs(host);
  const nameLabel = await imports.vm.getNameLabel(host, vmRefs[77]);
  console.log(nameLabel);
};

const testGetOrder = async (host) => {
  const vmRefs = await testVMGetAllVmRefs(host);
  const order = await imports.vm.getOrder(host, vmRefs[6]);
  console.log(order);
};

const testGetParentRef = async (host) => {
  const vmRefs = await testVMGetAllVmRefs(host);
  const parentRef = await imports.vm.getParentRef(host, vmRefs[6]);
  console.log(parentRef);
};

const testGetPlatform = async (host) => {
  const vmRefs = await testVMGetAllVmRefs(host);
  const platform = await imports.vm.getPlatform(host, vmRefs[6]);
  console.log(platform);
};

const testGetBootRecord = async (host) => {
  const vmRefs = await testVMGetAllVmRefs(host);
  const bootRecord = await imports.vm.getBootRecord(host, vmRefs[6]);
  console.log(bootRecord);
};

const testGetChildren = async (host) => {
  const vmRefs = await testVMGetAllVmRefs(host);
  const children= await imports.vm.getChildren(host, vmRefs[1]);
  console.log(children);
};

const testGetDomArch = async (host) => {
  const vmRefs = await testVMGetAllVmRefs(host);
  const domarch= await imports.vm.getDomArch(host, vmRefs[25]);
  console.log(domarch);
};

const testGetByUuid = async (host, uuid) => {
  await index.login(host, 'root', '!Cargotec!');
  const vm= await imports.vm.getByUuid(host, uuid);
  console.log(vm);
};

const testGetMetrics = async (host) => {
  const vmRefs = await testVMGetAllVmRefs(host);
  const metrics= await imports.vm.getMetricsRef(host, vmRefs[4]);
  console.log(metrics);
};


const testGetPowerState = async (host) => {
  const vmRefs = await testVMGetAllVmRefs(host);
  const powerState= await imports.vm.getPowerState(host, vmRefs[4]);
  console.log(powerState);
};

const testGetOtherConfig = async (host) => {
  const vmRefs = await testVMGetAllVmRefs(host);
  const otherConfig= await imports.vm.getOtherConfig(host, vmRefs[4]);
  console.log(otherConfig);
};

const testGetVmRecord = async (host) => {
  const vmRefs = await testVMGetAllVmRefs(host);
  const vmRecord= await imports.vm.getVmRecord(host, vmRefs[4]);
  console.log(vmRecord);
};


// testVMGetAllVmRefs('192.168.232.3');
// testVMGetByNameLabel('192.168.232.3');
// testGetNameLabel('192.168.232.3');
// testGetOrder('192.168.232.3');
// testGetParentRef('192.168.232.3');
// testGetPlatform('192.168.232.3');
// testGetBootRecord('192.168.232.3');
// testGetChildren('192.168.204.17');
// testGetByUuid('192.168.232.3', '7c3a7b9b-43bd-0e24-e738-53bc399f77ac');
// testGetDomArch('192.168.232.3');
// testGetMetrics('192.168.232.3');
// testGetPowerState('192.168.232.3');
// testGetOtherConfig('192.168.232.3');
testGetVmRecord('192.168.232.3');
