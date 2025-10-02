document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    const savedTheme = localStorage.getItem('theme') || 'light';
    
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        themeToggle.textContent = '☀️';
    } else {
        body.classList.remove('dark-mode');
        themeToggle.textContent = '🌙';
    }

    themeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        
        if (body.classList.contains('dark-mode')) {
            themeToggle.textContent = '☀️';
            localStorage.setItem('theme', 'dark');
        } else {
            themeToggle.textContent = '🌙';
            localStorage.setItem('theme', 'light');
        }
    });

    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    function createSkillCards() {
        const skillsSection = document.querySelector('#skills .container');
        
        const skills = [
            { name: 'JavaScript' },
            { name: 'Python' },
            { name: 'React' },
            { name: 'Node.js' },
            { name: 'TensorFlow' },
            { name: 'Unit Testing' },
            { name: 'HTML/CSS' },
            { name: 'SQL' }
        ];

        const skillsGrid = document.createElement('div');
        skillsGrid.className = 'skills-grid';

        skills.forEach(skill => {
            const skillCard = document.createElement('div');
            skillCard.className = 'skill-card';
            
            skillCard.innerHTML = `
                <div class="skill-name">${skill.name}</div>
            `;
            
            skillsGrid.appendChild(skillCard);
        });

        skillsSection.appendChild(skillsGrid);

        if (!document.querySelector('#skills-styles')) {
            const skillsStyles = document.createElement('style');
            skillsStyles.id = 'skills-styles';
            skillsStyles.textContent = `
                .skills-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 1rem;
                    margin-top: 2rem;
                }

                .skill-card {
                    background: white;
                    padding: 1.5rem;
                    border-radius: 12px;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                    text-align: center;
                    transition: all 0.3s ease;
                    border: 2px solid transparent;
                }

                .skill-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
                    border-color: #2563eb;
                }

                .dark-mode .skill-card {
                    background: #374151;
                    color: #f9fafb;
                    border-color: transparent;
                }

                .dark-mode .skill-card:hover {
                    border-color: #6366f1;
                }

                .skill-name {
                    font-size: 1.1rem;
                    font-weight: 600;
                    color: #2563eb;
                    margin: 0;
                }

                .dark-mode .skill-name {
                    color: #93c5fd;
                }
            `;
            document.head.appendChild(skillsStyles);
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillCards = entry.target.querySelectorAll('.skill-card');
                    skillCards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        skillsGrid.querySelectorAll('.skill-card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });

        observer.observe(skillsGrid);
    }

    setTimeout(createSkillCards, 100);

    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');

        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields.');
            return;
        }

        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address.');
            return;
        }

        showNotification('Message sent successfully!');
        
        this.reset();
        
        console.log('Form submitted:', { name, email, subject, message });
    });

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showNotification(message, type = 'info') {
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;

        if (!document.querySelector('#notification-styles')) {
            const notificationStyles = document.createElement('style');
            notificationStyles.id = 'notification-styles';
            notificationStyles.textContent = `
                .notification {
                    position: fixed;
                    top: 100px;
                    right: 20px;
                    padding: 1rem 2rem;
                    border-radius: 8px;
                    color: white;
                    font-weight: 600;
                    z-index: 10000;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                    animation: slideIn 0.3s ease-out;
                }

                .notification-success {
                    background-color: #10b981;
                }

                .notification-error {
                    background-color: #ef4444;
                }

                .notification-info {
                    background-color: #3b82f6;
                }

                @keyframes slideIn {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }

                @keyframes slideOut {
                    from {
                        transform: translateX(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(notificationStyles);
        }

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, 4000);
    }

    let lastScrollTop = 0;
    const header = document.querySelector('header');

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 100) {
            header.style.backgroundColor = body.classList.contains('dark-mode') ? '#111827' : 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.backgroundColor = body.classList.contains('dark-mode') ? '#1f2937' : '#ffffff';
            header.style.backdropFilter = 'none';
        }

        lastScrollTop = scrollTop;
    });

    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    const sections = document.querySelectorAll('section');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        revealObserver.observe(section);
    });

    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    const debouncedScrollHandler = debounce(() => {
    }, 100);

    window.addEventListener('scroll', debouncedScrollHandler);

    console.log('%c Adam Brook\'s Portfolio Website', 'color: #2563eb; font-size: 20px; font-weight: bold;');
    console.log('%c Welcome to my portfolio! Feel free to check out the source code.', 'color: #6b7280; font-style: italic;');
});