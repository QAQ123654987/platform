// map 要在 socket.on 之外建立, 這樣子 main_before.js 才可以也用到這個 map 喔
var map         = L.map('map', { center: [23.973, 120.979], zoom: 8 });
var osmUrl      = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
var attribution = '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
var bigmap      = L.tileLayer(osmUrl, { attribution: attribution }).addTo(map);

