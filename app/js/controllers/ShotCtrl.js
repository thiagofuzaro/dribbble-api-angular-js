(function() {
    'use strict';

    angular
        .module( 'App' )
        .controller( 'ShotCtrl', [ '$scope', 'ShotServices', 'AlertMessages', function( $scope, ShotServices, AlertMessages ) {
            $scope.shot = [];
            $scope.serviceFail = '';
            $scope.shotLiked = false;
            
            $scope.likeShot = likeShot;

            function init() {
                getShot();
            }

            function getShot() {
                ShotServices.getShot()
                .then ( getCurrentShotDone, getCurrentShotFail );
            }

            function getCurrentShotDone( response ) {
                $scope.shot = response.data;
            }

            function getCurrentShotFail( response ) {
                $scope.serviceFail = AlertMessages.currentShotFail;
            }

            function likeShot() {
                $scope.shotLiked = true;

                ShotServices.likeShot()
                .then ( shotLikeDone, shotLikeFail );
            }

            function shotLikeDone( response ) {
                console.log( response );
            }

            function shotLikeFail( response ) {
                $scope.serviceFail = AlertMessages.likeShotFail;
            }

            init();
        }]);
}());
