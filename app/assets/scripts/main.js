+(function($) {
    $(document).ready(function() {



        /* =========================================================
         Back to top
         ============================================================ */

        $(".back-top").hide();
        // fade in #back-top

        $(function() {
            $(window).scroll(function() {
                if ($(this).scrollTop() > 1000) {
                    $('.back-top').fadeIn();
                } else {
                    $('.back-top').fadeOut();
                }
            });

            // scroll body to 0px on click
            $('.back-top a').click(function() {
                $('body,html').animate({
                    scrollTop: 0
                }, 600);
                return false;
            });

        });


        /* =========================================================
         Mobile Menu
         ============================================================ */
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

            // close the menu element if the target it´s not the menu element or one of its descendants..

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

        $('.icon-list a').on('click', function(event) {
            event.preventDefault();
            /* Act on the event */
            toggleMenu();
            var $anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: ($($anchor.attr('href')).offset().top)
            }, 1000, 'easeInOutExpo');

        });

        /* =========================================================
         scrollTo
         ============================================================ */

        $('a.scrollTo').bind('click', function(event) {
            event.preventDefault();
            var $anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: ($($anchor.attr('href')).offset().top)
            }, 1000, 'easeInOutExpo');
        });

        /* =========================================================
         formValidation
         ============================================================ */
        if (jQuery('.md-contact').length) {

            $('#contactForm').formValidation({
                framework: 'bootstrap',
                icon: {
                    valid: 'fa fa-check',
                    invalid: 'fa fa-times',
                    validating: 'fa fa-refresh'
                },
                addOns: {
                    reCaptcha2: {
                        element: 'captchaContainer',
                        theme: 'light',
                        siteKey: '6LdnmAgUAAAAABJKGyQ6peKB3z871HEdMQlV6trz',
                        timeout: 120,
                        message: 'captcha non valide'
                    }
                },
                err: {
                    container: 'popover'
                },
                fields: {
                    firstName: {
                        validators: {
                            notEmpty: {
                                message: "Ce champ est obligatoire"
                            }

                        }
                    },
                    lastName: {
                        validators: {
                            notEmpty: {
                                message: "Ce champ est obligatoire"
                            }

                        }
                    },
                    email: {
                        validators: {
                            notEmpty: {
                                message: "Ce champ est obligatoire"
                            },
                            regexp: {
                                regexp: '^[^@\\s]+@([^@\\s]+\\.)+[^@\\s]+$',
                                message: 'Addresse e-mail non valide'
                            }
                        }
                    },
                    phone: {
                        validators: {
                            notEmpty: {
                                message: "Ce champ est obligatoire"
                            }

                        }
                    },
                    subject: {
                        validators: {
                            notEmpty: {
                                message: "Ce champ est obligatoire"
                            }

                        }
                    },
                    message: {
                        validators: {
                            notEmpty: {
                                message: "Ce champ est obligatoire"
                            }

                        }
                    }
                }
            });
        };

        /* =========================================================
         owl-example
         ============================================================ */

        $("#owl-example").owlCarousel({
            items: 1,
            true: true
        });

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

        /* =========================================================
         counterUp
         ============================================================ */
        $('.counter').counterUp({
            delay: 10,
            time: 1000
        });


        /* =========================================================
         MitItUp
         ============================================================ */
        //mobile version - detect click event on filters tab
        var filter_tab_placeholder = $('.cd-tab-filter .placeholder a'),
            filter_tab_placeholder_default_value = 'Select',
            filter_tab_placeholder_text = filter_tab_placeholder.text();

        $('.cd-tab-filter li').on('click', function(event) {
            //detect which tab filter item was selected
            var selected_filter = $(event.target).data('type');

            //check if user has clicked the placeholder item
            if ($(event.target).is(filter_tab_placeholder)) {
                (filter_tab_placeholder_default_value == filter_tab_placeholder.text()) ? filter_tab_placeholder.text(filter_tab_placeholder_text): filter_tab_placeholder.text(filter_tab_placeholder_default_value);
                $('.cd-tab-filter').toggleClass('is-open');

                //check if user has clicked a filter already selected 
            } else if (filter_tab_placeholder.data('type') == selected_filter) {
                filter_tab_placeholder.text($(event.target).text());
                $('.cd-tab-filter').removeClass('is-open');

            } else {
                //close the dropdown and change placeholder text/data-type value
                $('.cd-tab-filter').removeClass('is-open');
                filter_tab_placeholder.text($(event.target).text()).data('type', selected_filter);
                filter_tab_placeholder_text = $(event.target).text();

                //add class selected to the selected filter item
                $('.cd-tab-filter .selected').removeClass('selected');
                $(event.target).addClass('selected');
            }
        });

        /************************************
            MitItUp filter settings
        *************************************/

        buttonFilter.init();
        $('.cd-gallery .wrapper').mixItUp({
            controls: {
                enable: false
            },
            callbacks: {
                onMixStart: function() {
                    $('.cd-fail-message').fadeOut(200);
                    $('.message').fadeIn(200);
                },
                onMixFail: function() {
                    $('.cd-fail-message').fadeIn(200);
                    $('.message').fadeOut(200);
                }
            }
        });
    });
    var buttonFilter = {
        // Declare any variables we will need as properties of the object
        $filters: null,
        groups: [],
        outputArray: [],
        outputString: '',

        // The "init" method will run on document ready and cache any jQuery objects we will need.
        init: function() {
            var self = this; // As a best practice, in each method we will asign "this" to the variable "self" so that it remains scope-agnostic. We will use it to refer to the parent "buttonFilter" object so that we can share methods and properties between all parts of the object.

            self.$filters = $('.cd-main-content');
            self.$container = $('.cd-gallery .wrapper');

            self.$filters.find('.cd-filters').each(function() {
                var $this = $(this);

                self.groups.push({
                    $inputs: $this.find('.filter'),
                    active: '',
                    tracker: false
                });
            });

            self.bindHandlers();
        },

        // The "bindHandlers" method will listen for whenever a button is clicked. 
        bindHandlers: function() {
            var self = this;

            self.$filters.on('click', 'a', function(e) {
                self.parseFilters();
            });
            self.$filters.on('change', function() {
                self.parseFilters();
            });
        },

        parseFilters: function() {
            var self = this;

            // loop through each filter group and grap the active filter from each one.
            for (var i = 0, group; group = self.groups[i]; i++) {
                group.active = [];
                group.$inputs.each(function() {
                    var $this = $(this);
                    if ($this.find('.selected').length > 0) {
                        group.active.push($this.attr('data-filter'));
                    }
                });
            }
            self.concatenate();
        },

        concatenate: function() {
            var self = this;

            self.outputString = ''; // Reset output string

            for (var i = 0, group; group = self.groups[i]; i++) {
                self.outputString += group.active;
            }

            // If the output string is empty, show all rather than none:    
            !self.outputString.length && (self.outputString = 'all');

            // Send the output string to MixItUp via the 'filter' method:    
            if (self.$container.mixItUp('isLoaded')) {
                self.$container.mixItUp('filter', self.outputString);
            }
        }
    };
})($);
