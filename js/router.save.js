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
		var formData = new FormData();
		formData.append("tileZoom", "12");
		formData.append("tileUrl", "https://foil.fr/magic/magicCache/{z}/{x}/{y}.png");
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
			a.click();
		}
		request.open("POST", "https://gpx2web.appspot.com");
		request.send(formData);
	}
}, 'Exporter carte en image').addTo(map);
