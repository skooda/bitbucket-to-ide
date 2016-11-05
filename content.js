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

function setupNotice() {
  let div = document.createElement('div');
  div.innerHTML = '<div id="sti---notice"><span style="font-size: 3em; float: right;">&#128070;</span><p><strong>Stash to CLI</strong> is not set for this project! <br />Click on extension icon to configure it.</p></div>';
  document.getElementsByTagName('body')[0].appendChild(div);
}

function openIde(fileName, lineNo) {
  if (! lineNo) {
     let lineNo = 0;
  }

  let config = {};
  let projectName = get_project_name(window.location.pathname);

  config[projectName] = {
    editorUrl: false,
    projectPath: false
  };

  chrome.storage.sync.get(config, (items) => {
    setup = items[projectName];

    if (! setup.projectPath || ! setup.editorUrl) {
      setupNotice();
      return false;
    }

    browserUrl = setup.editorUrl;
    basePath = setup.projectPath + "/";

    let url = browserUrl.replace("%file%", basePath + fileName).replace("%line%", lineNo);
    window.location = url;
  });
}

document.body.addEventListener("click", (event) => {
  let element = event.path[0].closest(".line-number-to");

  if (element) {
    let fileName = element.closest(".file-content").querySelector(".breadcrumbs").innerText;
    openIde(fileName, parseInt(element.innerHTML));
  }

  let notice = document.getElementById('sti---notice');

  if (notice) {
    notice.parentNode.removeChild(notice);
  }
});
