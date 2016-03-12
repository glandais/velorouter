var map = L.map('map', {
    zooms: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21]
});

if (!map.restoreView()) {
    map.setView([46.6, 2.5], 6);
}

var hash = new L.Hash(map);
var graphicScale = L.control.graphicScale().addTo(map);	

var osmZooms = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];

var ign = L.tileLayer.wms('http://mapsref.brgm.fr/wxs/refcom-brgm/refign', {
    layers: 'FONDS_SCAN',
    format: 'image/png'
});

var vector_osm = L.tileLayer('https://a.tiles.mapbox.com/v4/glandais.71bb17c0/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZ2xhbmRhaXMiLCJhIjoiZGQxMDNjODBlN2ZkMDEyNjJjN2E5MjEzNzk2YWU0NDUifQ.YyPJXAyXxk0wuXB1DBqymg', {
    nativeZooms: osmZooms
});

var relief_base = L.tileLayer('https://gabriel.landais.org/relief/{z}/{x}/{y}.png', {
    nativeZooms: [10, 11, 12, 13],
    tms: true
});
var relief = L.layerGroup([relief_base, vector_osm]);

var michelin_base = L.tileLayer('https://foil.fr/magic/magicCache/{z}/{x}/{y}.png', {
    nativeZooms: [10, 11, 12]
});

var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    nativeZooms: osmZooms
});
var mb_out = L.tileLayer('https://api.mapbox.com/v4/mapbox.outdoors/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZ2xhbmRhaXMiLCJhIjoiZGQxMDNjODBlN2ZkMDEyNjJjN2E5MjEzNzk2YWU0NDUifQ.YyPJXAyXxk0wuXB1DBqymg', {
    nativeZooms: osmZooms
});
var mb_rbh = L.tileLayer('https://api.mapbox.com/v4/mapbox.run-bike-hike/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZ2xhbmRhaXMiLCJhIjoiZGQxMDNjODBlN2ZkMDEyNjJjN2E5MjEzNzk2YWU0NDUifQ.YyPJXAyXxk0wuXB1DBqymg', {
    nativeZooms: osmZooms
});
var ocm = L.tileLayer('http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png', {
    nativeZooms: osmZooms
});

var gglRod_base = new L.Google('ROADMAP');
var gglHyb_base = new L.Google('HYBRID');
var gglSat_base = new L.Google('SATELLITE');

var michelin = L.layerGroup([ocm, michelin_base]);
var gglRod = L.layerGroup([gglRod_base]);
var gglSat = L.layerGroup([gglSat_base]);
var gglSat_osm = L.layerGroup([gglSat_base, vector_osm]);

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

L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
}).addTo(map);

map.on('baselayerchange',function(e){
	var newLayer = e.layer;
	
});