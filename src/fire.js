let fireData = [];
const width = 30;
const height = 40;
const fireColorsPalette = [{"r":7,"g":7,"b":7},{"r":31,"g":7,"b":7},{"r":47,"g":15,"b":7},{"r":71,"g":15,"b":7},{"r":87,"g":23,"b":7},{"r":103,"g":31,"b":7},{"r":119,"g":31,"b":7},{"r":143,"g":39,"b":7},{"r":159,"g":47,"b":7},{"r":175,"g":63,"b":7},{"r":191,"g":71,"b":7},{"r":199,"g":71,"b":7},{"r":223,"g":79,"b":7},{"r":223,"g":87,"b":7},{"r":223,"g":87,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":103,"b":15},{"r":207,"g":111,"b":15},{"r":207,"g":119,"b":15},{"r":207,"g":127,"b":15},{"r":207,"g":135,"b":23},{"r":199,"g":135,"b":23},{"r":199,"g":143,"b":23},{"r":199,"g":151,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":167,"b":39},{"r":191,"g":167,"b":39},{"r":191,"g":175,"b":47},{"r":183,"g":175,"b":47},{"r":183,"g":183,"b":47},{"r":183,"g":183,"b":55},{"r":207,"g":207,"b":111},{"r":223,"g":223,"b":159},{"r":239,"g":239,"b":199},{"r":255,"g":255,"b":255}]
let intensity = 3;
let wind = 0;
const tableFire = document.getElementById('tableFire');
const tableFireWidth = height * 5;

document.onmousemove = function(event){    
    const x = event.clientX;
    if(x < tableFire.offsetLeft){
        wind = 1;
    }
    else if(x > tableFire.offsetLeft + tableFireWidth){
        wind = -1;
    }
    else wind = 0;
}


function start(){
    createFireDataset();
    render();
    setInterval(calculateIntensity, 50);
}

function calculateIntensity(){
    for(let col = 0; col < width; col++){
        for(let row = 0; row < height-1; row++){
            const index = col + width * row;
            updateIntensity(index);
        }
    }
    render();
}

function updateIntensity(index){
    const bellowIndex = index + width;
    const decay = Math.floor(Math.random() * intensity);
    const bellowPixel = fireData[bellowIndex];
    const newPixel = bellowPixel - decay;
    fireData[index + ( (decay) * wind )] = newPixel > 0 ? newPixel : 0;
}

function createFireDataset(){
    const totalPixels = width * height;
    for(let i = 0; i < totalPixels; i++){
        fireData[i] = 0;
    }
    setFireSource();
}

function setFireSource(){
    for(let col = 0; col < width; col++){
        const index = col + (width * height) - width;
        fireData[index] = 36;
    }
}

function render(){
    const debug = false;
    const table = document.createElement('table');
    for(let row = 0; row < height; row++){
        const tr = document.createElement('tr');
        for(let col = 0; col < width; col++){
            const index = col + width * row;
            const pixel = fireData[index];
            const td = document.createElement('td');
            if(debug) td.innerText = pixel;
            else{
                const color = fireColorsPalette[pixel];
                const colorString = `${color.r}, ${color.g}, ${color.b}`;
                td.style.backgroundColor = `rgb(${colorString})`;
            }
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    const div = document.getElementById('tableFire');
    document.getElementsByTagName('table')[0].remove();
    div.appendChild(table);
}

start();