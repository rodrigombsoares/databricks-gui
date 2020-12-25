import { loadEnvList, loadEnv } from './envs-list.js';
import { getEnvs } from './utils/storage.js';

// import { clearEnvs } from "./storage.js"
// clearEnvs() // Use to clear envs

loadEnvList();
loadEnv(getEnvs()[0].name, loadEnvList);
