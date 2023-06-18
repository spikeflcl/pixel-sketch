// Creating the canvas by appending divs

function createCanvas(sideCount) {
  if (sideCount <= 0) sideCount = 1;

  canvas.textContent = '';
  for (let i = 0; i < sideCount**2; ++i) {  
    const pixel = document.createElement('div');
    pixel.classList.add('pixel'); // adding 'pixel' class to each element
    pixel.style.height = `${400/sideCount}px`; // ensuring the grid covers entire canvas evenly
    pixel.style.width = `${400/sideCount}px`;
    canvas.appendChild(pixel);
  }
  return document.querySelectorAll('.pixel'); // returning created pixels
}

// setting the drawing properties

function setDraw(pixels) {
  let color = 'black';
  let isDrawing = false;
  let eraserMode = false;
  const draw = (e) => {
    if (eraserMode) {
      e.target.style.backgroundColor = ''; // if in eraser mode, only erase the colors, no matter which one is picked
    } else {
      e.target.style.backgroundColor = color;
    }
  };

  const brushToggle = document.querySelector('.brush')
  const eraserToggle = document.querySelector('.eraser')

  brushToggle.addEventListener('change', (e) => {
    if (e.target.checked) eraserMode = false;
  });

  eraserToggle.addEventListener('change', (e) => {
    if (e.target.checked) eraserMode = true;
  });

  // functions for triggering the drawing
  const mouseDown = () => {
    isDrawing = true;
  }
  const mouseUp = () => {
    isDrawing = false;
  }
  const mouseMoving = (e) => {
    if(isDrawing) draw(e);
  }

  // making sure that you can draw even if you click and drag from outside the canvas
  window.addEventListener('mousedown', mouseDown, true);
  window.addEventListener('mouseup', mouseUp);

  pixels.forEach(px => {
    px.addEventListener('mousedown', (e) => {
      if (isDrawing) draw(e);
    });
    px.addEventListener('mousemove', mouseMoving);
  });

  // dynamically change the drawing color
  const setColor = (newColor) => {
    color = newColor;
  };

  return {
    setColor: setColor
  };
}

function clearCanvas(pixels) {
  pixels.forEach(px => {
    px.style.backgroundColor = '';
  })
}

const canvas = document.querySelector('.canvas');
const clearButton = document.querySelector('.clear-button');
const colorPicker = document.querySelector('.color-picker');
const brush = document.querySelector('.brush');
const eraser = document.querySelector('.eraser');
const gridToggle = document.querySelector('.grid-toggle');
const slider = document.querySelector('.slider');


let pixels = createCanvas(10);
const drawing = setDraw(pixels);

clearButton.addEventListener('click', () => {clearCanvas(pixels)});

colorPicker.addEventListener('change', (e) => {
  drawing.setColor(e.target.value);
});

gridToggle.addEventListener('click', (e) => {
  if (e.target.checked) {
    pixels.forEach(px => {
      px.style.borderWidth = '1px';
    })
  } else {
    pixels.forEach(px => {
      px.style.borderWidth = '0px';
    })
  }
})

slider.addEventListener('change', (e) => {
  pixels = createCanvas(e.target.value);
});