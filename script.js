function createCanvas(sideCount) {
  if (sideCount <= 0) sideCount = 1;
  for (let i = 0; i < sideCount**2; ++i) {  
    const pixel = document.createElement('div');
    pixel.classList.add('pixel');
    pixel.style.height = `${400/sideCount}px`;
    pixel.style.width = `${400/sideCount}px`;
    canvas.appendChild(pixel);
  }
}

function setDraw(color) {
  const pixels = document.querySelectorAll('.pixel');
  pixels.forEach(px => {
    px.addEventListener('click', (e) => {
      e.target.style.backgroundColor = color;
    });
  });
}

const canvas = document.querySelector('.canvas');

createCanvas(10);
setDraw('red');