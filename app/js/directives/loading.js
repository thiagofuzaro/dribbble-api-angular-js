(function() {
    'use strict';

    angular
        .module( 'App' )
        .directive( 'loading', [function() {
            return {
                restrict: 'E',
                templateUrl: '/templates/components/loading.html',
                link: function( scope, element, attrs ) {
                    var requests = 0;

                    scope.show = false;

                    scope.$on( 'loading:show', function() {
                        if ( requests === 0 ) {
                            scope.show = true;
                        }

                        requests++;
                    });
                    scope.$on( 'loading:hidden', function() {
                        if ( requests === 1 ) {
                            scope.show = false;
                            requests--;
                        } else if ( requests !== 0 ) {
                            requests--;
                        }
                    });
                }
            };
        }]);
}());
