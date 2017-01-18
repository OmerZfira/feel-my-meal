// Handle messages (push requests) from client
self.addEventListener('message', function (event) {
  var pushObj = JSON.parse(event.data);
  console.log(pushObj);

  const title = 'Feel My Meal';
  const options = {
    actions: [
      {action: 'open', title: 'Open Feel My Meal App'}
    ],
    body: 
`Hi ${pushObj.user}!
Please tell us how do you feel?`,
  };

  setTimeout(function () {
    self.registration.showNotification(title, options)
  }, pushObj.pushTimer);
});

// Handle Notification clicks
self.addEventListener('notificationclick', function (event) {
  if (event.action === 'open') clients.openWindow('http://localhost:8080/#', '_blank');
  event.notification.close();
});

// self.addEventListener('push', function(event) {
//   console.log('[Service Worker] testtest Received.');
//   console.log(`[Service Worker] blabla had this data: "${event.data}"`);

//  const title = 'test5';
//   const options = {
//     body: 'Yay it works.',
//     icon: 'images/icon.png',
//     badge: 'images/badge.png'
//   };
//  const notificationPromise = self.registration.showNotification(title, options);
// event.waitUntil(notificationPromise);
// });