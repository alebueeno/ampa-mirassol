/**
 * Classes para a página AMPA Mirassol
 * Implementação Orientada a Objetos (OOP)
 */

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
    }

    init() {
        this.scrollReveal.init();
        this.backToTop.init();
        this.pixCopier.init();
        this.mobileMenu.init();
    }
}

// Inicializa a aplicação quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.init();
});
