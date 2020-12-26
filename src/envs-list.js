import { getEnvs, deleteEnv } from './utils/storage.js';
import { deleteSecretToken } from './utils/secretToken.js';
import { clearNode, clearEventListener } from './utils/utils.js';
import buildTableBody from './runs-list.js';
import { createNewEnv, openNewEnvModal, closeNewEnvModal } from './new-env.js';

const newEnvBtn = document.getElementById('addEnvBtn');
const confirmNewEnvBtn = document.getElementById('confirmAddEnvBtn');
const addEnvCloseBtn = document.getElementById('addEnvCloseBtn');

const loadEnv = (envName, loadEnvList) => {
  const envNameTitle = document.getElementById('envNameTitle');
  let deleteButton = document.getElementById('deleteEnv');
  deleteButton = clearEventListener(deleteButton);
  if (envName) {
    deleteButton.addEventListener('click', () => {
      deleteSecretToken(envName);
      deleteEnv(envName);
      loadEnv(getEnvs() === [] ? null : getEnvs()[0].name, loadEnvList);
      loadEnvList();
    });
    envNameTitle.textContent = envName;
  } else {
    envNameTitle.textContent = '';
  }
  buildTableBody(envName);
};

const loadEnvList = () => {
  const envs = getEnvs();
  const envList = document.getElementById('envsMenuList');
  // Clear env list
  clearNode(envList);
  // Rebuild env list
  envs.forEach((env) => {
    const envItem = document.createElement('li');
    const envLink = document.createElement('a');
    envLink.id = `${env.name}EnvLink`;
    envLink.textContent = `${env.name}`;
    envLink.addEventListener('click', () => loadEnv(env.name, loadEnvList));
    envItem.appendChild(envLink);
    envList.appendChild(envItem);
  });
};

newEnvBtn.onclick = openNewEnvModal;
addEnvCloseBtn.onclick = closeNewEnvModal;
confirmNewEnvBtn.onclick = () => createNewEnv(loadEnvList);

export { loadEnvList, loadEnv };
