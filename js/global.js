/**
 * Classes para a página AMPA Mirassol
 * Implementação Orientada a Objetos (OOP)
 */

class SwipeHandler {
    constructor(element, options) {
        this.element = element;
        this.onSwipeLeft = options.onSwipeLeft;
        this.onSwipeRight = options.onSwipeRight;
        this.onMove = options.onMove;
        this.onEnd = options.onEnd;
        this.isMobileOnly = options.isMobileOnly || false;
        
        this.startX = 0;
        this.currentX = 0;
        this.isDragging = false;

        this.init();
    }

    init() {
        if (!this.element) return;
        
        this.element.addEventListener('touchstart', (e) => this.start(e), { passive: true });
        this.element.addEventListener('touchmove', (e) => this.move(e), { passive: false });
        this.element.addEventListener('touchend', (e) => this.end(e));
        
        this.element.addEventListener('mousedown', (e) => this.start(e));
        window.addEventListener('mousemove', (e) => this.move(e));
        window.addEventListener('mouseup', (e) => this.end(e));
        
        if (this.element.tagName === 'IMG') {
            this.element.addEventListener('dragstart', (e) => e.preventDefault());
        } else {
            const imgs = this.element.querySelectorAll('img');
            imgs.forEach(img => img.addEventListener('dragstart', (e) => e.preventDefault()));
        }
    }

    start(e) {
        if (this.isMobileOnly && window.innerWidth > 768) return;
        this.isDragging = true;
        this.startX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
        this.currentX = this.startX;
    }

    move(e) {
        if (!this.isDragging) return;
        if (this.isMobileOnly && window.innerWidth > 768) return;
        
        this.currentX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
        const diffX = this.currentX - this.startX;
        
        if (Math.abs(diffX) > 10 && e.cancelable) {
            e.preventDefault();
        }
        
        if (this.onMove) this.onMove(diffX);
    }

    end(e) {
        if (!this.isDragging) return;
        if (this.isMobileOnly && window.innerWidth > 768) return;
        this.isDragging = false;
        
        const diffX = this.currentX - this.startX;
        const threshold = 50;
        
        let direction = 0;
        if (Math.abs(diffX) > threshold) {
            if (diffX > 0) {
                direction = -1; 
                if (this.onSwipeRight) this.onSwipeRight();
            } else {
                direction = 1; 
                if (this.onSwipeLeft) this.onSwipeLeft();
            }
        }
        
        if (this.onEnd) this.onEnd(direction, diffX);
        
        this.startX = 0;
        this.currentX = 0;
    }
}

class HeroSlider {
    constructor() {
        this.slides = document.querySelectorAll('.bg-slide');
        this.thumbs = document.querySelectorAll('.thumb');
        this.lightbox = document.getElementById('hero-lightbox');
        this.lightboxImg = document.getElementById('lightbox-img');
        this.lightboxClose = document.querySelector('.lightbox-close');
        this.btnLightboxPrev = document.querySelector('#hero-lightbox .lightbox-btn.prev');
        this.btnLightboxNext = document.querySelector('#hero-lightbox .lightbox-btn.next');
        this.dotsContainer = document.getElementById('lightbox-dots');

        this.currentIndex = 0;
        this.interval = null;
        this.delay = 6000;
    }

    init() {
        if (this.slides.length === 0 || this.thumbs.length === 0) return;
        
        this.thumbs.forEach((thumb) => {
            thumb.addEventListener('click', (e) => {
                const index = parseInt(e.currentTarget.dataset.index, 10);
                this.goToSlide(index);
                this.openLightbox();
                this.resetAutoplay();
            });
        });

        if (this.lightbox) {
            this.lightboxClose.addEventListener('click', () => this.closeLightbox());
            this.lightbox.addEventListener('click', (e) => {
                if (e.target === this.lightbox) this.closeLightbox();
            });
            if (this.btnLightboxPrev) {
                this.btnLightboxPrev.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.moveLightbox(-1);
                });
            }
            if (this.btnLightboxNext) {
                this.btnLightboxNext.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.moveLightbox(1);
                });
            }

            this.setupDots();

            // Swipe handler for lightbox
            this.swipeHandler = new SwipeHandler(this.lightboxImg, {
                isMobileOnly: false,
                onSwipeLeft: () => this.moveLightbox(1),
                onSwipeRight: () => this.moveLightbox(-1),
                onMove: (diffX) => {
                    this.lightboxImg.style.transition = 'none';
                    this.lightboxImg.style.transform = `translateX(${diffX}px)`;
                },
                onEnd: () => {
                    this.lightboxImg.style.transition = 'transform 0.3s ease-out';
                    this.lightboxImg.style.transform = 'translateX(0)';
                }
            });
        }

        this.startAutoplay();
        this.updateLightboxArrows();
    }

    setupDots() {
        if (!this.dotsContainer) return;
        this.dotsContainer.innerHTML = '';
        this.slides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.classList.add('dot');
            dot.setAttribute('aria-label', `Ir para imagem ${index + 1}`);
            dot.addEventListener('click', (e) => {
                e.stopPropagation();
                this.goToSlide(index);
                this.updateLightboxImage();
            });
            this.dotsContainer.appendChild(dot);
        });
    }

    updateDots() {
        if (!this.dotsContainer) return;
        const dots = this.dotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            if (index === this.currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    updateLightboxArrows() {
        if (!this.btnLightboxPrev || !this.btnLightboxNext) return;
        this.btnLightboxPrev.style.display = this.currentIndex === 0 ? 'none' : 'flex';
        this.btnLightboxNext.style.display = this.currentIndex === this.slides.length - 1 ? 'none' : 'flex';
        this.updateDots();
    }

    openLightbox() {
        if (!this.lightbox) return;
        this.stopAutoplay();
        this.updateLightboxImage();
        this.lightbox.classList.add('active');
    }

    updateLightboxImage() {
        const bgImageStyle = this.slides[this.currentIndex].style.backgroundImage;
        const urlMatch = bgImageStyle.match(/url\(["']?(.*?)["']?\)/);
        if (urlMatch && urlMatch[1]) {
            this.lightboxImg.src = urlMatch[1];
        }
        this.updateLightboxArrows();
    }

    closeLightbox() {
        this.lightbox.classList.remove('active');
        this.startAutoplay();
    }

    moveLightbox(direction) {
        let newIndex = this.currentIndex + direction;
        if (newIndex < 0 || newIndex >= this.slides.length) return;
        this.goToSlide(newIndex);
        this.updateLightboxImage();
    }

    goToSlide(index) {
        if (index === this.currentIndex) return;

        this.slides[this.currentIndex].classList.remove('active');
        this.thumbs[this.currentIndex].classList.remove('active');

        this.currentIndex = index;

        this.slides[this.currentIndex].classList.add('active');
        this.thumbs[this.currentIndex].classList.add('active');
    }

    stopAutoplay() {
        if (this.interval) clearInterval(this.interval);
    }

    startAutoplay() {
        if (this.interval) clearInterval(this.interval);
        this.interval = setInterval(() => {
            let nextIndex = (this.currentIndex + 1) % this.slides.length;
            this.goToSlide(nextIndex);
        }, this.delay);
    }

    resetAutoplay() {
        this.startAutoplay();
    }
}

class ScrollReveal {
    constructor() {
        this.reveals = document.querySelectorAll('.reveal');
        this.revealOptions = {
            threshold: 0.15, // 15% do elemento precisa estar visivel para disparar
            rootMargin: "0px 0px -50px 0px"
        };
    }

    init() {
        const revealOnScroll = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, this.revealOptions);

        this.reveals.forEach(reveal => {
            revealOnScroll.observe(reveal);
        });
    }
}

class BackToTopButton {
    constructor() {
        this.btnTop = document.createElement('button');
        this.btnTop.id = 'btnTop';
        this.btnTop.title = 'Voltar ao topo';
        this.btnTop.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
    }

    init() {
        document.body.appendChild(this.btnTop);

        // Mostrar/ocultar conforme o scroll
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                this.btnTop.classList.add('show');
            } else {
                this.btnTop.classList.remove('show');
            }
        });

        // Evento de clique para voltar ao topo suavemente
        this.btnTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

class PixCopier {
    constructor() {
        this.btnCopiarPix = document.getElementById('btn-copiar-pix');
        this.inputPix = document.getElementById('pix-chave');
    }

    init() {
        if (this.btnCopiarPix && this.inputPix) {
            this.btnCopiarPix.addEventListener('click', () => this.handleCopy());
        }
    }

    handleCopy() {
        // Seleciona o conteúdo do input
        this.inputPix.select();
        this.inputPix.setSelectionRange(0, 99999); // Para mobile

        // Copia para a área de transferência
        if (navigator.clipboard) {
            navigator.clipboard.writeText(this.inputPix.value)
                .then(() => this.feedbackCopiado())
                .catch(err => console.error('Falha ao copiar: ', err));
        } else {
            // Fallback para navegadores antigos
            document.execCommand('copy');
            this.feedbackCopiado();
        }
    }

    feedbackCopiado() {
        const textoOriginal = this.btnCopiarPix.innerText;
        this.btnCopiarPix.innerText = 'Chave Copiada!';
        this.btnCopiarPix.style.backgroundColor = '#4BAAE3'; // Azul Celeste para feedback
        
        setTimeout(() => {
            this.btnCopiarPix.innerText = textoOriginal;
            this.btnCopiarPix.style.backgroundColor = ''; // Retorna à cor original
        }, 2000);
    }
}

class MobileMenu {
    constructor() {
        this.mobileMenu = document.getElementById('mobile-menu');
        this.navLinks = document.querySelector('.nav-links');
        this.links = this.navLinks ? this.navLinks.querySelectorAll('a') : [];
    }

    init() {
        if (this.mobileMenu && this.navLinks) {
            this.mobileMenu.addEventListener('click', () => this.toggleMenu());
            
            // Fechar o menu ao clicar em um link
            this.links.forEach(link => {
                link.addEventListener('click', () => this.closeMenu());
            });
        }
    }

    toggleMenu() {
        this.navLinks.classList.toggle('active');
    }

    closeMenu() {
        this.navLinks.classList.remove('active');
    }
}

class AdocaoCarousel {
    constructor() {
        this.track = document.querySelector('.carousel-track');
        this.items = document.querySelectorAll('.item-adocao');
        this.btnPrev = document.querySelector('.carousel-btn.prev');
        this.btnNext = document.querySelector('.carousel-btn.next');
        this.dotsContainer = document.getElementById('adocao-dots');
        
        this.currentIndex = 0;
        this.isMobile = window.innerWidth <= 768;
    }

    init() {
        if (!this.track || this.items.length === 0) return;

        this.setupDots();
        this.updateState();

        window.addEventListener('resize', () => {
            const wasMobile = this.isMobile;
            this.isMobile = window.innerWidth <= 768;
            if (wasMobile !== this.isMobile) {
                this.updateState();
            }
        });

        if (this.btnPrev) this.btnPrev.addEventListener('click', () => this.move(-1));
        if (this.btnNext) this.btnNext.addEventListener('click', () => this.move(1));

        // Swipe handler for track
        this.swipeHandler = new SwipeHandler(this.track, {
            isMobileOnly: true,
            onSwipeLeft: () => this.move(1),
            onSwipeRight: () => this.move(-1),
            onMove: (diffX) => {
                const itemWidth = this.items[0].offsetWidth + 15;
                const baseMove = -(this.currentIndex * itemWidth);
                this.track.style.transition = 'none';
                this.track.style.transform = `translateX(${baseMove + diffX}px)`;
            },
            onEnd: (direction) => {
                this.track.style.transition = 'transform 0.3s ease-out';
                if (direction === 0) {
                    this.goTo(this.currentIndex);
                }
            }
        });
    }

    setupDots() {
        if (!this.dotsContainer) return;
        this.dotsContainer.innerHTML = '';
        this.items.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.classList.add('dot');
            dot.setAttribute('aria-label', `Ir para slide ${index + 1}`);
            dot.addEventListener('click', () => this.goTo(index));
            this.dotsContainer.appendChild(dot);
        });
    }

    updateState() {
        if (this.isMobile) {
            this.goTo(this.currentIndex);
        } else {
            this.track.style.transform = '';
        }
    }

    goTo(index) {
        if (!this.isMobile) return;
        
        if (index < 0) index = 0;
        if (index >= this.items.length) index = this.items.length - 1;
        
        this.currentIndex = index;
        
        const itemWidth = this.items[0].offsetWidth;
        const gap = 15;
        const moveAmount = this.currentIndex * (itemWidth + gap);
        
        this.track.style.transform = `translateX(-${moveAmount}px)`;
        this.updateDots();
        this.updateArrows();
    }

    updateArrows() {
        if (!this.btnPrev || !this.btnNext) return;
        this.btnPrev.style.display = this.currentIndex === 0 ? 'none' : 'flex';
        this.btnNext.style.display = this.currentIndex === this.items.length - 1 ? 'none' : 'flex';
    }

    move(direction) {
        this.goTo(this.currentIndex + direction);
    }

    updateDots() {
        if (!this.dotsContainer) return;
        const dots = this.dotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            if (index === this.currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
}

class App {
    constructor() {
        this.scrollReveal = new ScrollReveal();
        this.backToTop = new BackToTopButton();
        this.pixCopier = new PixCopier();
        this.mobileMenu = new MobileMenu();
        this.heroSlider = new HeroSlider();
        this.adocaoCarousel = new AdocaoCarousel();
    }

    init() {
        this.scrollReveal.init();
        this.backToTop.init();
        this.pixCopier.init();
        this.mobileMenu.init();
        this.heroSlider.init();
        this.adocaoCarousel.init();
    }
}

// Inicializa a aplicação quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.init();
});
