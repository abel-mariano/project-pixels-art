// -----Palette containing four distinct colors-----

const colors = document.querySelectorAll('.color');
const newColor = document.querySelectorAll('.color-Save');

const randomColorPalette = () => {
  const savedColors = [];
  for (let index = 0; index < newColor.length; index += 1) {
    const red = Math.floor(Math.random() * 255 + 1);
    const green = Math.floor(Math.random() * 255 + 1);
    const blue = Math.floor(Math.random() * 255 + 1);
    const colorsRandom = `rgb(${red}, ${green}, ${blue})`;
    newColor[index].style.backgroundColor = colorsRandom;
    savedColors.push(colorsRandom);
  }
  localStorage.setItem('colorPalette', JSON.stringify(savedColors));
};

// -----Button to generate random colors for the color palette-----

const randomColorButton = () => {
  for (let index = 1; index < colors.length; index += 1) {
    randomColorPalette();
  }
};

const randomColorBtn = document.querySelector('#button-random-color');
randomColorBtn.addEventListener('click', randomColorButton);

// -----Colors saved in palette-----

function loadColor() {
  const colorSaved = JSON.parse(localStorage.getItem('colorPalette')); // Variável que chama as cores salvas da função randomColorPalette.
  for (let index = 0; index < colorSaved.length; index += 1) {
    newColor[index].style.background = colorSaved[index];
  }
}

function callsSavedColors() {
  if (JSON.parse(localStorage.getItem('colorPalette')) !== null) {
    loadColor();
  } else {
    randomColorPalette();
  }
}
callsSavedColors();

// -----Frame containing 25 pixels-----

const generatingPixelFrame = () => {
  const containerPixelFrame = document.getElementById('pixel-board');
  for (let index = 1; index <= 25; index += 1) {
    const newDivPixel = document.createElement('div');
    newDivPixel.classList.add('pixel');
    containerPixelFrame.appendChild(newDivPixel);
  }
};
generatingPixelFrame();

// -----Function to select a color from the color palette-----

const removeColorSelect = () => {
  for (let index = 0; index < colors.length; index += 1) {
    colors[index].classList.remove('selected');
  }
};

const addColorSelect = (color) => {
  for (let index = 0; index < colors.length; index += 1) {
    color.target.classList.add('selected');
  }
};

for (let index = 0; index < colors.length; index += 1) {
  colors[index].addEventListener('click', removeColorSelect);
  colors[index].addEventListener('click', addColorSelect);
}

// -----Functions that allow you to fill a pixel on the frame with the color selected from the color palette, save and retrieve your current drawing from localStorage-----

const saveColorBoard = () => {
  const classPixel = document.querySelectorAll('.pixel');
  const arrayPixelBoard = [];
  for (let index = 0; index < classPixel.length; index += 1) {
    arrayPixelBoard.push(classPixel[index].style.backgroundColor);
  }
  localStorage.setItem('pixelBoard', JSON.stringify(arrayPixelBoard));
};

function loadColorBoard() {
  const classPixels = document.querySelectorAll('.pixel');
  const ColorsPixelBoard = JSON.parse(localStorage.getItem('pixelBoard'));
  for (let index = 0; index < classPixels.length; index += 1) {
    classPixels[index].style.backgroundColor = ColorsPixelBoard[index];
  }
}

if (JSON.parse(localStorage.getItem('pixelBoard')) !== null) {
  loadColorBoard();
}

const paintThePixel = (pixel) => {
  const pixelBoard = pixel;
  if (pixel.target.classList.contains('pixel')) {
    const getSelectedClass = document.querySelector('.selected');
    const getBackgroundColor = window
      .getComputedStyle(getSelectedClass) // getComputedStyle - Retorna um objeto contendo os valores do Css do elemento.
      .getPropertyValue('background-color'); // getPropertyValue - Retorna uma string contendo o valor de uma propriedade CSS especificada.
    pixelBoard.target.style.backgroundColor = getBackgroundColor;
  }
  saveColorBoard();
};
document.addEventListener('click', paintThePixel);

// -----Button that returns the color of the frame to the initial color-----

const clearPalette = () => {
  const classPixel = document.querySelectorAll('.pixel');
  for (let index = 0; index < classPixel.length; index += 1) {
    classPixel[index].style.backgroundColor = 'white';
  }
};
const clearBoard = document.querySelector('#clear-board');
clearBoard.addEventListener('click', clearPalette);

// -----Input that allows the user to fill in a new size for the pixel frame-----

const createButtonVqv = () => {
  const inputButton = document.querySelector('#input-button');
  const button = document.createElement('button');
  button.id = 'generate-board';
  button.innerText = 'VQV';
  inputButton.appendChild(button);
};
createButtonVqv();

const pixelBoard = document.getElementById('pixel-board');

const adjustBoardSize = () => {
  const input = document.getElementById('board-size');
  let inputValues = input.value;
  if (inputValues < 5) {
    inputValues = 5;
  } else if (inputValues > 50) {
    inputValues = 50;
  } else {
    inputValues = input.value;
  }
  pixelBoard.style.width = `${inputValues * 44}px`;
  pixelBoard.style.height = `${inputValues * 44}px`;
  const newInputValues = inputValues ** 2;
  for (let index = 0; index < newInputValues; index += 1) {
    const newDiv = document.createElement('div');
    newDiv.classList.add('pixel');
    pixelBoard.appendChild(newDiv);
  }
  localStorage.setItem('boardSize', JSON.stringify(inputValues));
};

const createBoardSize = () => {
  const BoardPixel = document.querySelector('#pixel-board');
  const input = document.querySelector('#board-size');
  BoardPixel.innerHTML = '';
  if (input.value === '') {
    alert('Board inválido!');
  }
  adjustBoardSize();
  localStorage.setItem('boardSize', JSON.stringify(input.value));
};

const clickButtonVqv = () => {
  const buttonVqv = document.querySelector('#generate-board');
  buttonVqv.addEventListener('click', createBoardSize);
};
clickButtonVqv();

// -----Function to keep the new board size when reloading the page.-----
