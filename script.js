function createCanvas(sideCount) {
  if (sideCount <= 0) sideCount = 1;
  for (let i = 0; i < sideCount**2; ++i) {  
    const pixel = document.createElement('div');
    pixel.classList.add('pixel');
    pixel.style.height = `${400/sideCount}px`;
    pixel.style.width = `${400/sideCount}px`;
    canvas.appendChild(pixel);
  }
  return document.querySelectorAll('.pixel');
}

function setDraw(pixels) {
  let color = 'black';
  let isDrawing = false;
  const draw = (e) => {
    e.target.style.backgroundColor = color;
  };

  const mouseDown = (e) => {
    isDrawing = true;
    if(isDrawing) draw(e);
  }
  const mouseUp = () => {
    isDrawing = false;
  }
  const mouseMoving = (e) => {
    if(isDrawing) draw(e);
  }

  pixels.forEach(px => {
    px.addEventListener('mousedown', mouseDown);
    px.addEventListener('mouseup', mouseUp);
    px.addEventListener('mousemove', mouseMoving);
  });

  const setColor = (newColor) => {
    color = newColor;
  };

  return {
    setColor: setColor
  };
}

function clearCanvas(pixels) {
  pixels.forEach(px => {
    px.style.backgroundColor = 'transparent';
  })
}

const canvas = document.querySelector('.canvas');
const pixels = createCanvas(40);
const clearButton = document.querySelector('.clear-button');
const colorPicker = document.querySelector('.color-picker');


clearButton.addEventListener('click', () => {clearCanvas(pixels)});
const draw = setDraw(pixels);

colorPicker.addEventListener('change', (e) => {
  draw.setColor(e.target.value);
});