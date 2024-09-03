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

let gridModifier = '';
let rows,columns;
let gridMatrix = [],solveMatrix = [];
let sourceArray = [];
let destinationArray=[];
let directionX = [-1,0,1,0];
let directionY = [0,1,0,-1];

const gridGenerator = (e) =>{
    event.preventDefault();
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
    let currentRow = element[0];
    let currentColumn = element[1];
    const currentSpot = document.getElementById(`grid-${currentRow}-${currentColumn}`);
    currentSpot.innerText = solveMatrix[currentRow][currentColumn];
    if(currentSpot.classList.contains("basic-item")){
        currentSpot.className = "in-solve-item";
    }
}

const solveBfs = () =>{
    while(sourceArray.length){
        const el = sourceArray.shift();
        console.log(el);
        console.log(rows,columns);
        for(let direction = 0; direction < 5; direction++){
            let newEl = [el[0]+directionX[direction],el[1]+directionY[direction]];
            
            if(isInside(newEl) && solveMatrix[newEl[0]][newEl[1]]>solveMatrix[el[0]][el[1]]+1){
                console.log(newEl);
                solveMatrix[newEl[0]][newEl[1]]=solveMatrix[el[0]][el[1]]+1;
                setTimeout(() => {updateVisual(newEl)},solveMatrix[newEl[0]][newEl[1]]*500);
                sourceArray.push(newEl);
            }
        }
    }
}

runBtn.addEventListener("click",()=>{
    sourceArray=[];
    destinationArray=[];
    for(let i=1;i<=rows;i++)
        for(let j=1;j<=columns;j++){
            if(gridMatrix[i][j]==="source"){
                sourceArray.push([i,j]);
                solveMatrix[i][j]=1;
            }
            else{
                if(gridMatrix[i][j]==="destination")
                    destinationArray.push([i,j]);
                solveMatrix[i][j]=rows*columns+1;
            }
    }
    console.log("wow");
    solveBfs();
});