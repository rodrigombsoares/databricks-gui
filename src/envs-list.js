import { getEnvs, setEnv } from './storage.js';

const addEnvBtn = document.getElementById('addEnvBtn');
const confirmAddEnvBtn = document.getElementById('confirmAddEnvBtn');
const addEnvModal = document.getElementById('addEnvModal');
const addEnvCloseBtn = document.getElementById('addEnvCloseBtn');

const closeNewEnv = () => {
  const clsAtt = addEnvModal.getAttribute('class');
  addEnvModal.setAttribute('class', clsAtt.replace(' is-active', ''));
};

const loadEnv = (envName) => {
  const envNameTitle = document.getElementById('envNameTitle');
  envNameTitle.textContent = envName;
};

const loadEnvList = () => {
  const envs = getEnvs();
  const envList = document.getElementById('envsMenuList');
  envs.forEach((env) => {
    const envItem = document.createElement('li');
    const envLink = document.createElement('a');
    envLink.id = `${env.name}EnvLink`;
    envLink.textContent = `${env.name}`;
    envLink.addEventListener('click', () => loadEnv(env.name));
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
  const newEnv = {
    name: newEnvName,
    tenantId: newEnvTenantId,
  };
  setEnv(newEnv);
  loadEnvList();
  closeNewEnv();
};

export default loadEnvList;
