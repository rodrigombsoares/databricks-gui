import { ValidationError } from './errors.js';

const Store = require('electron-store');

const schema = {
  envs: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
        },
        tenantId: {
          type: 'string',
          minLength: 17,
          maxLength: 17,
        },
      },
      required: ['name', 'tenantId'],
    },
    default: [],
  },
};

const store = new Store({ schema, clearInvalidConfig: true });

const getEnvs = () => store.get('envs', []);
const setEnv = (newEnv) => {
  let envs = getEnvs();
  if (envs.some((e) => e.name === newEnv.name)) {
    throw new ValidationError(`${newEnv.name} env already exists`);
  } else {
    envs = [...envs, newEnv];
    store.set('envs', envs);
  }
};
const clearEnvs = () => store.clear();

export { getEnvs, setEnv, clearEnvs };
