var geocoder = L.Control.Geocoder.nominatim();
var graphhopper = L.Routing.graphHopper('7332d40a-d369-4462-9663-e30f61853b52', {
    urlParameters: {
        vehicle: 'racingbike'
    }
});
var lineOptions = {
    styles: [{
        color: 'black',
        opacity: 0.15,
        weight: 9
    }, {
        color: 'white',
        opacity: 0.35,
        weight: 8
    }, {
        color: 'red',
        opacity: 0.35,
        weight: 6
    }]
};

var router = L.Routing.control({
    reverseWaypoints: true,
    geocoder: geocoder,
    router: graphhopper,
    lineOptions: lineOptions,
	position: 'topleft'
}).addTo(map);

function button(label, container) {
    var btn = L.DomUtil.create('button', '', container);
    btn.setAttribute('type', 'button');
    btn.innerHTML = label;
    return btn;
}

map.on('click', function(e) {
    var container = L.DomUtil.create('div'),
        startBtn = button('Début', container),
        destBtn = button('Fin', container);

    L.DomEvent.on(startBtn, 'click', function() {
        router.spliceWaypoints(0, 1, e.latlng);
        map.closePopup();
    });

    L.DomEvent.on(destBtn, 'click', function() {
        router.spliceWaypoints(router.getWaypoints().length - 1, 1, e.latlng);
        map.closePopup();
    });

    L.popup()
        .setContent(container)
        .setLatLng(e.latlng)
        .openOn(map);
});
