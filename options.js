// Show notification inside status div
function notify(text) {
  var status = document.getElementById('status');
  status.textContent = text;

  setTimeout(function() {
    status.textContent = '';
  }, 1000);
}

// Save options to chrome.storage.sync.
function save_options() {
  chrome.tabs.getSelected(null, (tab) => {

    let editorUrl = document.getElementById('editorUrl').value;
    let projectPath = document.getElementById('projectPath').value;
    let projectName = get_project_name(tab.url);

    let config = {};

    config[projectName] = {
      editorUrl: editorUrl,
      projectPath: projectPath
    };
    chrome.storage.sync.set(config, notify('Settings saved.'));
  });
}

// Get actual openned project name from url
function get_project_name(url) {
  path = url.split('/');

  let i = 0;
  let project = "";
  for (let node of path) {
    i++;
    if (node == "projects" || node == "repos") {
      project += "/" + path[i];
    }
  }
  return project;
}

// Restores configuration state using the preferences
// stored in chrome.storage.
function restore_options() {

  for (el of document.getElementsByClassName("protocol-button")) {
    let protocol = el.dataset.protocol;
    console.log(protocol);
    el.addEventListener("click", () => {
      document.getElementById('editorUrl').value = protocol;
    });
  }

  chrome.tabs.getSelected(null, (tab) => {

    let projectName = get_project_name(tab.url);
    let config = {};

    config[projectName] = {
      editorUrl: 'editor://open?file=%file%&line=%line%',
      projectPath: '/home/www/project'
    };

    chrome.storage.sync.get(config, (items) => {
      setup = items[projectName];

      document.getElementById('projectName').innerHTML = projectName;
      document.getElementById('editorUrl').value = setup.editorUrl;
      document.getElementById('projectPath').value = setup.projectPath;
    });
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);
