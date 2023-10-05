const callMethod = require('./index').callMethod;

// Return a list of all the VM references known to the system
const getAllVmRefs = async (host) => {
  const vmRefs = await callMethod(host, 'VM.get_all', []);
  return vmRefs.Value;
}

// Return a map of VM references to VM records for all VMs known to the system
const getAllVmRecords = async (host) => {
  const records = await callMethod(host, 'VM.get_all_records', []);
  return records.Value;
};

const getAllHosts = async (host) => {
  // await login(host=host, username='root', password='!Cargotec!')
  const hosts = await callMethod(host, 'host.get_all_records')
  return hosts;
};

const getVmRecord = async (host, ref) => {
  const record = await callMethod(host, 'VM.get_record', [ref]);
  return record.Value;
};

// const getVmRecord = async (host, ref) => {
//   const record = await callMethod(host, 'VM_guest_metrics.get_networks', [ref]);
//   return record.Value;
// };

// Returns references to objects with the matching labels
const getByNameLabel = async (host, label) => {
  const vm = await callMethod(host, 'VM.get_by_name_label', [label]);
  return vm;
};

// Get a reference to the VM instance with the specified UUID.
const getByUuid = async (host, uuid) => {
  const vmRef = await callMethod(host, 'VM.get_by_uuid', [uuid]);
  return vmRef.Value;
};

// Get a reference to the VM instance with the specified UUID.
const getDomArch = async (host, vmRef) => {
  const domarch = await callMethod(host, 'VM.get_domarch', [vmRef]);
  return domarch.Value;
};

const getNameLabel = async (host, vmRef) => {
  const name = await callMethod(host, 'VM.get_name_label', [vmRef]);
  return name.Value;
};

const getNameDescription = async (host, vmRef) => {
  const nameDescription = await callMethod(host, 'VM.get_name_description', [vmRef]);
  return nameDescription.Value;
};


const getIsATemplate = async (host, vmRef) => {
  const isATemplate = await callMethod(host, 'VM.get_is_a_template', [vmRef]);
  return isATemplate.Value;
};

const getIsDefaultTemplate = async (host, vmRef) => {
  const isDefaultTemplate = await callMethod(host, 'VM.get_is_default_template', [vmRef]);
  return isDefaultTemplate.Value;
};

const getIsASnapshot = async (host, vmRef) => {
  const isASnapshot = await callMethod(host, 'VM.get_is_a_snapshot', [vmRef]);
  return isASnapshot.Value;
};

const getIsVmssSnapshot = async (host, vmRef) => {
  const isVmssSnapshot = await callMethod(host, 'VM.get_is_vnss_snapshot', [vmRef]);
  return isVmssSnapshot.Value;
};

const getIsSnapshotFromVmpp = async (host, vmRef) => {
  const isSnapshotFromVmpp = await callMethod(host, 'VM.get_is_snapshot_from_vmpp', [vmRef]);
  return isSnapshotFromVmpp.Value;
};

const getIsAControlDomain = async (host, vmRef) => {
  const isAControlDomain = await callMethod(host, 'VM.get_is_a_control_domain', [vmRef]);
  return isAControlDomain.Value;
};

// Get the metrics field reference of the given VM.
const getMetricsRef = async (host, vmRef) => {
  const metrics = await callMethod(host, 'VM.get_metrics', [vmRef]);
  return metrics.Value;
};


const getOrder = async (host, vmRef) => {
  const order = await callMethod(host, 'VM.get_order', [vmRef]);
  return order.Value;
};

const getParentRef = async (host, vmRef) => {
  const parentRef = await callMethod(host, 'VM.get_parent', [vmRef]);
  return parentRef.Value;
};

const getPlatform = async (host, vmRef) => {
  const platform = await callMethod(host, 'VM.get_platform', [vmRef]);
  return platform.Value;
};

const getPowerState = async (host, vmRef) => {
  const powerState = await callMethod(host, 'VM.get_power_state', [vmRef]);
  return powerState.Value;
};

const getOtherConfig = async (host, vmRef) => {
  const otherConfig = await callMethod(host, 'VM.get_other_config', [vmRef]);
  return otherConfig.Value;
};

// Returns a record describing the VM's dynamic state, initialised when the VM boots and updated to reflect runtime configuration changes e.g. CPU hotplug
const getBootRecord = async (host, vmRef) => {
  const bootRecord = await callMethod(host, 'VM.get_boot_record', [vmRef]);
  return bootRecord.Value;
};

const getChildren = async (host, vmRef) => {
  const children = await callMethod(host, 'VM.get_children', [vmRef]);
  return children.Value;
};


// const getVMHosts = async (host) => {
//   const result = {};
//   const allVMRecords = await getAllVmRecords(host);
//   const filterDefaultTemplates = Object.keys(allVMRecords).filter(key => 
//     !allVMRecords[key].is_default_template &&
//     !allVMRecords[key].is_a_template &&
//     !allVMRecords[key].is_control_domain &&
//     !allVMRecords[key].is_vmss_snapshot
//   );
//   for (const key of filterDefaultTemplates) {
//     result[key] = allVMRecords[key];
//     const record = await getVmRecord(host, result[key]['guest_metrics']);
//     // const vmOs = await getVMOs(host, result[key]['guest_metrics'])
//     result[key].ip_addresses = record;
//     // result[key].os = vmOs;
//     // console.log(record);
//   }
//   return result;
// }


module.exports = {
  getAllVmRefs,
  getAllHosts, 
  getAllVmRecords,
  getVmRecord,
  getByNameLabel,
  getNameLabel,
  getByUuid,
  getNameDescription,
  getOrder,
  getParentRef,
  getPlatform,
  getBootRecord,
  getChildren,
  getDomArch,
  getMetricsRef,
  getIsAControlDomain,
  getIsATemplate,
  getIsDefaultTemplate,
  getIsASnapshot,
  getIsVmssSnapshot,
  getIsSnapshotFromVmpp,
  getPowerState,
  getOtherConfig
}
