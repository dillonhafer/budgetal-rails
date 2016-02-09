export default {
  showMessage(message) {
    var box = newBox(message);
    document.querySelector('.flash-holder').appendChild(box);
  }
}

function newBox(message) {
  var box = document.createElement('div');
  box.setAttribute('class', 'flash-box');
  box.innerHTML = message;
  box.addEventListener("animationend", removeFlash, false);
  box.addEventListener("click", removeFlash, false);
  return box;
}

function removeFlash(e) {
  var box = e.target;
  if (box) {
    box.parentNode.removeChild(box);
  }
}
