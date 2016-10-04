
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
    ev.dataTransfer.setData("data-id", ev.target.getAttribute("data-id"));
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var logo = ev.dataTransfer.getData("data-id");
    var bottle = ev.target.getAttribute("data-id");
    if (logo == bottle) {
      ev.target.appendChild(document.getElementById(data));
    } else {
      alert("Wrong bottle");
    }
    
}