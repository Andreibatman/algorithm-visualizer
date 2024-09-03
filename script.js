const formId = document.getElementById("form-id");
const columnsCount = document.getElementById("column-count");
const rowsCount = document.getElementById("row-count");
const grid = document.getElementById("grid");
const generateGrid = document.getElementById("grid-btn");

const gridGenerator = (e) =>{
    event.preventDefault();
    const rows = Number(rowsCount.value);
    const columns = Number(columnsCount.value);
    grid.innerHTML = ``;
    const height = Math.floor(70*window.innerHeight/100);
    const width = Math.floor(90*window.innerWidth/100);
    const rowGridSize = Math.floor(height/rows);
    const columnGridSize = Math.floor(width/columns);
    const elementSize = Math.min(rowGridSize,columnGridSize);
    grid.style.gridAutoRows=`${elementSize}px`;
    grid.style.gridAutoColumns=`${elementSize}px`;
    console.log(elementSize);
    let i,j;
    for(i = 1; i <= rows; i++)
        for(j = 1; j <= columns; j++)
        {
            grid.innerHTML+=`<div class="grid-item" 
            id="grid-${i}-${j}"
            style="grid-row:${i};
            grid-column:${j};"
            ></div>`;
        }
}


formId.addEventListener("submit",(event) => gridGenerator());


