var LoadGpxMixin = {
    loadGpx: function () {
        var storage = window.localStorage || {};
        if (!this.__initGpx) {
			var gpx = location.search;
			var query = window.location.search.substring(1);
			var vars = query.split('&');
			for (var i = 0; i < vars.length; i++) {
				var pair = vars[i].split('=');
				if (decodeURIComponent(pair[0]) === "gpx") {
					var map_gpx = this;
					new L.GPX(decodeURIComponent(pair[1]), {async: true}).on('loaded', function(e) {
						map_gpx.fitBounds(e.target.getBounds());
					}).addTo(map_gpx);
				}
			}
            this.__initGpx = true;
        }
    }
};

L.Map.include(LoadGpxMixin);
