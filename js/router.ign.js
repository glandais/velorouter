
 /**
 * Property: key
 *
 * The API key to use
 */
var APIkey= "5y8uj6lcncf69ar1ipqi57hh";

/**
 * Function: checkApiLoading
 * Assess that needed classes have been loaded.
 *
 * Parameters:
 * retryClbk - {Function} function to call if any of the expected classes
 * is missing.
 * clss - {Array({String})} list of classes to check.
 *
 * Returns:
 * {Boolean} true when all needed classes have been loaded, false otherwise.
 */
function checkApiLoading(retryClbk,clss) {
    if (__Geoportal$timer!=null) {
        //clearTimeout: cancels the timer "__Geoportal$timer" before its end
        //clearTimeout: annule le minuteur "__Geoportal$timer" avant sa fin
        window.clearTimeout(__Geoportal$timer);
         __Geoportal$timer= null;
    }

    /**
    * It may happen that the init function is executed before the API is loaded
    * Addition of a timer code that waits 300 ms before running the init function
    *
    * Il se peut que l'init soit exécuté avant que l'API ne soit chargée
    * Ajout d'un code temporisateur qui attend 300 ms avant de relancer l'init
    */
    var f;
    for( var i=0, l= clss.length; i<l; i++) {
        try {
            eval('var f='+clss[i]);
        } catch (e) {
            f= undefined;
        }
        if (typeof(f)==='undefined') {
             __Geoportal$timer= window.setTimeout(retryClbk, 300);
            return false;
        }        
    }
    return true;
}


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
