const gridDiv = document.getElementById("grid");
const objectsDiv = document.getElementById("objects");

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
function addArrow(i,j){
  arrow = document.createElement("i", { is: 'arrow'+indexOfArrow.toString()});
  arrow.classList.add('fa-solid');
  arrow.classList.add('fa-chevron-right');
  cells[i*30+j].appendChild(arrow);
  indexOfArrow+=1;
}

addArrow(0,4);
addArrow(0,13);
addArrow(0,16);
addArrow(0,25);

function createObjects(n, w1, h1, t1, l1){
    objects = [];
    for(let i=0; i<n; i++){
        objects[i] = document.createElement('object-'+w1.toString()+'-'+h1.toString()+'_'+i.toString());
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
    }
}

createObjects(10,3,3,10,1150);
createObjects(5,12,9,620,10);
createObjects(8,4,4,90,1150);
createObjects(4,4,8,190,1150);
createObjects(1,3,6,190,1520);
createObjects(1,4,6,190,1600);
createObjects(1,9,9,370,1150);
createObjects(1,5,6,370,1350);
createObjects(1,5,7,370,1470);
createObjects(1,15,6,370,1590);
createObjects(1,9,6,190,1600);

function allowDrop(ev) {
    ev.preventDefault();
  }
  
  function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.tagName);
    draggedObject = ev.target.tagName;
  }
  
  function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    const cell = document.getElementsByTagName(data).item(0);
    cell.style.left = ev.target.style.left;
    cell.style.top = ev.target.style.top;
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
        while (objectd.firstChild) {
          objectd.removeChild(objectd.firstChild);
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
              arrow.style.top = (((objectd.style.height.substr(0,objectd.style.height.length-2))/20-1)*20).toString()+'px';
              arrow.style.left = (3+j*20).toString()+'px';
              break;
            case 'right':
              arrow.style.top = (2+j*20).toString()+'px';
              arrow.style.left = (((objectd.style.width.substr(0,objectd.style.width.length-2))/20-1)*20).toString()+'px';
              break;
          }
          arrow.style.color = 'rgb(212, 236, 102)';
          objectd.appendChild(arrow);
          indexOfArrow+=1;
        }
    }
});