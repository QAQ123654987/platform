// // 初始化地圖並禁用zoom control。因預設位置在左方
//     var map = L.map('map', {
//         center: [23.60413415,120.98658104],
//         zoom: 8,
//         // zoomControl: false,
//     });
// //繪圖小工具
// var drawnItems = new L.FeatureGroup();
// map.addLayer(drawnItems);
// var drawControl = new L.Control.Draw({
//     edit: {
//         featureGroup: drawnItems
//     },
//     draw: {
//         polygon: true,
//         polyline: true,
//         rectangle: true,
//         circle: true,
//         marker: true,
//     }
// });
// map.addControl(drawControl);
// map.on(L.Draw.Event.CREATED, function (event) {
//     var layer = event.layer;
//     drawnItems.addLayer(layer);
//     var area = L.GeometryUtil.geodesicArea(layer.getLatLngs()[0]);
//     console.log(area);
// });

// //顯示滑鼠所在處經緯度
// let latlng = L.control();
// latlng.onAdd = function(map) {
//     this._div = L.DomUtil.create('div', 'latlng');
//     return this._div;
// };
// latlng.update = function(latlng) {
//     if (latlng) {
//         this._div.innerHTML = '緯度：' + latlng.lat.toFixed(4) + '<br>經度：' +
//             '' +
//             '' +
//             '' + latlng.lng.toFixed(4);
//     }
// };
// latlng.addTo(map);

// map.on('mousemove', function(e) {
//     latlng.update(e.latlng);
// });

// // 切換底圖工具 - Basemaps套件
//     var basemaps = [
//         L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
//             maxZoom: 19,
//             attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         }),
//         L.tileLayer("https://wmts.nlsc.gov.tw/wmts/EMAP/default/GoogleMapsCompatible/{z}/{y}/{x}.jpg", {
//             maxZoom: 19,
//             attribution: '&copy; <a href="https://maps.nlsc.gov.tw/">國土測繪服務雲-臺灣通用電子地圖</a> contributors'
//         }),
//         L.tileLayer("https://wmts.nlsc.gov.tw/wmts/PHOTO2/default/GoogleMapsCompatible/{z}/{y}/{x}.jpg", {
//             maxZoom: 19,
//             attribution: '&copy; <a href="https://maps.nlsc.gov.tw/">國土測繪服務雲-臺灣通用正射影像圖</a> contributors'
//         })
//     ];

// // Leaflet.Basemaps套件設定的圖磚值
//     map.addControl(
//         L.control.basemaps({
//             basemaps: basemaps,
//             tileX: 0,
//             tileY: 0,
//             tileZ: 1
//         })
//     );

// Layer Controller
    var layerControl = L.control.layers(null,null).addTo(map);
//建立資料點
    var crownHill = L.marker([24.354, 121.4]).bindPopup('This is Crown Hill Park.'),
        rubyHill = L.marker([24.34, 121.3]).bindPopup('This is Ruby Hill Park.');
//把資料點加到Layer中
var hotpoints = L.layerGroup(Hotpoint_cluster);
    var City_position = L.layerGroup(City_position);
    var district_position = L.layerGroup(Districts_position );
    var Tide_post = L.layerGroup(Tide_post_geojson);
    var Tide_test = L.layerGroup(Tide_test_geojson);
    var CoastalResources = L.layerGroup(CoastalResources);
    var Coastal = L.layerGroup(Coastal);
    var Beach = L.layerGroup(Beach);
    var Wetland = L.layerGroup(Wetland);
    var Port = L.layerGroup(Port);
    var protection = L.layerGroup(protection);
    var Hotpoint_cluster = new L.MarkerClusterGroup();   //Marker Cluster
    // var intertidal_terrain = L.layerGroup(intertidal_terrain);

// Add Layer
    layerControl.addOverlay(Hotpoint_cluster, '十三處侵淤熱點<br/><strong><text style=\"color:darkblue;font-size:15px;\">歷史衛星影像</text></strong>');
    layerControl.addOverlay(City_position, '縣市');
    layerControl.addOverlay(district_position, '鄉鎮<br/><strong><text style=\"color:darkblue;font-size:15px;\">潮間帶</text></strong>');
    layerControl.addOverlay(Coastal, '潮間帶地形');
    layerControl.addOverlay(Tide_post, '潮間帶範圍(公告)');
    layerControl.addOverlay(Tide_test, '潮間帶範圍(試辦)<br/><strong><text style=\"color:darkblue;font-size:15px;\">海岸地區</text></strong>');
    layerControl.addOverlay(Coastal, '海岸地區範圍');
    layerControl.addOverlay(CoastalResources, '海岸資源<text><br/><strong><text style=\"color:darkblue;font-size:15px\">保護區</text></strong>');
    layerControl.addOverlay(protection, '潛在保護區<br/><text>-------重點保護區-------</text>');
    layerControl.addOverlay(Port, '港口');
    layerControl.addOverlay(Wetland, '濕地資源');
    layerControl.addOverlay(Beach, '海水浴場');

//資料點：Hotpoints 十三處侵淤熱點 --------------------------------------------------------------------------
    $.getJSON('GEOJSON_file/before/Hotpoint.geojson',function(data){
        L.geoJson(data,{
            pointToLayer: function(feature,HotpointLayer){
                var marker = L.marker(HotpointLayer, {icon:HotpointIcon});
                marker.bindPopup('<strong><text style=\"color:rgba(0,42,253,0.64);font-size:17px\">－浸淤熱點－</text></strong>'
                    +("</br>")
                    +feature.properties.Name
                ).addTo(Hotpoint_cluster);
                return marker;
            }
        });
    });
    var HotpointIcon = L.icon({
        iconUrl: 'GEOJSON_file/before/coastal/icon/hotpoint.png',
        iconSize: [45,45],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
    });

    var HotpointIcon2 = L.icon({
        iconUrl: 'GEOJSON_file/before/coastal/icon/hotpoint2.png',
        iconSize: [45,45],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
    });

// 十三處侵淤熱點-國土利用監測 海岸線變化分析JPG
    var hotpointWithJPG = [
        {
            name: "台北港",
            latlng: [25.145, 121.334],
            image:[
                "dist/img/GIS_image_data/hot_point/104/臺北港_104.jpg",
                "dist/img/GIS_image_data/hot_point/105/臺北港_105.jpg",
                "dist/img/GIS_image_data/hot_point/106/臺北港_106.jpg"
            ]
        },
        {
            name: "烏石港",
            latlng: [24.8624, 121.8347],
            image:[
                "dist/img/GIS_image_data/hot_point/104/烏石港_104.jpg",
                "dist/img/GIS_image_data/hot_point/105/烏石港_105.jpg",
                "dist/img/GIS_image_data/hot_point/106/烏石港_106.jpg"
            ]
        },
        {
            name: "新竹新豐及頭前溪",
            latlng: [24.8499, 120.929],
            image:[
                "dist/img/GIS_image_data/hot_point/104/新竹新豐及頭前溪_104.jpg",
                "dist/img/GIS_image_data/hot_point/105/新竹新豐及頭前溪_105.jpg",
                "dist/img/GIS_image_data/hot_point/106/新竹新豐及頭前溪_106.jpg"
            ]
        },
        {
            name: "台南黃金",
            latlng: [22.9546, 120.1567],
            image:[
                "dist/img/GIS_image_data/hot_point/104/台南黃金_104.jpg",
                "dist/img/GIS_image_data/hot_point/105/台南黃金_105.jpg",
                "dist/img/GIS_image_data/hot_point/106/台南黃金_106.jpg"
            ]
        },
        {
            name: "臺東縣南迴公段",
            latlng: [22.3278, 120.9145],
            image:[
                "dist/img/GIS_image_data/hot_point/104/臺東縣南迴公段_104.jpg",
                "dist/img/GIS_image_data/hot_point/105/臺東縣南迴公段_105.jpg",
                "dist/img/GIS_image_data/hot_point/106/臺東縣南迴公段_106.jpg"
            ]
        },
        {
            name: "嘉義布袋",
            latlng: [23.387, 120.1277],
            image:[
                "dist/img/GIS_image_data/hot_point/104/嘉義布袋_104.jpg",
                "dist/img/GIS_image_data/hot_point/105/嘉義布袋_105.jpg",
                "dist/img/GIS_image_data/hot_point/106/嘉義布袋_106.jpg"
            ]
        },
        {
            name: "高雄興達港",
            latlng: [22.8382, 120.1989],
            image:[
                "dist/img/GIS_image_data/hot_point/104/高雄興達港_104.jpg",
                "dist/img/GIS_image_data/hot_point/105/高雄興達港_105.jpg",
                "dist/img/GIS_image_data/hot_point/106/高雄興達港_106.jpg"
            ]
        },
        {
            name: "花蓮溪口",
            latlng: [23.9722, 121.6291],
            image:[
                "dist/img/GIS_image_data/hot_point/104/花蓮溪口_104.jpg",
                "dist/img/GIS_image_data/hot_point/105/花蓮溪口_105.jpg",
                "dist/img/GIS_image_data/hot_point/106/花蓮溪口_106.jpg"
            ]
        },
        {
            name: "台中港及彰濱",
            latlng: [24.154437, 120.43286],
            image:[
                "dist/img/GIS_image_data/hot_point/104/台中港及彰濱_104.jpg",
                "dist/img/GIS_image_data/hot_point/105/台中港及彰濱_105.jpg",
                "dist/img/GIS_image_data/hot_point/106/台中港及彰濱_106.jpg"
            ]
        },
        {
            name: "濁水溪口",
            latlng: [23.671912, 120.146396],
            image:[
                "dist/img/GIS_image_data/hot_point/104/濁水溪口_104.jpg",
                "dist/img/GIS_image_data/hot_point/105/濁水溪口_105.jpg",
                "dist/img/GIS_image_data/hot_point/106/濁水溪口_106.jpg"
            ]
        },
        {
            name: "桃園觀音、新屋",
            latlng: [ 25.0169, 121.0473],
            image:[
                "dist/img/GIS_image_data/hot_point/104/桃園觀音、新屋_104.jpg",
                "dist/img/GIS_image_data/hot_point/105/桃園觀音、新屋_105.jpg",
                "dist/img/GIS_image_data/hot_point/106/桃園觀音、新屋_106.jpg"
            ]
        },
        {
            name: "台南七股",
            latlng: [ 23.1444, 120.0533],
            image:[
                "dist/img/GIS_image_data/hot_point/104/台南七股_104.jpg",
                "dist/img/GIS_image_data/hot_point/105/台南七股_105.jpg",
                "dist/img/GIS_image_data/hot_point/106/台南七股_106.jpg"
            ]
        },
        {
            name: "高雄左營及旗津",
            latlng: [ 22.6202, 120.3134],
            image:[
                "dist/img/GIS_image_data/hot_point/104/高雄左營及旗津_104.jpg",
                "dist/img/GIS_image_data/hot_point/105/高雄左營及旗津_105.jpg",
                "dist/img/GIS_image_data/hot_point/106/高雄左營及旗津_106.jpg"
            ]
        }
    ];

// 建立圖片元素，修改class
    var imageElement = document.createElement("img");
    imageElement.className = "modal-dialog modal-fullscreen";
// 建立按鈕事件監聽器，依照點擊的按鈕更改圖片路徑
    var selectedHotpoint = 0;
    document.getElementById("hotpointBtn-1").addEventListener("click", function() {    //點第一個按鈕，圖片[0]
        imageElement.src = hotpointWithJPG[selectedHotpoint].image[0];
        // 去除其他按鈕的選取狀態
        document.querySelectorAll("#hotpointBtn-2, #hotpointBtn-3").forEach(function(button) {
            button.classList.remove('btn-secondary');
        });
// 將當前選取按鈕設置為選取狀態
        this.classList.add('btn-secondary');
    });

    document.getElementById("hotpointBtn-2").addEventListener("click", function() {
        imageElement.src = hotpointWithJPG[selectedHotpoint].image[1];
        this.classList.add('btn-secondary');
        // 去除其他按鈕的選取狀態
        document.querySelectorAll("#hotpointBtn-1, #hotpointBtn-3").forEach(function(button) {
            button.classList.remove('btn-secondary');
        });
// 將此按鈕設置為選取狀態
        this.classList.add('btn-secondary');
    });
    document.getElementById("hotpointBtn-3").addEventListener("click", function() {
        imageElement.src = hotpointWithJPG[selectedHotpoint].image[2];
        this.classList.add('btn-secondary');
        // 去除其他按鈕的選取狀態
        document.querySelectorAll("#hotpointBtn-1, #hotpointBtn-2").forEach(function(button) {
            button.classList.remove('btn-secondary');
        });
// 將此按鈕設置為選取狀態
        this.classList.add('btn-secondary');
    });
// 在hotpointModal內的modal-body區域插入圖片元素
    document.querySelector(".modal-body").appendChild(imageElement);
    var buttons = document.querySelectorAll('.modal-content button');

// 綁定在關閉popup時觸發的事件監聽器
    $('#hotpointModal').on('show.bs.modal', function (e) {
        // 清空按鈕的class
        document.getElementById("hotpointBtn-1").className = "btn btn-primary";
        document.getElementById("hotpointBtn-2").className = "btn btn-primary";
        document.getElementById("hotpointBtn-3").className = "btn btn-primary";
        // 第一個按鈕加上以選class btn-secondary
        document.getElementById("hotpointBtn-1").classList.add("btn-secondary");
        // 隱藏全部圖片
        imageElement.style.display = "none";
        // 顯示第一張圖片
        imageElement.src = hotpointWithJPG[selectedHotpoint].image[0];
        imageElement.style.display = "block";
    });

    hotpointWithJPG.forEach(hotpoint => {
        hotpoint.defaultImageIndex = 0;
        var marker = L.marker(hotpoint.latlng, {icon: HotpointIcon2})
            .bindPopup(`<strong><text style="color:rgba(0,42,253,0.64);font-size:17px">－浸淤熱點－
                    </text></strong> </br> ${hotpoint.name} </br> <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#hotpointModal">
                    海岸線變化分析</button>`)
            .addTo(Hotpoint_cluster)
            .on("click", function() {   //索引
                selectedHotpoint = hotpointWithJPG.indexOf(hotpoint);
                imageElement.src = hotpointWithJPG[selectedHotpoint].image[hotpointWithJPG[selectedHotpoint].defaultImageIndex];
            });

    });

// 資料點：City_position 縣市--------------------------------------------------------------------------
    $.getJSON('GEOJSON_file/before/City_position.geojson', function(data) {
        L.geoJson(data, {
            pointToLayer: function(feature, City_positionLayer) {
                // 判斷是否為 "澎湖縣"
                if (feature.properties.Name === "澎湖縣") {
                    var marker = L.marker(City_positionLayer, { icon: City_positionIcon })
                        .bindPopup(`${feature.properties.Name}(${feature.properties.Name_E})`).addTo(City_position);
                } else {
                    var marker = L.marker(City_positionLayer, { icon: City_positionIcon })
                        .bindPopup(`${feature.properties.Name}(${feature.properties.Name_E})</br>
                    <button type="button" class="btn btn-primary" onclick="citySlideFunction('${feature.properties.Name_E.toLowerCase()}')">歷年影像展示</button>`).addTo(City_position);  // 縣市名稱轉小寫
                }
            }
        });
    });

// 點擊「歷年影像展示」按鈕叫出輪播函數
    function citySlideFunction(cityName) {
        let cityOverlay = document.getElementById("carousel-overlay");
        cityOverlay.style.display = "block";
        var carouselContainer = document.getElementById("carousel-container");
        carouselContainer.style.display = "block";

        // 每次執行 SlideFunction 時，清空 tickmarks 與 myRange 的子元素，並重新加入元素
        let cityDatalist = document.getElementById("cityTickmarks");
        while (cityDatalist.firstChild) {
            cityDatalist.removeChild(cityDatalist.firstChild);
        }
        // 縣市歷年變化顯示--輪播
        let cityTickmarks = [1970, 1972, 1980, 1990, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016];
        // 加入選項
        for (var i = 0; i < cityTickmarks.length; i++) {
            let cityOption = document.createElement("option");
            cityOption.value = cityTickmarks[i];
            cityOption.label = cityTickmarks[i];
            cityDatalist.appendChild(cityOption);
        }
        // 按 ESC 關閉輪播
        document.addEventListener("keydown", function(event) {
            if (event.key === 'Escape') {
                closeCarousel();
            }
        });

        // 每次開啟輪播時清除上次輪播的資料
        let citySlider = document.getElementById("citySliderRange");
        citySlider.value = 0; // 歸零slider
        let cityYear = document.getElementById("cityYear");
        cityYear.innerHTML = cityTickmarks[citySlider.value];
        let cityActiveItem = document.querySelector(".carousel-item.active");
        let cityActiveImg = cityActiveItem.querySelector("img");
        cityActiveImg.src = `./dist/img/GIS_image_data/city_RGB/${cityTickmarks[citySlider.value]}_RGB/${cityName}_${cityTickmarks[citySlider.value]}_RGB_square.jpg?t=${Date.now()}`; // 將第一張圖片路徑更新為該縣市與1970年的圖片

        // 點擊close btn 關閉輪播
        var CloseBtn = document.getElementById("CarouselBtn-close");
        CloseBtn.addEventListener("click", function(event) {
            closeCarousel();
        });
        //關閉輪播的函數
        function closeCarousel() {
            // 清除圖片路徑與slider的year
            let cityActiveItem = document.querySelector(".carousel-item.active");
            cityActiveImg = cityActiveItem.querySelector("img");
            cityActiveImg.src = "";
            let citySlider = document.getElementById("citySliderRange");
            citySlider.value = 0;
            let cityYear = document.getElementById("cityYear");
            cityYear.innerHTML = cityTickmarks[citySlider.value];
            // 關閉輪播
            cityOverlay.style.display = "none";
            carouselContainer.style.display = "none";
        }
        //生成圖片
        citySlider = document.getElementById("citySliderRange");
        citySlider.addEventListener("input", function() {
            let cityValue = cityTickmarks[this.value];
            // var imgSrc = `./dist/img/GIS_image_data/city_RGB/${value}_RGB/${cityName}_${value}_RGB_square.jpg?t=${Date.now()}`; // 圖片路徑
            let cityImgSrc = `./dist/img/GIS_image_data/city_RGB/${cityTickmarks[citySlider.value]}_RGB/${cityName}_${cityTickmarks[citySlider.value]}_RGB_square.jpg?t=${Date.now()}`;
            cityActiveItem = document.querySelector(".carousel-item.active");
            cityActiveImg  = cityActiveItem.querySelector("img");
            cityActiveImg.src = cityImgSrc; // 更新圖片路徑
        });

        cityYear = document.getElementById("cityYear");
        cityYear.innerHTML = cityTickmarks[citySlider.value];
        citySlider.oninput = function() {
            cityYear.innerHTML = cityTickmarks[this.value];
        }
    }
    var City_positionIcon = L.icon({
        iconUrl: 'GEOJSON_file/before/coastal/icon/city.png',
        iconSize: [45,45],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
    });
// 資料點：District_position 鄉鎮--------------------------------------------------------------------------
    $.getJSON('GEOJSON_file/before/Districts.geojson', function(data) {
        L.geoJson(data, {
            pointToLayer: function(feature, Districts_positionLayer) {
                var marker = L.marker(Districts_positionLayer, { icon: District_positionIcon })
                    .bindPopup(`${feature.properties.Name}(${feature.properties.Name_E})</br>
                    <button type="button" class="btn btn-primary" onclick="districtsSlideFunction('${feature.properties.Name_E.toLowerCase()}')">歷年影像展示</button>`).addTo(district_position);  // 縣市名稱轉小寫
                // }
            }
        });
    });

    // 點擊「歷年影像展示」按鈕叫出輪播函數
    function districtsSlideFunction(districtName) {
        let districtsOverlay = document.getElementById("carousel-overlay");
        districtsOverlay.style.display = "block";
        var carouselContainer = document.getElementById("carousel-container");
        carouselContainer.style.display = "block";

        // 每次執行 SlideFunction 時，清空 tickmarks 與 myRange 的子元素，並重新加入元素
        let DistrictsDatalist = document.getElementById("DistrictsTickmarks");
        while (DistrictsDatalist.firstChild) {
            DistrictsDatalist.removeChild(DistrictsDatalist.firstChild);
        }
        // 鄉鎮歷年變化顯示--輪播
        let DistrictsTickmarks = [1970, 1980, 1990, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016];
        // 加入選項
        for (var i = 0; i < DistrictsTickmarks.length; i++) {
            let districtsOption = document.createElement("option");
            districtsOption.value = DistrictsTickmarks[i];
            districtsOption.label = DistrictsTickmarks[i];
            DistrictsDatalist.appendChild(districtsOption);
        }
        // 按 ESC 關閉輪播
        document.addEventListener("keydown", function(event) {
            if (event.key === 'Escape') {
                closeCarousel();
            }
        });

        // 每次開啟輪播時清除上次輪播的資料
        let DistrictsSlider = document.getElementById("DistrictsSliderRange");
        DistrictsSlider.value = 0; // 歸零slider
        let DistrictsYear = document.getElementById("DistrictsYear");
        DistrictsYear.innerHTML = DistrictsTickmarks[DistrictsSlider.value];
        let DistrictsActiveItem = document.querySelector(".carousel-item.active");
        let DistrictsActiveImg = DistrictsActiveItem.querySelector("img");
        DistrictsActiveImg.src = `./dist/img/GIS_image_data/district_RGB/${DistrictsTickmarks[DistrictsSlider.value]}_RGB/${districtName}_${DistrictsTickmarks[DistrictsSlider.value]}_RGB_square.jpg?t=${Date.now()}`; // 將第一張圖片路徑更新為該縣市與1970年的圖片

        // 點擊close btn 關閉輪播
        var CloseBtn = document.getElementById("CarouselBtn-close");
        CloseBtn.addEventListener("click", function(event) {
            closeCarousel();
        });
        //關閉輪播的函數
        function closeCarousel() {
            // 清除圖片路徑與slider的year
            let DistrictsActiveItem = document.querySelector(".carousel-item.active");
            let DistrictsActiveImg = DistrictsActiveItem.querySelector("img");
            DistrictsActiveImg.src = "";
            let DistrictsSlider = document.getElementById("DistrictsSliderRange");
            DistrictsSlider.value = 0;
            let DistrictsYear = document.getElementById("DistrictsYear");
            DistrictsYear.innerHTML = DistrictsTickmarks[DistrictsSlider.value];
            // 關閉輪播
            districtsOverlay.style.display = "none";
            carouselContainer.style.display = "none";
        }
        //生成圖片
        DistrictsSlider = document.getElementById("DistrictsSliderRange");
        DistrictsSlider.addEventListener("input", function() {
            let DistrictsValue = DistrictsTickmarks[this.value];
            // var imgSrc = `./dist/img/GIS_image_data/district_RGB/${value}_RGB/${districtName}_${value}_RGB_square.jpg`; // 圖片路徑
            let DistrictsImgSrc = `./dist/img/GIS_image_data/district_RGB/${DistrictsTickmarks[DistrictsSlider.value]}_RGB/${districtName}_${DistrictsTickmarks[DistrictsSlider.value]}_RGB_square.jpg?t=${Date.now()}`;
            DistrictsActiveItem = document.querySelector(".carousel-item.active");
            DistrictsActiveImg = DistrictsActiveItem.querySelector("#DistrictsPic");
            DistrictsActiveImg.src = DistrictsImgSrc; // 更新圖片路徑
        });

        DistrictsYear = document.getElementById("DistrictsYear");
        DistrictsYear.innerHTML = DistrictsTickmarks[DistrictsSlider.value];
        DistrictsSlider.oninput = function() {
            DistrictsYear.innerHTML = DistrictsTickmarks[this.value];
        }
    }
    var District_positionIcon = L.icon({
        iconUrl: 'GEOJSON_file/before/coastal/icon/district.png',
        iconSize: [45,45],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
    });
//資料點：CoastalResources 海岸資源--------------------------------------------------------------------------
$.getJSON('GEOJSON_file/before/CoastalResources.geojson',function(data){
    L.geoJson(data,{
        pointToLayer: function(feature,CoastalResourcesLayer){
            var marker = L.marker(CoastalResourcesLayer, {icon:CoastalResourcesIcon});
            marker.bindPopup('<strong><text style=\"color:rgba(0,42,253,0.64);font-size:17px\">－海岸資源－</text></strong>'
                +("</br>")
                +feature.properties.place_names
                +("</br>")
                +' ('
                +feature.properties.Name
                +' )'
                +("</br>")
                +feature.properties.remaker
            ).addTo(CoastalResources);
            return marker;
        }
    });
});

var CoastalResourcesIcon = new L.Icon({
    iconUrl: 'GEOJSON_file/before/coastal/icon/CoastalResources.png',
    iconSize: [45,45],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
});
//資料點：protection 潛在保護區 --------------------------------------------------------------------------
$.getJSON('GEOJSON_file/before/protection.geojson',function(data){
    L.geoJson(data,{
        pointToLayer: function(feature,protectionLayer){
            var marker = L.marker(protectionLayer, {icon:protectionIcon});
            marker.bindPopup('<strong><text style=\"color:rgba(0,42,253,0.64);font-size:17px\">－潛在保護區－</text></strong>'
                +("</br>")
                +feature.properties.place_names
                +'<br>\<b>位於：</b>'
                +feature.properties.remaker
            ).addTo(protection);
            return marker;
        }
    });
});

var protectionIcon = new L.Icon({
    iconUrl: 'GEOJSON_file/before/coastal/icon/protection.png',
    iconSize: [45,45],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
});
//資料點：Port 港口 --------------------------------------------------------------------------
    $.getJSON('GEOJSON_file/before/Port.geojson',function(data){
        L.geoJson(data,{
            pointToLayer: function(feature,PortLayer){
                var marker = L.marker(PortLayer, {icon:PortIcon});
                marker.bindPopup('<strong><text style=\"color:rgba(0,42,253,0.64);font-size:17px\">－港口－</text></strong>'
                    +("</br>")
                    +feature.properties.place_names
                    +("</br>")
                    +feature.properties.Name
                    +'<br>\<b>類型：</b>'
                    +feature.properties.type
                    +'<br>\<b>位於：</b>'
                    +feature.properties.remaker
                ).addTo(Port);
                return marker;
            }
        });
    });

    var PortIcon = new L.Icon({
        iconUrl: 'GEOJSON_file/before/coastal/icon/port.png',
        iconSize: [45,45],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
    });
//資料點：Wetland 濕地資源--------------------------------------------------------------------------
    $.getJSON('GEOJSON_file/before/Wetland.geojson',function(data){
        L.geoJson(data,{
            pointToLayer: function(feature,WetlandLayer){
                var marker = L.marker(WetlandLayer, {icon:WetlandIcon});
                marker.bindPopup('<strong><text style=\"color:rgba(0,42,253,0.64);font-size:17px\">－濕地－</text></strong>'
                    +("</br>")
                    +feature.properties.place_names
                    +("</br>")
                    +' ('
                    +feature.properties.Name
                    +')<br>\<b>位於：</b>'
                    +feature.properties.remaker
                ).addTo(Wetland);
                return marker;
            }
        });
    });

    var WetlandIcon = new L.Icon({
        iconUrl: 'GEOJSON_file/before/coastal/icon/Wetland.png',
        iconSize: [45,45],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
    });
//資料點：Beach海水浴場--------------------------------------------------------------------------
    $.getJSON('GEOJSON_file/before/Beach.geojson',function(data){
        L.geoJson(data,{
            pointToLayer: function(feature,BeachLayer){
                var marker = L.marker(BeachLayer, {icon: BeachIcon});
                marker.bindPopup('<strong><text style=\"color:rgba(0,42,253,0.64);font-size:17px\">－海水浴場－</text></strong>'
                    +("</br>")
                    +feature.properties.place_names
                    +("</br>")
                    +' ('
                    +feature.properties.Name
                    +')<br>\<b>位於：</b>'
                    +feature.properties.remaker
                ).addTo(Beach);
                return marker;
            }
        });
    });
    var BeachIcon = new L.Icon({
        iconUrl: 'GEOJSON_file/before/coastal/icon/beach.png',
        iconSize: [45,45],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
    });


// 海岸帶範圍(公告)--------------------------------------------------------------------------
// adding the 縣市、面積 to the visible div
    function addTextToDiv(text) {
        const markerPlace_Post = document.querySelector(".marker-position");
    }
// showing the name of the 縣市、面積
    function getPostName(feature, layer) {
        if (feature.properties && feature.properties.所在縣市) {
            layer.bindPopup('<strong><text style=\"color:rgba(0,42,253,0.64);font-size:17px\">－潮間帶－</text></strong>'
                +'</br>'
                +'位於：'+feature.properties.所在縣市+'</br>'+'面積：'+ feature.properties.面積);
        }
    }
    fetch('./GEOJSON_file/before/coastal/file/Tide_post_4326/Tide_post_4326_right-hand-rule.geojson')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            let PostLayer = new L.GeoJSON(data, {
                onEachFeature: function (feature, layer) {
                    layer.on("mouseover", function (e) {
                        // bindPopup
                        getPostName(feature, layer);
                        // show 縣市
                        addTextToDiv(feature.properties.所在縣市);
                        this.openPopup();
                        // style
                        this.setStyle({
                            fillColor: "#eb4034",
                            weight: 2,
                            color: "#eb4034",
                            fillOpacity: 0.7
                        });
                    });
                    layer.on("mouseout", function () {
                        this.closePopup();
                        // style
                        this.setStyle({
                            fillColor: "#3388ff",
                            weight: 2,
                            color: "#3388ff",
                            fillOpacity: 0.2
                        });
                    });
                }
            }).addTo(Tide_post);
        });
// 海岸帶範圍(試辦)--------------------------------------------------------------------------
// adding the 縣市、面積 to the visible div
function addTextToDiv(text) {
    const markerPlace_Test = document.querySelector(".marker-position");
}
// showing the name of the 縣市、面積
function geTestName(feature, layer) {
    if (feature.properties && feature.properties.所在縣市) {
        layer.bindPopup('<strong><text style=\"color:rgba(0,42,253,0.64);font-size:17px\">－潮間帶－</text></strong>'
            +'</br>'
            +'位於：'+feature.properties.所在縣市+'</br>'+'面積：'+ feature.properties.面積);
    }
}
fetch('./GEOJSON_file/before/coastal/file/Tide_test_4326/Tide_test_4326_right-hand-rule.geojson')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        let testLayer = new L.GeoJSON(data, {
            onEachFeature: function (feature, layer) {
                layer.on("mouseover", function (e) {
                    // bindPopup
                    getTestName(feature, layer);
                    // show 縣市
                    addTextToDiv(feature.properties.所在縣市);
                    this.openPopup();
                    // style
                    this.setStyle({
                        fillColor: "rgba(220,172,52,0.91)",
                        weight: 2,
                        color: "rgba(220,172,52,0.91)",
                        fillOpacity: 0.7
                    });
                });
                layer.on("mouseout", function () {
                    this.closePopup();
                    // style
                    this.setStyle({
                        fillColor: "#5d4da2",
                        weight: 2,
                        color: "#5d4da2",
                        fillOpacity: 0.2
                    });
                });
            },
            // Set the default style for all polygons
            style: {
                fillColor: "#5d4da2",
                weight: 2,
                color: "#5d4da2",
                fillOpacity: 0.2
            }
        }).addTo(Tide_test);
    });
// 海岸地區範圍--------------------------------------------------------------------------
function addTextToDiv(text) {
    const markerPlace_Coastal = document.querySelector(".marker-position");
}
// showing the name
function getCoastalName(feature, layer) {
    if (feature.properties && feature.properties.CITYNAME) {
        layer.bindPopup('<strong><text style=\"color:rgba(0,42,253,0.64);font-size:17px\">－潮間帶地形－</text></strong>'
            +'</br>'
            +'位於：'+feature.properties.CITYNAME
            +'</br>'
            +'STYPE：'+feature.properties.STYPE
            +'</br>'
            +'SAREA：'+ feature.properties.SAREA);
    }
}
fetch('./GEOJSON_file/before/coastal/file/Coastal/Coastal_4326_right-hand-rule.geojson')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        let CoastalLayer = new L.GeoJSON(data, {
            // A Function that will be called once for each
            // created Feature, after it has been created and styled
            onEachFeature: function (feature, layer) {
                layer.on("mouseover", function (e) {
                    // bindPopup
                    getCoastalName(feature, layer);
                    // show 縣市
                    addTextToDiv(feature.properties.所在縣市);
                    this.openPopup();
                    // style
                    this.setStyle({
                        fillColor: "#27ca4f",
                        weight: 2,
                        color: "#27ca4f",
                        fillOpacity: 0.7
                    });
                });
                layer.on("mouseout", function () {
                    this.closePopup();
                    // style
                    this.setStyle({
                        fillColor: "#1c865b",
                        weight: 2,
                        color: "#1c865b",
                        fillOpacity: 0.2
                    });
                });
            },
            // Set the default style for all polygons
            style: {
                fillColor: "#1c865b",
                weight: 2,
                color: "#1c865b",
                fillOpacity: 0.2
            }
        }).addTo(Coastal);
    });
    console.log(Coastal)
// 解決CORS錯誤 -- Plugin:將response加上 Access-Control-Allow-Origin header
    var accessControlRequestHeaders;
    var exposedHeaders;

    var requestListener = function(details){
        var flag = false,
            rule = {
                name: "Origin",
                value: "http://evil.com/"
            };
        var i;

        for (i = 0; i < details.requestHeaders.length; ++i) {
            if (details.requestHeaders[i].name.toLowerCase() === rule.name.toLowerCase()) {
                flag = true;
                details.requestHeaders[i].value = rule.value;
                break;
            }
        }
        if(!flag) details.requestHeaders.push(rule);

        for (i = 0; i < details.requestHeaders.length; ++i) {
            if (details.requestHeaders[i].name.toLowerCase() === "access-control-request-headers") {
                accessControlRequestHeaders = details.requestHeaders[i].value
            }
        }

        return {requestHeaders: details.requestHeaders};
    };

    var responseListener = function(details){
        var flag = false,
            rule = {
                "name": "Access-Control-Allow-Origin",
                "value": "*"
            };

        for (var i = 0; i < details.responseHeaders.length; ++i) {
            if (details.responseHeaders[i].name.toLowerCase() === rule.name.toLowerCase()) {
                flag = true;
                details.responseHeaders[i].value = rule.value;
                break;
            }
        }
        if(!flag) details.responseHeaders.push(rule);
        if (accessControlRequestHeaders) {
            details.responseHeaders.push({"name": "Access-Control-Allow-Headers", "value": accessControlRequestHeaders});
        }
        if(exposedHeaders) {
            details.responseHeaders.push({"name": "Access-Control-Expose-Headers", "value": exposedHeaders});
        }
        details.responseHeaders.push({"name": "Access-Control-Allow-Methods", "value": "GET, PUT, POST, DELETE, HEAD, OPTIONS"});
        return {responseHeaders: details.responseHeaders};
    };

    /*On install*/
    chrome.runtime.onInstalled.addListener(function(){
        chrome.storage.local.set({'active': false});
        chrome.storage.local.set({'urls': ["<all_urls>"]});
        chrome.storage.local.set({'exposedHeaders': ''});
        reload();
    });

    /*Reload settings*/
    function reload() {
        chrome.storage.local.get({'active': false, 'urls': ["<all_urls>"], 'exposedHeaders': ''}, function(result) {

            exposedHeaders = result.exposedHeaders;

            /*Remove Listeners*/
            chrome.webRequest.onHeadersReceived.removeListener(responseListener);
            chrome.webRequest.onBeforeSendHeaders.removeListener(requestListener);

            if(result.active) {
                chrome.browserAction.setIcon({path: "on.png"});
                if(result.urls.length) {
                    /*Add Listeners*/
                    chrome.webRequest.onHeadersReceived.addListener(responseListener, {
                        urls: result.urls
                    },["blocking", "responseHeaders"]);
                    chrome.webRequest.onBeforeSendHeaders.addListener(requestListener, {
                        urls: result.urls
                    },["blocking", "requestHeaders"]);
                }
            } else {
                chrome.browserAction.setIcon({path: "off.png"});
            }
        });
    };

