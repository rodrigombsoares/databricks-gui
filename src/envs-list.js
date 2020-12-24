import { getEnvs, setEnv, deleteEnv } from './storage.js';
import { clearNode, clearEventListener } from './utils/utils.js';
import buildTableBody from './runs-list.js';

const addEnvBtn = document.getElementById('addEnvBtn');
const confirmAddEnvBtn = document.getElementById('confirmAddEnvBtn');
const addEnvModal = document.getElementById('addEnvModal');
const addEnvCloseBtn = document.getElementById('addEnvCloseBtn');

const closeNewEnv = () => {
  const clsAtt = addEnvModal.getAttribute('class');
  addEnvModal.setAttribute('class', clsAtt.replace(' is-active', ''));
};

const loadEnv = (envName, loadEnvList) => {
  const envNameTitle = document.getElementById('envNameTitle');
  let deleteButton = document.getElementById('deleteEnv');
  deleteButton = clearEventListener(deleteButton);
  deleteButton.addEventListener('click', () => {
    deleteEnv(envName);
    loadEnvList();
  });
  envNameTitle.textContent = envName;
  buildTableBody(envName);
};

const loadEnvList = () => {
  const envs = getEnvs();
  const envList = document.getElementById('envsMenuList');
  // clear env list
  clearNode(envList);
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

addEnvBtn.onclick = () => {
  const clsAtt = addEnvModal.getAttribute('class');
  addEnvModal.setAttribute('class', `${clsAtt} is-active`);
};

addEnvCloseBtn.onclick = closeNewEnv;

confirmAddEnvBtn.onclick = () => {
  const newEnvName = document.getElementById('newEnvName').value;
  const newEnvTenantId = document.getElementById('newEnvTenantId').value;
  setEnv(newEnvName, newEnvTenantId);
  loadEnvList();
  closeNewEnv();
};

export default loadEnvList;
