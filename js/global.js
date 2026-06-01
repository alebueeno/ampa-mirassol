/**
 * Classes para a página AMPA Mirassol
 * Implementação Orientada a Objetos (OOP)
 */

class HeroSlider {
    constructor() {
        this.slides = document.querySelectorAll('.bg-slide');
        this.thumbs = document.querySelectorAll('.thumb');
        this.lightbox = document.getElementById('hero-lightbox');
        this.lightboxImg = document.getElementById('lightbox-img');
        this.lightboxClose = document.querySelector('.lightbox-close');
        this.btnLightboxPrev = document.querySelector('#hero-lightbox .lightbox-btn.prev');
        this.btnLightboxNext = document.querySelector('#hero-lightbox .lightbox-btn.next');

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
        }

        this.startAutoplay();
        this.updateLightboxArrows(); // Garante estado inicial
    }

    updateLightboxArrows() {
        if (!this.btnLightboxPrev || !this.btnLightboxNext) return;
        if (this.currentIndex === 0) {
            this.btnLightboxPrev.style.display = 'none';
        } else {
            this.btnLightboxPrev.style.display = 'flex';
        }

        if (this.currentIndex === this.slides.length - 1) {
            this.btnLightboxNext.style.display = 'none';
        } else {
            this.btnLightboxNext.style.display = 'flex';
        }
    }

    openLightbox() {
        if (!this.lightbox) return;
        this.stopAutoplay();
        
        const bgImageStyle = this.slides[this.currentIndex].style.backgroundImage;
        const urlMatch = bgImageStyle.match(/url\(["']?(.*?)["']?\)/);
        if (urlMatch && urlMatch[1]) {
            this.lightboxImg.src = urlMatch[1];
        }

        this.lightbox.classList.add('active');
        this.updateLightboxArrows();
    }

    closeLightbox() {
        this.lightbox.classList.remove('active');
        this.startAutoplay();
    }

    moveLightbox(direction) {
        let newIndex = this.currentIndex + direction;
        
        // Impede de navegar além dos limites
        if (newIndex < 0 || newIndex >= this.slides.length) return;
        
        this.goToSlide(newIndex);
        
        const bgImageStyle = this.slides[newIndex].style.backgroundImage;
        const urlMatch = bgImageStyle.match(/url\(["']?(.*?)["']?\)/);
        if (urlMatch && urlMatch[1]) {
            this.lightboxImg.src = urlMatch[1];
        }
        
        this.updateLightboxArrows();
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

        // Touch variables
        this.startX = 0;
        this.currentX = 0;
        this.isDragging = false;
    }

    init() {
        if (!this.track || this.items.length === 0) return;

        this.setupDots();
        this.updateState();

        // Listeners Resize
        window.addEventListener('resize', () => {
            const wasMobile = this.isMobile;
            this.isMobile = window.innerWidth <= 768;
            if (wasMobile !== this.isMobile) {
                this.updateState();
            }
        });

        // Listeners Buttons
        if (this.btnPrev) this.btnPrev.addEventListener('click', () => this.move(-1));
        if (this.btnNext) this.btnNext.addEventListener('click', () => this.move(1));

        // Touch / Swipe Listeners
        this.track.addEventListener('touchstart', (e) => this.touchStart(e), { passive: true });
        this.track.addEventListener('touchmove', (e) => this.touchMove(e), { passive: false }); // False para poder dar preventDefault se necessário
        this.track.addEventListener('touchend', (e) => this.touchEnd(e));
        
        // Mouse drag listeners
        this.track.addEventListener('mousedown', (e) => this.touchStart(e));
        window.addEventListener('mousemove', (e) => this.touchMove(e));
        window.addEventListener('mouseup', (e) => this.touchEnd(e));
        
        // Previne drag nativo da imagem que pode quebrar o carrossel no desktop
        this.items.forEach(item => {
            const img = item.querySelector('img');
            if(img) {
                img.addEventListener('dragstart', (e) => e.preventDefault());
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
            // Volta para a visualização Desktop (Grid)
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
        if (this.currentIndex === 0) {
            this.btnPrev.style.display = 'none';
        } else {
            this.btnPrev.style.display = 'flex';
        }

        if (this.currentIndex === this.items.length - 1) {
            this.btnNext.style.display = 'none';
        } else {
            this.btnNext.style.display = 'flex';
        }
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

    touchStart(e) {
        if (!this.isMobile) return;
        this.isDragging = true;
        this.startX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
        this.currentX = this.startX;
        this.track.style.transition = 'none'; // previne animação dura
    }

    touchMove(e) {
        if (!this.isDragging || !this.isMobile) return;
        
        this.currentX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
        const diffX = this.currentX - this.startX;
        
        // Se estiver movendo horizontalmente, previne o scroll vertical nativo
        if (Math.abs(diffX) > 10 && e.cancelable) {
            e.preventDefault();
        }
        
        const itemWidth = this.items[0].offsetWidth + 15;
        const baseMove = -(this.currentIndex * itemWidth);
        
        this.track.style.transform = `translateX(${baseMove + diffX}px)`;
    }

    touchEnd(e) {
        if (!this.isDragging || !this.isMobile) return;
        this.isDragging = false;
        this.track.style.transition = 'transform 0.3s ease-out';
        
        const diffX = this.currentX - this.startX;
        const threshold = 50; // precisa arrastar 50px para mudar

        if (Math.abs(diffX) > threshold) {
            if (diffX > 0) {
                this.move(-1);
            } else {
                this.move(1);
            }
        } else {
            this.goTo(this.currentIndex);
        }
        
        this.startX = 0;
        this.currentX = 0;
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
