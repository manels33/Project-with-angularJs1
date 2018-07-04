'use strict';

angular.module('ekk.home', ['ngRoute', 'angular-parallax', 'ocNgRepeat','duScroll','dm.stickyNav'])

    .controller('homeCtrl', ['$scope', '$document', function ($scope, $document) {

        /**
         * @angularScroll
         */
        $scope.getElement = function () {

        };
        /**
         * @backTop
         */
        $document.on('scroll', function () {
            if($document.scrollTop() > 1000 ){
                $('.back-top').fadeIn();
            } else {
                $('.back-top').fadeOut();
            }
        });

        /**
         * @scrollToElem
         */
        $scope.scrollToElem = function(event) {
            console.log(event);
            var elem = $($(event.target).attr("href"));
            console.log(elem)
            $document.scrollToElementAnimated(elem);

        }


        /**
         * @certifications : Objects array => certifications details
         */
        $scope.certifications = [
            {
                img_src: 'icon_categories2.png',
                img_alt: 'certifications 1',
                description: 'ISO 9001 CERTIFIED'
            },
            {
                img_src: 'icon_categories.png',
                img_alt: 'certifications 2',
                description: 'LES 8 AGREEMENTS DE L’ENTREPRISE'

            }
        ];

        $scope.carouselInitializer = function () {
            $("#agreements-carousel").owlCarousel({
                items: 1,
                autoplay: true,
                loop: true
            });
        };


        /**
         * @personel : Objects array => personel details
         */
        $scope.personnels = [
            {
                over : false,
                count: 80,
                department: 'Cadres techniques'
            },
            {
                over : false,
                count: 40,
                department: 'Cadres techniques'
            },
            {
                over : true,
                count: 500,
                department: 'Cadres techniques'
            }
        ];

        $scope.carouselInitializer2 = function () {
            $("#owl_personels").owlCarousel({
                items: 3,
                dots: false,
                nav: false,
                mouseDrag: false,
                touchDrag: true,
                responsiveClass: true,
                responsive: {
                    // breakpoint from 0 up
                    0: {
                        items: 1,
                        nav: true
                    },
                    480: {
                        items: 2,
                        nav: true
                    },
                    767: {
                        items: 2,
                        nav: true
                    },
                    991: {
                        items: 3,
                        nav: false,
                        loop: false
                    }
                }
            });
        };

    }])

    .directive('agreementOwlItem', function () {
        return {
            restrict: 'AECM',
            templateUrl: 'directives/owl-directives/agreement-owl-item.html',
            replace: true,
            scope: {
                owlData: '='
            }
        }
    })

    .directive('personnelOwlItem', function () {
        return {
            restrict: 'AECM',
            templateUrl: 'directives/owl-directives/personnel-owl-item.html',
            replace: true,
            scope: {
                owlData: '='
            },
            link: function (scope, element, attrs) {
                element.find('.counter').counterUp({
                    delay: 10,
                    time: 2000
                });
            }
        }
    });
