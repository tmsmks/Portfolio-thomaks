// Scripts personnalisés pour le portfolio

// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialisation des animations AOS
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });

    // Navigation smooth scroll
    initializeSmoothScroll();
    
    // Animation des barres de progression
    initializeProgressBars();
    
    // Animation du menu de navigation
    initializeNavAnimation();
    
    // Animation des compteurs
    initializeCounters();
    
    // Effet de parallaxe léger
    initializeParallax();
    
    // Animation des cartes au hover
    initializeCardAnimations();
    
    // Mode sombre automatique
    initializeDarkMode();
    
    // Animation de typewriter pour le titre
    initializeTypewriter();
    
    // Effet de particules flottantes
    initializeFloatingElements();
});

// Fonction pour la navigation smooth scroll
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Ajustement pour la navbar fixe
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Fonction pour animer les barres de progression
function initializeProgressBars() {
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBars = entry.target.querySelectorAll('.skill-progress');
                progressBars.forEach((bar, index) => {
                    const width = bar.style.width;
                    bar.style.width = '0%';
                    setTimeout(() => {
                        bar.style.width = width;
                        bar.classList.add('progress-bar-custom');
                    }, index * 200);
                });
            }
        });
    }, observerOptions);

    document.querySelectorAll('.bg-gray-100, .bg-purple-50').forEach(section => {
        observer.observe(section);
    });
}

// Fonction pour animer la navigation
function initializeNavAnimation() {
    const nav = document.querySelector('nav');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        // Effet de transparence
        if (currentScrollY > 100) {
            nav.classList.add('bg-white/95');
        } else {
            nav.classList.remove('bg-white/95');
        }
        
        // Effet de hide/show sur scroll
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            nav.style.transform = 'translateY(-100%)';
        } else {
            nav.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });
}

// Fonction pour animer les compteurs
function initializeCounters() {
    const counters = document.querySelectorAll('.counter');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000; // 2 secondes
                const increment = target / (duration / 16); // 60 FPS
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    });
    
    counters.forEach(counter => counterObserver.observe(counter));
}

// Fonction pour l'effet de parallaxe
function initializeParallax() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = element.getAttribute('data-speed') || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Fonction pour les animations des cartes
function initializeCardAnimations() {
    const cards = document.querySelectorAll('.card-hover');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Fonction pour le mode sombre automatique
function initializeDarkMode() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    
    function toggleDarkMode(e) {
        if (e.matches) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }
    
    prefersDark.addListener(toggleDarkMode);
    toggleDarkMode(prefersDark);
}

// Fonction pour l'animation typewriter
function initializeTypewriter() {
    const typewriterElement = document.querySelector('.typewriter');
    if (typewriterElement) {
        const text = typewriterElement.textContent;
        typewriterElement.textContent = '';
        typewriterElement.style.width = '0';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                typewriterElement.textContent += text.charAt(i);
                typewriterElement.style.width = ((i + 1) / text.length * 100) + '%';
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Démarrer l'animation après un délai
        setTimeout(typeWriter, 1000);
    }
}

// Fonction pour les éléments flottants
function initializeFloatingElements() {
    const floatingElements = document.querySelectorAll('.float');
    
    floatingElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.5}s`;
    });
}

// Fonction pour ajouter des particules en arrière-plan
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    particlesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        overflow: hidden;
    `;
    
    document.body.appendChild(particlesContainer);
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(102, 126, 234, 0.3);
            border-radius: 50%;
            animation: float ${Math.random() * 10 + 5}s ease-in-out infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 5}s;
        `;
        particlesContainer.appendChild(particle);
    }
}

// Fonction pour le lazy loading des images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Fonction pour les tooltips personnalisés
function initializeTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = this.getAttribute('data-tooltip');
            tooltip.style.cssText = `
                position: absolute;
                background: rgba(0, 0, 0, 0.8);
                color: white;
                padding: 8px 12px;
                border-radius: 6px;
                font-size: 14px;
                z-index: 1000;
                pointer-events: none;
                white-space: nowrap;
            `;
            
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
            
            this.tooltip = tooltip;
        });
        
        element.addEventListener('mouseleave', function() {
            if (this.tooltip) {
                this.tooltip.remove();
                this.tooltip = null;
            }
        });
    });
}

// Fonction pour le scroll progress indicator
function initializeScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #667eea, #764ba2);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// Initialisation des fonctionnalités supplémentaires
document.addEventListener('DOMContentLoaded', function() {
    // Créer les particules en arrière-plan
    createParticles();
    
    // Initialiser le lazy loading
    initializeLazyLoading();
    
    // Initialiser les tooltips
    initializeTooltips();
    
    // Initialiser l'indicateur de progression de scroll
    initializeScrollProgress();
    
    // Ajouter des classes pour les animations personnalisées
    addCustomAnimationClasses();
});

// Fonction pour ajouter des classes d'animation personnalisées
function addCustomAnimationClasses() {
    // Ajouter la classe pulse-glow aux icônes importantes
    const importantIcons = document.querySelectorAll('.fas.fa-database, .fas.fa-tasks, .fas.fa-handshake');
    importantIcons.forEach(icon => {
        icon.classList.add('pulse-glow');
    });
    
    // Ajouter la classe skill-icon aux icônes de compétences
    const skillIcons = document.querySelectorAll('.bg-gray-100 .fas, .bg-purple-50 .fas');
    skillIcons.forEach(icon => {
        icon.classList.add('skill-icon');
    });
    
    // Ajouter la classe card-hover-advanced aux cartes principales
    const mainCards = document.querySelectorAll('.bg-white\\/10, .bg-blue-50, .bg-green-50, .bg-purple-50');
    mainCards.forEach(card => {
        card.classList.add('card-hover-advanced');
    });
}

// Fonction pour gérer les erreurs de chargement
window.addEventListener('error', function(e) {
    console.warn('Erreur de chargement:', e.message);
});

// Fonction pour optimiser les performances
function optimizePerformance() {
    // Désactiver les animations sur les appareils avec des préférences de réduction de mouvement
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.body.classList.add('reduce-motion');
    }
    
    // Optimiser les images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.loading = 'lazy';
    });
}

// Appeler l'optimisation des performances
optimizePerformance();
