// San Miguel Municipal Website - Enhanced JavaScript
// Professional animations and interactivity

document.addEventListener('DOMContentLoaded', function() {
  console.log('San Miguel Website loaded');

  // Initialize AOS (Animate On Scroll)
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 100,
      delay: 0,
    });
  }

  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId !== '#') {
        e.preventDefault();
        const target = document.querySelector(targetId);
        if (target) {
          const navbarHeight = navbar ? navbar.offsetHeight : 0;
          const targetPosition = target.offsetTop - navbarHeight - 20;
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // Active navigation link highlighting
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    } else if (href !== currentPage) {
      link.classList.remove('active');
    }
  });

  // Counter animation for stats
  const counters = document.querySelectorAll('.display-5.fw-bold');
  const animateCounter = (counter) => {
    const target = parseInt(counter.innerText.replace(/[^0-9]/g, ''));
    const suffix = counter.innerText.replace(/[0-9]/g, '');
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
      current += step;
      if (current < target) {
        counter.innerText = Math.floor(current) + suffix;
        requestAnimationFrame(updateCounter);
      } else {
        counter.innerText = target + suffix;
      }
    };

    updateCounter();
  };

  // Intersection Observer for counters
  if (counters.length > 0) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
  }

  // Form validation enhancement
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Simple validation feedback
      const inputs = form.querySelectorAll('input, textarea, select');
      let isValid = true;
      
      inputs.forEach(input => {
        if (input.hasAttribute('required') && !input.value.trim()) {
          input.classList.add('is-invalid');
          isValid = false;
        } else {
          input.classList.remove('is-invalid');
          input.classList.add('is-valid');
        }
      });

      if (isValid) {
        // Show success feedback
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
          const originalText = submitBtn.innerHTML;
          submitBtn.innerHTML = '<i class="fas fa-check me-2"></i>Submitted!';
          submitBtn.classList.add('btn-success');
          submitBtn.classList.remove('btn-primary');
          
          setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.classList.remove('btn-success');
            submitBtn.classList.add('btn-primary');
            form.reset();
            inputs.forEach(input => {
              input.classList.remove('is-valid');
            });
          }, 3000);
        }
      }
    });
  });

  // Back to top button (optional - creates dynamically if needed)
  const createBackToTop = () => {
    const btn = document.createElement('button');
    btn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    btn.className = 'btn btn-primary back-to-top';
    btn.style.cssText = `
      position: fixed;
      bottom: 30px;
      right: 30px;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      display: none;
      justify-content: center;
      align-items: center;
      z-index: 999;
      opacity: 0;
      transition: all 0.3s ease;
      box-shadow: 0 4px 12px rgba(26, 54, 93, 0.3);
    `;
    
    document.body.appendChild(btn);
    
    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        btn.style.display = 'flex';
        setTimeout(() => btn.style.opacity = '1', 10);
      } else {
        btn.style.opacity = '0';
        setTimeout(() => btn.style.display = 'none', 300);
      }
    });
    
    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  };
  
  createBackToTop();

  // Image lazy loading with fade effect
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  lazyImages.forEach(img => {
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.5s ease';
    
    img.addEventListener('load', () => {
      img.style.opacity = '1';
    });
  });

  // Card hover sound effect (optional - visual only)
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.cursor = 'pointer';
    });
  });

  // Carousel auto-pause on hover
  const carousel = document.querySelector('.carousel');
  if (carousel) {
    carousel.addEventListener('mouseenter', () => {
      const bsCarousel = bootstrap.Carousel.getInstance(carousel);
      if (bsCarousel) bsCarousel.pause();
    });
    
    carousel.addEventListener('mouseleave', () => {
      const bsCarousel = bootstrap.Carousel.getInstance(carousel);
      if (bsCarousel) bsCarousel.cycle();
    });
  }
});
