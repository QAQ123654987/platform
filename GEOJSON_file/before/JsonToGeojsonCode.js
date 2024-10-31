const CoastalResources_url = 'GEOJSON_file/before/CoastalResources.js';
getData();

async function getData () {
    let mygeojson = {"type": "FeatureCollection", "features": []}
    await fetch(CoastalResources_url)
        .then(response => response.json())
        .then(data => {
            for(let point of data){
                let coordinate = [parseFloat(point.lon), parseFloat(point.lat)];
                let properties = point;
                delete properties.lon;
                delete properties.lat;
                let feature = {"type": "Feature", "geometry": {"type": "Point", "coordinates": coordinate}, "properties": properties}
                mygeojson.features.push(feature);
            }
        });
    console.log(mygeojson);
}

