// INITIALIZE CHECKERBOARD
let checkerboard = document.getElementById("checkerboard");
let rows = 20;
let cols = 20;
let threshold = 1; // How many times we want to switch before it stops switching
let cells = []; // single checkerboard cell
let count = []; // How many times its been interacted with 

console.log("initilize checkerboard working")

// BUILDING THE GRID
for (let r = 0; r < rows; r++) {
	cells[r] = []
	count[r] = []

	for (let c = 0; c < cols; c++) {
		count[r][c] = 0; // after looping through everything, initialize count at 0 for now 

		// create the single cell
		let cell = document.createElement("div")
		cell.classList.add("cell") //https://developer.mozilla.org/en-US/docs/Web/API/Element/classList

		// add in black or white coloring to cells
		let isBlack = (r + c) % 2 === 0; //if row and column are even...
		cell.style.backgroundColor = isBlack ? "black" : "white"; 
		// then background color is black, if not then white - love ternary statements 

		// store that reference to the cell
		cells[r][c] = cell;

		// desktop
		cell.addEventListener("mouseover", () => {
		  toggleCell(r, c);
		  console.log("mouseover")
		});

		// mobile
		cell.addEventListener("dragstart", (event) => {
		event.preventDefault();
		  toggleCell(r, c);
		  console.log("drag")
		});


		// add this to the checkerboard
		checkerboard.appendChild(cell);
	}
	console.log("checkerboard function worked")
}


function toggleCell(row, col) {
	let cell = cells[row][col]; //create cell
	let currentColor = cell.style.backgroundColor; //create current color 

	if (currentColor === "black") {
	  cell.style.backgroundColor = "white";
	} else if (currentColor === "white") {
	  cell.style.backgroundColor = "black";
	}
  
	count[row][col]++; // increase toggle count by 1;
  
	// if count is more than the threshold set earlier, become transparent
	if (count[row][col] >= threshold) {
	  cell.style.backgroundColor = "transparent";
	}
	// console.log("togglecell worked")
  }
