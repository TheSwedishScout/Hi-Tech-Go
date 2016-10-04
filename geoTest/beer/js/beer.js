
function allowDrop(ev) {
    ev.preventDefault();
}
/*
function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}
*/
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

/*
function draw(image) {
    var gameDiv = document.createElement("div"); //create <div> </div>
    gameDiv.className = "beerGame"; //adds class="beerGame" to the div-tags
    
    var logo1 = document.createElement("div");
    logo1.textContent = image.name;
    gameDiv.appendChild(logo1);
    
    var logo2 = document.createElement("div"); 
    logo2.textContent = image.phone;
    gameDiv.appendChild(logo2);
    
    var logo3 = document.createElement("div");
    logo3.textContent = image.email;
    gameDiv.appendChild(logo3);
    
    document.body.appendChild(gameDiv);
}
*/

/*
function main() {
  gameDiv = document.createElement("div");
  gameDiv.width = WIDTH;
  gameDiv.height= HEIGHT;
  document.body.appendChild(gameDiv);
  
main();

*/

