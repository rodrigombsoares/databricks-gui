import { getEnvs, setEnv, clearEnvs} from "./storage.js"

const addEnvBtn = document.getElementById("addEnvBtn")
const confirmAddEnvBtn = document.getElementById("confirmAddEnvBtn")
const addEnvModal = document.getElementById("addEnvModal")
const addEnvCloseBtn = document.getElementById("addEnvCloseBtn")

const closeNewEnv = () => {
    let clsAtt = addEnvModal.getAttribute("class");
    addEnvModal.setAttribute("class", clsAtt.replace(" is-active", ""));
}

const loadEnvList = () => {
    let envs = getEnvs();
    let envList = document.getElementById("envsMenuList");
    envList.innerHTML = "";
    envs.forEach((env) => {
        envList.innerHTML += `<li><a id="${env.name}EnvLink">${env.name}</a></li>`;
    })
}
// clearEnvs()
// loadEnvList()

addEnvBtn.onclick = () => {
    let clsAtt = addEnvModal.getAttribute("class");
    addEnvModal.setAttribute("class", clsAtt + " is-active");
}

addEnvCloseBtn.onclick = closeNewEnv

confirmAddEnvBtn.onclick = () => {
    let newEnvName = document.getElementById("newEnvName").value;
    let newEnvTenantId = document.getElementById("newEnvTenantId").value;
    let newEnv = {
        name: newEnvName,
        tenantId: newEnvTenantId
    };
    setEnv(newEnv);
    loadEnvList();
    closeNewEnv();
}

export { loadEnvList };