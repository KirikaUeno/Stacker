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
function createObjects(n, w1, h1, t1, l1){
    objects = [];
    for(let i=0; i<n; i++){
        objects[i] = document.createElement('object-'+w1.toString()+'-'+h1.toString()+'_'+i.toString());
        objects[i].classList.add('object');
        objects[i].setAttribute('draggable', "true");
        objects[i].setAttribute('ondragstart', "drag(event)");
        var t = t1;
        var w = w1*20;
        var h = h1*20;
        var l = l1+(w+10)*i;
        objects[i].style.left = l.toString()+"px";
        objects[i].style.top = t.toString()+"px";
        objects[i].style.width = w.toString()+"px";
        objects[i].style.height = h.toString()+"px";
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
    if(event.key == 'r') {
        const objectd = document.getElementsByTagName(draggedObject).item(0);
        var w = objectd.style.width;
        objectd.style.width=objectd.style.height;
        objectd.style.height=w;
    }
});