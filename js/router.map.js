var map = L.map('map', {
    zooms: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
    fullscreenControl: true
});
var controlLayers;

if (!location.hash && !map.restoreView()) {
    map.setView([46.6, 2.5], 6);
}

var osmZooms = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
var ignApiKey = "3x4sxz6b9nq23h4bvle9cw9k";
var ignLayerMaps = "GEOGRAPHICALGRIDSYSTEMS.MAPS";
var ignWmtsUrl = "https://wxs.ign.fr/" + ignApiKey + "/geoportail/wmts";
var ignMaps = new L.TileLayer.WMTS(ignWmtsUrl,
    {
        layer: ignLayerMaps,
        style: "normal",
        tilematrixSet: "PM",
        format: "image/jpeg",
        attribution: "<a href='http://www.ign.fr'>IGN</a>"
    }
);
ignLayerMaps = "ORTHOIMAGERY.ORTHOPHOTOS";
var ignOrtho = new L.TileLayer.WMTS(ignWmtsUrl,
    {
        layer: ignLayerMaps,
        style: "normal",
        tilematrixSet: "PM",
        format: "image/jpeg",
        attribution: "<a href='http://www.ign.fr'>IGN</a>"
    }
);

var ignEsMaps = new L.TileLayer.WMTS("https://www.ign.es/wmts/mapa-raster",
    {
        layer: "MTN",
        style: "normal",
        tilematrixSet: "GoogleMapsCompatible",
        format: "image/jpeg",
        attribution: "<a href='http://www.ign.es'>IGN</a>"
    }
);

// var vector_osm = L.tileLayer('https://a.tiles.mapbox.com/v4/glandais.71bb17c0/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZ2xhbmRhaXMiLCJhIjoiZGQxMDNjODBlN2ZkMDEyNjJjN2E5MjEzNzk2YWU0NDUifQ.YyPJXAyXxk0wuXB1DBqymg', {
//     nativeZooms: osmZooms
// });
var vector_osm = L.tileLayer('https://api.mapbox.com/v4/mapbox.light/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZ2xhbmRhaXMiLCJhIjoiZGQxMDNjODBlN2ZkMDEyNjJjN2E5MjEzNzk2YWU0NDUifQ.YyPJXAyXxk0wuXB1DBqymg', {
    nativeZooms: osmZooms
});

var relief_base = L.tileLayer('https://gabriel.landais.org/relief/{z}/{x}/{y}.png', {
    nativeZooms: [10, 11, 12, 13],
    tms: true
});
var relief = L.layerGroup([relief_base, vector_osm]);

var michelin_base = L.tileLayer('https://n-peloton.fr/magic/magicCache/{z}/{x}/{y}.png', {
    nativeZooms: [10, 11, 12]
});

var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    nativeZooms: osmZooms
});
var opentopomap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    nativeZooms: osmZooms
});
var mb_out = L.tileLayer('https://api.mapbox.com/v4/mapbox.outdoors/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZ2xhbmRhaXMiLCJhIjoiZGQxMDNjODBlN2ZkMDEyNjJjN2E5MjEzNzk2YWU0NDUifQ.YyPJXAyXxk0wuXB1DBqymg', {
    nativeZooms: osmZooms
});
var ocm = L.tileLayer('https://{s}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=eb3d81660e5a465aacc7082bce749c3b', {
    nativeZooms: osmZooms
});
var stravaHeat = L.tileLayer('https://heatmap-external-a.strava.com/tiles-auth/ride/bluered/{z}/{x}/{y}.png', {
    nativeZooms: osmZooms
});

var gglRod_base = new L.Google('ROADMAP');
var gglHyb_base = new L.Google('HYBRID');
var gglSat_base = new L.Google('SATELLITE');

var michelin = L.layerGroup([ocm, michelin_base]);
var gglRod = L.layerGroup([gglRod_base]);
var gglSat = L.layerGroup([gglSat_base]);
var gglHyb = L.layerGroup([gglHyb_base]);

var gglTer = new L.Google('TERRAIN');

var bingSat_base = new L.BingLayer("AgHlyAnXLnTHypaYDwxsl5QdRNoq3eP2nLq9pMzeiY3QRYf0MirqvjMhduBs-5hl", { type: "Aerial" });
var bingSat = L.layerGroup([bingSat_base]);
var bingMix_base = new L.BingLayer("AgHlyAnXLnTHypaYDwxsl5QdRNoq3eP2nLq9pMzeiY3QRYf0MirqvjMhduBs-5hl", { type: "AerialWithLabels" });
var bingMix = L.layerGroup([bingMix_base]);

ocm.addTo(map);

var baseMaps = {
    "OSM velo": ocm,
    "OSM classique": osm,
    "OpenTopoMap": opentopomap,
    "Outdoors": mb_out,
    "IGN cartes": ignMaps,
    "Michelin": michelin,
    "Google Maps": gglRod,
    "IGN Espagne": ignEsMaps,
    "Relief": relief,
    "Google Satellite": gglSat,
    "Google Hybride": gglHyb,
    "IGN Ortho": ignOrtho,
    "Bing satellite": bingSat,
    "Bing hybride": bingMix,
};
var overlayMaps = {
    "Strava heat map": stravaHeat
};

var allMaps = {
    "ocm": ocm,
    "osm": osm,
    "otm": opentopomap,
    "ignFr": ignMaps,
    "michelinfr": michelin,
    "gglRod": gglRod,
    "ignEs": ignEsMaps,
    "relief": relief,
    "gglSat": gglSat,
    "gglHyb": gglHyb,
    "ignOrtho": ignOrtho,
    "bingSat": bingSat,
    "bingMix": bingMix,
    "stravaHeat": stravaHeat
};
var hash = new L.Hash(map, allMaps);

controlLayers = L.control.layers(baseMaps, overlayMaps);
controlLayers.addTo(map);

map.loadGpx();
var graphicScale = L.control.graphicScale().addTo(map);
L.control.locate({
    position: "topright",
    locateOptions: {
        enableHighAccuracy: true
    }
}).addTo(map);//.start();

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
