# Landing Page Institucional - AMPA Mirassol 🐾

Este projeto consiste no desenvolvimento de uma Landing Page moderna, acessível e responsiva para a **AMPA (Associação Mirassolense de Proteção aos Animais)**, uma ONG dedicada ao resgate, acolhimento, tratamento e adoção de animais em situação de vulnerabilidade na cidade de Mirassol - SP.

## 📌 Contexto Acadêmico e Equipe

Este site foi concebido e desenvolvido voluntariamente como parte das atividades práticas da disciplina **PROJETO INTEGRADOR EXTENSIONISTA I**. 

O projeto é fruto do esforço colaborativo de uma equipe de estudantes dedicados a aplicar conhecimentos acadêmicos em soluções tecnológicas com impacto social real. Nossa equipe multidisciplinar trabalhou de forma integrada nas etapas de pesquisa, levantamento de requisitos, design de interface (UI/UX) e desenvolvimento web (Front-End), unindo habilidades para entregar uma plataforma profissional que visa aumentar a visibilidade e facilitar o recebimento de doações pela instituição.

## 🎯 O Que Foi Implementado

O site atua como um canal digital centralizado para a ONG. As principais funcionalidades e características entregues pela equipe incluem:

### ✨ Atualizações Recentes (Design Premium & POO)
- **Hero Slider & Glassmorphism**: Reformulação completa do cabeçalho da página (Hero) com um sistema de *slider* dinâmico para apresentar as fotos da instituição (frente e espaços internos). A interface ganhou um aspecto premium utilizando técnicas de *Glassmorphism* (painéis translúcidos) e uma paleta de cores HSL dinâmica.
- **Seção "Finais Felizes"**: Inclusão de uma nova área dedicada a histórias reais de adoção, exibindo 9 imagens em um elegante formato *Masonry Grid* com micro-animações avançadas de *hover* e *cubic-bezier*. Um link interativo (*gatilho*) foi embutido diretamente na frase principal do Hero.
- **Tipografia Moderna**: Transição para o uso de pares tipográficos de alto padrão (*Outfit* para títulos e *Plus Jakarta Sans* para textos), proporcionando um visual muito mais sofisticado e limpo.
- **Arquitetura POO Avançada**: Refatoração do JavaScript utilizando Programação Orientada a Objetos para a criação da classe independente `HeroSlider`, seguindo diretrizes estritas de responsabilidade única e encapsulamento.

### 📌 Funcionalidades Core
- **Design Institucional (UI/UX):** Uma identidade visual construída sobre a paleta oficial da ONG (Azul Real e Azul Celeste), garantindo uma interface limpa, séria e acolhedora.
- **Estrutura Semântica e Acessível (SEO):** Utilização de HTML5 semântico (`<main>`, `<article>`, `<address>`) e atributos `alt` precisos para garantir acessibilidade e otimizar o ranqueamento orgânico no Google (SEO local).
- **Interatividade & Engajamento:** 
  - Animações fluídas de entrada (*Scroll Reveal*) para manter a atenção do usuário.
  - Implementação de um botão interativo que copia instantaneamente a chave PIX (CNPJ) para a área de transferência do doador, reduzindo atritos na doação.
- **Integração de Localização:** Mapa do Google (Iframe) incorporado e centrado na sede da AMPA, facilitando o acesso de novos voluntários e adotantes.
- **Design Responsivo & Menu Interativo:** Estrutura fluida adaptável a smartphones e tablets, apresentando navegação dinâmica com Menu Hamburger mobile e botão *Back to Top*, ideal para o tráfego advindo do Instagram.
- **Arquitetura Escalável (Clean Code):** A aplicação adota boas práticas de mercado, com CSS altamente modularizado (`base.css`, `layout.css`, `buttons.css`, etc.) e um JavaScript construído 100% no paradigma Orientado a Objetos (OOP), encapsulando lógicas em classes limpas.

## 🚀 Tecnologias Utilizadas

Para garantir que a aplicação seja leve, rápida e fácil de ser mantida/hospedada em serviços gratuitos (como Cloudflare Pages ou GitHub Pages), a equipe optou pelo uso de tecnologias base (Vanilla), dispensando frameworks pesados:

- **HTML5**: Semântica, acessibilidade e estruturação robusta da página.
- **CSS3 (Vanilla)**: Design responsivo utilizando CSS Grid e Flexbox, além de Variáveis Nativas para padronização de cores e tipografia. Efeitos visuais como *Parallax* e transições suaves.
- **JavaScript (Vanilla)**: Manipulação do DOM para animações baseadas em rolagem (*Intersection Observer*) e uso da *Clipboard API* (`navigator.clipboard`) para a função de cópia do PIX.
- **Font Awesome**: Iconografia vetorial para comunicação visual limpa.
- **Integrações Externas**: Google Maps Embed API.
- **Inteligência Artificial (IA)**: Auxílio na geração de imagens temáticas integradas perfeitamente com a colorimetria institucional.

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
