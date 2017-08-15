L.easyButton('fa-save', function(btn, map) {
	if (drawnItems.getLayers().length > 0) {
		geojson = drawnItems.toGeoJSON();
		gpxData = togpx(geojson);

            var element = document.createElement('a');
            element.setAttribute('href', 'data:application/gpx+xml;charset=utf-8,' + encodeURIComponent(gpxData));
            element.setAttribute('download', 'export.gpx');

            element.style.display = 'none';
            document.body.appendChild(element);

            element.click();

            document.body.removeChild(element);
		
	}
	if (map.__gpx) {
            var element = document.createElement('a');
            element.setAttribute('href', map.__gpx);

            element.style.display = 'none';
            document.body.appendChild(element);

            element.click();

            document.body.removeChild(element);		
		return;
	}
    var features = [];
    var geojson = {
        "type": "FeatureCollection",
        "features": features
    };
    routingControl.getRouter().route(routingControl.getWaypoints(),
        function(e, res) {
            for (r of res) {
                var coords = r.coordinates;
                var coords2 = coords.map(function(c) {
                    return [c.lng, c.lat];
                });
                features.push({
                    "type": "Feature",
                    "properties": {
                        "name": "route"
                    },
                    "geometry": {
                        "type": "LineString",
                        "coordinates": coords2
                    }
                });
            }
            gpxData = togpx(geojson);

            var element = document.createElement('a');
            element.setAttribute('href', 'data:application/gpx+xml;charset=utf-8,' + encodeURIComponent(gpxData));
            element.setAttribute('download', 'export.gpx');

            element.style.display = 'none';
            document.body.appendChild(element);

            element.click();

            document.body.removeChild(element);

        });
}, 'Enregistrer en GPX').addTo(map);
