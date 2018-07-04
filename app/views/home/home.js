'use strict';

angular.module('ekk.home', ['ngRoute', 'ngSanitize', 'angular-parallax', 'ocNgRepeat', 'duScroll', 'dm.stickyNav', 'ui.bootstrap', 'vcRecaptcha','pdf','angular-progress-button-styles'])

    .config(function(progressButtonConfigProvider) {
        progressButtonConfigProvider.profile('validateProfile', {
            style: 'fill',
            direction: 'horizontal'
        });
    })
    .controller('homeCtrl', ['$scope', '$document', '$rootScope', 'pdfDelegate', function ($scope, $document, $rootScope, pdfDelegate) {



        /**
         * @loading
         */
        $rootScope.loading = true;

        /**
         * @backTop
         */
        $document.on('scroll', function () {
            if ($document.scrollTop() > 1000) {
                $('.back-top').fadeIn();
            } else {
                $('.back-top').fadeOut();
            }
        });
        /**
         * @ng-sticky: add sticky class to header
         */
        $document.on('scroll', function () {
            if ($document.scrollTop() > 300) {
                if (!$('.header_top').hasClass('ng-sticky-fixed')) {
                    $('.header_top').addClass('ng-sticky-fixed');
                }
            } else {
                if ($('.header_top').hasClass('ng-sticky-fixed')) {
                    $('.header_top').removeClass('ng-sticky-fixed');
                }
            }
        });

        /**
         * @scrollToElem
         */
        $rootScope.scrollToElem = function (event) {
            var elem = $($(event.target).attr("href"));
            $document.scrollToElementAnimated(elem);

        };

        /**
         * @presentation
         */

        $scope.presentation = {
            title: "EKK : ÉTABLISSEMENT KHALED KOBBI",
            sub_title: "Construction de routes et de ponts, Construction hydraulique, pour l'assainissement et les barrages.",
            description: "On sait depuis longtemps que travailler avec du texte lisible et contenant du sens est source de distractions, et empêche de se concentrer sur la mise en page elle-même. L'avantage du Lorem Ipsum sur un texte générique comme 'Du texte. Du texte. Du texte.' est qu'il possède une distribution de lettres plus ou moins normale, et en tout cas comparable avec celle du français standard. De nombreuses suites logicielles de mise en page ou éditeurs de sites Web ont fait du Lorem Ipsum leur faux texte par défaut, et une recherche pour 'Lorem Ipsum' vous conduira vers de nombreux sites qui n'en sont encore qu'à leur phase de construction. Plusieurs versions sont apparues avec le temps, parfois par accident, souvent intentionnellement (histoire d'y rajouter de petits clins d'oeil, voire des phrases embarassantes).",
            image: {
                src: 'img_intro.jpg',
                alt: 'Image Intro'
            }
        };

        /**
         * @INFRASTRUCTURE ET RESSOURCES
         */

        $scope.infrastructure = {
            title: "INFRASTRUCTURE",
            sub_title: "EKK DISPOSE D'INSTALLATIONS SITUÉES SUR UN TERRAIN QUI LUI APPARTIENT.",
            image: {
                src: "icon1_infra.png",
                alt: "icon infrastructure"
            },
            domains: [
                {
                    number: 1,
                    name: "Carrière"
                },
                {
                    number: 2,
                    name: "Centrale à Beton"
                },
                {
                    number: 3,
                    name: "Centrale Beton Bitumineux"
                },
                {
                    number: 1,
                    name: "Centrale GRH"
                }
            ]
        };
        $scope.equipments = {
            title: "ÉQUIPEMENT",
            image: {
                src: "icon1_infra.png",
                alt: "icon infrastructure"
            },
            domains: [
                {
                    number: 5,
                    name: "Portes chars"
                },
                {
                    number: 80,
                    name: "Camions et semi remorque"
                },
                {
                    number: 50,
                    name: "Pelles et chargeuses"
                },
                {
                    number: 4,
                    name: "Bull dozer"
                },
                {
                    number: 25,
                    name: "Niveleuses"
                },
                {
                    number: 12,
                    name: "Finisseurs et repandeuses"
                },
                {
                    number: 34,
                    name: "Cylindres et compacteurs"
                }
            ]
        };

        /**
         * @personel : Objects array => personel details
         */
        $scope.personnels = [
            {
                over: false,
                count: 80,
                department: 'Cadres techniques'
            },
            {
                over: false,
                count: 40,
                department: 'Cadres techniques'
            },
            {
                over: true,
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

    .controller('PopupCont', ['$scope','$uibModalInstance','pdfDelegate',function ($scope, $uibModalInstance,pdfDelegate) {
        $scope.close = function () {
            $uibModalInstance.dismiss('cancel');
        };
        $scope.agreement = 'assets/pdf/agreement.pdf';

        $scope.pdfUrl = $scope.agreement;
    }])

    .filter('convertToMonth', function () {
        return function (data) {
            var output;
            switch (data) {
                case 1:
                    output = 'JAN';
                    break;
                case 2:
                    output = 'FEB';
                    break;
                case 3:
                    output = 'MAR';
                    break;
                case 4:
                    output = 'APR';
                    break;
                case 5:
                    output = 'MAY';
                    break;
                case 6:
                    output = 'JUN';
                    break;
                case 7:
                    output = 'JUL';
                    break;
                case 8:
                    output = 'AUG';
                    break;
                case 9:
                    output = 'SEP';
                    break;
                case 10:
                    output = 'OCT';
                    break;
                case 11:
                    output = 'NOV';
                    break;
                case 12:
                    output = 'DEC';
                    break;
                default:
                    output = 'JAN';
            }
            return output;
        }
    })

    .value('duScrollOffset', 63)

    .directive( 'ready', function( $parse , $rootScope,$timeout) {
        return {
            restrict: 'A',
            link: function( $scope, elem, attrs ) {
                $(window).bind("load", function() {
                    //$scope.$apply(function(){
                        console.log('ready directive');
                        $rootScope.loading = false;
                    //})
                })
                $scope.$on('$viewContentLoaded', function(event) {
                    $timeout(function() {
                        console.log('ready directive');
                        $rootScope.loading = false;
                    });
                });
            }
        }
    })

    .directive('agreements', function () {
        return {
            restrict: 'E',
            templateUrl: 'directives/agreement/agreement.html',
            replace: true,
            link: function (scope, element, attrs) {

                /**
                 * @certifications : Objects array => certifications details
                 */
                scope.certifications = [
                    {
                        id: 1,
                        img_src: 'icon_categories2.png',
                        img_alt: 'certifications 1',
                        description: 'ISO 9001 CERTIFIED'
                    },
                    {
                        id: 2,
                        img_src: 'icon_categories.png',
                        img_alt: 'certifications 2',
                        description: 'LES 8 AGREEMENTS DE L’ENTREPRISE'

                    }
                ];

                scope.carouselInitializer = function () {
                    $("#agreements-carousel").owlCarousel({
                        items: 1,
                        autoplay: true,
                        loop: true,
                        autoplaySpeed : 1000,
                        navSpeed: 10000
                    });
                };


            }
        }
    })

    .directive('agreementOwlItem', function ($uibModal) {
        return {
            restrict: 'AECM',
            templateUrl: 'directives/owl-directives/agreement-owl-item.html',
            replace: true,
            scope: {
              owlData: '='
            },
            controller: ['$scope','$uibModal', function ($scope, $uibModal) {
                $scope.open = function () {
                    console.log('opening pop up', $scope.owlData.id );
                    var modalName= 'modal'+$scope.owlData.id +'.html';
                    var modalInstance = $uibModal.open({
                        templateUrl: 'directives/modal/' + modalName,
                        controller : 'PopupCont'
                    });
                };

            }]
        }
    })

    .directive('personnelOwlItem', function ($timeout) {
        return {
            restrict: 'AECM',
            templateUrl: 'directives/owl-directives/personnel-owl-item.html',
            replace: true,
            scope: {
                owlData: '='
            },
            link: function (scope, element, attrs) {
                $timeout(function () {
                    element.find('.counter').counterUp({
                        delay: 10,
                        time: 2000
                    });
                });
            }
        }
    })

    .directive('stickyHeader', function ($timeout) {

        return {
            restrict: 'AE',
            templateUrl: 'directives/header/header.html',
            replace: true,
            controller: ['$scope', '$rootScope', function ($scope, $rootScope) {
                $scope.slides = [
                    {
                        name: 'Établissement KHALED KOBBI',
                        caption: 'Le plus efficace!',
                        image: 'slid1.jpg',
                        description: 'Our goal then and now is to provide quality on time projects'
                    },
                    {
                        name: 'Établissement KHALED KOBBI',
                        caption: 'Le plus efficace!',
                        image: 'slid2.jpg',
                        description: 'Our goal then and now is to provide quality on time projects'
                    },
                    {
                        name: 'Établissement KHALED KOBBI',
                        caption: 'Le plus efficace!',
                        image: 'slid3.jpg',
                        description: 'Our goal then and now is to provide quality on time projects'
                    },
                    {
                        name: 'Établissement KHALED KOBBI',
                        caption: 'Le plus efficace!',
                        image: 'slid4.jpg',
                        description: 'Our goal then and now is to provide quality on time projects'
                    },
                    {
                        name: 'Établissement KHALED KOBBI',
                        caption: 'Le plus efficace!',
                        image: 'slid5.jpg',
                        description: 'Our goal then and now is to provide quality on time projects'
                    }
                ];
                $rootScope.menuList = [
                    {
                        href: 'presentation',
                        text: 'Présentation'
                    }, {
                        href: 'portfolio',
                        text: 'Nos projects'
                    }, {
                        href: 'infrastructure',
                        text: 'INFRASTRUCTURE ET RESSOURCES'
                    }, {
                        href: 'contact',
                        text: 'Contact'
                    }
                ];

            }],
            link: function (scope, element, attrs) {
                $timeout(function () {
                    var bodyEl = document.body,
                        content = document.querySelector('body'),
                        openbtn = document.getElementById('open-button'),
                        closebtn = document.getElementById('close-button'),
                        menuItems = $('.icon-list a'),
                        isOpen = false;

                    function init() {
                        initEvents();
                    }

                    function initEvents() {
                        openbtn.addEventListener('click', toggleMenu);
                        if (closebtn) {
                            closebtn.addEventListener('click', toggleMenu);
                        }

                    }


                    function toggleMenu() {
                        if (isOpen) {
                            classie.remove(bodyEl, 'show-menu');
                        } else {
                            classie.add(bodyEl, 'show-menu');
                        }
                        isOpen = !isOpen;
                    }

                    init();

                    menuItems.on('click', function (event) {
                        event.preventDefault();
                        /* Act on the event */
                        toggleMenu();
                    });
                })


            }
        }
    })

    .directive('portfolio', function ($timeout) {
        return {
            restrict: 'AE',
            templateUrl: 'directives/portfolio/portfolio.html',
            replace: true,
            controller: ['$scope', '$timeout', function ($scope, $timeout) {

                /**
                 * @portfolio
                 */

                $scope.firstSlide = [
                    {
                        id: 1,
                        projectName: 'Travaux de mise en 2x2 voies de la Route RN5 entre la RR38 et la Sortie Ouest (du PK4 au PK10 + 600)',
                        location: 'MEHAT - D.R. Tunis',
                        date: {
                            month: 2,
                            year: 2008
                        },
                        informations: [
                            {
                                title: 'Date de commencement',
                                description: 'Aout 06'
                            },
                            {
                                title: 'Date d’achèvement',
                                description: 'Janvier 08'
                            },
                            {
                                title: 'Longeur',
                                description: '15,8'
                            },
                            {
                                title: 'Montant',
                                description: '12 225 M.DT'
                            }
                        ],
                        image: {
                            src: 'img0.jpg',
                            alt: 'Image 1'
                        },
                        category: 'inprogress',
                        estimatedEnd: {
                            date: {
                                month: 1,
                                year: 2020
                            }
                        }
                    },
                    {
                        id: 2,
                        projectName: 'Travaux de mise en 2x2 voies de la Route RN5 entre la RR38 et la Sortie Ouest (du PK4 au PK10 + 600)',
                        location: 'MEHAT - D.R. Tunis',
                        date: {
                            month: 10,
                            year: 2008
                        },
                        informations: [
                            {
                                title: 'Date de commencement',
                                description: 'Aout 06'
                            },
                            {
                                title: 'Date d’achèvement',
                                description: 'Janvier 08'
                            },
                            {
                                title: 'Longeur',
                                description: '15,8'
                            },
                            {
                                title: 'Montant',
                                description: '12 225 M.DT'
                            }
                        ],
                        image: {
                            src: 'img1.jpg',
                            alt: 'Image 2'
                        },
                        category: 'inprogress',
                        estimatedEnd: {
                            date: {
                                month: 1,
                                year: 2020
                            }
                        }
                    },
                    {
                        id: 3,
                        projectName: 'Travaux de mise en 2x2 voies de la Route RN5 entre la RR38 et la Sortie Ouest (du PK4 au PK10 + 600)',
                        location: 'MEHAT - D.R. Tunis',
                        date: {
                            month: 10,
                            year: 2008
                        },
                        informations: [
                            {
                                title: 'Date de commencement',
                                description: 'Aout 06'
                            },
                            {
                                title: 'Date d’achèvement',
                                description: 'Janvier 08'
                            },
                            {
                                title: 'Longeur',
                                description: '15,8'
                            },
                            {
                                title: 'Montant',
                                description: '12 225 M.DT'
                            }
                        ],
                        image: {
                            src: 'img2.jpg',
                            alt: 'Image 3'
                        },
                        category: 'inprogress',
                        estimatedEnd: {
                            date: {
                                month: 1,
                                year: 2020
                            }
                        }
                    },
                    {
                        id: 4,
                        projectName: 'Travaux de mise en 2x2 voies de la Route RN5 entre la RR38 et la Sortie Ouest (du PK4 au PK10 + 600)',
                        location: 'MEHAT - D.R. Tunis',
                        date: {
                            month: 10,
                            year: 2008
                        },
                        informations: [
                            {
                                title: 'Date de commencement',
                                description: 'Aout 06'
                            },
                            {
                                title: 'Date d’achèvement',
                                description: 'Janvier 08'
                            },
                            {
                                title: 'Longeur',
                                description: '15,8'
                            },
                            {
                                title: 'Montant',
                                description: '12 225 M.DT'
                            }
                        ],
                        image: {
                            src: 'img3.jpg',
                            alt: 'Image 4'
                        },
                        category: 'inprogress',
                        estimatedEnd: {
                            date: {
                                month: 1,
                                year: 2020
                            }
                        }
                    },
                    {
                        id: 5,
                        projectName: 'Travaux de mise en 2x2 voies de la Route RN5 entre la RR38 et la Sortie Ouest (du PK4 au PK10 + 600)',
                        location: 'MEHAT - D.R. Tunis',
                        date: {
                            month: 10,
                            year: 2008
                        },
                        informations: [
                            {
                                title: 'Date de commencement',
                                description: 'Aout 06'
                            },
                            {
                                title: 'Date d’achèvement',
                                description: 'Janvier 08'
                            },
                            {
                                title: 'Longeur',
                                description: '15,8'
                            },
                            {
                                title: 'Montant',
                                description: '12 225 M.DT'
                            }
                        ],
                        image: {
                            src: 'img4.jpg',
                            alt: 'Image 5'
                        },
                        category: 'inprogress',
                        estimatedEnd: {
                            date: {
                                month: 1,
                                year: 2020
                            }
                        }
                    },
                    {
                        id: 6,
                        projectName: 'Travaux de mise en 2x2 voies de la Route RN5 entre la RR38 et la Sortie Ouest (du PK4 au PK10 + 600)',
                        location: 'MEHAT - D.R. Tunis',
                        date: {
                            month: 10,
                            year: 2008
                        },
                        informations: [
                            {
                                title: 'Date de commencement',
                                description: 'Aout 06'
                            },
                            {
                                title: 'Date d’achèvement',
                                description: 'Janvier 08'
                            },
                            {
                                title: 'Longeur',
                                description: '15,8'
                            },
                            {
                                title: 'Montant',
                                description: '12 225 M.DT'
                            }
                        ],
                        image: {
                            src: 'img5.jpg',
                            alt: 'Image 6'
                        },
                        category: 'inprogress',
                        estimatedEnd: {
                            date: {
                                month: 1,
                                year: 2020
                            }
                        }
                    },
                    {
                        id: 7,
                        projectName: 'Travaux de mise en 2x2 voies de la Route RN5 entre la RR38 et la Sortie Ouest (du PK4 au PK10 + 600)',
                        location: 'MEHAT - D.R. Tunis',
                        date: {
                            month: 10,
                            year: 2008
                        },
                        informations: [
                            {
                                title: 'Date de commencement',
                                description: 'Aout 06'
                            },
                            {
                                title: 'Date d’achèvement',
                                description: 'Janvier 08'
                            },
                            {
                                title: 'Longeur',
                                description: '15,8'
                            },
                            {
                                title: 'Montant',
                                description: '12 225 M.DT'
                            }
                        ],
                        image: {
                            src: 'img6.jpg',
                            alt: 'Image 7'
                        },
                        category: 'inprogress',
                        estimatedEnd: {
                            date: {
                                month: 1,
                                year: 2020
                            }
                        }
                    },
                    {
                        id: 8,
                        projectName: 'Travaux de mise en 2x2 voies de la Route RN5 entre la RR38 et la Sortie Ouest (du PK4 au PK10 + 600)',
                        location: 'MEHAT - D.R. Tunis',
                        date: {
                            month: 10,
                            year: 2008
                        },
                        informations: [
                            {
                                title: 'Date de commencement',
                                description: 'Aout 06'
                            },
                            {
                                title: 'Date d’achèvement',
                                description: 'Janvier 08'
                            },
                            {
                                title: 'Longeur',
                                description: '15,8'
                            },
                            {
                                title: 'Montant',
                                description: '12 225 M.DT'
                            }
                        ],
                        image: {
                            src: 'img0.jpg',
                            alt: 'Image 1'
                        },
                        category: 'inprogress',
                        estimatedEnd: {
                            date: {
                                month: 1,
                                year: 2020
                            }
                        }
                    },
                    {
                        id: 9,
                        projectName: 'Travaux de mise en 2x2 voies de la Route RN5 entre la RR38 et la Sortie Ouest (du PK4 au PK10 + 600)',
                        location: 'MEHAT - D.R. Tunis',
                        date: {
                            month: 10,
                            year: 2008
                        },
                        informations: [
                            {
                                title: 'Date de commencement',
                                description: 'Aout 06'
                            },
                            {
                                title: 'Date d’achèvement',
                                description: 'Janvier 08'
                            },
                            {
                                title: 'Longeur',
                                description: '15,8'
                            },
                            {
                                title: 'Montant',
                                description: '12 225 M.DT'
                            }
                        ],
                        image: {
                            src: 'img0.jpg',
                            alt: 'Image 1'
                        },
                        category: 'inprogress',
                        estimatedEnd: {
                            date: {
                                month: 1,
                                year: 2020
                            }
                        }
                    },
                    {
                        id: 10,
                        projectName: 'Travaux de mise en 2x2 voies de la Route RN5 entre la RR38 et la Sortie Ouest (du PK4 au PK10 + 600)',
                        location: 'MEHAT - D.R. Tunis',
                        date: {
                            month: 10,
                            year: 2008
                        },
                        informations: [
                            {
                                title: 'Date de commencement',
                                description: 'Aout 06'
                            },
                            {
                                title: 'Date d’achèvement',
                                description: 'Janvier 08'
                            },
                            {
                                title: 'Longeur',
                                description: '15,8'
                            },
                            {
                                title: 'Montant',
                                description: '12 225 M.DT'
                            }
                        ],
                        image: {
                            src: 'img0.jpg',
                            alt: 'Image 1'
                        },
                        category: 'inprogress',
                        estimatedEnd: {
                            date: {
                                month: 1,
                                year: 2020
                            }
                        }
                    },
                    {
                        id: 11,
                        projectName: 'Travaux de mise en 2x2 voies de la Route RN5 entre la RR38 et la Sortie Ouest (du PK4 au PK10 + 600)',
                        location: 'MEHAT - D.R. Tunis',
                        date: {
                            month: 10,
                            year: 2008
                        },
                        informations: [
                            {
                                title: 'Date de commencement',
                                description: 'Aout 06'
                            },
                            {
                                title: 'Date d’achèvement',
                                description: 'Janvier 08'
                            },
                            {
                                title: 'Longeur',
                                description: '15,8'
                            },
                            {
                                title: 'Montant',
                                description: '12 225 M.DT'
                            }
                        ],
                        image: {
                            src: 'img0.jpg',
                            alt: 'Image 1'
                        },
                        category: 'inprogress',
                        estimatedEnd: {
                            date: {
                                month: 1,
                                year: 2020
                            }
                        }
                    },
                    {
                        id: 12,
                        projectName: 'Travaux de mise en 2x2 voies de la Route RN5 entre la RR38 et la Sortie Ouest (du PK4 au PK10 + 600)',
                        location: 'MEHAT - D.R. Tunis',
                        date: {
                            month: 10,
                            year: 2008
                        },
                        informations: [
                            {
                                title: 'Date de commencement',
                                description: 'Aout 06'
                            },
                            {
                                title: 'Date d’achèvement',
                                description: 'Janvier 08'
                            },
                            {
                                title: 'Longeur',
                                description: '15,8'
                            },
                            {
                                title: 'Montant',
                                description: '12 225 M.DT'
                            }
                        ],
                        image: {
                            src: 'img0.jpg',
                            alt: 'Image 1'
                        },
                        category: 'inprogress',
                        estimatedEnd: {
                            date: {
                                month: 1,
                                year: 2020
                            }
                        }
                    },
                    {
                        id: 13,
                        projectName: 'Travaux de mise en 2x2 voies de la Route RN5 entre la RR38 et la Sortie Ouest (du PK4 au PK10 + 600)',
                        location: 'MEHAT - D.R. Tunis',
                        date: {
                            month: 10,
                            year: 2008
                        },
                        informations: [
                            {
                                title: 'Date de commencement',
                                description: 'Aout 06'
                            },
                            {
                                title: 'Date d’achèvement',
                                description: 'Janvier 08'
                            },
                            {
                                title: 'Longeur',
                                description: '15,8'
                            },
                            {
                                title: 'Montant',
                                description: '12 225 M.DT'
                            }
                        ],
                        image: {
                            src: 'img0.jpg',
                            alt: 'Image 1'
                        },
                        category: 'inprogress',
                        estimatedEnd: {
                            date: {
                                month: 1,
                                year: 2020
                            }
                        }
                    },
                    {
                        id: 14,
                        projectName: 'Travaux de mise en 2x2 voies de la Route RN5 entre la RR38 et la Sortie Ouest (du PK4 au PK10 + 600)',
                        location: 'MEHAT - D.R. Tunis',
                        date: {
                            month: 10,
                            year: 2008
                        },
                        informations: [
                            {
                                title: 'Date de commencement',
                                description: 'Aout 06'
                            },
                            {
                                title: 'Date d’achèvement',
                                description: 'Janvier 08'
                            },
                            {
                                title: 'Longeur',
                                description: '15,8'
                            },
                            {
                                title: 'Montant',
                                description: '12 225 M.DT'
                            }
                        ],
                        image: {
                            src: 'img0.jpg',
                            alt: 'Image 1'
                        },
                        category: 'inprogress',
                        estimatedEnd: {
                            date: {
                                month: 1,
                                year: 2020
                            }
                        }
                    }
                ];
                $scope.secondSlide = [
                    {
                        id: 1,
                        projectName: 'Travaux de mise en 2x2 voies de la Route RN5 entre la RR38 et la Sortie Ouest (du PK4 au PK10 + 600)',
                        location: 'MEHAT - D.R. Tunis',
                        date: {
                            month: 10,
                            year: 2008
                        },
                        informations: [
                            {
                                title: 'Date de commencement',
                                description: 'Aout 06'
                            },
                            {
                                title: 'Date d’achèvement',
                                description: 'Janvier 08'
                            },
                            {
                                title: 'Longeur',
                                description: '15,8'
                            },
                            {
                                title: 'Montant',
                                description: '12 225 M.DT'
                            }
                        ],
                        image: {
                            src: 'img0.jpg',
                            alt: 'Image 1'
                        },
                        category: 'done',
                        estimatedEnd: {
                            date: {
                                month: 1,
                                year: 2020
                            }
                        }
                    },
                    {
                        id: 2,
                        projectName: 'Travaux de mise en 2x2 voies de la Route RN5 entre la RR38 et la Sortie Ouest (du PK4 au PK10 + 600)',
                        location: 'MEHAT - D.R. Tunis',
                        date: {
                            month: 10,
                            year: 2008
                        },
                        informations: [
                            {
                                title: 'Date de commencement',
                                description: 'Aout 06'
                            },
                            {
                                title: 'Date d’achèvement',
                                description: 'Janvier 08'
                            },
                            {
                                title: 'Longeur',
                                description: '15,8'
                            },
                            {
                                title: 'Montant',
                                description: '12 225 M.DT'
                            }
                        ],
                        image: {
                            src: 'img0.jpg',
                            alt: 'Image 1'
                        },
                        category: 'done',
                        estimatedEnd: {
                            date: {
                                month: 1,
                                year: 2020
                            }
                        }
                    },
                    {
                        id: 3,
                        projectName: 'Travaux de mise en 2x2 voies de la Route RN5 entre la RR38 et la Sortie Ouest (du PK4 au PK10 + 600)',
                        location: 'MEHAT - D.R. Tunis',
                        date: {
                            month: 10,
                            year: 2008
                        },
                        informations: [
                            {
                                title: 'Date de commencement',
                                description: 'Aout 06'
                            },
                            {
                                title: 'Date d’achèvement',
                                description: 'Janvier 08'
                            },
                            {
                                title: 'Longeur',
                                description: '15,8'
                            },
                            {
                                title: 'Montant',
                                description: '12 225 M.DT'
                            }
                        ],
                        image: {
                            src: 'img0.jpg',
                            alt: 'Image 1'
                        },
                        category: 'done',
                        estimatedEnd: {
                            date: {
                                month: 1,
                                year: 2020
                            }
                        }
                    },
                    {
                        id: 4,
                        projectName: 'Travaux de mise en 2x2 voies de la Route RN5 entre la RR38 et la Sortie Ouest (du PK4 au PK10 + 600)',
                        location: 'MEHAT - D.R. Tunis',
                        date: {
                            month: 10,
                            year: 2008
                        },
                        informations: [
                            {
                                title: 'Date de commencement',
                                description: 'Aout 06'
                            },
                            {
                                title: 'Date d’achèvement',
                                description: 'Janvier 08'
                            },
                            {
                                title: 'Longeur',
                                description: '15,8'
                            },
                            {
                                title: 'Montant',
                                description: '12 225 M.DT'
                            }
                        ],
                        image: {
                            src: 'img0.jpg',
                            alt: 'Image 1'
                        },
                        category: 'done',
                        estimatedEnd: {
                            date: {
                                month: 1,
                                year: 2020
                            }
                        }
                    },
                    {
                        id: 5,
                        projectName: 'Travaux de mise en 2x2 voies de la Route RN5 entre la RR38 et la Sortie Ouest (du PK4 au PK10 + 600)',
                        location: 'MEHAT - D.R. Tunis',
                        date: {
                            month: 10,
                            year: 2008
                        },
                        informations: [
                            {
                                title: 'Date de commencement',
                                description: 'Aout 06'
                            },
                            {
                                title: 'Date d’achèvement',
                                description: 'Janvier 08'
                            },
                            {
                                title: 'Longeur',
                                description: '15,8'
                            },
                            {
                                title: 'Montant',
                                description: '12 225 M.DT'
                            }
                        ],
                        image: {
                            src: 'img0.jpg',
                            alt: 'Image 1'
                        },
                        category: 'done',
                        estimatedEnd: {
                            date: {
                                month: 1,
                                year: 2020
                            }
                        }
                    },
                    {
                        id: 6,
                        projectName: 'Travaux de mise en 2x2 voies de la Route RN5 entre la RR38 et la Sortie Ouest (du PK4 au PK10 + 600)',
                        location: 'MEHAT - D.R. Tunis',
                        date: {
                            month: 10,
                            year: 2008
                        },
                        informations: [
                            {
                                title: 'Date de commencement',
                                description: 'Aout 06'
                            },
                            {
                                title: 'Date d’achèvement',
                                description: 'Janvier 08'
                            },
                            {
                                title: 'Longeur',
                                description: '15,8'
                            },
                            {
                                title: 'Montant',
                                description: '12 225 M.DT'
                            }
                        ],
                        image: {
                            src: 'img0.jpg',
                            alt: 'Image 1'
                        },
                        category: 'done',
                        estimatedEnd: {
                            date: {
                                month: 1,
                                year: 2020
                            }
                        }
                    },
                    {
                        id: 7,
                        projectName: 'Travaux de mise en 2x2 voies de la Route RN5 entre la RR38 et la Sortie Ouest (du PK4 au PK10 + 600)',
                        location: 'MEHAT - D.R. Tunis',
                        date: {
                            month: 10,
                            year: 2008
                        },
                        informations: [
                            {
                                title: 'Date de commencement',
                                description: 'Aout 06'
                            },
                            {
                                title: 'Date d’achèvement',
                                description: 'Janvier 08'
                            },
                            {
                                title: 'Longeur',
                                description: '15,8'
                            },
                            {
                                title: 'Montant',
                                description: '12 225 M.DT'
                            }
                        ],
                        image: {
                            src: 'img0.jpg',
                            alt: 'Image 1'
                        },
                        category: 'done',
                        estimatedEnd: {
                            date: {
                                month: 1,
                                year: 2020
                            }
                        }
                    },
                    {
                        id: 8,
                        projectName: 'Travaux de mise en 2x2 voies de la Route RN5 entre la RR38 et la Sortie Ouest (du PK4 au PK10 + 600)',
                        location: 'MEHAT - D.R. Tunis',
                        date: {
                            month: 10,
                            year: 2008
                        },
                        informations: [
                            {
                                title: 'Date de commencement',
                                description: 'Aout 06'
                            },
                            {
                                title: 'Date d’achèvement',
                                description: 'Janvier 08'
                            },
                            {
                                title: 'Longeur',
                                description: '15,8'
                            },
                            {
                                title: 'Montant',
                                description: '12 225 M.DT'
                            }
                        ],
                        image: {
                            src: 'img0.jpg',
                            alt: 'Image 1'
                        },
                        category: 'done',
                        estimatedEnd: {
                            date: {
                                month: 1,
                                year: 2020
                            }
                        }
                    },
                    {
                        id: 9,
                        projectName: 'Travaux de mise en 2x2 voies de la Route RN5 entre la RR38 et la Sortie Ouest (du PK4 au PK10 + 600)',
                        location: 'MEHAT - D.R. Tunis',
                        date: {
                            month: 10,
                            year: 2008
                        },
                        informations: [
                            {
                                title: 'Date de commencement',
                                description: 'Aout 06'
                            },
                            {
                                title: 'Date d’achèvement',
                                description: 'Janvier 08'
                            },
                            {
                                title: 'Longeur',
                                description: '15,8'
                            },
                            {
                                title: 'Montant',
                                description: '12 225 M.DT'
                            }
                        ],
                        image: {
                            src: 'img0.jpg',
                            alt: 'Image 1'
                        },
                        category: 'done',
                        estimatedEnd: {
                            date: {
                                month: 1,
                                year: 2020
                            }
                        }
                    },
                    {
                        id: 10,
                        projectName: 'Travaux de mise en 2x2 voies de la Route RN5 entre la RR38 et la Sortie Ouest (du PK4 au PK10 + 600)',
                        location: 'MEHAT - D.R. Tunis',
                        date: {
                            month: 10,
                            year: 2008
                        },
                        informations: [
                            {
                                title: 'Date de commencement',
                                description: 'Aout 06'
                            },
                            {
                                title: 'Date d’achèvement',
                                description: 'Janvier 08'
                            },
                            {
                                title: 'Longeur',
                                description: '15,8'
                            },
                            {
                                title: 'Montant',
                                description: '12 225 M.DT'
                            }
                        ],
                        image: {
                            src: 'img0.jpg',
                            alt: 'Image 1'
                        },
                        category: 'done',
                        estimatedEnd: {
                            date: {
                                month: 1,
                                year: 2020
                            }
                        }
                    },
                    {
                        id: 11,
                        projectName: 'Travaux de mise en 2x2 voies de la Route RN5 entre la RR38 et la Sortie Ouest (du PK4 au PK10 + 600)',
                        location: 'MEHAT - D.R. Tunis',
                        date: {
                            month: 10,
                            year: 2008
                        },
                        informations: [
                            {
                                title: 'Date de commencement',
                                description: 'Aout 06'
                            },
                            {
                                title: 'Date d’achèvement',
                                description: 'Janvier 08'
                            },
                            {
                                title: 'Longeur',
                                description: '15,8'
                            },
                            {
                                title: 'Montant',
                                description: '12 225 M.DT'
                            }
                        ],
                        image: {
                            src: 'img0.jpg',
                            alt: 'Image 1'
                        },
                        category: 'done',
                        estimatedEnd: {
                            date: {
                                month: 1,
                                year: 2020
                            }
                        }
                    },
                    {
                        id: 12,
                        projectName: 'Travaux de mise en 2x2 voies de la Route RN5 entre la RR38 et la Sortie Ouest (du PK4 au PK10 + 600)',
                        location: 'MEHAT - D.R. Tunis',
                        date: {
                            month: 10,
                            year: 2008
                        },
                        informations: [
                            {
                                title: 'Date de commencement',
                                description: 'Aout 06'
                            },
                            {
                                title: 'Date d’achèvement',
                                description: 'Janvier 08'
                            },
                            {
                                title: 'Longeur',
                                description: '15,8'
                            },
                            {
                                title: 'Montant',
                                description: '12 225 M.DT'
                            }
                        ],
                        image: {
                            src: 'img0.jpg',
                            alt: 'Image 1'
                        },
                        category: 'done',
                        estimatedEnd: {
                            date: {
                                month: 1,
                                year: 2020
                            }
                        }
                    },
                    {
                        id: 13,
                        projectName: 'Travaux de mise en 2x2 voies de la Route RN5 entre la RR38 et la Sortie Ouest (du PK4 au PK10 + 600)',
                        location: 'MEHAT - D.R. Tunis',
                        date: {
                            month: 10,
                            year: 2008
                        },
                        informations: [
                            {
                                title: 'Date de commencement',
                                description: 'Aout 06'
                            },
                            {
                                title: 'Date d’achèvement',
                                description: 'Janvier 08'
                            },
                            {
                                title: 'Longeur',
                                description: '15,8'
                            },
                            {
                                title: 'Montant',
                                description: '12 225 M.DT'
                            }
                        ],
                        image: {
                            src: 'img0.jpg',
                            alt: 'Image 1'
                        },
                        category: 'done',
                        estimatedEnd: {
                            date: {
                                month: 1,
                                year: 2020
                            }
                        }
                    },
                    {
                        id: 14,
                        projectName: 'Travaux de mise en 2x2 voies de la Route RN5 entre la RR38 et la Sortie Ouest (du PK4 au PK10 + 600)',
                        location: 'MEHAT - D.R. Tunis',
                        date: {
                            month: 10,
                            year: 2008
                        },
                        informations: [
                            {
                                title: 'Date de commencement',
                                description: 'Aout 06'
                            },
                            {
                                title: 'Date d’achèvement',
                                description: 'Janvier 08'
                            },
                            {
                                title: 'Longeur',
                                description: '15,8'
                            },
                            {
                                title: 'Montant',
                                description: '12 225 M.DT'
                            }
                        ],
                        image: {
                            src: 'img0.jpg',
                            alt: 'Image 1'
                        },
                        category: 'done',
                        estimatedEnd: {
                            date: {
                                month: 1,
                                year: 2020
                            }
                        }
                    }
                ];
                $scope.portfolio = $scope.firstSlide;
                // Set active state & alternate between slides
                $scope.active = 1;
                $scope.activeSlide = function (active) {
                    $scope.active = active;
                };
                $scope.setActiveSlide1 = function (val) {
                    $scope.active = 1;
                    $scope.portfolio = $scope.firstSlide;
                    $timeout(function () {
                        $scope.swiper.destroy(true, true);
                        $scope.swiper = new $scope.slideInit;
                        $scope.swiper.slideTo(Math.floor($scope.swiper.bullets.length / 2));
                    });
                };
                $scope.setActiveSlide2 = function (val) {
                    $scope.active = 2;
                    $scope.portfolio = $scope.secondSlide;
                    $timeout(function () {
                        $scope.swiper.destroy(true, true);
                        $scope.swiper = new $scope.slideInit;
                        $scope.swiper.slideTo(Math.floor($scope.swiper.bullets.length / 2));
                    });
                };
            }],
            link: function (scope, element, attrs) {
                $timeout(function () {
                    scope.slideInit = function(){
                        return Swiper('.swiper-container', {
                            pagination: '.swiper-pagination',
                            scrollbar: '.swiper-scrollbar',
                            scrollbarDraggable: true,
                            scrollbarHide: false,
                            slidesPerView: 4,
                            slidesPerColumn: 2,
                            centeredSlides: true,
                            paginationClickable: true,
                            spaceBetween: 30,
                            grabCursor: true,
                            breakpoints: {
                                1199: {
                                    slidesPerView: 3,
                                    slidesPerColumn: 2,
                                },
                                991: {
                                    slidesPerView: 2,
                                    slidesPerColumn: 2,
                                },
                                768: {
                                    slidesPerView: 1,
                                    slidesPerColumn: 1,
                                    scrollbarDraggable: false,
                                }
                            }
                        });
                    };
                    scope.swiper = new scope.slideInit;
                    scope.swiper.slideTo(Math.floor(scope.swiper.bullets.length / 2));
                });
            }
        }
    })

    .directive('contactForm', function () {
        return {
            restrict: 'AE',
            templateUrl: 'directives/contact/contact.html',
            replace: false,
            controller: ['$q', '$scope','$timeout', function ($q, $scope, $timeout) {
                // console.log('controller', $scope);
                $scope.contactInfo = [
                    {
                        iconClass: "fa-map-marker",
                        title: "Adresse",
                        info: ["37, avenue habib Bourguiba, Ariana 2080,Tunisie."]
                    }, {
                        iconClass: "fa-phone",
                        title: "Téléphone",
                        info: [
                            "+216 71 703 811",
                            "+216 71 705 759"
                        ]
                    }, {
                        iconClass: "fa-envelope-o",
                        title: "E-mail",
                        info: ["contact@ekk-tunisie.com"]
                    }
                ];



                $scope.formFeilds = {
                    name: "",
                    lastName: "",
                    phone: "",
                    email: "",
                    subject: "",
                    message: ""
                };

                var formData = angular.copy($scope.formFeilds);

                $scope.preventDefault = function ($event) {
                    $event.preventDefault();
                };

                $scope.produceErrors = false;
                $scope.progressFunction = function($event) {
                    return $q(function(resolve, reject) {
                        $timeout(function() {
                            !$scope.produceErrors ? resolve() : reject();
                            console.log('progressFunction')
                            $scope.formFeilds = angular.copy(formData);
                            $scope.userForm.$setPristine();
                        }, 1500);
                    });
                };
            }],
            link: function (scope, element, attrs) {
                // console.log('link', scope.userForm)

            }
        }
    })

    .directive('langDropdown', function ($timeout) {
        return {
            restrict: 'AE',
            templateUrl: 'directives/header/language.html',
            replace: true,
            controller: ['$scope','$rootScope', function ($scope,$rootScope) {
                $scope.setActiveLang = function (lang) {
                    for (var i = 0, arrayLength = $rootScope.language.length - 1; i <= arrayLength; i++) {
                        if ($rootScope.language[i].langCode == lang.langCode) {
                            $rootScope.language[i].active = true;
                        } else {
                            $rootScope.language[i].active = false;
                        }
                    }
                };
                $rootScope.language = [
                    {
                        langCode: 'FR',
                        active: true
                    },
                    {
                        langCode: 'EN',
                        active: false
                    }
                ]
            }],
            link: function (scope, element, attrs) {
                $timeout(function () {
                    angular.element('.langue').hover(function () {
                        angular.element('.language-select').addClass('active')
                    },function () {
                        angular.element('.language-select').removeClass('active')
                    });
                })
            }
        }
    });