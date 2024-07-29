document.addEventListener('DOMContentLoaded', function () {
    const scrollOffset = 20; 

    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const offset = window.innerHeight * (scrollOffset / 100);
                window.scrollTo({
                    top: targetElement.offsetTop - offset,
                    behavior: 'smooth'
                });
            }
        });
    });

    const containers = document.querySelectorAll('.container');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');

                if (entry.target.id === 'container1') {
                    document.querySelector('.logo .logoname').classList.add('visible');
                }
            } else {
                entry.target.classList.remove('in-view');

                if (entry.target.id === 'container1') {
                    document.querySelector('.logo .logoname').classList.remove('visible');
                }
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    containers.forEach(container => {
        observer.observe(container);
    });
});

const buttons = document.querySelectorAll("[data-carousel-button]");

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const offset = button.dataset.carouselButton === "next" ? 1 : -1;
        const slides = button.closest("[data-carousel]").querySelector("[data-slides]");
        const activeSlide = slides.querySelector("[data-active]");
        let newIndex = [...slides.children].indexOf(activeSlide) + offset;

        if (newIndex < 0) newIndex = slides.children.length - 1;
        if (newIndex >= slides.children.length) newIndex = 0;

        slides.children[newIndex].dataset.active = true;
        delete activeSlide.dataset.active;
    });
});

const nextButton = document.querySelector("[data-carousel-button='next']");
setInterval(() => {
    nextButton.click();
}, 10000);

window.onload = function() {
    var referenceDiv = document.getElementById('navbar');
    var targetDiv = document.getElementById('carouselContainer');
    
    function updateMargin() {
        var referenceHeight = referenceDiv.offsetHeight;
        targetDiv.style.marginTop = referenceHeight+ 1 + 'px';
    }

    updateMargin(); // Initial call
    window.addEventListener('resize', updateMargin); // Update on resize
};
