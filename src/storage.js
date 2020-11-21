const Store = require('electron-store');

const schema = {
    envs: {
        type: "array",
        items: {
            type: "object",
            properties: {
                name: {
                    type: "string"
                },
                tenantId: {
                    type: "string",
                    minLength: 17,
                    maxLength: 17
                }
            },
            required: ["name", "tenantId"]
        },
        default: []
    }
};

const store = new Store({schema, clearInvalidConfig: true})

const getEnvs = () => store.get("envs", [])
const setEnv = (newEnv) => {
    let envs = getEnvs()
    console.log(envs)
    envs = [...envs, newEnv]
    store.set("envs", envs)
}

export {getEnvs, setEnv} 
// const Store = require('electron-store');

// const schema = {
// 	foo: {
// 		type: 'number',
// 		maximum: 100,
// 		minimum: 1,
// 		default: 50
// 	},
// 	bar: {
// 		type: 'string',
// 		format: 'url'
// 	}
// };

// const store = new Store({schema});

// const getEnvs = () => {
//     console.log(store.get('foo'));
//     //=> 50
    
//     store.set('foo', '1');
//     // [Error: Config schema violation: `foo` should be number]
// }
// const setEnv = () => {console.log("im ok")}

// export {getEnvs, setEnv} 