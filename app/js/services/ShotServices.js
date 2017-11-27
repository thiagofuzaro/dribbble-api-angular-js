(function() {
    'use strict';

    angular
        .module( 'App' )
        .service( 'ShotServices', [ 'XHRFactory', 'ServiceURL', 'URLParams', '$routeParams', function( XHRFactory, ServiceURL, URLParams, $routeParams ) {
            var shotId;

            this.getShot = function() {
                shotId = $routeParams.id;

                var getCurrentShotURL = ServiceURL.getCurrentShotURI
                    .replace( '{id}', shotId )
                    .replace( '{accessToken}', URLParams.accessToken + localStorage.clientAccessToken );

                return XHRFactory.get( getCurrentShotURL );
            };

            this.likeShot = function() {
                var likeShotURL = ServiceURL.getLikeURI
                    .replace( '{id}', shotId )
                    .replace( '{accessToken}', URLParams.accessToken + localStorage.clientAccessToken );

                return XHRFactory.post( likeShotURL );
            };
        }]);
}());