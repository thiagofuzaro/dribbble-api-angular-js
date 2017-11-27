(function() {
    'use strict';

    angular
        .module( 'App' )
        .service( 'ShotListServices', [ 'XHRFactory', 'ServiceURL', 'URLParams', '$routeParams', function( XHRFactory, ServiceURL, URLParams, $routeParams ) {
            this.getShots = function( shotsPage ) {
                var getShotsURL = ServiceURL.getShotsURI
                    .replace( '{page}', URLParams.page + shotsPage )
                    .replace( '{perPage}', URLParams.perPage + '24' )
                    .replace( '{accessToken}',  URLParams.accessToken + localStorage.clientAccessToken );

                return XHRFactory.get( getShotsURL );
            };
        }]);
}());