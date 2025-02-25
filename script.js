// INITIALIZE CHECKERBOARD
let checkerboard = document.getElementById("checkerboard");
let rows = 20;
let cols = 20;
let threshold = 2; // How many times we want to switch before it stops switching
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
		cell.style.backgroundColor = isBlack ? "black" : "darkgrey";
		// then background color is black, if not then white - love ternary statements 

		// store that reference to the cell
		cells[r][c] = cell;

		// Desktop
		cell.addEventListener("mouseover", () => {
			toggleCell(r, c);

			//   toggle cell to the right
			if (c < cols - 1) {
				toggleCell(r, c + 1);
			}

			//   toggle cell to the left 
			if (c > 0) {
				toggleCell(r, c - 1);
			}

		});

		// Mobile
		cell.addEventListener("touchstart", (event) => {
			event.preventDefault();
			if (c < cols - 1) {
				toggleCell(r, c + 1);
			}
			if (c > 0) {
				toggleCell(r, c - 1);
			}
		});

		cell.addEventListener("touchmove", (event) => {
			event.preventDefault();
			if (c < cols - 1) {
				toggleCell(r, c + 1);
			}
			if (c > 0) {
				toggleCell(r, c - 1);
			}
		});

		cell.addEventListener("touchend", (event) => {
			event.preventDefault();
			if (c < cols - 1) {
				toggleCell(r, c + 1);
			}
			if (c > 0) {
				toggleCell(r, c - 1);
			}
		});

		// add this to the checkerboard
		checkerboard.appendChild(cell);
	}
	console.log("checkerboard function worked")
}

// https://stackoverflow.com/questions/1484506/random-color-generator/1484514#1484514
function getRandomColor() {
	return 'hsla(' + (Math.random() * 360) + ', 50%, 50%, 1)';
}


function toggleCell(row, col) {
	let cell = cells[row][col]; //create cell with the specific cell

	count[row][col]++; // increment count

	if (count[row][col] < threshold) {
		cell.style.backgroundColor = getRandomColor();
	} else {
		cell.style.backgroundColor = "transparent";
	}
}