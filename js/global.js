document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. SCROLL REVEAL (INTERSECTION OBSERVER)
       ========================================================================== */
    const reveals = document.querySelectorAll('.reveal');

    const revealOptions = {
        threshold: 0.15, // 15% do elemento precisa estar visivel para disparar
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    reveals.forEach(reveal => {
        revealOnScroll.observe(reveal);
    });

    /* ==========================================================================
       2. BOTÃO VOLTAR AO TOPO (Injetado via JS)
       ========================================================================== */
    // Cria o botão dinamicamente e injeta no body para limpar o HML
    const btnTop = document.createElement('button');
    btnTop.id = 'btnTop';
    btnTop.title = 'Voltar ao topo';
    btnTop.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
    document.body.appendChild(btnTop);

    // Mostrar/ocultar conforme o scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            btnTop.classList.add('show');
        } else {
            btnTop.classList.remove('show');
        }
    });

    // Evento de clique para voltar ao topo suavemente
    btnTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    /* ==========================================================================
       3. COPIAR CHAVE PIX
       ========================================================================== */
    const btnCopiarPix = document.getElementById('btn-copiar-pix');
    const inputPix = document.getElementById('pix-chave');

    if (btnCopiarPix && inputPix) {
        btnCopiarPix.addEventListener('click', () => {
            // Seleciona o conteúdo do input
            inputPix.select();
            inputPix.setSelectionRange(0, 99999); // Para mobile

            // Copia para a área de transferência usando a API mais moderna (se disponível) ou fallback
            if (navigator.clipboard) {
                navigator.clipboard.writeText(inputPix.value).then(() => {
                    feedbackCopiado(btnCopiarPix);
                }).catch(err => {
                    console.error('Falha ao copiar: ', err);
                });
            } else {
                // Fallback para navegadores antigos
                document.execCommand('copy');
                feedbackCopiado(btnCopiarPix);
            }
        });
    }

    function feedbackCopiado(btn) {
        const textoOriginal = btn.innerText;
        btn.innerText = 'Chave Copiada!';
        btn.style.backgroundColor = '#4BAAE3'; // Azul Celeste para feedback
        
        setTimeout(() => {
            btn.innerText = textoOriginal;
            btn.style.backgroundColor = ''; // Retorna à cor original
        }, 2000);
    }

});
