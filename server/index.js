const express = require('express');
const xenApi = require('../xenserver-api/index');
const vm = require('../xenserver-api/vm');
const pool = require('../xenserver-api/pool');
const cors = require('cors');

const app = express();
app.use(cors())
const PORT = 3005;

app.get('/', (req, res) => {
  res.send('<h3>Use the endpoint <a href="/api/v0">/api/v0</a> to view the available api endpoints.</h3>');
});

app.get('/api/v0', (req, res) => {
  const endpoints = {
    hosts: '/api/v0/hosts',
    vms: '/api/v0/vms',
    pools: '/api/v0/pools',
    metrics: '/api/v0/hosts/metrics'
  }
  res.json(endpoints);
});

app.get('/api/v0/pool/:poolMaster', async (req, res) => {
  const master = req.params.poolMaster;
  await xenApi.login(master, 'root', '!Cargotec!');
  if (!master) {
    res.json({message: 'Pool master ip is required'});
  } else {
    const poolData = await pool.getAllPoolRecords(master);
    res.json(poolData);
  }
});

app.get('/api/v0/hosts/', async (req, res) => {
  await xenApi.login('192.168.232.3', 'root', '!Cargotec!');
  const hosts = await xenApi.getAllHosts('192.168.232.3');
  res.json(hosts)
});

app.get('/api/v0/vms', async (req, res) => {
  await xenApi.login('192.168.232.3', 'root', '!Cargotec!');
  const vms = await vm.getVMHosts('192.168.232.3');
  res.json(vms);
});

app.get('/api/v0/hosts/metrics', async (req, res) => {
  await xenApi.login('192.168.204.17', 'root', '!Cargotec!');
  const metrics = await xenApi.getHostMetrics('192.168.204.17');
  res.json(metrics)
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
});