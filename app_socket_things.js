
const fs = require('fs');

const result_Path = "GEOJSON_file/result/";
const Tile_Path   = 'GEOJSON_file/result/TILE_file/';

file_names_1 = fs.readdirSync(result_Path);
file_names_2 = fs.readdirSync(Tile_Path);
const GeoJSON_fileNames = file_names_1.filter(GEOfileName => GEOfileName.endsWith('.geojson'));
const TILE_fileNames    = file_names_2.filter(GEOfileName => GEOfileName.endsWith('TILE'));
console.log("ServerSide GeoJSON_fileNames", GeoJSON_fileNames)
console.log("ServerSide TILE_fileNames", TILE_fileNames)

// dates
const dates = []
GeoJSON_fileNames.forEach( function (fileName_fordates) {
    // 提取日期部分（從位置0到8）, fileName的長相: 20231118_AIS
    if (fileName_fordates.toLowerCase().endsWith(".geojson") && fileName_fordates.startsWith("20")) {
    var yearpart   = fileName_fordates.substring(0, 4);
    var monthpart  = fileName_fordates.substring(4, 6);
    var daypart    = fileName_fordates.substring(6, 8);
    const datePart = `${yearpart}-${monthpart}-${daypart}`

    // 如果日期不在 dates 數组中，則添加
    if (!dates.includes(datePart)) {
        dates.push(datePart);
    }
    }
});
// 現在 dates 數组包含不重複的日期
dates.reverse();
console.log("ServerSide dates", dates);


module.exports = io => {
    io.on("connection", socket =>{
        console.log("new socket connected");
    
        // server 傳訊息
        io.emit("KongConnect", result_Path, Tile_Path, dates, GeoJSON_fileNames, TILE_fileNames)
    
        // server 收訊息
        socket.on("ClientConnect", (msg) =>{
            console.log("Server receive: " + msg);
        } );
    });
    
};

