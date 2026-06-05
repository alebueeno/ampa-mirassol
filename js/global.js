/**
 * Classes para a página AMPA Mirassol
 * Implementação Orientada a Objetos (OOP)
 */

/* Classe SwipeHandler foi completamente removida em favor do motor CSS Nativo (Scroll Snap e Touch) 
   seguindo a arquitetura definida na SKILL responsividade. */

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

            // Detecção nativa simples de swipe (Sem injeção de 3D transform para previnir bugs no Android)
            let touchStartX = 0;
            this.lightboxImg.addEventListener('touchstart', (e) => {
                touchStartX = e.touches[0].clientX;
            }, { passive: true });
            
            this.lightboxImg.addEventListener('touchend', (e) => {
                const touchEndX = e.changedTouches[0].clientX;
                const diffX = touchEndX - touchStartX;
                if (Math.abs(diffX) > 50) {
                    if (diffX > 0) this.moveLightbox(-1);
                    else this.moveLightbox(1);
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
        this.container = document.querySelector('.carousel-container');
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
        this.updateArrows();

        // Ouve o evento de scroll nativo em vez de calcular drag na mão
        if (this.container) {
            this.container.addEventListener('scroll', () => this.onScroll(), { passive: true });
        }

        window.addEventListener('resize', () => {
            const wasMobile = this.isMobile;
            this.isMobile = window.innerWidth <= 768;
            if (wasMobile !== this.isMobile) {
                if (!this.isMobile && this.container) {
                    this.container.scrollLeft = 0;
                }
            }
        });

        if (this.btnPrev) this.btnPrev.addEventListener('click', () => this.move(-1));
        if (this.btnNext) this.btnNext.addEventListener('click', () => this.move(1));
    }

    onScroll() {
        if (!this.isMobile || !this.container) return;
        const itemWidth = this.items[0].offsetWidth + 15; // card width + gap
        let index = Math.round(this.container.scrollLeft / itemWidth);
        
        if (index < 0) index = 0;
        if (index >= this.items.length) index = this.items.length - 1;
        
        if (this.currentIndex !== index) {
            this.currentIndex = index;
            this.updateDots();
            this.updateArrows();
        }
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
        this.updateDots();
    }

    goTo(index) {
        if (!this.isMobile || !this.container) return;
        
        if (index < 0) index = 0;
        if (index >= this.items.length) index = this.items.length - 1;
        
        this.currentIndex = index;
        
        const itemWidth = this.items[0].offsetWidth;
        const gap = 15;
        let scrollAmount = index * (itemWidth + gap);
        
        // Rolagem CSS nativa perfeita e acelerada por hardware
        this.container.scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
        });
        
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
        this.pixCopier = new PixCopier();
        this.mobileMenu = new MobileMenu();
        this.heroSlider = new HeroSlider();
        this.adocaoCarousel = new AdocaoCarousel();
    }

    init() {
        this.scrollReveal.init();
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
