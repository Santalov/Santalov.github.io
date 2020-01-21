const parts = window.location.href.split('#');

const method = parts[1];
const data = parts[2];
console.log('parts', parts);
document.getElementById('content').innerText = data + nodata;
const details = {
    status: 'success'
};

if (method === 'get') {
    details.data = window.localStorage.getItem('#data');
} else if (method === 'set') {
    window.localStorage.setItem('#data', data);
} else {
    console.error('insuffisient method');
}

navigator.serviceWorker.controller.postMessage(details);
