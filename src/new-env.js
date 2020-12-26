import { setEnv } from './utils/storage.js';
import { setSecretToken } from './utils/secretToken.js';

const addEnvModal = document.getElementById('addEnvModal');

const closeNewEnvModal = () => {
  const clsAtt = addEnvModal.getAttribute('class');
  addEnvModal.setAttribute('class', clsAtt.replace(' is-active', ''));
};

const createNewEnv = (loadEnvList) => {
  try {
    const newEnvName = document.getElementById('newEnvName').value;
    const newEnvTenantId = document.getElementById('newEnvTenantId').value;
    const newEnvSecretToken = document.getElementById('newEnvSecretToken').value;
    setEnv(newEnvName, newEnvTenantId);
    setSecretToken(newEnvName, newEnvSecretToken);
    loadEnvList();
    closeNewEnvModal();
  } catch (err) {
    console.log(err);
  }
};

const openNewEnvModal = () => {
  const clsAtt = addEnvModal.getAttribute('class');
  addEnvModal.setAttribute('class', `${clsAtt} is-active`);
};

export { createNewEnv, openNewEnvModal, closeNewEnvModal };
