(function() {
    'use strict';

    angular
        .module( 'App' )
        .controller( 'ShotListCtrl', [ '$scope', 'ShotListServices', 'AlertMessages', function( $scope, ShotListServices, AlertMessages ) {
            var shotsPage = 1;

            $scope.shots = [];
            $scope.shotSize = '';
            $scope.serviceFail = '';
            
            $scope.getShots = getShots;
            $scope.resizeShots = resizeShots;
            $scope.getMoreShots = getMoreShots;

            function init() {
                getShots();
            }

            function getShots() {
                ShotListServices.getShots( shotsPage )
                .then ( getShotsDone, getShotsFail );
            }

            function getShotsDone( response ) {
                var data = response.data;
                $scope.shots = $scope.shots.concat(data);
            }

            function getShotsFail( response ) {
                $scope.serviceFail = AlertMessages.shotsListFail;
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
