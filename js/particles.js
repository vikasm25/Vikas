document.addEventListener('DOMContentLoaded', function() {
  particlesJS('particles-js', {
      particles: {
          number: { value: 80, density: { enable: true, value_area: 800 } },
          color: { value: "#64ffda" },
          shape: { type: "circle" },
          opacity: { value: 0.5, random: false },
          size: { value: 3, random: true },
          line_linked: {
              enable: true,
              distance: 150,
              color: "#20b2aa",
              opacity: 0.4,
              width: 1
          },
          move: {
              enable: true,
              speed: 6,
              direction: "none",
              random: false,
              straight: false,
              out_mode: "out",
              bounce: false,
          }
      },
      interactivity: {
          detect_on: "canvas",
          events: {
              onhover: { enable: true, mode: "repulse" },
              onclick: { enable: true, mode: "push" },
              resize: true
          },
          modes: {
              repulse: { distance: 100, duration: 0.4 },
              push: { particles_nb: 4 }
          }
      },
      retina_detect: true
  });
});