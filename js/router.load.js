var style = {
    color: 'purple',
    opacity: 0.5,
    fillOpacity: 0.5,
    weight: 6,
    clickable: false
};
var stylePoint = {
    color: 'purple',
    opacity: 0.5,
    fillOpacity: 0.5,
    weight: 2,
    clickable: false
};
L.Control.FileLayerLoad.LABEL = '<i class="fa fa-folder-open"></i>';
L.Control.fileLayerLoad({
    fitBounds: true,
	fileSizeLimit: 16384,
    layerOptions: {
        style: style,
        pointToLayer: function(data, latlng) {
            return L.circleMarker(latlng, {
                style: stylePoint
            });
        }
    },
}).addTo(map);
