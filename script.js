// 1. Stats Counter Animation with Intersection Observer
document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll('.counter');

    const runCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        let count = 0;
        const increment = Math.ceil(target / 40);

        const updateCounter = () => {
            count += increment;
            if (count < target) {
                counter.innerText = count;
                setTimeout(updateCounter, 30);
            } else {
                counter.innerText = target;
            }
        };

        updateCounter();
    };

    const observerOptions = {
        root: null,
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                runCounter(counter);
                observer.unobserve(counter);
            }
        });
    }, observerOptions);

    counters.forEach(counter => {
        observer.observe(counter);
    });
});

// 2. Elastic / Fluid Cursor Balloon Animation
const cursor = document.querySelector('.custom-cursor');

if (cursor) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        let distX = mouseX - cursorX;
        let distY = mouseY - cursorY;

        cursorX += distX * 0.2;
        cursorY += distY * 0.2;

        let speedVal = Math.sqrt(distX * distX + distY * distY);
        let scaleX = 1 + Math.min(speedVal * 0.05, 0.8);
        let scaleY = 1 - Math.min(speedVal * 0.03, 0.4);
        let angle = Math.atan2(distY, distX) * (180 / Math.PI);

        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        cursor.style.transform = `translate(-50%, -50%) rotate(${angle}deg) scale(${scaleX}, ${scaleY})`;

        requestAnimationFrame(animateCursor);
    }

    animateCursor();
}