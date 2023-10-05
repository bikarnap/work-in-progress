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


module.exports = {
  login,
  logout,
  callMethod,
}
