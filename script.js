document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const menuIcon = menuToggle.querySelector('i');

    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuIcon.classList.toggle('fa-bars');
        menuIcon.classList.toggle('fa-times');
    });

    // Close menu when clicking nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuIcon.classList.add('fa-bars');
            menuIcon.classList.remove('fa-times');
        });
    });

    // 2. Typed Text Effect in Hero
    const typedTextSpan = document.getElementById('typed-text');
    const textArray = [
        "delightful digital experiences",
        "intuitive mobile apps UI",
        "clean engineering solutions",
        "responsive design systems"
    ];
    const typingDelay = 100;
    const erasingDelay = 50;
    const newTextDelay = 2000;
    let textArrayIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } else {
            setTimeout(erase, newTextDelay);
        }
    }

    function erase() {
        if (charIndex > 0) {
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            textArrayIndex++;
            if (textArrayIndex >= textArray.length) textArrayIndex = 0;
            setTimeout(type, typingDelay + 500);
        }
    }

    // Start typing effect on load
    if (textArray.length) setTimeout(type, newTextDelay);


    // 3. Scroll Header Effect and Scroll Spy (Active Navigation state)
    const header = document.querySelector('.navbar');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        // Scroll header resizing
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Scroll spy
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 120) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });


    // 4. Skills Progress Animations on Scroll Into View
    const skillsSection = document.getElementById('skills');
    const progressFills = document.querySelectorAll('.progress-fill');

    const skillObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                progressFills.forEach(fill => {
                    // Triggers width transition from 0 to target width percentage
                    const targetWidth = fill.style.width;
                    fill.style.width = '0';
                    setTimeout(() => {
                        fill.style.width = targetWidth;
                    }, 100);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    if (skillsSection) {
        skillObserver.observe(skillsSection);
    }


    // 5. Project Modals Management
    const viewButtons = document.querySelectorAll('.btn-view-project');
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.modal-close');

    // Open Modal
    viewButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const project = btn.getAttribute('data-project');
            const targetModal = document.getElementById(`modal-${project}`);
            if (targetModal) {
                targetModal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Stop scroll
            }
        });
    });

    // Close Modal by clicking X
    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.closest('.modal').classList.remove('active');
            document.body.style.overflow = ''; // Resume scroll
        });
    });

    // Close Modal by clicking outside of it
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // Close Modal on Escape Key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                if (modal.classList.contains('active')) {
                    modal.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        }
    });


    // 6. Contact Form Validation & Toast Notification
    const contactForm = document.getElementById('contact-form');
    const toastContainer = document.getElementById('toast-container');

    function showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const icon = document.createElement('i');
        icon.className = type === 'success' 
            ? 'fas fa-check-circle toast-icon success' 
            : 'fas fa-exclamation-circle toast-icon error';
            
        const textSpan = document.createElement('span');
        textSpan.textContent = message;

        toast.appendChild(icon);
        toast.appendChild(textSpan);
        toastContainer.appendChild(toast);

        // Auto remove toast after 4s
        setTimeout(() => {
            toast.style.animation = 'slideInToast 0.3s ease-out reverse';
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 4000);
    }

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('.btn-submit');
            const submitBtnText = submitBtn.querySelector('span');
            const submitBtnIcon = submitBtn.querySelector('i');
            
            // Show loading state
            submitBtn.disabled = true;
            submitBtnText.textContent = 'Sending Message...';
            submitBtnIcon.className = 'fas fa-spinner fa-spin';
            
            // Simulate API request
            setTimeout(() => {
                showToast('Message sent successfully! Anjana will contact you soon.', 'success');
                contactForm.reset();
                
                // Restore submit button state
                submitBtn.disabled = false;
                submitBtnText.textContent = 'Send Message';
                submitBtnIcon.className = 'fas fa-paper-plane';
            }, 1500);
        });
    }
});
