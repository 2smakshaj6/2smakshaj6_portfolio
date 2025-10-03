// Security Portfolio - Main JavaScript
class SecurityPortfolio {
    constructor() {
        this.csrfToken = null;
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupMobileMenu();
        this.setupScrollAnimations();
        this.setupBackToTop();
        this.setupThreeJS();
        this.setupCertificateImages();
        this.setupCarousel();
        this.setupScrollProgress();
        this.setupEmailModal();
    }

    // Navigation Setup
    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('section[id]');
        const navContainer = document.querySelector('.nav-container');

        // Handle navigation link clicks
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                    if (targetSection) {
                        // Calculate the scroll position to show the section title
                        const navHeight = navContainer ? navContainer.offsetHeight : 0;
                        const offset = navHeight + 20; // 20px extra padding
                        
                        const targetPosition = targetSection.offsetTop - offset;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
            });
        });

        // Update active navigation on scroll
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            
            // Add scrolled class for styling
            if (scrollY > 50) {
                navContainer.classList.add('scrolled');
            } else {
                navContainer.classList.remove('scrolled');
            }

            // Update active navigation using viewport midpoint and real nav height
            const navOffset = (navContainer ? navContainer.offsetHeight : 0) + 16;
            const focusLine = scrollY + navOffset + (window.innerHeight * 0.35);
            let current = '';

            sections.forEach(section => {
                const top = section.offsetTop;
                const bottom = top + section.offsetHeight;
                if (focusLine >= top && focusLine < bottom) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
            });
        });

        // Control Three.js background animation based on scroll position
        window.addEventListener('scroll', () => {
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                const rect = aboutSection.getBoundingClientRect();
                const isAboutVisible = rect.top <= 0 && rect.bottom >= window.innerHeight;
                
                if (isAboutVisible && window.FNAV_BG?.start) {
                    window.FNAV_BG.start();
                } else if (window.FNAV_BG?.stop) {
                    window.FNAV_BG.stop();
                }
            }
        });
    }

    // Mobile Menu Setup
    setupMobileMenu() {
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const mobileCloseBtn = document.querySelector('.mobile-close-btn');
        const navLinks = document.querySelector('.nav-links');
        
        if (!mobileMenuBtn || !mobileCloseBtn || !navLinks) return;

        const openMenu = () => {
            mobileMenuBtn.classList.add('active');
            mobileCloseBtn.style.display = 'flex';
            navLinks.classList.add('active');
            mobileMenuBtn.setAttribute('aria-expanded', 'true');
        };

        const closeMenu = () => {
            mobileMenuBtn.classList.remove('active');
            mobileCloseBtn.style.display = 'none';
            navLinks.classList.remove('active');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        };

        mobileMenuBtn.addEventListener('click', openMenu);
        mobileCloseBtn.addEventListener('click', closeMenu);

        // Close menu when clicking on a link
        const navLinkItems = document.querySelectorAll('.nav-link');
        navLinkItems.forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenuBtn.contains(e.target) && 
                !mobileCloseBtn.contains(e.target) && 
                !navLinks.contains(e.target)) {
                closeMenu();
            }
        });
    }

    // Scroll Animations
    setupScrollAnimations() {
        // Disable scroll-triggered animations for now
        const animatedElements = document.querySelectorAll('.skill-category, .project-item, .education-item, .cert-item, .blog-item, .contact-tile, .v-timeline-item');
        animatedElements.forEach(el => {
            el.classList.add('animate-on-scroll', 'animate-in');
        });
    }

    // Back to Top Button
    setupBackToTop() {
        const backToTopBtn = document.getElementById('back-to-top');
        const aboutSection = document.getElementById('about');
        
        if (!backToTopBtn || !aboutSection) return;

        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            const aboutRect = aboutSection.getBoundingClientRect();
            const aboutBottom = aboutRect.bottom;
            
            if (aboutBottom < 0) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        // Scroll to top when clicked
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Three.js Setup
    setupThreeJS() {
        const container = document.getElementById('hero-animation');
        if (!container) return;

        // Simple Three.js scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        
        renderer.setSize(container.offsetWidth, container.offsetHeight);
        renderer.setClearColor(0x000000, 0);
        container.appendChild(renderer.domElement);

        // Create floating particles
        const particles = [];
        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            const geometry = new THREE.SphereGeometry(0.02, 8, 8);
            const material = new THREE.MeshBasicMaterial({ 
                color: new THREE.Color().setHSL(0.6, 0.8, 0.6),
                transparent: true,
                opacity: 0.6
            });
            const particle = new THREE.Mesh(geometry, material);
            
            particle.position.x = (Math.random() - 0.5) * 10;
            particle.position.y = (Math.random() - 0.5) * 10;
            particle.position.z = (Math.random() - 0.5) * 10;
            
            particles.push(particle);
            scene.add(particle);
        }

        camera.position.z = 5;

        const animate = () => {
            requestAnimationFrame(animate);
            
            particles.forEach((particle, index) => {
                particle.rotation.x += 0.01;
                particle.rotation.y += 0.01;
                particle.position.y += Math.sin(Date.now() * 0.001 + index) * 0.001;
            });
            
            renderer.render(scene, camera);
        };

        animate();

        // Handle resize
        window.addEventListener('resize', () => {
            camera.aspect = container.offsetWidth / container.offsetHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.offsetWidth, container.offsetHeight);
        });
    }

    // CSRF Token Setup
    async setupCSRF() {
        try {
            const response = await fetch('/api/csrf-token');
            const data = await response.json();
            this.csrfToken = data.csrf_token;
        } catch (error) {
            console.error('Failed to get CSRF token:', error);
        }
    }

    // Contact Form Submission
    async submitContactForm(formData) {
        if (!this.csrfToken) {
            await this.setupCSRF();
        }

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-Token': this.csrfToken
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();
            return result;
        } catch (error) {
            console.error('Contact form submission failed:', error);
            return { success: false, message: 'Network error' };
        }
    }

    // Certificate Images Fallback
    setupCertificateImages() {
        const certImages = document.querySelectorAll('.cert-image img');
        
        certImages.forEach(img => {
            img.addEventListener('error', function() {
                // If image fails to load, show a placeholder with certificate icon
                this.style.background = 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)';
                this.style.display = 'flex';
                this.style.alignItems = 'center';
                this.style.justifyContent = 'center';
                this.style.color = '#60a5fa';
                this.style.fontSize = '0.9rem';
                this.style.textAlign = 'center';
                this.style.padding = '1rem';
                this.alt = 'Certificate Image - Click to view';
                
                // Add a certificate icon or text
                const icon = document.createElement('div');
                icon.innerHTML = '📜<br>Certificate';
                icon.style.textAlign = 'center';
                icon.style.lineHeight = '1.2';
                this.parentNode.appendChild(icon);
                this.style.display = 'none';
            });
        });
    }

    // Certifications Carousel
    setupCarousel() {
        const track = document.getElementById('carousel-track');
        const indicatorsContainer = document.getElementById('carousel-indicators');
        
        if (!track || !indicatorsContainer) {
            console.log('Carousel elements not found');
            return;
        }

        const certItems = track.querySelectorAll('.cert-item');
        const totalItems = certItems.length;
        let currentIndex = 0;
        
        console.log(`Carousel initialized with ${totalItems} certificates`);
        console.log('Track element:', track);
        console.log('Indicators container:', indicatorsContainer);

        // Create indicators
        const createIndicators = () => {
            indicatorsContainer.innerHTML = '';
            for (let i = 0; i < totalItems; i++) {
                const indicator = document.createElement('div');
                indicator.className = 'carousel-indicator';
                indicator.setAttribute('data-index', i);
                if (i === 0) indicator.classList.add('active');
                
                // Add direct click handler
                indicator.addEventListener('click', (e) => {
                    console.log(`Direct click on indicator ${i}`);
                    e.preventDefault();
                    e.stopPropagation();
                    goToSlide(i);
                });
                
                indicatorsContainer.appendChild(indicator);
            }
            console.log(`Created ${totalItems} indicators`);
            console.log('Indicators container after creation:', indicatorsContainer.innerHTML);
        };

        // Add event delegation for indicator clicks (backup)
        indicatorsContainer.addEventListener('click', (e) => {
            const indicator = e.target.closest('.carousel-indicator');
            if (indicator) {
                const index = parseInt(indicator.getAttribute('data-index'));
                console.log(`Indicator ${index} clicked via delegation`);
                goToSlide(index);
            }
        });

        // Update carousel position
        const updateCarousel = () => {
            const translateX = -currentIndex * 100;
            track.style.transform = `translateX(${translateX}%)`;
            
            // Update indicators
            const indicators = indicatorsContainer.querySelectorAll('.carousel-indicator');
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === currentIndex);
            });
        };

        // Go to specific slide
        const goToSlide = (index) => {
            console.log(`goToSlide called with index: ${index}, totalItems: ${totalItems}`);
            if (index >= 0 && index < totalItems) {
                currentIndex = index;
                console.log(`Updated currentIndex to: ${currentIndex}`);
                updateCarousel();
            } else {
                console.log('Invalid index provided to goToSlide');
            }
        };

        // Next slide
        const nextSlide = () => {
            if (currentIndex < totalItems - 1) {
                currentIndex++;
                updateCarousel();
            } else {
                goToSlide(0); // Loop back to first slide
            }
        };

        // Touch/swipe support
        let startX = 0;
        let isDragging = false;

        track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
        });

        track.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
        });

        track.addEventListener('touchend', (e) => {
            if (!isDragging) return;
            isDragging = false;
            
            const endX = e.changedTouches[0].clientX;
            const diff = startX - endX;
            
            if (Math.abs(diff) > 50) { // Minimum swipe distance
                if (diff > 0) {
                    nextSlide();
                } else {
                    if (currentIndex > 0) {
                        currentIndex--;
                        updateCarousel();
                    }
                }
            }
        });

        // Auto-advance every 5 seconds
        setInterval(() => {
            nextSlide();
        }, 5000);

        // Initialize
        createIndicators();
        updateCarousel();
        
        // Test if indicators are clickable
        setTimeout(() => {
            const indicators = indicatorsContainer.querySelectorAll('.carousel-indicator');
            console.log(`Found ${indicators.length} indicators after initialization`);
            indicators.forEach((indicator, index) => {
                console.log(`Indicator ${index}:`, indicator);
            });
        }, 1000);
    }

    // Scroll Progress Bar
    setupScrollProgress() {
        const progressBar = document.getElementById('scroll-progress');
        const progressBarFill = progressBar?.querySelector('.scroll-progress-bar');
        
        if (!progressBar || !progressBarFill) {
            console.log('Scroll progress elements not found');
            return;
        }

        const updateProgress = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollPercent = (scrollTop / scrollHeight) * 100;
            
            progressBarFill.style.width = `${Math.min(scrollPercent, 100)}%`;
            progressBar.setAttribute('aria-valuenow', Math.round(scrollPercent));
        };

        // Throttle scroll events for better performance
        let ticking = false;
        const throttledUpdate = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    updateProgress();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', throttledUpdate, { passive: true });
        
        // Initial update
        updateProgress();
    }

    // Email Modal Setup
    setupEmailModal() {
        const emailBtn = document.getElementById('email-btn');
        const emailModal = document.getElementById('email-modal');
        const closeBtn = emailModal?.querySelector('.email-modal-close');
        const copyBtn = document.getElementById('copy-email-btn');
        const emailAddress = 'contact.me@smakshaj.com';

        if (!emailBtn || !emailModal || !closeBtn || !copyBtn) {
            console.log('Email modal elements not found');
            return;
        }

        // Open modal
        emailBtn.addEventListener('click', () => {
            emailModal.classList.add('active');
            emailModal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        });

        // Close modal
        const closeModal = () => {
            emailModal.classList.remove('active');
            emailModal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        };

        closeBtn.addEventListener('click', closeModal);

        // Close on backdrop click
        emailModal.addEventListener('click', (e) => {
            if (e.target === emailModal) {
                closeModal();
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && emailModal.classList.contains('active')) {
                closeModal();
            }
        });

        // Copy email functionality
        copyBtn.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(emailAddress);
                copyBtn.textContent = 'Copied!';
                copyBtn.classList.add('copied');
                
                setTimeout(() => {
                    copyBtn.textContent = 'Copy Email';
                    copyBtn.classList.remove('copied');
                }, 2000);
            } catch (err) {
                console.error('Failed to copy email:', err);
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = emailAddress;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                
                copyBtn.textContent = 'Copied!';
                copyBtn.classList.add('copied');
                
                setTimeout(() => {
                    copyBtn.textContent = 'Copy Email';
                    copyBtn.classList.remove('copied');
                }, 2000);
            }
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SecurityPortfolio();
});