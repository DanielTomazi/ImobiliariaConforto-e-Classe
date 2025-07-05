// Modern JavaScript for Conforto e Classe Website

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// Initialize all website functionality
function initializeWebsite() {
    initMobileMenu();
    initScrollEffects();
    initSearchFunctionality();
    initPropertyCards();
    initSmoothScrolling();
    initAboutAnimations();
    initContactForm();
    initFormEnhancements();
    initFooterLinks();
    initSocialLinks();
}

// Mobile Menu Functionality
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

// Scroll Effects
function initScrollEffects() {
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header?.classList.add('scrolled');
        } else {
            header?.classList.remove('scrolled');
        }
    });

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe property cards for animation
    document.querySelectorAll('.property-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Search Functionality
function initSearchFunctionality() {
    const searchBtn = document.querySelector('.search-btn');
    const tipoImovel = document.getElementById('tipo-imovel');
    const cidade = document.getElementById('cidade');

    if (searchBtn) {
        searchBtn.addEventListener('click', performSearch);
    }

    // Add enter key support for search
    [tipoImovel, cidade].forEach(input => {
        if (input) {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    performSearch();
                }
            });
        }
    });
}

function performSearch() {
    const tipo = document.getElementById('tipo-imovel')?.value;
    const cidade = document.getElementById('cidade')?.value;
    
    // Simple filter animation
    const propertyCards = document.querySelectorAll('.property-card');
    
    propertyCards.forEach((card, index) => {
        card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        card.style.opacity = '0.5';
        card.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
        }, index * 100 + 300);
    });

    // Show search feedback
    showNotification('Buscando imóveis...', 'info');
    
    setTimeout(() => {
        const resultCount = propertyCards.length;
        showNotification(`${resultCount} imóveis encontrados!`, 'success');
    }, 1000);
}

// Property Cards Interactions
function initPropertyCards() {
    const propertyBtns = document.querySelectorAll('.property-btn');
    
    propertyBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const card = btn.closest('.property-card');
            const title = card.querySelector('.property-title')?.textContent;
            
            showPropertyModal(card);
        });
    });
}

// Show Property Modal (simplified version)
function showPropertyModal(card) {
    const title = card.querySelector('.property-title')?.textContent;
    const price = card.querySelector('.property-price')?.textContent;
    const location = card.querySelector('.property-location')?.textContent;
    
    const modalContent = `
        <div style="max-width: 400px; margin: 20px auto; padding: 20px; background: white; border-radius: 12px; text-align: center;">
            <h3 style="color: var(--primary-color); margin-bottom: 10px;">${title}</h3>
            <p style="color: var(--text-gray); margin-bottom: 10px;">${location}</p>
            <p style="font-size: 1.25rem; font-weight: bold; color: var(--primary-color); margin-bottom: 20px;">${price}</p>
            <p style="margin-bottom: 20px;">Entre em contato para mais informações sobre este imóvel.</p>
            <button onclick="closeModal()" style="background: var(--primary-color); color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer;">Fechar</button>
        </div>
    `;
    
    showModal(modalContent);
}

// Smooth Scrolling for Navigation
function initSmoothScrolling() {
    // Get all navigation links
    const navLinks = document.querySelectorAll('.nav-link[href^="#"], .footer-links a[href^="#"]');
    const headerHeight = document.querySelector('.header').offsetHeight;
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Calculate the position with header offset
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                // Smooth scroll to target
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                updateActiveNavLink(targetId);
                
                // Close mobile menu if open
                const hamburger = document.querySelector('.hamburger');
                const navMenu = document.querySelector('.nav-menu');
                if (hamburger && navMenu) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            }
        });
    });

    // Update active nav link on scroll
    window.addEventListener('scroll', updateActiveNavLinkOnScroll);
}

// Update active navigation link
function updateActiveNavLink(targetId) {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === targetId) {
            link.classList.add('active');
        }
    });
}

// Update active nav link based on scroll position
function updateActiveNavLinkOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const headerHeight = document.querySelector('.header').offsetHeight;
    const scrollPos = window.scrollY + headerHeight + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            updateActiveNavLink(`#${sectionId}`);
        }
    });
}

// Email Copy Functionality
function copyEmail() {
    const email = 'daniel_tomazi_oliveira@hotmail.com';
    
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(email).then(() => {
            showNotification('E-mail copiado para a área de transferência!', 'success');
        }).catch(() => {
            fallbackCopyTextToClipboard(email);
        });
    } else {
        fallbackCopyTextToClipboard(email);
    }
}

function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        document.execCommand('copy');
        showNotification('E-mail copiado para a área de transferência!', 'success');
    } catch (err) {
        showNotification('Erro ao copiar e-mail. Tente novamente.', 'error');
    }

    document.body.removeChild(textArea);
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '12px 24px',
        borderRadius: '8px',
        color: 'white',
        fontWeight: '500',
        fontSize: '14px',
        zIndex: '10000',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease',
        maxWidth: '300px',
        wordWrap: 'break-word'
    });

    // Type-specific colors
    const colors = {
        success: '#10B981',
        error: '#EF4444',
        info: '#3B82F6',
        warning: '#F59E0B'
    };
    
    notification.style.background = colors[type] || colors.info;

    document.body.appendChild(notification);

    // Animate in
    requestAnimationFrame(() => {
        notification.style.transform = 'translateX(0)';
    });

    // Auto remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Modal System
function showModal(content) {
    const modalOverlay = document.createElement('div');
    modalOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10001;
        backdrop-filter: blur(4px);
    `;
    
    modalOverlay.innerHTML = content;
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });
    
    document.body.appendChild(modalOverlay);
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.querySelector('[style*="z-index: 10001"]');
    if (modal) {
        modal.remove();
        document.body.style.overflow = '';
    }
}

// Contact Form Handler
function initContactForm() {
    const form = document.querySelector('.contact .form');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const data = {
            nome: formData.get('nome'),
            email: formData.get('email'),
            telefone: formData.get('telefone'),
            interesse: formData.get('interesse'),
            mensagem: formData.get('mensagem')
        };

        // Validate required fields
        if (!data.nome || !data.email || !data.telefone || !data.mensagem) {
            showNotification('Por favor, preencha todos os campos obrigatórios.', 'error');
            return;
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showNotification('Por favor, insira um e-mail válido.', 'error');
            return;
        }

        // Simulate form submission
        const submitBtn = form.querySelector('.form-btn');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="3"/>
                <path d="M12 1v6M12 17v6M4.22 4.22l4.24 4.24M15.54 15.54l4.24 4.24M1 12h6M17 12h6M4.22 19.78l4.24-4.24M15.54 8.46l4.24-4.24"/>
            </svg>
            Enviando...
        `;
        submitBtn.disabled = true;

        // Simulate API call delay
        setTimeout(() => {
            showNotification(`Obrigado, ${data.nome}! Sua mensagem foi enviada com sucesso. Entraremos em contato em breve.`, 'success');
            form.reset();
            
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Form Input Enhancements
function initFormEnhancements() {
    // Phone number formatting
    const phoneInput = document.getElementById('telefone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length >= 11) {
                value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
            } else if (value.length >= 7) {
                value = value.replace(/(\d{2})(\d{4})(\d+)/, '($1) $2-$3');
            } else if (value.length >= 3) {
                value = value.replace(/(\d{2})(\d+)/, '($1) $2');
            }
            
            e.target.value = value;
        });
    }

    // Add floating label effect
    const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // Check if input has value on load
        if (input.value) {
            input.parentElement.classList.add('focused');
        }
    });
}

// Smooth scrolling for footer links
function initFooterLinks() {
    const footerLinks = document.querySelectorAll('.footer-links a[href^="#"]');
    
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Social links tracking (for analytics)
function initSocialLinks() {
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.getAttribute('aria-label');
            
            // Here you would typically send analytics data
            console.log(`Social link clicked: ${platform}`);
            
            // Show notification for demo purposes
            showNotification(`Redirecionando para ${platform}...`, 'info');
            
            // In a real scenario, you would open the actual social media link
            // window.open('https://actual-social-link.com', '_blank');
        });
    });
}

// About Section Animations
function initAboutAnimations() {
    const statItems = document.querySelectorAll('.stat-item');
    
    // Intersection Observer para animar quando entrar na tela
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // Animar os números
                const numberElement = entry.target.querySelector('.stat-number');
                if (numberElement) {
                    animateNumber(numberElement);
                }
            }
        });
    }, {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    });
    
    statItems.forEach(item => {
        observer.observe(item);
    });
}

// Animar números crescendo
function animateNumber(element) {
    const finalNumber = element.textContent;
    const hasPlus = finalNumber.includes('+');
    const number = parseInt(finalNumber.replace(/\D/g, ''));
    
    let current = 0;
    const increment = number / 50; // 50 frames de animação
    const timer = setInterval(() => {
        current += increment;
        if (current >= number) {
            element.textContent = hasPlus ? `${number}+` : number;
            clearInterval(timer);
        } else {
            element.textContent = hasPlus ? `${Math.floor(current)}+` : Math.floor(current);
        }
    }, 30);
}

// Legacy function for backward compatibility
function email() {
    copyEmail();
}

// Expose functions globally for HTML onclick handlers
window.copyEmail = copyEmail;
window.email = email;
window.closeModal = closeModal;
