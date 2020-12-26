const keytar = require('keytar');

const keytarAppName = 'DatabricksGui';

const setSecretToken = (envName, secretToken) => {
  keytar.setPassword(keytarAppName, envName, secretToken);
};

const getSecretToken = (envName) => keytar.getPassword(keytarAppName, envName);

const deleteSecretToken = (envName) => keytar.deletePassword(keytarAppName, envName);

export { setSecretToken, getSecretToken, deleteSecretToken };
