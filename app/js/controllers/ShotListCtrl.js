(function() {
    'use strict';

    angular
        .module( 'App' )
        .controller( 'ShotListCtrl', [ '$scope', 'ServiceURL', 'XHRFactory', 'AlertMessages', 'URLParams', function( $scope, ServiceURL, XHRFactory, AlertMessages, URLParams ) {
            // variáveis
            var messages = AlertMessages,
                URLParams = URLParams,
                shotsPage = 1;

            // variáveis expostas
            $scope.shots = [];
            $scope.shotSize = "";
            $scope.serviceFail = "";
            
            // funções expostas
            $scope.getShots = getShots;
            $scope.resizeShots = resizeShots;
            $scope.getMoreShots = getMoreShots;

            function init() {
                getShots();
            }

            function getShots() {
                var getShotsURL = ServiceURL.getShotsURI
                .replace( '{page}', URLParams.page + shotsPage )
                .replace( '{perPage}', URLParams.perPage + '12' )
                .replace( '{accessToken}',  URLParams.accessToken + localStorage.clientAccessToken );

                XHRFactory
                .get( getShotsURL )
                .then ( getShotsDone, getShotsFail );
            }

            function getShotsDone( response ) {
                var data = response.data;
                $scope.shots = $scope.shots.concat(data);
            }

            function getShotsFail( response ) {
                $scope.serviceFail = messages.shotsListFail;
            }

            function getMoreShots() {
                shotsPage = shotsPage + 1;
                getShots();
            }

            function resizeShots( size ) {
                $scope.shotSize = size;
            }

            init();
        }]);
}());
