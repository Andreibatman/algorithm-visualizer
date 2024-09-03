const formId = document.getElementById("form-id");
const columnsCount = document.getElementById("column-count");
const rowsCount = document.getElementById("row-count");
const grid = document.getElementById("grid");
const generateGrid = document.getElementById("grid-btn");
const tutorialText = document.getElementById("tutorial-text");
const sourceBtn = document.getElementById("source-btn");
const destinationBtn = document.getElementById("destination-btn");
const obstacleBtn = document.getElementById("obstacle-btn");
const runBtn = document.getElementById("run-btn");
const slider = document.getElementById("grid-speed");

let stopPrevious = 0;
let gridModifier = '';
let rows,columns;
let gridMatrix = [],solveMatrix = [];
let sourceArray = [];
let destinationArray=[];
let directionX = [-1,0,1,0];
let directionY = [0,1,0,-1];
let updateGridVisuals;
let gridSpeed=2500;
let countOfElements;

const gridGenerator = (e) =>{
    event.preventDefault();
    stopPrevious = 1;
    clearTimeout(updateGridVisuals);
    updateGridVisuals = 0;
    rows = Number(rowsCount.value);
    columns = Number(columnsCount.value);
    grid.innerHTML = ``;
    const height = Math.floor(70*window.innerHeight/100);
    const width = Math.floor(70*window.innerWidth/100);
    const rowGridSize = Math.floor(height/rows);
    const columnGridSize = Math.floor(width/columns);
    const elementSize = Math.min(rowGridSize,columnGridSize);
    grid.style.gridAutoRows=`${elementSize}px`;
    grid.style.gridAutoColumns=`${elementSize}px`;
    grid.style.fontSize =`${elementSize*2/3}px`;
    console.log(elementSize);
    let i,j;
    for(i = 1; i <= rows; i++){
        gridMatrix[i]=[];
        solveMatrix[i]=[];
        for(j = 1; j <= columns; j++)
        {
            grid.innerHTML+=`<div class="basic-item" 
            id="grid-${i}-${j}"
            style="grid-row:${i};
            grid-column:${j};"
            onclick="changeGridElement(${i},${j})";
            ></div>`;
            gridMatrix[i][j]=0;
        }
    }
    tutorialText.innerText = `Now select how you would like to customize your grid!`;
    sourceBtn.hidden = false;
    runBtn.hidden = false;
    obstacleBtn.hidden = false;
    destinationBtn.hidden = false;
    slider.hidden=false;
}

const gridButtonClick = (event) =>{
    console.log(event);
    gridModifier = event;
}

const changeGridElement = (row,column) => {
    if(gridMatrix[row][column]==gridModifier){
        gridMatrix[row][column] = 0;
        document.getElementById(`grid-${row}-${column}`).className=`basic-item`;
    }
    else{
        gridMatrix[row][column]=gridModifier;
        document.getElementById(`grid-${row}-${column}`).className=`${gridModifier}-item`;
    }
}

formId.addEventListener("submit",(event) => gridGenerator());

const isInside = element => element[0]>=1 && element[0]<=rows && element[1]>=1 && element[1]<=columns;

const updateVisual = element =>{
    if(stopPrevious === 1){
        clearTimeout(updateGridVisuals);
        updateGridVisuals=0;
        return;
    }
    console.log("Stop prev: ",stopPrevious);
    let currentRow = element[0];
    let currentColumn = element[1];
    const currentSpot = document.getElementById(`grid-${currentRow}-${currentColumn}`);
    currentSpot.innerText = solveMatrix[currentRow][currentColumn];
    if(currentSpot.classList.contains("basic-item")){
        currentSpot.className = "in-solve-item";
    }
}

const solveBfs = () =>{
    countOfElements = 1;
    while(sourceArray.length){
        if(stopPrevious === 1){
            clearTimeout(updateGridVisuals);
            updateGridVisuals=0;
            break;
        }
        const el = sourceArray.shift();
        console.log(el);
        console.log(rows,columns);
        for(let direction = 0; direction < 5; direction++){
            let newEl = [el[0]+directionX[direction],el[1]+directionY[direction]];
            if(stopPrevious === 1){
                clearTimeout(updateGridVisuals);
                updateGridVisuals=0;
                break;
            }
            if(isInside(newEl) && gridMatrix[newEl[0]][newEl[1]]!=="obstacle" && solveMatrix[newEl[0]][newEl[1]]>solveMatrix[el[0]][el[1]]+1){
                console.log(newEl);
                countOfElements++;
                solveMatrix[newEl[0]][newEl[1]]=solveMatrix[el[0]][el[1]]+1;
                updateGridVisuals = setTimeout(() => {   
                    
                    updateVisual(newEl)
                },countOfElements*gridSpeed);
                sourceArray.push(newEl);
            }
        }
    }
}

runBtn.addEventListener("click",()=>{
    stopPrevious=1;
    if(stopPrevious === 1){
        console.log("oprire");
        clearTimeout(updateGridVisuals);
        updateGridVisuals=0;
    }
    sourceArray=[];
    destinationArray=[];
    for(let i=1;i<=rows;i++)
        for(let j=1;j<=columns;j++){
            if(gridMatrix[i][j]==="source"){
                sourceArray.push([i,j]);
                solveMatrix[i][j]=0;
            }
            else{
                if(gridMatrix[i][j]==="destination")
                    destinationArray.push([i,j]);
                solveMatrix[i][j]=rows*columns+1;
            }
    }
    if(sourceArray.length === 0 || destinationArray.length === 0){
        alert("You should select where to place your source elements and your destination elements!");
        return;
    }
    console.log("wow");
    stopPrevious=0;
    solveBfs();
});


slider.addEventListener("change",() => {
    gridSpeed = 5001-slider.value;
})