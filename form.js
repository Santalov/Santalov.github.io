const parts = window.location.href.split('#');

const data = parts[1];

document.getElementById('content').innerText = data;