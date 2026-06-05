# Landing Page Institucional - AMPA Mirassol 🐾

Este projeto consiste no desenvolvimento de uma Landing Page moderna, acessível e responsiva para a **AMPA (Associação Mirassolense de Proteção aos Animais)**, uma ONG dedicada ao resgate, acolhimento, tratamento e adoção de animais em situação de vulnerabilidade na cidade de Mirassol - SP.

## 📌 Contexto Acadêmico e Equipe

Este site foi concebido e desenvolvido voluntariamente como parte das atividades práticas da disciplina **PROJETO INTEGRADOR EXTENSIONISTA I**. 

O projeto é fruto do esforço colaborativo de uma equipe de estudantes dedicados a aplicar conhecimentos acadêmicos em soluções tecnológicas com impacto social real. Nossa equipe multidisciplinar trabalhou de forma integrada nas etapas de pesquisa, levantamento de requisitos, design de interface (UI/UX) e desenvolvimento web (Front-End), unindo habilidades para entregar uma plataforma profissional que visa aumentar a visibilidade e facilitar o recebimento de doações pela instituição.

## 🌐 Acesso Online & Deploy

O projeto está publicado oficialmente na internet e pode ser acessado em:
- **Domínio Oficial:** [https://www.ongampa.com.br](https://www.ongampa.com.br) (com redirecionamento automático de `http://ongampa.com.br`)
- **Hospedagem & CI/CD:** Implantado através do **Cloudflare Pages**, garantindo deploy automatizado integrado ao repositório GitHub.
- **Camada de Segurança na Borda (Edge):** 
  - Conexão segura sob criptografia **TLS Completa (Full SSL)**.
  - Redirecionamento permanente forçado para conexões seguras (**Always Use HTTPS**).
  - Política ativa de **HSTS** (Strict-Transport-Security) com duração de 12 meses, incluindo proteção a subdomínios, cabeçalho de proteção contra MIME-sniffing (`X-Content-Type-Options: nosniff`) e inclusão na lista de pré-carregamento dos navegadores (**Preload**).
  - Proteção contra requisições automatizadas maliciosas via **Bot Fight Mode**.
- **Financiamento:** O domínio oficial `ongampa.com.br` foi registrado e pago integralmente com **recursos próprios da equipe de estudantes**, como uma contribuição voluntária permanente para a expansão e sustentabilidade digital da associação.

## 🎯 Funcionalidades e Características

O site atua como um canal digital centralizado para a ONG, entregando uma experiência *premium* focada em conversão (doações) e visibilidade (adoções). As principais características incluem:

- **Design Institucional Premium (UI/UX):** Interface baseada na paleta oficial da ONG (Azul Real e Azul Celeste), enriquecida com técnicas de *Glassmorphism* (painéis translúcidos) e pares tipográficos modernos (*Outfit* e *Plus Jakarta Sans*).
- **Galeria de Adoções Universal ("Grid do Instagram"):** Em telas grandes (Desktop), a seção exibe um elegante Grid horizontal. Em dispositivos móveis, transforma-se num **Carrossel Interativo** extremamente fluido graças à integração de rolagem nativa via placa de vídeo (CSS Scroll Snap). As imagens são travadas na proporção perfeita de 1:1, utilizando técnicas modernas de `object-position` para garantir que os rostos nunca sejam cortados indepedentemente do tamanho da tela.
- **Hero Dinâmico e Lightbox:** Cabeçalho interativo com um sistema de *slider* em background e uma galeria expansível em tela cheia (Lightbox Modal) com controles de navegação completos (Setas, Swipe Tátil e Paginação em Dots).
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
  - **CSS Scroll Snap & Aspect Ratios:** Uso massivo da nova engine nativa de rolagem (dispensando scripts lentos de simulação tátil) e do modelo rígido de enquadramento universal de fotos, impedindo deformações de tela em múltiplos tamanhos de smartphones.
  - Media Queries e Container Queries rigorosas para garantir a experiência *Mobile First* fluída e elástica.
- **JavaScript (Vanilla) & POO**: 
  - Arquitetura 100% estruturada no paradigma de **Programação Orientada a Objetos (OOP)**.
  - Classes modulares, limpas e com alto índice de reaproveitamento (`HeroSlider`, `AdocaoCarousel`, `PixCopier`, `MobileMenu`, etc).
  - **Delegação Tecnológica (JS vs CSS):** Em refatoração profunda, scripts manuais de física e atrito matemático de "drag" foram extintos. A responsabilidade da rolagem foi repassada para os navegadores nativos (`C++`) através de gatilhos CSS, enquanto o Javascript agora atua apenas de maneira assíncrona gerenciando o avanço (`scrollTo`) e sincronizando indicadores visuais com altíssima perfomance.
- **Fontes e Ícones**: Integração com Google Fonts e Font Awesome.

---

*Projeto desenvolvido com 💙 pela equipe em prol da causa animal.*
