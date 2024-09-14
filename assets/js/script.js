
(function ($) {
    "use strict";

    /******************************************
    =========  Magic Cursor ================
    ***************************************** */
    if ($('.magic-cursor').length > 0) {

        const cursor = document.querySelector('.magic-cursor');
        const hoverTargets = document.querySelectorAll('.hover-target');
        let mouseX = 0, mouseY = 0, cursorX = 0, cursorY = 0;

        document.addEventListener('mousemove', function(e) {
            mouseX = e.clientX;
            mouseY = e.clientY;

            // Get the viewport width and height
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;
            const cursorWidth = cursor.offsetWidth / 2;
            const cursorHeight = cursor.offsetHeight / 2;

            // Constrain the cursor within the viewport
            if (mouseX < cursorWidth) mouseX = cursorWidth;
            if (mouseX > windowWidth - cursorWidth) mouseX = windowWidth - cursorWidth;
            if (mouseY < cursorHeight) mouseY = cursorHeight;
            if (mouseY > windowHeight - cursorHeight) mouseY = windowHeight - cursorHeight;
        });

        function animateCursor() {
            cursorX += (mouseX - cursorX) * 0.1; // Adjust the 0.1 value to control the smoothness
            cursorY += (mouseY - cursorY) * 0.1;

            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';

            requestAnimationFrame(animateCursor);
        }

        animateCursor();

        hoverTargets.forEach(target => {
            target.addEventListener('mouseenter', () => {
                cursor.classList.add('hovered');
            });

            target.addEventListener('mouseleave', () => {
                cursor.classList.remove('hovered');
            });
        });

    }

    // Sticky header
    let lastScrollY = window.scrollY;
    window.addEventListener("scroll", () => {
        const sectionHeader = document.querySelector(".header-section");
        const navbar = document.querySelector(".navbar");
        const currentScrollY = window.scrollY;

        if (sectionHeader && navbar) {
        const sectionHeaderHeight = sectionHeader.getBoundingClientRect().height;
        // console.log("Section Header Height:", sectionHeaderHeight);
        if (currentScrollY < lastScrollY && currentScrollY > sectionHeaderHeight) {
            navbar.classList.add("sticky-navbar");
            document.body.style.paddingTop = navbar.getBoundingClientRect().height + 'px';
        } else {
            navbar.classList.remove("sticky-navbar");
            document.body.style.paddingTop = 0;
        }
        lastScrollY = currentScrollY;
        }
    });

    //===== FIXED HEADER

    /*--------------------------------------------------------
    /  01. Mobile menu Start
    /--------------------------------------------------------*/

    if ($('.mobileMenu').length > 0) {
        function mobileMenu() {
            $('.mobileMenu li').each(function(index, item){
            let selfThis = (this)
            if ($(item).find('ul').length) {
                $(item).addClass('dropdown-arrow');
            }
            $(item).on('click', function(e) {
                e.stopPropagation();
                if ($(this).hasClass('dropdown-arrow')) {
                $('.mobileMenu li').not(this).find('ul').slideUp(300);
                $(this).children('ul').slideToggle(300);
                if(!$(this).hasClass('openUL')) {
                    $(this).siblings().removeClass('openUL');
                    $(this).addClass('openUL');
                }else {
                    $(this).removeClass('openUL');
                }
                // For nested submenus
                $(this).find('ul li').each(function(index, subItem) {
                    $(subItem).off('click').on('click', function(e) {
                    e.stopPropagation();
                    if ($(subItem).hasClass('dropdown-arrow')) {
                        $(subItem).siblings().find('ul').slideUp(300);
                        $(subItem).children('ul').slideToggle(300);
                        if(!$(this).hasClass('openUL')) {
                        $(this).siblings().removeClass('openUL');
                        $(this).addClass('openUL');
                        }else {
                        $(this).removeClass('openUL');
                        }
                    }
                    });
                });
                }
            });
            });
        }
        mobileMenu();
    }

    $(document).ready(function() {
        $('select').niceSelect();
    });

    new WOW().init();

    // accordion
    if ($('.accordion-header').length > 0) {

        document.addEventListener('DOMContentLoaded', () => {
            const accordionHeaders = document.querySelectorAll('.accordion-header');
            // Loop through all accordion headers
            accordionHeaders.forEach((header, index) => {
                const content = header.nextElementSibling;
                const icon = header.querySelector('.accordion-icon i');
                // Check if it's the first item
                if (index === 0) {
                    // Make the first accordion item active by default
                    content.style.maxHeight = content.scrollHeight + "px";
                    icon.classList.remove('fa-plus');
                    icon.classList.add('fa-minus');
                    header.classList.add('show');
                }
                // Add click event to toggle accordion items
                header.addEventListener('click', () => {
                    if (content.style.maxHeight) {
                        // Close the content
                        content.style.maxHeight = null;
                        icon.classList.remove('fa-minus');
                        icon.classList.add('fa-plus');
                        header.classList.remove('show'); 
                    } else {
                        // Close other open accordion items
                        accordionHeaders.forEach(otherHeader => {
                            const otherContent = otherHeader.nextElementSibling;
                            const otherIcon = otherHeader.querySelector('.accordion-icon i');
                            otherContent.style.maxHeight = null;
                            otherIcon.classList.remove('fa-minus');
                            otherIcon.classList.add('fa-plus');
                            otherHeader.classList.remove('show'); 
                        });
                        // Open the clicked accordion item
                        content.style.maxHeight = content.scrollHeight + "px";
                        icon.classList.remove('fa-plus');
                        icon.classList.add('fa-minus');
                        header.classList.add('show');
                    }
                });
            });
        });
    }
    

    // =============  Testmonial Slider Start ========= 
    if ($('.testmonial-thump').length > 0) {
        var swiper = new Swiper(".testmonial-thump", {
            spaceBetween: 10,
            slidesPerView: 1,
            speed: 1000,
            loop: true,
           
        });
    }
    if ($('.testmonial-review').length > 0) {
        var swiper2 = new Swiper(".testmonial-review", {
            spaceBetween: 10,
            loop: true,
            speed: 1000,
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            thumbs: {
              swiper: swiper,
            },
        });
    }
    // =============  Testmonial Slider End ========= 

    // =============  Dynamic Year ========= 
    if ($('.dynamic-year').length > 0) {
        const yearElement = document.querySelector('.dynamic-year');
        const currentYear = new Date().getFullYear();
        yearElement.innerHTML = currentYear;
    }


    // back-to-top
    $(document).ready(function() {
        $('.back-to-top').click(function() {
            $('html, body').animate({scrollTop: 0}, 1000, 'swing');
            return false;
        });
    });

    if ($('.category-slider').length > 0) {
        var swiper = new Swiper(".category-slider", {
            spaceBetween: 16,
            slidesPerView: 6,
            speed: 1000,
            loop: true,
            pagination: {
              el: ".category-pagination",
              clickable: true,
            },
            breakpoints: {
                300: {
                  slidesPerView: 1,
                },
                480: {
                  slidesPerView: 2,
                },
                575: {
                  slidesPerView: 2,
                },
                768: {
                  slidesPerView: 3,
                },
                992: {
                  slidesPerView: 4,
                },
                1200: {
                  slidesPerView: 5,
                },
                1400: {
                    slidesPerView: 6,
                },
            },
        });
    }
    
    
    // =============  Testmonial Slider Start ========= 
    if ($('.testmonial-thump-2').length > 0) {
        var swiper = new Swiper(".testmonial-thump-2", {
            spaceBetween: 10,
            slidesPerView: 1,
            speed: 1000,
            loop: true,
        
        });
    }
    if ($('.testmonial-review-2').length > 0) {
        var swiper2 = new Swiper(".testmonial-review-2", {
            spaceBetween: 10,
            loop: true,
            speed: 1000,
            pagination: {
                el: ".testmonial-pagination",
                clickable: true,
            },
            thumbs: {
            swiper: swiper,
            },
        });
    }
    


    if ($('.testmonial-slider-3').length > 0) {
        var swiper2 = new Swiper(".testmonial-slider-3", {
            spaceBetween: 26,
            loop: true,
            slidesPerView: 2,
            speed: 1000,
            pagination: {
                el: ".testmonial-pagination",
                clickable: true,
            },
            breakpoints: {
                300: {
                  slidesPerView: 1,
                },
               
                1100: {
                  slidesPerView: 1.5,
                },

                1300: {
                  slidesPerView: 2,
                },
               
            },
           
        });
    }
    if ($('.testmonial-slider-4').length > 0) {
        var swiper2 = new Swiper(".testmonial-slider-4", {
            spaceBetween: 26,
            loop: true,
            slidesPerView: 2,
            speed: 1000,
            breakpoints: {
                300: {
                  slidesPerView: 1,
                },
               
                1100: {
                  slidesPerView: 1.5,
                },

                1300: {
                  slidesPerView: 2,
                },
               
            },
           
        });
    }

    // =============  Testmonial Slider End ========= 

    // ====== range slider =========
    if ($('.progress').length > 0) {

        const rangeMin = document.querySelector(".range-min");
        const rangeMax = document.querySelector(".range-max");
        const inputMin = document.querySelector(".input-min");
        const inputMax = document.querySelector(".input-max");
        const progress = document.querySelector(".progress");
    
        function updateProgressBar() {
            const min = parseInt(rangeMin.value);
            const max = parseInt(rangeMax.value);
            const range = rangeMax.max - rangeMin.min;
            
            progress.style.left = ((min - rangeMin.min) / range) * 100 + "%";
            progress.style.right = ((rangeMax.max - max) / range) * 100 + "%";
        }
        rangeMin.addEventListener("input", () => {
            let minValue = parseInt(rangeMin.value);
            let maxValue = parseInt(rangeMax.value);
            
            if (minValue >= maxValue - 500) {
                rangeMin.value = maxValue - 500; 
            }
            inputMin.value = rangeMin.value;
            updateProgressBar();
        });
        rangeMax.addEventListener("input", () => {
            let minValue = parseInt(rangeMin.value);
            let maxValue = parseInt(rangeMax.value);
            
            if (maxValue <= minValue + 500) {
                rangeMax.value = minValue + 500; 
            }
            inputMax.value = rangeMax.value;
            updateProgressBar();
        });
        inputMin.addEventListener("input", () => {
            rangeMin.value = inputMin.value;
            rangeMin.dispatchEvent(new Event("input"));
        });
    
        inputMax.addEventListener("input", () => {
            rangeMax.value = inputMax.value;
            rangeMax.dispatchEvent(new Event("input"));
        });
        updateProgressBar();
    }
    //===== End range slider ======
  
    if ($('.blog-slider').length > 0) {

        var swiper = new Swiper(".blog-slider-thumb", {
            spaceBetween: 10,
            slidesPerView: 3,
            speed: 1000,
            loop: true,
            breakpoints: {
                300: {
                  slidesPerView: 2,
                },
               
                480: {
                  slidesPerView: 3,
                },
            },
        });
        var swiper2 = new Swiper(".blog-slider", {
            spaceBetween: 10,
            speed: 1000,
            effect: 'fade',
            centeredSlides: true,
            loop: true,
            fadeEffect: {
                crossFade: true
            },
            navigation: {
              nextEl: ".blog-slider-next",
              prevEl: ".blog-slider-prev",
            },
            thumbs: {
              swiper: swiper,
            },
        });
    }


    // progreebar
    $('.5-Star').rProgressbar({
        percentage: 90,
        fillBackgroundColor:'#FF385C',
        backgroundColor:'#FFE9ED',
        borderRadius:'100px',
        duration: 3000,
        height: 12

    });
    $('.4-Star').rProgressbar({
        percentage: 60,
        fillBackgroundColor:'#FF385C',
        backgroundColor:'#FFE9ED',
        borderRadius:'100px',
        duration: 2500,
        height: 12,

    });
    $('.3-Star').rProgressbar({
        percentage: 30,
        fillBackgroundColor:'#FF385C',
        backgroundColor:'#FFE9ED',
        borderRadius:'100px',
        duration: 2000,
        height: 12,

    });
    $('.2-Star').rProgressbar({
        percentage: 20,
        fillBackgroundColor:'#FF385C',
        backgroundColor:'#FFE9ED',
        borderRadius:'100px',
        duration: 1500,
        height: 12,

    });
    $('.1-Star').rProgressbar({
        percentage: 5,
        fillBackgroundColor:'#FF385C',
        backgroundColor:'#FFE9ED',
        borderRadius:'100px',
        duration: 1000,
        height: 12,
    });


    if ($('.preloader').length > 0) {
        window.onload = function() {
            const preloader = document.querySelector('.preloader');
            preloader.classList.add('hidden');
        };
    }

    new VenoBox({
        selector: '.my-video-links',
    });

    
})(jQuery);



// Hover Menu
document.addEventListener("DOMContentLoaded", function () {
    if (window.innerWidth > 992) {
      document.querySelectorAll('.hover-menu .dropdown').forEach(function (everyitem) {
        everyitem.addEventListener('mouseover', function (e) {
          let el_link = this.querySelector('a[data-bs-toggle]');
          if (el_link !== null) {
            let nextEl = el_link.nextElementSibling;
            el_link.classList.add('show');
            if (nextEl !== null && this.contains(nextEl)) {
              nextEl.classList.add('show');
            }
          }
        }.bind(everyitem));
        everyitem.addEventListener('mouseleave', function (e) {
          let el_link = this.querySelector('a[data-bs-toggle]');
          if (el_link !== null) {
            let nextEl = el_link.nextElementSibling;
            if (nextEl !== null && this.contains(nextEl)) {
              el_link.classList.remove('show');
              nextEl.classList.remove('show');
            }
          }
        }.bind(everyitem));
      });
    }
    // end if innerWidth
});
  