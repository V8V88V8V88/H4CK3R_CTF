const { getDataConnect, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'H4CK3R_CTF',
  location: 'us-central1'
};
exports.connectorConfig = connectorConfig;

