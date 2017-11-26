(function() {
    'use strict';

    angular
        .module( 'App' )
        .service( 'XHRService', [ '$http', 'ServiceURL', 'URLParams', '$routeParams', function( $http, ServiceURL, URLParams, $routeParams ) {
            var shotId;

            this.getShots = function( shotsPage ) {
                var getShotsURL = ServiceURL.getShotsURI
                    .replace( '{page}', URLParams.page + shotsPage )
                    .replace( '{perPage}', URLParams.perPage + '12' )
                    .replace( '{accessToken}',  URLParams.accessToken + localStorage.clientAccessToken );

                return $http.get( getShotsURL );
            };

            this.getShot = function() {
                shotId = $routeParams.id;

                var getCurrentShotURL = ServiceURL.getCurrentShotURI
                    .replace( '{id}', shotId )
                    .replace( '{accessToken}', URLParams.accessToken + localStorage.clientAccessToken );

                return $http.get( getCurrentShotURL );
            };

            this.likeShot = function() {
                var likeShotURL = ServiceURL.getLikeURI
                    .replace( '{id}', shotId )
                    .replace( '{accessToken}', URLParams.accessToken + localStorage.clientAccessToken );

                return $http.post( likeShotURL );
            };
        }]);
}());