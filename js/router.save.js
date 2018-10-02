L.easyButton('fa-save', function (btn, map) {
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

    } else if (map.__gpx) {
        var element = document.createElement('a');
        element.setAttribute('href', map.__gpx);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
        return;
    }
}, 'Enregistrer en GPX').addTo(map);
