// INITIALIZE CHECKERBOARD
let checkerboard = document.getElementById("checkerboard");
let rows = 20;
let cols = 20;
let threshold = 1; // How many times we want to switch before it stops switching
let cells = []; // single checkerboard cell
let count = []; // How many times its been interacted with 

console.log("working")

// BUILDING THE GRID - why did this take so long to create...
for (let r = 0; r < rows; r++) {
	cells[r] = []
	count[r] = []

	for (let c = 0; c < cols; c++) {
		count[r][c] = 0; // after looping through everything, initialize count at 0 for now 

		// create the single cell
		const cell = document.createElement("div")
		cell.classList.add("cell") //https://developer.mozilla.org/en-US/docs/Web/API/Element/classList

		// add in black or white coloring to cells
		const isBlack = (r + c) % 2 === 0; //if row and column are even...
		cell.style.backgroundColor = isBlack ? "black" : "white"; 
		// then background color is black, if not then white - love ternary statements 

		// Store that reference to the cell
		cells[r][c] = cell;

		// console.log("cell", cells[r][c])

		// add this to the checkerboard
		checkerboard.appendChild(cell);
	}
}


// function toggleCell(row, cell) {
// 	let cell = cells[row][col];
// 	let currentColor = cell.style.backgroundColor;

// 	// swap colors

// 	// increase toggleCount

// 	// if reach toggle count, become invisible
// }