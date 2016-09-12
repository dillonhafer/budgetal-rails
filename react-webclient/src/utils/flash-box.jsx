module.exports = {
  showMessage(message) {
    const box = newBox(message);
    document.querySelector('.flash-holder').appendChild(box);
  }
}

function newBox(message) {
  let box = document.createElement('div');
  box.setAttribute('class', 'flash-box');
  box.innerHTML = message;
  box.addEventListener("animationend", removeFlash, false);
  box.addEventListener("click", removeFlash, false);
  return box;
}

function removeFlash(e) {
  const box = e.target;
  if (box) {
    box.parentNode.removeChild(box);
  }
}
