
 /**
 * Property: key
 *
 * The API key to use
 */
var APIkey= "5y8uj6lcncf69ar1ipqi57hh";


/**
 * Function: loadAPI
 * Load the configuration related with the API keys.
 * Called on "onload" event.
 * Call <initMap>() function to load the interface.
 */
function loadAPI() {
    // wait for all classes to be loaded
    // on attend que les classes soient chargées
    if (checkApiLoading('loadAPI();',['OpenLayers','Geoportal','Geoportal.Viewer','Geoportal.Viewer.Default'])===false) {
        return;
    }
    
    Geoportal.GeoRMHandler.getConfig([APIkey], null,null, {
        onContractsComplete: initMap
    });
}

// assign callback when "onload" event is fired
// assignation de la fonction à appeler lors de la levée de l'évènement "onload"
window.onload= loadAPI;
