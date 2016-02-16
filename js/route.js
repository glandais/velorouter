function button(label, container) {
    var btn = L.DomUtil.create('button', '', container);
    btn.setAttribute('type', 'button');
    btn.innerHTML = label;
    return btn;
}

var map = L.map('map', { zooms: [5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21] }).setView([46.6, 2.5], 6);

var osmZooms = [5,6,7,8,9,10,11,12,13,14,15,16,17];

var ign = L.tileLayer.wms('http://mapsref.brgm.fr/wxs/refcom-brgm/refign', { layers : 'FONDS_SCAN', format: 'image/png' });

var relief_base = L.tileLayer('https://gabriel.landais.org/relief/{z}/{x}/{y}.png', { nativeZooms: [10,11,12,13], tms : true });
var gravel = L.tileLayer('https://a.tiles.mapbox.com/v4/glandais.71bb17c0/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZ2xhbmRhaXMiLCJhIjoiZGQxMDNjODBlN2ZkMDEyNjJjN2E5MjEzNzk2YWU0NDUifQ.YyPJXAyXxk0wuXB1DBqymg', { nativeZooms: osmZooms });

var relief = L.layerGroup([relief_base, gravel]);

var michelin = L.tileLayer('https://foil.fr/magic/magicCache/{z}/{x}/{y}.png', { nativeZooms: [10,11,12] });

var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { nativeZooms: osmZooms });
var mb_out = L.tileLayer('https://api.mapbox.com/v4/mapbox.outdoors/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZ2xhbmRhaXMiLCJhIjoiZGQxMDNjODBlN2ZkMDEyNjJjN2E5MjEzNzk2YWU0NDUifQ.YyPJXAyXxk0wuXB1DBqymg', { nativeZooms: osmZooms });
var mb_rbh = L.tileLayer('https://api.mapbox.com/v4/mapbox.run-bike-hike/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZ2xhbmRhaXMiLCJhIjoiZGQxMDNjODBlN2ZkMDEyNjJjN2E5MjEzNzk2YWU0NDUifQ.YyPJXAyXxk0wuXB1DBqymg', { nativeZooms: osmZooms });
var ocm = L.tileLayer('http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png', { nativeZooms: osmZooms });

var gglRod_base = new L.Google('ROADMAP');
var gglHyb_base = new L.Google('HYBRID');
var gglSat_base = new L.Google('SATELLITE');

var gglRod = L.layerGroup([gglRod_base]);
var gglSat = L.layerGroup([gglSat_base]);
var gglSat_osm = L.layerGroup([gglSat_base, gravel]);

var gglTer = new L.Google('TERRAIN');

ocm.addTo(map);

var baseMaps = {
    "OSM velo": ocm,
    "IGN": ign,
    "Michelin": michelin,
    "Relief": relief,
    "Satellite": gglSat,
    "Hybride": gglSat_osm,
    "OSM classique": osm,
    "Google": gglRod,
};
var overlayMaps = {};

        var style = {color:'purple', opacity: 0.5, fillOpacity: 0.5, weight: 6, clickable: false};
        var stylePoint = {color:'purple', opacity: 0.5, fillOpacity: 0.5, weight: 2, clickable: false};
        L.Control.FileLayerLoad.LABEL = '<i class="fa fa-folder-open"></i>';
        L.Control.fileLayerLoad({
            fitBounds: true,
            layerOptions: {style: style,
                           pointToLayer: function (data, latlng) {
                              return L.circleMarker(latlng, {style: stylePoint});
                           }},
        }).addTo(map);

L.control.layers(baseMaps, overlayMaps, { collapsed : false }).addTo(map);

var geocoder = L.Control.Geocoder.nominatim();
var graphhopper = L.Routing.graphHopper('7332d40a-d369-4462-9663-e30f61853b52', {urlParameters: {vehicle: 'racingbike'}} );
var lineOptions = {styles : [{color: 'black', opacity: 0.15, weight: 9}, {color: 'white', opacity: 0.5, weight: 8}, {color: 'red', opacity: 0.5, weight: 6}]};

var router = L.Routing.control({
    reverseWaypoints : true,
    geocoder: geocoder,
    router: graphhopper,
    lineOptions: lineOptions
}).addTo(map);

L.easyButton('fa-save', function(btn, map) {
  var features = [];
  var geojson = {
                  "type": "FeatureCollection",
                  "features": features
                };
  router.getRouter().route(router.getWaypoints(),
        function(e, res) {
                for (r of res) {
var coords = r.coordinates;
var coords2 = coords.map(function(c) { return [c.lng, c.lat];});
                        features.push(
                    {
                      "type": "Feature",
                      "properties": {
                       "name": "route"
                      },
                      "geometry": {
                        "type": "LineString",
                        "coordinates": coords2
                      }
                    }
                        );
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
}).addTo(map);

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

