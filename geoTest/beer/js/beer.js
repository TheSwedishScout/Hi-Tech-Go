/*
<ul id="logos">
    <li>
        <img id="l_budweiser" data-id="match1" class="logo" src="images/budweiserlogo.png" alt="Budweiser Logo" draggable="true" ondragstart="drag(event)">
    </li>
    <li>
        <img id="l_heineken" data-id="match2" class="logo" src="images/heinekenlogo.png" alt="Heineken Logo" draggable="true" ondragstart="drag(event)">
    </li>
    <li>
        <img id="l_staropramen" data-id="match3" class="logo" src="images/staropramenlogo.png" alt="Staropramen Logo" draggable="true" ondragstart="drag(event)">
    </li>
</ul>

<ul id="bottles">
    <li>
        <img id="b_heineken" data-id="match2" class="bottle" src="images/heinekenbottle.png" alt="Heineken Bottle" ondrop="drop(event)" ondragover="allowDrop(event)">
    </li>
    <li>
        <img id="b_staropramen" data-id="match3" class="bottle" src="images/staropramenbottle.png" alt="Staropramen Bottle" ondrop="drop(event)" ondragover="allowDrop(event)">
    </li>
    <li>
        <img id="b_budweiser" data-id="match1" class="bottle" src="images/budweiserbottle.png" alt="Budweiser Bottle" ondrop="drop(event)" ondragover="allowDrop(event)">
    </li>

</ul>
*/
var logos  =[
    {
        id:"budweiser",
        logoSrc: "images/budweiserlogo.png",
        bottleSrc: "images/budweiserbottle.png"
    },
    {
        id:"heineken",
        logoSrc: "images/heinekenlogo.png",
        bottleSrc: "images/heinekenbottle.png"
    },
    {
        id:"staropramen",
        logoSrc: "images/staropramenlogo.png",
        bottleSrc: "images/staropramenbottle.png"
    }
];
document.addEventListener("DOMContentLoaded", function () {
    // body...

    var game = document.getElementById('game')
    //Logos
    logosUl = document.createElement("ul");
    logosUl.id = "logos";
    for (var i = logos.length - 1; i >= 0; i--) {
        logosLi = document.createElement("li");
        logosImg = document.createElement("img");
        logosImg.src = logos[i].logoSrc;
        logosImg.id = "b_"+logos[i].id;
        logosImg.dataset.id=logos[i].id;
        logosImg.className = "logo";
        logosImg.draggable="true";
        logosImg.alt = logos[i].id + "Logo";
        logosImg.addEventListener("dragstart",drag)

        logosLi.appendChild(logosImg);
        logosUl.appendChild(logosLi);
    }
    game.appendChild(logosUl);
    //bottels
    bottleUl = document.createElement("ul");
    bottleUl.id = "bottles";
    for (var i = logos.length - 1; i >= 0; i--) {
        bottleLi = document.createElement("li");
        bottleImg = document.createElement("img");
        bottleImg.src = logos[i].bottleSrc;
        bottleImg.id = "b_"+logos[i].id;
        bottleImg.dataset.id=logos[i].id;
        bottleImg.className = "bottle";
        bottleImg.draggable="true";
        bottleImg.alt = logos[i].id + "Bottle";
        bottleImg.addEventListener("dragover",allowDrop)
        bottleImg.addEventListener("drop",drop)

        bottleLi.appendChild(bottleImg);
        bottleUl.appendChild(bottleLi);
    }
    game.appendChild(bottleUl);
})
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    console.log("hej")
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