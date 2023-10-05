const xmlRpc = require('xmlrpc');

// Store xen session reference for each of the logged in xenserver
const xenSessions = {};

// Before we can interact with the xenserver, we need to login to it.
// Successful login resolves to session reference and client
const login = (host, username, password) => {
  return new Promise((resolve, reject) => {
    const client = xmlRpc.createClient({ host: host, port: '80', path: '/'});

    // xml rpc method call 
    // sesson.login_with_password
    // session is the XAPI class and login_with_password is the method
    // syntax: client.methodCall(method, [username, pasword], (error, sessionRef))
    client.methodCall('session.login_with_password', [username, password], (error, sessionRef) => {
      if (error) {
        reject(error);
      } else {
        xenSessions[host] = {sessionRef, client};
        resolve({ sessionRef, client });
      }
    });
  });
};

// Customized client.methodCall function
const callMethod = (host, method, params=[]) => {
  return new Promise((resolve, reject) => {
    if (!xenSessions[host]) {
      reject(new Error (`Not logged into the host ${host}`));
      return;
    }

    const { sessionRef, client } = xenSessions[host];
    client.methodCall(method, [sessionRef.Value, ...params], (error, data) => {
      if (error) {
        reject (error);
      } else {
        resolve (data);
      }
    });
  });
};

const logout = (host) => {
  if (xenSessions[host]) {
    const { sessionRef, client } = xenSessions[host];
    client.methodCall('session.logout', [sessionRef.Value], (error, data) => {
      if (error) {
        console.log('Error during logout', error);
      }
      delete xenSessions[host];
    })
  }
};

const getAllVms = async () => {
  await login(host= '192.168.204.17', username='root', password='!Cargotec!')
  const vmRefs = await callMethod('192.168.204.17', 'VM.get_all', []);
  console.log(vmRefs);
  return vmRefs;
}

// const getAllVmRecords = async (host) => {
//   // await login(host= '192.168.232.3', username='root', password='!Cargotec!')
//   const vmRecords = await callMethod(host, 'VM.get_all_records');
//   // console.log(vmRecords)
//   return vmRecords;
// };

const getAllVmRecords = async (host) => {
  const records = await callMethod(host, 'VM.get_all_records');
  return records.Value;
};

const getAllHosts = async (host) => {
  // await login(host=host, username='root', password='!Cargotec!')
  const hosts = await callMethod(host, 'host.get_all_records')
  return hosts;
};

const getVmRecord = async (host, ref) => {
  const record = await callMethod(host, 'VM_guest_metrics.get_networks', [ref]);
  return record.Value;
}


const getVMHosts = async (host) => {
  const result = {};
  const allVMRecords = await getAllVmRecords(host);
  const filterDefaultTemplates = Object.keys(allVMRecords).filter(key => 
    !allVMRecords[key].is_default_template &&
    !allVMRecords[key].is_a_template &&
    !allVMRecords[key].is_control_domain &&
    !allVMRecords[key].is_vmss_snapshot
  );
  for (const key of filterDefaultTemplates) {
    result[key] = allVMRecords[key];
    const record = await getVmRecord(host, result[key]['guest_metrics']);
    // const vmOs = await getVMOs(host, result[key]['guest_metrics'])
    result[key].ip_addresses = record;
    // result[key].os = vmOs;
    // console.log(record);
  }
  return result;
}


module.exports = {
  login,
  logout,
  callMethod,
  getAllHosts, 
  getAllVmRecords,
  getVMHosts
}
