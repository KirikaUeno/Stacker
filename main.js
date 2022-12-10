const gridDiv = document.getElementById("grid");
const objectsDiv = document.getElementById("objects");
const nameInput = document.getElementById("name");
const dimXInput = document.getElementById("xdim");
const dimYInput = document.getElementById("ydim");
const directionInput = document.getElementById("directions");
const submitButton = document.getElementById("create");

var draggedObject;
var objects = [];

const cells = [];
for(let i=0; i<56; i++){
    for(var j=0; j<30; j++){
        const n = 30*i+j;
        cells[n] = document.createElement('cell'+n.toString());
        cells[n].classList.add('grid-block');
        cells[n].setAttribute('ondragover', "allowDrop(event)");
        cells[n].setAttribute('ondrop', "drop(event)");
        const l = 5+20*i;
        const t = 5+20*j;
        cells[n].style.left = l.toString()+"px";
        cells[n].style.top = t.toString()+"px";
        gridDiv.appendChild(cells[n]);
    }
}

var indexOfArrow = 0;
function addArrow(i,j,d){
  arrow = document.createElement("i", { is: 'arrow'+indexOfArrow.toString()});
  arrow.classList.add('fa-solid');
  arrow.classList.add('fa-chevron-right');
  arrow.setAttribute('draggable', "false");
  /*arrow.setAttribute('ondragover', "allowDrop(event)");
  arrow.setAttribute('ondrop', "dropToArrow(event)");*/
  switch(d){
    case 'up': arrow.classList.add('fa-rotate-270');
    case 'left': 
      arrow.classList.add('fa-rotate-180');
      arrow.style.right = '0px';

    case 'down': arrow.classList.add('fa-rotate-90');
  }
  cells[i*30+j].appendChild(arrow);
  indexOfArrow+=1;
}

addArrow(0,4,'right');
addArrow(0,13,'right');
addArrow(0,16,'right');
addArrow(0,25,'right');
addArrow(55,4,'left');
addArrow(55,13,'left');
addArrow(55,16,'left');
addArrow(55,25,'left');

var objectNumber = 0;
function createObjects(n, w1, h1, t1, l1,name){
    objects = [];
    for(let i=0; i<n; i++){
        objects[i] = document.createElement('object-'+objectNumber.toString());
        objects[i].classList.add('object');
        objects[i].setAttribute('draggable', "true");
        objects[i].setAttribute('ondragstart', "drag(event)");
        objects[i].setAttribute('direction', "up");
        objects[i].setAttribute('arrowSide', "up");
        var t = t1;
        var w = w1*20;
        var h = h1*20;
        var l = l1+(w+10)*i;
        objects[i].style.left = l.toString()+"px";
        objects[i].style.top = t.toString()+"px";
        objects[i].style.width = w.toString()+"px";
        objects[i].style.height = h.toString()+"px";
        for(let j=0;j<w1;j++){
          arrow = document.createElement("i", { is: 'arrow'+indexOfArrow.toString()});
          arrow.classList.add('fa-solid');
          arrow.classList.add('fa-chevron-right');
          switch(objects[i].getAttribute('direction')){
            case 'up': arrow.classList.add('fa-rotate-270');
            case 'left': arrow.classList.add('fa-rotate-180');
            case 'down': arrow.classList.add('fa-rotate-90');
          }
          arrow.style.color = 'rgb(212, 236, 102)';
          arrow.style.top = '0px';
          arrow.style.left = (3+j*20).toString()+'px';
          objects[i].appendChild(arrow);
          indexOfArrow+=1;
        }
        objectsDiv.appendChild(objects[i]);
        const para = document.createElement("p");
        const textNode = document.createTextNode(name);
        para.appendChild(textNode);
        objects[i].appendChild(para);
        objectNumber+=1;
    }
}

function create(){
  console.log(nameInput);
  createObjects(1,dimXInput.value,dimYInput.value,50,1150,nameInput.value);
}

createObjects(16,3,3,820,10,"3X3");
createObjects(5,12,9,620,10,"12X9");
createObjects(8,4,4,90,1150,"4X4");
createObjects(4,4,8,190,1150,"4X8");
createObjects(1,3,6,190,1520,"3X6");
createObjects(1,4,6,190,1600,"4X6");
createObjects(1,9,9,370,1150,"9X9");
createObjects(1,5,6,370,1350,"5X6");
createObjects(1,5,7,370,1470,"5X7");
createObjects(1,15,6,370,1590,"15X6");
createObjects(1,9,6,190,1600,"9X6");

function allowDrop(ev) {
    ev.preventDefault();
  }
  
  function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.tagName);
    draggedObject = ev.target.tagName;
  }
  
  function drop(ev) {
    //console.log(document.elementFromPoint(ev.clientX, ev.clientY));
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    const obj = document.getElementsByTagName(data).item(0);
    obj.style.left = ev.target.className=='grid-block'?ev.target.style.left:ev.target.parentElement.style.left;
    obj.style.top = ev.target.className=='grid-block'?ev.target.style.top:ev.target.parentElement.style.top;
  }

  document.addEventListener('keydown', function(event) {
    if(event.key == 'r' || event.key == 'к') {
        const objectd = document.getElementsByTagName(draggedObject).item(0);
        var w = objectd.style.width;
        objectd.style.width=objectd.style.height;
        objectd.style.height=w;
        var direct = objectd.getAttribute('direction');
        switch(direct){
          case 'up':
            objectd.setAttribute('direction','right');
            break;
          case 'left':
            objectd.setAttribute('direction','up');
            break;
          case 'down':
            objectd.setAttribute('direction','left');
            break;
          case 'right': 
            objectd.setAttribute('direction','down');
            break;
        }
        for(var i=objectd.childNodes.length-1;i>=0;i--){
          if(objectd.childNodes[i].tagName!='P') objectd.removeChild(objectd.childNodes[i]);
        }
        var sideWithArrows = 'up';
        switch (objectd.getAttribute('arrowSide')){
          case 'up':
            switch(objectd.getAttribute('direction')){
              case 'up':
                sideWithArrows = 'up';
                break;
              case 'left':
                sideWithArrows = 'left';
                break;
              case 'down':
                sideWithArrows = 'down';
                break;
              case 'right': 
                sideWithArrows = 'right';
                break;
            }
            break;
          case 'right':
            switch(objectd.getAttribute('direction')){
              case 'up':
                sideWithArrows = 'right';
                break;
              case 'left':
                sideWithArrows = 'up';
                break;
              case 'down':
                sideWithArrows = 'left';
                break;
              case 'right': 
                sideWithArrows = 'down';
                break;
            }
            break;
          case 'down':
            switch(objectd.getAttribute('direction')){
              case 'up':
                sideWithArrows = 'down';
                break;
              case 'left':
                sideWithArrows = 'right';
                break;
              case 'down':
                sideWithArrows = 'up';
                break;
              case 'right': 
                sideWithArrows = 'left';
                break;
            }
            break;
          case 'left':
            switch(objectd.getAttribute('direction')){
              case 'up':
                sideWithArrows = 'left';
                break;
              case 'left':
                sideWithArrows = 'down';
                break;
              case 'down':
                sideWithArrows = 'right';
                break;
              case 'right': 
                sideWithArrows = 'up';
                break;
            }
            break;
        }
        for(let j=0;j<parseInt(((sideWithArrows=='up'||sideWithArrows=='down')?objectd.style.width.substr(0,objectd.style.width.length-2):
                                                                              objectd.style.height.substr(0,objectd.style.height.length-2)))/20;j++){
          arrow = document.createElement("i", { is: 'arrow'+indexOfArrow.toString()});
          arrow.classList.add('fa-solid');
          arrow.classList.add('fa-chevron-right');
          switch(sideWithArrows){
            case 'up':
              arrow.classList.add('fa-rotate-270');
              arrow.style.top = '0px';
              arrow.style.left = (3+j*20).toString()+'px';
              break;
            case 'left':
              arrow.classList.add('fa-rotate-180');
              arrow.style.top = (2+j*20).toString()+'px';
              arrow.style.left = '3px';
              break;
            case 'down':
              arrow.classList.add('fa-rotate-90');
              arrow.style.top = (((objectd.style.height.substr(0,objectd.style.height.length-2))/20-0.7)*20).toString()+'px';
              arrow.style.left = (3+j*20).toString()+'px';
              break;
            case 'right':
              arrow.style.top = (2+j*20).toString()+'px';
              arrow.style.left = (((objectd.style.width.substr(0,objectd.style.width.length-2))/20-0.7)*20).toString()+'px';
              break;
          }
          arrow.style.color = 'rgb(212, 236, 102)';
          objectd.appendChild(arrow);
          indexOfArrow+=1;
        }
    }
});