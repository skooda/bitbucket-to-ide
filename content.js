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
});
