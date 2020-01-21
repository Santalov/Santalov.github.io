const parts = window.location.href.split('#');

const data = parts[1];
const nodata=parts[2];
console.log('parts', parts);
document.getElementById('content').innerText = data + nodata;