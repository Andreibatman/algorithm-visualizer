const formId = document.getElementById("form-id");
const columnsCount = document.getElementById("column-count");
const rowsCount = document.getElementById("row-count");
const grid = document.getElementById("grid");
const generateGrid = document.getElementById("grid-btn");

const gridGenerator = (e) =>{
    event.preventDefault();
    const rows = Number(rowsCount.value);
    const columns = Number(columnsCount.value);
    console.log(rowsCount,columns);
    grid.innerHTML = ``;
    for(let i = 1; i <= rows; i++)
        for(let j = 1; j <= columns; j++)
        {
            const gridItem = `<div class="grid-item" 
            id="grid-${i}-${j}"
            style="grid-row:${i};
            grid-column:${j};"
            ></div>`
            grid.innerHTML+=gridItem;
        }
}


formId.addEventListener("submit",(event) => gridGenerator());


