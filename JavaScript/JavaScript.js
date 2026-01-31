// Modern Portfolio JavaScript for BCA Student
// =============================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all modules
    initNavbar();
    initMobileMenu();
    initScrollAnimations();
    initSkillBars();
    initCounterAnimation();
    initTypingAnimation();
    initSmoothScroll();
    initParallax();
});

// =============================================
// Navbar Scroll Effect
// =============================================
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    
    if (!navbar) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Active link on scroll
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        let scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 150;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.menu-list-items a[href*="${sectionId}"]`);
            
            if (navLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelectorAll('.menu-list-items a').forEach(link => {
                    link.classList.remove('active');
                });
                navLink.classList.add('active');
            }
        });
    });
}

// =============================================
// Mobile Menu Toggle
// =============================================
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const menu = document.querySelector('.menu');
    const menuLinks = document.querySelectorAll('.menu-list-items a');
    
    if (!hamburger || !menu) return;
    
    hamburger.addEventListener('click', function() {
        menu.classList.toggle('active');
        
        const hamIcon = hamburger.querySelector('.hamburger-icon');
        const crossIcon = hamburger.querySelector('.cross-icon');
        
        if (menu.classList.contains('active')) {
            hamIcon.style.display = 'none';
            crossIcon.style.display = 'block';
            document.body.style.overflow = 'hidden';
        } else {
            hamIcon.style.display = 'block';
            crossIcon.style.display = 'none';
            document.body.style.overflow = '';
        }
    });
    
    // Close menu when clicking on a link
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            menu.classList.remove('active');
            
            const hamIcon = hamburger.querySelector('.hamburger-icon');
            const crossIcon = hamburger.querySelector('.cross-icon');
            
            hamIcon.style.display = 'block';
            crossIcon.style.display = 'none';
            document.body.style.overflow = '';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!menu.contains(event.target) && !hamburger.contains(event.target)) {
            menu.classList.remove('active');
            
            const hamIcon = hamburger.querySelector('.hamburger-icon');
            const crossIcon = hamburger.querySelector('.cross-icon');
            
            hamIcon.style.display = 'block';
            crossIcon.style.display = 'none';
            document.body.style.overflow = '';
        }
    });
}

// =============================================
// Scroll Animations (AOS-like functionality)
// =============================================
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-aos]');
    
    if (animatedElements.length === 0) {
        // Apply animations to common elements if data-aos not present
        const elementsToAnimate = [
            '.portfolio-heading',
            '.portfolio-content',
            '.about-text',
            '.about-image',
            '.services-heading',
            '.services-content',
            '.contact-heading',
            '.contact-content'
        ];
        
        elementsToAnimate.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach((el, index) => {
                el.setAttribute('data-aos', 'fade-up');
                el.setAttribute('data-aos-delay', index * 100);
            });
        });
    }
    
    // Intersection Observer for animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
                
                // Trigger skill bars if in view
                if (entry.target.classList.contains('skill-item')) {
                    const fill = entry.target.querySelector('.skill-bar-fill');
                    if (fill) {
                        fill.style.width = fill.getAttribute('data-width') || '0';
                    }
                }
                
                // Trigger counters if in view
                if (entry.target.classList.contains('stat-item')) {
                    const counter = entry.target.querySelector('[data-count]');
                    if (counter) {
                        animateCounter(counter);
                    }
                }
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(el => observer.observe(el));
    
    // Re-observe after elements are added
    setTimeout(() => {
        document.querySelectorAll('[data-aos]').forEach(el => observer.observe(el));
    }, 100);
}

// =============================================
// Skill Bar Animation
// =============================================
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar-fill');
    
    skillBars.forEach(bar => {
        const width = bar.getAttribute('style');
        bar.setAttribute('data-width', width.replace('width: ', '').replace(';', ''));
        bar.style.width = '0';
    });
}

// =============================================
// Counter Animation
// =============================================
function initCounterAnimation() {
    const counters = document.querySelectorAll('[data-count]');
    
    counters.forEach(counter => {
        counter.setAttribute('data-original', counter.textContent);
        counter.textContent = '0';
    });
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// =============================================
// Typing Animation
// =============================================
function initTypingAnimation() {
    const typingElement = document.querySelector('.typing-text');
    const subtitleElement = document.querySelector('.sub-heading');
    
    if (!subtitleElement) return;
    
    const texts = [
        'Web Developer',
        ' BCA Graduate',
        'Freelancer',
        'UI/UX Designer',
        'Full Stack Developer'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            subtitleElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            subtitleElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typingSpeed = 2000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 500;
        }
        
        setTimeout(type, typingSpeed);
    }
    
    // Start typing animation
    subtitleElement.classList.add('typing-text');
    type();
}

// =============================================
// Smooth Scroll
// =============================================
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// =============================================
// Parallax Effect
// =============================================
function initParallax() {
    const hero = document.querySelector('.hero');
    
    if (!hero) return;
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroBg = hero.querySelector('.hero-bg-animation');
        
        if (heroBg && scrolled < hero.offsetHeight) {
            heroBg.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });
}

// =============================================
// Button Ripple Effect
// =============================================
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const ripples = document.createElement('span');
        ripples.style.left = x + 'px';
        ripples.style.top = y + 'px';
        ripples.style.position = 'absolute';
        ripples.style.width = '0';
        ripples.style.height = '0';
        ripples.style.background = 'rgba(255, 255, 255, 0.3)';
        ripples.style.borderRadius = '50%';
        ripples.style.transform = 'translate(-50%, -50%)';
        ripples.style.pointerEvents = 'none';
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripples);
        
        const animation = ripples.animate([
            {
                width: '0',
                height: '0',
                opacity: 1
            },
            {
                width: '300px',
                height: '300px',
                opacity: 0
            }
        ], {
            duration: 600,
            easing: 'ease-out'
        });
        
        animation.onfinish = () => {
            ripples.remove();
        };
    });
});

// =============================================
// Form Validation and Enhancement
// =============================================
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formControls = this.querySelectorAll('.form-controls');
        let isValid = true;
        
        formControls.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = '#ff6b6b';
            } else {
                input.style.borderColor = '';
            }
            
            // Email validation
            if (input.type === 'email' && input.value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(input.value)) {
                    isValid = false;
                    input.style.borderColor = '#ff6b6b';
                }
            }
        });
        
        if (isValid) {
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'form-success';
            successMessage.innerHTML = `
                <div style="
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: linear-gradient(135deg, #00d2ff 0%, #3a7bd5 100%);
                    color: white;
                    padding: 2rem 3rem;
                    border-radius: 15px;
                    text-align: center;
                    z-index: 10000;
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
                    animation: slideIn 0.3s ease;
                ">
                    <h3 style="margin-bottom: 1rem;">Thank You!</h3>
                    <p>Your message has been sent successfully.</p>
                    <button onclick="this.parentElement.remove()" style="
                        margin-top: 1rem;
                        padding: 0.5rem 1.5rem;
                        border: none;
                        border-radius: 25px;
                        background: white;
                        color: #3a7bd5;
                        cursor: pointer;
                        font-weight: 600;
                    ">Close</button>
                </div>
            `;
            document.body.appendChild(successMessage);
            
            // Reset form
            contactForm.reset();
            
            // Remove message after 3 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 3000);
        }
    });
}

// =============================================
// Scroll to Top Button
// =============================================
function createScrollToTop() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #00d2ff 0%, #3a7bd5 100%);
        color: white;
        border: none;
        cursor: pointer;
        font-size: 1.2rem;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 10px 30px rgba(0, 210, 255, 0.3);
    `;
    
    document.body.appendChild(scrollBtn);
    
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.visibility = 'visible';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.visibility = 'hidden';
        }
    });
    
    scrollBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
    });
    
    scrollBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
}

// Initialize scroll to top
createScrollToTop();

// =============================================
// Lazy Loading Images
// =============================================
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageOptions = {
        threshold: 0,
        rootMargin: '0px 0px 50px 0px'
    };
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    }, imageOptions);
    
    images.forEach(image => {
        imageObserver.observe(image);
    });
}

// Initialize lazy loading
initLazyLoading();

// =============================================
// Preloader (Optional)
// =============================================
function initPreloader() {
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = `
        <div class="preloader-content">
            <div class="preloader-spinner"></div>
            <p>Loading...</p>
        </div>
    `;
    preloader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #0f0f23;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        transition: opacity 0.5s ease, visibility 0.5s ease;
    `;
    
    const spinnerStyle = document.createElement('style');
    spinnerStyle.textContent = `
        .preloader-spinner {
            width: 50px;
            height: 50px;
            border: 3px solid rgba(0, 210, 255, 0.3);
            border-top-color: #00d2ff;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
        .preloader-content p {
            color: white;
            margin-top: 1rem;
            font-family: 'Poppins', sans-serif;
        }
        .preloader.hidden {
            opacity: 0;
            visibility: hidden;
        }
    `;
    
    document.head.appendChild(spinnerStyle);
    document.body.prepend(preloader);
    
    window.addEventListener('load', function() {
        setTimeout(() => {
            preloader.classList.add('hidden');
            setTimeout(() => {
                preloader.remove();
            }, 500);
        }, 500);
    });
}

// Uncomment to enable preloader
// initPreloader();

// =============================================
// Console Welcome Message
// =============================================
console.log('%c Welcome to My Portfolio! ', 'background: linear-gradient(135deg, #00d2ff, #3a7bd5); color: white; padding: 10px 20px; font-size: 16px; border-radius: 5px;');
console.log('%c Built with modern web technologies ', 'color: #00d2ff; font-size: 12px;');

