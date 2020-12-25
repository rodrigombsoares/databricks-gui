import { setEnv } from './utils/storage.js';

const addEnvModal = document.getElementById('addEnvModal');

const closeNewEnvModal = () => {
  const clsAtt = addEnvModal.getAttribute('class');
  addEnvModal.setAttribute('class', clsAtt.replace(' is-active', ''));
};

const createNewEnv = (loadEnvList) => {
  const newEnvName = document.getElementById('newEnvName').value;
  const newEnvTenantId = document.getElementById('newEnvTenantId').value;
  setEnv(newEnvName, newEnvTenantId);
  loadEnvList();
  closeNewEnvModal();
};

const openNewEnvModal = () => {
  const clsAtt = addEnvModal.getAttribute('class');
  addEnvModal.setAttribute('class', `${clsAtt} is-active`);
};

export { createNewEnv, openNewEnvModal, closeNewEnvModal };
