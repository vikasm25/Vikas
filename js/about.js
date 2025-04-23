// Animate cards on scroll
const cards = document.querySelectorAll('.detail-card');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

cards.forEach((card, index) => {
    card.style.opacity = 0;
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.5s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Bubble animation
const bubbles = document.querySelectorAll('.bubble');
bubbles.forEach(bubble => {
    bubble.addEventListener('mouseenter', () => {
        bubble.style.transform = 'scale(1.1)';
    });
    bubble.addEventListener('mouseleave', () => {
        bubble.style.transform = 'scale(1)';
    });
});