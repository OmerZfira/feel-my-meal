'Use Strict';

//Global Environment
let redirectUrl = '';
const ONE_HOUR = 3600000;


// Handle messages (push requests) from client
self.addEventListener('message', function (event) {
  var pushObj = JSON.parse(event.data);

  redirectUrl = pushObj.url;
  const title = 'Feel My Meal';
  const options = {
    actions: [
      // { action: 'open', title: 'Open app' },
      { action: 'later', title: 'Remind me Later' },
      // { action: '1hr', title: 'Remind me in 1 hour' },
      // Use msgChannel API to make the notification interactive wihtout opening the app
      // { action: '1', title: '❤' },
      // { action: '2', title: '❤❤' },
      // { action: '3', title: '❤❤❤' },
      // { action: '4', title: '❤❤❤❤' },
      // { action: '5', title: '❤❤❤❤❤' },
    ],
    data: { user: pushObj.user, pushTimer: pushObj.pushTimer },
    body:
    `Hi ${pushObj.user}!
Please tell us how do you feel`,

  };

  pushNotification({ title, options, pushTimer: pushObj.pushTimer })
});

// Handle Notification clicks
self.addEventListener('notificationclick', function (event) {

  // Handle actions
  if (event.action === 'later') {
    let evNote = event.notification
    let remindPushMsg = {
      title: evNote.title,
      options: {
        actions: evNote.actions.slice(0, 1),
        data: evNote.data,
        body:
        `Hi ${evNote.data.user}!
Please tell us how do you feel`
      }
    }
    // remindPushMsg.pushTimer = 1; // 1 hour reminder
    remindPushMsg.pushTimer = evNote.data.pushTimer * 2;
    pushNotification(remindPushMsg)
  } else clients.openWindow(redirectUrl, '_blank');
  event.notification.close();
});

// Handle starting the sw without the need to reload page
self.addEventListener('install', function (event) {
  event.waitUntil(self.skipWaiting());
});
self.addEventListener('activate', function (event) {
  event.waitUntil(clients.claim());

});

function pushNotification({title, options, pushTimer}) {
  setTimeout(function () {
    self.registration.showNotification(title, options)
      }, (6000)); //FOR LOCAL TEST ONLY -> FIXED 6sec 

  // }, (pushTimer * ONE_HOUR));
}

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