import { clearNode } from './utils/utils.js';

const runsJson = require('./mocks/runs.json');

const fetchRuns = (envName) => {
  if (envName) {
    return runsJson;
  }
  return null;
};

const buildRowheader = (runState) => {
  const statesClasses = {
    RUNNING: 'tag is-info',
    PENDING: 'tag is-warning',
    SUCCESS: 'tag is-success',
    FAILED: 'tag is-danger',
  };

  const lcState = runState.life_cycle_state;
  const state = lcState === 'TERMINATED' ? runState.result_state : lcState;

  const rowHeader = document.createElement('th');
  const headerTag = document.createElement('span');
  headerTag.className = statesClasses[state];
  headerTag.textContent = state;
  rowHeader.appendChild(headerTag);
  return rowHeader;
};

const buildTaskCells = (runTask) => {
  const mainClassCell = document.createElement('td');
  const parametersCell = document.createElement('td');
  const parametersButton = document.createElement('button');
  parametersButton.className = 'button is-ghost';
  parametersButton.textContent = 'Parameters';
  let cellText = '';
  if (hasOwnProperty.call(runTask, 'spark_jar_task')) {
    cellText = runTask.spark_jar_task.main_class_name;
    parametersButton.setAttribute('data-tooltip', runTask.spark_jar_task.parameters.join(',\n'));
  } else if (hasOwnProperty.call(runTask, 'spark_python_task')) {
    cellText = 'SparkPythonTask';
    parametersButton.setAttribute('data-tooltip', runTask.spark_python_task.parameters.join(',\n'));
  } else if (hasOwnProperty.call(runTask, 'notebook_task')) {
    cellText = 'NotebookTask';
    parametersButton.setAttribute('data-tooltip', runTask.notebook_task.base_parameters.join(',\n'));
  } else if (hasOwnProperty.call(runTask, 'spark_submit_task')) {
    cellText = 'SparkSubmitTask';
    parametersButton.setAttribute('data-tooltip', runTask.spark_submit_task.parameters.join(',\n'));
  } else {
    throw new Error('Unspecified Task');
  }
  parametersCell.appendChild(parametersButton);
  mainClassCell.textContent = cellText;
  return { mainClassCell, parametersCell };
};

const buildLibrariesCell = (runLibs) => {
  const librariesCell = document.createElement('td');
  const librariesButton = document.createElement('button');
  librariesButton.className = 'button is-ghost';
  librariesButton.textContent = 'Libraries';

  let tooltipData = null;
  runLibs.forEach((obj) => {
    if (tooltipData === null) {
      tooltipData = JSON.stringify(obj);
    } else {
      tooltipData += `,\n${JSON.stringify(obj)}`;
    }
  });

  librariesButton.setAttribute('data-tooltip', tooltipData);

  librariesCell.appendChild(librariesButton);
  return librariesCell;
};

const buildTimeCell = (runTime) => {
  const timeCell = document.createElement('td');
  timeCell.textContent = new Date(runTime).toLocaleString();
  return timeCell;
};

const buildRunButtonCell = (runId) => {
  const runCell = document.createElement('td');
  const runButton = document.createElement('button');
  runButton.textContent = runId;
  runButton.className = 'button is-primary';
  runButton.addEventListener('click', () => console.log(runId));
  runCell.appendChild(runButton);
  return runCell;
};

const buildRunRow = (run) => {
  const tableRow = document.createElement('tr');
  const rowHeader = buildRowheader(run.state);
  const { mainClassCell, parametersCell } = buildTaskCells(run.task);
  const librariesCell = buildLibrariesCell(run.cluster_spec.libraries);
  const timeCell = buildTimeCell(run.start_time);
  const runCell = buildRunButtonCell(run.run_id);

  tableRow.appendChild(rowHeader);
  tableRow.appendChild(mainClassCell);
  tableRow.appendChild(parametersCell);
  tableRow.appendChild(librariesCell);
  tableRow.appendChild(timeCell);
  tableRow.appendChild(runCell);
  return tableRow;
};

const buildTableBody = (envName) => {
  const runsTable = document.getElementById('listRunsTable');
  // clear table
  clearNode(runsTable);
  // fetch runs and build table
  const runs = fetchRuns(envName);
  runs.forEach((run) => runsTable.appendChild(buildRunRow(run)));
};

export default buildTableBody;
