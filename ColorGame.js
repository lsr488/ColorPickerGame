var numSquares = 6;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var msgDisplay = document.querySelector("#msg");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");
var headerColor = "steelblue";

init();

resetButton.addEventListener("click", function() {
	reset();
});

function init() {
	setupModeButtons();
	setupSquares();
	reset();
};

function setupModeButtons() {
	//mode button event listeners
	for(var i = 0; i < modeButtons.length; i++) {
		modeButtons[i].addEventListener("click", function() {
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			this.classList.add("selected");
			//how many squares to show
			if(this.textContent === "Easy") {
				numSquares = 3;
			} else {
				numSquares = 6;
			}
				//turnary operator; same as above!
				// this.textContent === "Easy" ? numSquares = 3: numSquares = 6;
			reset(numSquares);
		});
	};
};

function setupSquares() {
	for(var i = 0; i < squares.length; i++) {
		//add click listeners to squares
		squares[i].addEventListener("click", function() {
			//grab color of picked square
			var clickedColor = this.style.backgroundColor
			//compare grabbed color to pickedColor
			if(clickedColor === pickedColor) {
				//show win conditions
				changeColors(clickedColor);
				h1.style.backgroundColor = clickedColor;
				msgDisplay.textContent = "Correct!";
				resetButton.textContent = "Play again?";
			} else {
				//remove wrong color
				this.style.backgroundColor = "#232323";
				msgDisplay.textContent = "Try again!";
			};
		});
	};
};

function reset() {
	//generate new colors
	colors = generateRandomColors(numSquares);
	//pick new winning color from array
	pickedColor = pickColor();
	//change color display to match picked color
	colorDisplay.textContent = pickedColor;
	resetButton.textContent = "New Colors";
	//change color of squares
	for(var i = 0; i < squares.length; i++) {
		if(colors[i]) {
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colors[i];
		} else {
			squares[i].style.display = "none";
		}
	};
	//change h1 back to default
	h1.style.backgroundColor = headerColor;
	msgDisplay.textContent = "";
};

function changeColors(color) {
	//loop through all squares
	for(var i = 0; i < squares.length; i++) {
		//change each color to match pickedColor
		squares[i].style.backgroundColor = color;
	};
};

function pickColor() {
	//pick random number to use as index to access colors array
	var random = Math.floor(Math.random() * colors.length)
	//access number from color array
	return colors[random];
};

function generateRandomColors(number) {
	//make array
	var arr = [];
	//repeat number times
	for(var i = 0; i < number; i++) {
		//get random color and push into array
		arr.push(randomColor());
	};
	//return that array
	return arr;
};

function randomColor() {
	//pick a red 0-255
	var r = Math.floor(Math.random() * 256);
	//pick green 0-255
	var g = Math.floor(Math.random() * 256);
	//pick blue 0-255
	var b = Math.floor(Math.random() * 256);
	//put everything into a string
	"rgb(r, g, b)"
	return "rgb(" + r + ", " + g + ", " + b + ")";
};
