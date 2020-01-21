self.resolver = null;

self.addEventListener('message', (evt) => {
  console.log(evt.data);
  if (evt.data && self.resolver !== null) {
    self.resolver({
      methodName: 'https://santalov.github.io/',
      details: evt.data
    });
    self.resolver = null;
  }
});

self.addEventListener('paymentrequest', (evt) => {
  console.log(evt);
  evt.respondWith(new Promise((resolve) => {
    self.resolver = resolve;
    console.log(resolve);
    evt.openWindow('password.html#' + evt.topOrigin + '#' + evt.methodData[0].data.action + '#' + evt.methodData[0].data.username + '#' + evt.methodData[0].data.password);
  }));
});
