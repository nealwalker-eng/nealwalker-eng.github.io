self.addEventListener("notificationclick", function (event) {
  event.notification.close();
  event.waitUntil(self.clients.openWindow("/dashboard"));
});
