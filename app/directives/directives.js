/**
 * Directives
 */

ekk.directive('headerDirective',function () {
    return {
        restrict: 'AECM',
        templateUrl: 'directives/header/header.html',
        replace: true
    }
});


ekk.directive('agreementOwlItem',function () {
    return {
        restrict: 'AECM',
        templateUrl: 'directives/owl-directives/agreement-owl-item.html',
        replace: true,
        scope: {
            owlData : '='
        }
    }
});
