(function() {
    'use strict';

    angular
        .module( 'App' )
        .controller( 'ShotCtrl', [ '$scope', 'XHRService', 'AlertMessages', function( $scope, XHRService, AlertMessages ) {
            $scope.shot = [];
            $scope.serviceFail = "";
            $scope.shotLiked = false;
            
            $scope.likeShot = likeShot;

            function init() {
                getShot();
            }

            function getShot() {
                XHRService.getShot()
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

                XHRService.likeShot()
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
