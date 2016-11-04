let basePath = "/src/";
let browserUrl = "phpstorm://open?file=%file%&line=%line%";

function openIde(fileName, lineNo) {
  if (! lineNo) {
     let lineNo = 0;
  }

  let url = browserUrl.replace("%file%", fileName).replace("%line%", lineNo);
  window.location = url;
}

document.body.addEventListener("click", (event) => {
  let element = event.path[0].closest(".line-number-to");

  if (element) {
    let fileName = basePath + element.closest(".file-content").querySelector(".breadcrumbs").innerText;
    openIde(fileName, parseInt(element.innerHTML));
  }
});
