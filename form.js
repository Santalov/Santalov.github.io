const parts = window.location.href.split('#');

const data = parts[1];
console.log('parts', parts);
document.getElementById('content').innerText = data + nodata;