import { loadEnvList } from "./envs-list.js"
// import { clearEnvs } from "./storage.js"
// clearEnvs()

loadEnvList()


//               //
//  MOCKED DATA  //
//               //
const tooltip1 = document.getElementById("tooltip1")
var tooltipData = "'cluster',\n'more_dir',\n's3a://mocked/project/data/another_dir_in_s3/2014/data/{pattern*.csv,pattern*/pattern*.csv}',\n's3a://mocked/project/parquet/another_dir_in_s3/more_dir',\n'other_param'"
tooltip1.setAttribute("data-tooltip", tooltipData)

const tooltip2 = document.getElementById("tooltip2")
var libraries = [
    {
        "jar": "s3://mocked/project/jar/project-parquet-app.jar"
    },
    {
        "jar": "s3://mocked/project/jar/project-parquet-app2.jar"
    },
]
var tooltip2Data = null
libraries.forEach((obj) => {
    if (tooltip2Data === null) {
        tooltip2Data = JSON.stringify(obj)
    } else {
        tooltip2Data += `,\n${JSON.stringify(obj)}`
    }
})
tooltip2.setAttribute("data-tooltip", tooltip2Data)

const start = 1605845985269
const startTime = document.getElementById("startTime")
startTime.innerHTML = new Date(start).toLocaleString()