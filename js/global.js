/**
 * Classes para a página AMPA Mirassol
 * Implementação Orientada a Objetos (OOP)
 */

class HeroSlider {
    constructor() {
        this.slides = document.querySelectorAll('.bg-slide');
        this.thumbs = document.querySelectorAll('.thumb');
        this.btnExpand = document.getElementById('btn-expand-hero');
        this.lightbox = document.getElementById('hero-lightbox');
        this.lightboxImg = document.getElementById('lightbox-img');
        this.lightboxClose = document.querySelector('.lightbox-close');

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
                this.resetAutoplay();
            });
        });

        if (this.btnExpand && this.lightbox) {
            this.btnExpand.addEventListener('click', () => this.openLightbox());
            this.lightboxClose.addEventListener('click', () => this.closeLightbox());
            this.lightbox.addEventListener('click', (e) => {
                if (e.target === this.lightbox) this.closeLightbox();
            });
        }

        this.startAutoplay();
    }

    openLightbox() {
        const bgImageStyle = this.slides[this.currentIndex].style.backgroundImage;
        const urlMatch = bgImageStyle.match(/url\(["']?(.*?)["']?\)/);
        if (urlMatch && urlMatch[1]) {
            this.lightboxImg.src = urlMatch[1];
            this.lightbox.classList.add('active');
            if (this.interval) clearInterval(this.interval);
        }
    }

    closeLightbox() {
        this.lightbox.classList.remove('active');
        this.startAutoplay();
    }

    goToSlide(index) {
        if (index === this.currentIndex) return;

        this.slides[this.currentIndex].classList.remove('active');
        this.thumbs[this.currentIndex].classList.remove('active');

        this.currentIndex = index;

        this.slides[this.currentIndex].classList.add('active');
        this.thumbs[this.currentIndex].classList.add('active');
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

class App {
    constructor() {
        this.scrollReveal = new ScrollReveal();
        this.backToTop = new BackToTopButton();
        this.pixCopier = new PixCopier();
        this.mobileMenu = new MobileMenu();
        this.heroSlider = new HeroSlider();
    }

    init() {
        this.scrollReveal.init();
        this.backToTop.init();
        this.pixCopier.init();
        this.mobileMenu.init();
        this.heroSlider.init();
    }
}

// Inicializa a aplicação quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.init();
});
