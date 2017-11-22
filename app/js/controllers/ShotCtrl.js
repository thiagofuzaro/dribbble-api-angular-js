(function() {
    'use strict';

    angular
        .module( 'App' )
        .controller( 'ShotCtrl', [ '$scope', 'ServiceURL', 'XHRFactory', '$routeParams', 'AlertMessages', 'URLParams', function( $scope, ServiceURL, XHRFactory, $routeParams, AlertMessages, URLParams ) {
            // variáveis
            var shotId = $routeParams.id,
                messages = AlertMessages;

            // variáveis expostas
            $scope.shot = [];
            $scope.serviceFail = "";
            $scope.shotLiked = false;
            
            // funções expostas
            $scope.shotLike = shotLike;

            function init() {
                getCurrentShot();
            }

            function getCurrentShot() {
                var getCurrentShotURL = ServiceURL.getCurrentShotURI
                    .replace( '{id}', shotId )
                    .replace( '{accessToken}', URLParams.accessToken + localStorage.clientAccessToken );

                XHRFactory
                .get( getCurrentShotURL )
                .then ( getCurrentShotDone, getCurrentShotFail );
            }

            function getCurrentShotDone( response ) {
                $scope.shot = response.data;
            }

            function getCurrentShotFail( response ) {
                $scope.serviceFail = messages.currentShotFail;
            }

            function shotLike() {
                var shotLikeURL = ServiceURL.getLikeURI
                    .replace( '{id}', shotId )
                    .replace( '{accessToken}', URLParams.accessToken + localStorage.clientAccessToken );

                $scope.shotLiked = true;

                XHRFactory
                .post( shotLikeURL )
                .then ( shotLikeDone, shotLikeFail );
            }

            function shotLikeDone( response ) {
                console.log( response );
            }

            function shotLikeFail( response ) {
                $scope.serviceFail = messages.likeShotFail;
            }

            init();
        }]);
}());
