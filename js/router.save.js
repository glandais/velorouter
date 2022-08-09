
// FeatureGroup is to store editable layers
var drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);
var drawControl = new L.Control.Draw({
    draw: {
        polygon: false,
        rectangle: false,
        circle: false,
        marker: false
    },
    edit: {
        featureGroup: drawnItems
    }
});
map.addControl(drawControl);

map.on(L.Draw.Event.CREATED, function (e) {
    drawnItems.addLayer(e.layer);
});

L.easyButton('fa-save', function (btn, map) {
	gpxData = null;
    if (drawnItems.getLayers().length > 0) {
        geojson = drawnItems.toGeoJSON();
        gpxData = togpx(geojson);
    } else if (map.__layer) {
        geojson = map.__layer.toGeoJSON();
        gpxData = togpx(geojson);
    }
	if (gpxData) {
        var element = document.createElement('a');
        element.href = 'data:application/gpx+xml;charset=utf-8,' + encodeURIComponent(gpxData);
        element.download = 'export.gpx';
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);		
	} else if (map.__gpx) {
        var element = document.createElement('a');
        element.href = map.__gpx;
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
        return;
    }
}, 'Enregistrer en GPX').addTo(map);

L.easyButton('fa-image', function (btn, map) {
	gpxData = null;
    if (drawnItems.getLayers().length > 0) {
        geojson = drawnItems.toGeoJSON();
        gpxData = togpx(geojson);
    } else if (map.__layer) {
        geojson = map.__layer.toGeoJSON();
        gpxData = togpx(geojson);
    }
	if (gpxData) {
        var imageLayer;
        var zoom = map._zoom;
        map.eachLayer(function(layer) {
            if (map.hasLayer(layer) && layer._url) {
                imageLayer = layer;
            }
        });
        if (!imageLayer._url) {
            alert('Unsupported map');
            return;
        }
        var tileUrl = imageLayer._url;
        if (imageLayer.options && imageLayer.options.nativeZooms && !(imageLayer.options.nativeZooms.includes(zoom))) {
            alert('Unsupported zoom (supported : ' + imageLayer.options.nativeZooms + ')');
            return;
        }

		var formData = new FormData();
        formData.append("tileZoom", zoom);
		formData.append("tileUrl", tileUrl);
		var gpxFile = new Blob([gpxData], { type: "application/gpx+xml;charset=utf-8"});
		formData.append("file", gpxFile);
		var request = new XMLHttpRequest();
		request.responseType = 'blob';
		request.onload = function (e) {
			var blob = request.response;
			var a = document.createElement("a");
			a.style.display = 'none';
			a.href = window.URL.createObjectURL(blob);
			a.download = "export.png";
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
		}
		request.open("POST", "https://gpx2web.appspot.com");
		request.send(formData);
	}
}, 'Exporter carte en image').addTo(map);
