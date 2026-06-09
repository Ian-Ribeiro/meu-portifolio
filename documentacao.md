# Documentação do Portfólio

Este documento detalha a arquitetura, o código e as tecnologias implementadas no projeto do Portfólio Web.

## 1. Visão Geral do Projeto

O projeto é um **Single Page Application (SPA)** de portfólio moderno, construído para apresentar projetos open-source e oferecer uma forma de contato através de uma assinatura de newsletter com verificação de e-mail. O foco foi em performance, tipagem estática e design responsivo, com uma interface amigável e dinâmica.

## 2. Tecnologias Utilizadas e Justificativas

### **Next.js (v14)**
- **O que é:** Um framework React para produção.
- **Por que foi usado:** Oferece renderização do lado do servidor (SSR) e geração de sites estáticos (SSG/ISR), o que garante alta performance e ótimo SEO. Ele gerencia o roteamento de páginas e permite criar rotas de API (Backend-for-Frontend) no mesmo projeto.

### **React (v18)**
- **O que é:** Biblioteca JavaScript para construção de interfaces de usuário.
- **Por que foi usado:** É a base do Next.js. Permite o desenvolvimento baseado em componentes reutilizáveis e o gerenciamento eficiente do estado (state) da interface web.

### **TypeScript**
- **O que é:** Um superconjunto de JavaScript que adiciona tipagem estática.
- **Por que foi usado:** Evita erros comuns de desenvolvimento em tempo de compilação, melhora a legibilidade do código e o recurso de "autocompletar" (IntelliSense) das ferramentas de desenvolvimento (IDE).

### **Tailwind CSS**
- **O que é:** Um framework CSS utilitário ("utility-first").
- **Por que foi usado:** Permite estilizar a aplicação rapidamente direto nas marcações HTML (`className`), evitando a necessidade de arquivos CSS separados e garantindo um estilo consistente, responsivo e moderno (com suporte fácil a Dark Mode e animações).

### **Firebase (Firestore)**
- **O que é:** Plataforma de backend-as-a-service do Google; o Firestore é o seu banco de dados NoSQL baseado em documentos.
- **Por que foi usado:** Foi utilizado para armazenar de forma segura os dados dos usuários que se inscrevem na Newsletter, oferecendo leitura/escrita rápida e uma configuração inicial extremamente simples.

### **Integração com API do GitHub**
- **O que é:** O serviço REST oficial do GitHub.
- **Por que foi usado:** Na seção de projetos (`ProjectsSection.tsx`), ele busca dinamicamente os repositórios públicos mais recentes do usuário (`Ian-Ribeiro`). Isso garante que o portfólio esteja sempre atualizado sem necessidade de manutenção manual. Foi acoplado com a técnica *ISR (Incremental Static Regeneration)* do Next.js para fazer requisições a cada 24 horas, otimizando o carregamento da página.

### **Vercel**
- **O que é:** Plataforma de nuvem otimizada para frameworks de frontend e sites estáticos.
- **Por que foi usada:** Criadores do Next.js, oferecem o ecossistema perfeito para publicar a aplicação gratuitamente (com suporte nativo para as rotas de API do sistema de Newsletter).

---

## 3. Arquitetura do Código

A estrutura do projeto segue os padrões recomendados do **Next.js App Router**:

- `/src/app/`
  - `page.tsx`: A página principal (Home) do portfólio que agrega todos os componentes.
  - `layout.tsx`: O esqueleto base do HTML, importação das fontes padrão e estilos globais.
  - `globals.css`: Estilos base do Tailwind CSS.
  - `/api/newsletter/`:
    - `subscribe/route.ts`: Rota de backend para receber o e-mail do usuário e gravar no Firebase.
    - `verify/route.ts`: Rota de backend chamada ao clicar no link de verificação no e-mail, confirmando o token no Firestore e ativando a inscrição.

- `/src/components/`
  - `HeroSection.tsx`: A primeira dobra do site, contendo a introdução principal do desenvolvedor.
  - `ProjectsSection.tsx`: Componente servidor (`Server Component`) que faz o fetch nativo na API do GitHub e mapeia os repositórios.
  - `ProjectCard.tsx`: Componente visual que renderiza individualmente cada repositório.
  - `NewsletterSection.tsx`: Componente de cliente (`Client Component`) que possui um formulário de inscrição, valida estados de erro/sucesso e interage com a rota `/api/newsletter/subscribe`.
  - `Navbar.tsx`: O menu de navegação superior, focado no *smooth-scrolling* da SPA.

- `/src/lib/`
  - `firebase.ts`: O arquivo de conexão com os serviços do Google. Instancia a SDK utilizando as variáveis de ambiente em `.env.local`.

## 4. O Fluxo de Assinatura (Newsletter)

1. O usuário digita o e-mail no formulário da Home (`NewsletterSection.tsx`) e clica em assinar.
2. É feita uma chamada POST para `/api/newsletter/subscribe`.
3. O servidor (Next.js) recebe o e-mail, gera um *token único de verificação* e grava um novo documento no **Firebase Firestore** sob a coleção `subscribers`, com status `pending`.
4. (Pode ser integrado ao Resend): Um e-mail é disparado para o usuário com o link: `/api/newsletter/verify?token=TOKEN_GERADO`.
5. O usuário clica no link de seu e-mail de verdade. A rota `/api/newsletter/verify` é chamada.
6. Essa rota confere o token no banco de dados. Sendo válido, ele atualiza o status de `pending` para `verified` no Firebase e redireciona o usuário para o site com uma mensagem de sucesso.

## 5. Como o Projeto Roda Localmente

Para iniciar este projeto e efetuar alterações:

1. Certifique-se que você tenha o arquivo `.env.local` preenchido com as chaves do Firebase.
2. Instale as dependências com `npm install`.
3. Inicie o servidor em modo de desenvolvimento com `npm run dev`.
4. O servidor sobe na porta padrão `http://localhost:3000`.

## 6. Considerações Finais

O portfólio foi desenhado visando escalabilidade. A modularidade do Next.js atrelada aos componentes tipados com TypeScript torna fácil a adição de novas seções (como um currículo detalhado ou uma seção de blog), enquanto a infraestrutura dividida entre Firebase (Banco de dados) e Vercel (Hospedagem e API) mantém o projeto com custo zero, alto desempenho e totalmente preparado para produção.
