const fs = require('fs');
let data = [];
fs.readdir('../assets/appicons/', function(err, files) {
  data.push(files);
  console.log(files);
});
console.log("READ FILE SYNC END");
[
  'airdrop.png',
  'airplay.png',
  'android.png',
  'appstore.png',
  'calculator.png',
  'calendar.png',
  'camera.png',
  'candybar.png',
  'clock.png',
  'compass.png',
  'contacts.png',
  'contol.png',
  'facetime.png',
  'find-friends.png',
  'find-my-iphone.png',
  'finder.png',
  'games.png',
  'gmail.png',
  'google-app.png',
  'google-chrome.png',
  'google-drive.png',
  'google-earth.png',
  'google-maps.png',
  'google-plus.png',
  'hangouts.png',
  'home.png',
  'ibooks.png',
  'icloud-apps.png',
  'icloud-key.png',
  'icloud-lock.png',
  'icloud-restore.png',
  'icloud.png',
  'ilife.png',
  'ios-7.png',
  'itunes-radio.png',
  'itunes-u.png',
  'itunes.png',
  'iwork.png',
  'kugou.png',
  'launchpad.png',
  'mail.png',
  'maps.png',
  'menssages.png',
  'multitaks.png',
  'music-alt.png',
  'music.png',
  'newstand.png',
  'notes.png',
  'notification-center.png',
  'passbook.png',
  'phone.png',
  'photo-booth.png',
  'photos.png',
  'play-store.png',
  'podcats.png',
  'reminders.png',
  'safari.png',
  'sdk.png',
  'settings.png',
  'siri.png',
  'stocks.png',
  'system.png',
  'trailers.png',
  'trash-empty.png',
  'trash-full.png',
  'tuniu.jpg',
  'user-5c.png',
  'user-5s.png',
  'videos.png',
  'voice-memos.png',
  'weather.png',
  'youtube.png'
]