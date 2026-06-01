# Landing Page Institucional - AMPA Mirassol 🐾

Este projeto consiste no desenvolvimento de uma Landing Page moderna, acessível e responsiva para a **AMPA (Associação Mirassolense de Proteção aos Animais)**, uma ONG dedicada ao resgate, acolhimento, tratamento e adoção de animais em situação de vulnerabilidade na cidade de Mirassol - SP.

## 📌 Contexto Acadêmico e Equipe

Este site foi concebido e desenvolvido voluntariamente como parte das atividades práticas da disciplina **PROJETO INTEGRADOR EXTENSIONISTA I**. 

O projeto é fruto do esforço colaborativo de uma equipe de estudantes dedicados a aplicar conhecimentos acadêmicos em soluções tecnológicas com impacto social real. Nossa equipe multidisciplinar trabalhou de forma integrada nas etapas de pesquisa, levantamento de requisitos, design de interface (UI/UX) e desenvolvimento web (Front-End), unindo habilidades para entregar uma plataforma profissional que visa aumentar a visibilidade e facilitar o recebimento de doações pela instituição.

## 🎯 Funcionalidades e Características

O site atua como um canal digital centralizado para a ONG, entregando uma experiência *premium* focada em conversão (doações) e visibilidade (adoções). As principais características incluem:

- **Design Institucional Premium (UI/UX):** Interface baseada na paleta oficial da ONG (Azul Real e Azul Celeste), enriquecida com técnicas de *Glassmorphism* (painéis translúcidos) e pares tipográficos modernos (*Outfit* e *Plus Jakarta Sans*).
- **Galeria de Adoções Híbrida:** Uma seção inovadora dedicada às histórias de adoção. Em telas grandes (Desktop), exibe um elegante *Masonry Grid*. Em dispositivos móveis (Smartphones), transforma-se automaticamente em um **Carrossel Interativo** com suporte a rolagem nativa por toque (*Touch Swipe*).
- **Hero Dinâmico e Lightbox:** Cabeçalho interativo com um sistema de *slider* em background e uma galeria expansível em tela cheia (Lightbox Modal) com controles de navegação completos.
- **Interatividade & Engajamento:** 
  - Animações fluídas de entrada (*Scroll Reveal*).
  - Implementação de um botão interativo que copia instantaneamente a chave PIX (CNPJ) para a área de transferência do doador, reduzindo atritos.
- **Estrutura Semântica e Acessível (SEO):** Utilização estrita de tags HTML5 semânticas (`<main>`, `<article>`, `<address>`), além de atributos `alt` e `aria-labels` altamente descritivos focados no ranqueamento orgânico e acessibilidade.
- **Integração de Localização:** Mapa do Google (Iframe) incorporado e centrado na sede da AMPA, facilitando o acesso de novos voluntários e adotantes.

## 🚀 Arquitetura e Tecnologias

A aplicação foi construída com foco absoluto em performance, dispensando o uso de bibliotecas de terceiros (como jQuery, Bootstrap ou Swiper.js) para manter o carregamento instantâneo. 

- **HTML5**: Semântica de alta fidelidade e acessibilidade web.
- **CSS3 (Vanilla)**: 
  - Layouts complexos utilizando **CSS Grid** e **Flexbox**.
  - Variáveis HSL nativas para padronização de cores e temas dinâmicos.
  - Efeitos visuais avançados como *Parallax*, *Glassmorphism*, e transições `cubic-bezier`.
  - Media Queries rigorosas para garantir a experiência *Mobile First*.
- **JavaScript (Vanilla) & POO**: 
  - Arquitetura 100% estruturada no paradigma de **Programação Orientada a Objetos (OOP)**.
  - Classes modulares e encapsuladas (`HeroSlider`, `AdocaoCarousel`, `PixCopier`, `ScrollReveal`, `MobileMenu`).
  - Cálculo matemático avançado para detecção de gestos na tela (`touchstart`, `touchmove`, `touchend`) alimentando o motor customizado do carrossel mobile.
- **Fontes e Ícones**: Integração com Google Fonts e Font Awesome.

## 🤝 Acesso e Execução Local

O projeto foi construído de forma totalmente estática. Para executá-lo localmente, não é necessário instalar dependências ou rodar servidores complexos (como Node.js). 

```bash
# Clone o repositório
git clone https://github.com/alebueeno/ampa-mirassol.git

# Acesse o diretório
cd ampa-mirassol

# Basta abrir o arquivo index.html diretamente no seu navegador!
```

---

*Projeto desenvolvido com 💙 pela equipe em prol da causa animal.*
