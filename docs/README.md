# 📚 Angels Model Casting - Documentação do Projeto

> **Vitrine de Talentos** - Sistema de catálogo e gerenciamento de talentos para agência de casting

---

## 📋 Índice

1. [Visão Geral](#-visão-geral)
2. [Stack Técnica](#-stack-técnica)
3. [Estrutura de Pastas](#-estrutura-de-pastas)
4. [Arquitetura de Componentes](#-arquitetura-de-componentes)
5. [Tipos e Interfaces](#-tipos-e-interfaces)
6. [Design System](#-design-system)
7. [Guia de Desenvolvimento](#-guia-de-desenvolvimento)
8. [Rotas e APIs](#-rotas-e-apis)
9. [Componentes Detalhados](#-componentes-detalhados)
10. [Roadmap e Melhorias Futuras](#-roadmap-e-melhorias-futuras)

---

## 🎯 Visão Geral

### Descrição

O **Angels Model Casting** é uma aplicação web moderna para exibição e gerenciamento de talentos (modelos, atores, apresentadores). O sistema oferece uma interface profissional para:

- **Listagem de talentos** em grid responsivo com cards interativos
- **Filtros avançados** por nome, gênero, idade, etnia, localização e performance
- **Visualização detalhada** de cada talento com fotos, vídeos e informações completas
- **Sistema de avaliação** por estrelas e categorização por habilidades
- **Indicadores de status** (online, premium, disponível)

### Público-Alvo

- Diretores de casting
- Produtores
- Agências de publicidade
- Clientes buscando talentos

### Status do Projeto

🟡 **Protótipo Funcional** - Versão 0.1.0

---

## 🛠 Stack Técnica

### Core

| Tecnologia | Versão | Descrição |
|------------|--------|-----------|
| **Next.js** | 15.5.6 | Framework React com App Router |
| **React** | 19.1.0 | Biblioteca UI |
| **TypeScript** | 5.x | Tipagem estática |
| **Turbopack** | Integrado | Bundler de alta performance |

### Estilização

| Tecnologia | Versão | Descrição |
|------------|--------|-----------|
| **TailwindCSS** | 3.2.7 | Framework CSS utility-first |
| **CSS Variables** | - | Sistema de design tokens |
| **tw-animate-css** | 1.4.0 | Animações para Tailwind |

### Componentes UI

| Tecnologia | Descrição |
|------------|-----------|
| **shadcn/ui** | Sistema de componentes (New York style) |
| **Radix UI** | Primitivos acessíveis (Dialog, Select, Tabs, Slot) |
| **Lucide React** | Biblioteca de ícones |
| **Framer Motion** | Animações avançadas |

### Utilitários

| Tecnologia | Descrição |
|------------|-----------|
| **clsx** | Utilitário para classes condicionais |
| **tailwind-merge** | Merge inteligente de classes Tailwind |
| **class-variance-authority** | Variantes de componentes |

### Qualidade de Código

| Tecnologia | Descrição |
|------------|-----------|
| **ESLint** | Linting com plugins React, TypeScript, a11y |
| **TypeScript Strict** | Modo estrito habilitado |

---

## 📁 Estrutura de Pastas

```
Angels-Model-Casting/
├── app/                          # App Router (Next.js 14+)
│   ├── api/                      # API Routes
│   │   └── placeholder/          # API de imagens placeholder
│   │       └── [...params]/
│   │           └── route.ts
│   ├── components/               # Componentes da aplicação
│   │   ├── AdvancedFilters.tsx   # Filtros avançados
│   │   ├── CastingVitrine.tsx    # Componente principal (página)
│   │   ├── CustomSidebar.tsx     # Sidebar customizada
│   │   ├── Filters.tsx           # Filtros básicos
│   │   ├── Header.tsx            # Cabeçalho da aplicação
│   │   ├── LoadingSkeleton.tsx   # Estados de loading
│   │   ├── Pagination.tsx        # Paginação inteligente
│   │   ├── SkillTag.tsx          # Tags de habilidades (F/E/O/R)
│   │   ├── StarRating.tsx        # Componente de avaliação
│   │   ├── StatusIndicator.tsx   # Indicadores de status
│   │   ├── TalentCard.tsx        # Card de talento
│   │   ├── TalentDetailSheet.tsx # Detalhes do talento (sidebar)
│   │   ├── Toast.tsx             # Notificações
│   │   └── ToastProvider.tsx     # Provider de toasts
│   ├── data/
│   │   └── talentos.ts           # Dados mockados de talentos
│   ├── types/
│   │   └── TalentProfile.ts      # Interface principal de talento
│   ├── globals.css               # Estilos globais + Design System
│   ├── layout.tsx                # Layout raiz
│   ├── page.tsx                  # Página inicial
│   └── favicon.ico
│
├── components/                   # Componentes UI reutilizáveis (shadcn)
│   └── ui/
│       ├── badge.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       ├── select.tsx
│       ├── sheet.tsx
│       └── tabs.tsx
│
├── lib/
│   └── utils.ts                  # Utilitários (cn function)
│
├── public/                       # Assets estáticos
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
│
├── docs/                         # Documentação
│   └── README.md                 # Este arquivo
│
├── backend/                      # (Vazio - reservado para futuro)
│
├── .next/                        # Build do Next.js (gitignored)
├── node_modules/                 # Dependências (gitignored)
│
├── components.json               # Configuração shadcn/ui
├── eslint.config.mjs             # Configuração ESLint (flat config)
├── next.config.js                # Configuração Next.js
├── next.config.ts                # Configuração Next.js (TypeScript)
├── package.json                  # Dependências e scripts
├── postcss.config.js             # Configuração PostCSS
├── postcss.config.mjs            # Configuração PostCSS (ESM)
├── tailwind.config.js            # Configuração Tailwind
├── tsconfig.json                 # Configuração TypeScript
└── README.md                     # README padrão Next.js
```

---

## 🏗 Arquitetura de Componentes

### Hierarquia de Componentes

```
app/layout.tsx
└── app/page.tsx
    └── CastingVitrine (Componente Principal)
        ├── Header
        │   └── Menus dropdown (Statistics, User)
        │
        ├── AdvancedFilters
        │   ├── Input (search)
        │   ├── Select (gênero, etnia, DRT, etc.)
        │   └── Button (ações, filtros rápidos)
        │
        ├── Results Header
        │   └── Select (colunas do grid)
        │
        ├── TalentCard[] (Grid)
        │   ├── Image (Next/Image)
        │   ├── StarRating
        │   ├── SkillTag[]
        │   └── StatusIndicator
        │
        ├── Pagination
        │
        └── TalentDetailSheet (Lazy loaded)
            ├── CustomSidebar
            ├── Tabs (Summary, Photos, Videos, Skills)
            └── SkillTag[]
```

### Fluxo de Dados

```
┌─────────────────────────────────────────────────────────────┐
│                    CastingVitrine                           │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Estado (useState):                                   │   │
│  │  - searchTerm                                        │   │
│  │  - selectedGender                                    │   │
│  │  - selectedAgeRange                                  │   │
│  │  - currentPage                                       │   │
│  │  - selectedTalent                                    │   │
│  │  - isDetailSheetOpen                                 │   │
│  │  - itemsPerPage                                      │   │
│  │  - selectedColumns                                   │   │
│  └─────────────────────────────────────────────────────┘   │
│                           │                                 │
│                           ▼                                 │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Dados Filtrados (useMemo):                          │   │
│  │  - filteredTalents = talentos.filter(...)           │   │
│  │  - currentTalents = slice(startIndex, endIndex)     │   │
│  └─────────────────────────────────────────────────────┘   │
│                           │                                 │
│           ┌───────────────┼───────────────┐                │
│           ▼               ▼               ▼                │
│      AdvancedFilters  TalentCard[]   Pagination            │
│           │               │               │                │
│           └───────────────┴───────────────┘                │
│                           │                                 │
│                           ▼                                 │
│                  TalentDetailSheet                          │
└─────────────────────────────────────────────────────────────┘
```

### Padrões de Performance

| Técnica | Componente | Descrição |
|---------|------------|-----------|
| `memo` | TalentCard, Filters, Pagination, etc. | Evita re-renders desnecessários |
| `useMemo` | CastingVitrine | Memoiza filtros de talentos |
| `useCallback` | CastingVitrine | Memoiza handlers de eventos |
| `lazy` + `Suspense` | TalentDetailSheet | Code splitting da sidebar |
| `priority` loading | TalentCard (primeiro) | LCP optimization |

---

## 📝 Tipos e Interfaces

### TalentProfile (Principal)

```typescript
// app/types/TalentProfile.ts

export interface TalentProfile {
  id: string;                    // Identificador único (ex: "ana-silva-01")
  name: string;                  // Nome completo
  age: number;                   // Idade
  gender: "Female" | "Male" | "Non-binary";
  city: string;                  // Cidade
  state: string;                 // Estado (sigla)
  mainPhotoUrl: string;          // URL da foto principal
  
  details: {
    ethnicity: string;           // Etnia
    heightCm: number;            // Altura em cm
    weightKg: number;            // Peso em kg
    hairType: string;            // Tipo de cabelo
    hairColor: string;           // Cor do cabelo
    eyeColor: string;            // Cor dos olhos
    bio: string;                 // Biografia
  };
  
  skills: string[];              // Lista de habilidades
  
  photos: string[];              // URLs das fotos
  
  videos: {
    title: string;
    url: string;                 // URL embed (YouTube)
  }[];
  
  // Phase 6 - Visual Refinements
  rating: number;                // Avaliação 1-5 estrelas
  skillTags: ("F" | "E" | "O" | "R")[];  // Categorias profissionais
  status: {
    isOnline: boolean;           // Status online
    isPremium: boolean;          // Conta premium
    isAvailable: boolean;        // Disponibilidade
  };
}
```

### Skill Tags (Categorias)

| Tag | Descrição | Cor |
|-----|-----------|-----|
| **F** | Fotografia | Azul (`bg-blue-500`) |
| **E** | Eventos | Verde (`bg-green-500`) |
| **O** | Online | Roxo (`bg-purple-500`) |
| **R** | Rádio/TV | Laranja (`bg-orange-500`) |

---

## 🎨 Design System

### Paleta de Cores

O projeto utiliza **CSS Variables** para um design system consistente:

```css
/* Cores Primárias - Corporate Purple */
--primary: 258 90% 25%;           /* #2D1B69 - Deep Purple */
--primary-foreground: 210 40% 98%;

/* Escala Primary */
--primary-50 até --primary-900

/* Cores de Status */
--success: 142 76% 36%;           /* Verde profissional */
--warning: 38 92% 50%;            /* Âmbar profissional */
--info: 217 91% 60%;              /* Azul profissional */
--destructive: 0 84.2% 60.2%;     /* Vermelho */

/* Escala de Cinzas */
--gray-50 até --gray-900

/* Superfícies */
--background: 0 0% 100%;
--card: 0 0% 100%;
--muted: 210 40% 96%;

/* Gradientes Corporativos */
--gradient-primary: linear-gradient(135deg, hsl(258 90% 25%) 0%, hsl(258 90% 35%) 100%);
--gradient-secondary: linear-gradient(135deg, hsl(258 90% 35%) 0%, hsl(258 90% 45%) 100%);
```

### Tipografia

```css
/* Font Family */
font-family: 'Inter', system-ui, sans-serif;

/* Escala Tipográfica */
.text-display   /* 3.5rem - 800 weight */
.text-h1        /* 2.5rem - 700 weight */
.text-h2        /* 2rem - 600 weight */
.text-h3        /* 1.5rem - 600 weight */
.text-h4        /* 1.25rem - 600 weight */
.text-body-lg   /* 1.125rem - 400 weight */
.text-body      /* 1rem - 400 weight */
.text-body-sm   /* 0.875rem - 400 weight */
.text-caption   /* 0.75rem - 500 weight */
```

### Sombras

```css
--shadow-xs: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-sm: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
--shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
--shadow-md: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
--shadow-lg: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 10px 10px -5px rgb(0 0 0 / 0.04);
--shadow-xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);
```

### Animações

```css
/* Classes de Animação Disponíveis */
.animate-fade-in          /* Fade in */
.animate-slide-up         /* Slide de baixo para cima */
.animate-slide-down       /* Slide de cima para baixo */
.animate-scale-in         /* Scale in */
.animate-fade-in-up       /* Fade + Slide up */
.animate-bounce-in        /* Bounce effect */
.animate-glow-pulse       /* Pulse de glow */

/* Hover Effects */
.hover-lift               /* translateY(-6px) + shadow */
.hover-lift-enhanced      /* translateY(-8px) + scale(1.02) */
.hover-scale              /* scale(1.03) */
.hover-scale-enhanced     /* scale(1.05) */
.hover-glow               /* Box shadow glow */
.hover-glow-enhanced      /* Box shadow glow maior */

/* Transitions */
.transition-professional       /* 0.2s cubic-bezier */
.transition-professional-slow  /* 0.3s cubic-bezier */

/* Cards */
.card-interactive         /* Hover com lift e border */
.card-professional        /* Estilo card com shadow */

/* Loading */
.loading-skeleton         /* Shimmer effect */
.pulse-glow              /* Pulse animation */

/* Stagger Animation */
.stagger-animation > *    /* Animação em cascata para filhos */
```

### Bordas e Radius

```css
--radius: 0.75rem;  /* 12px - Raio padrão moderno */

/* Utilitários */
.border-professional      /* 1px solid + radius */
.border-professional-lg   /* 1px solid + radius maior */
```

---

## 💻 Guia de Desenvolvimento

### Pré-requisitos

- Node.js 18+ 
- npm, yarn, pnpm ou bun

### Instalação

```bash
# Clone o repositório
git clone <repository-url>
cd Angels-Model-Casting

# Instale as dependências
npm install
# ou
yarn install
# ou
bun install
```

### Scripts Disponíveis

```bash
# Desenvolvimento (com Turbopack)
npm run dev

# Build de produção (com Turbopack)
npm run build

# Iniciar servidor de produção
npm run start

# Linting
npm run lint
```

### Variáveis de Ambiente

Atualmente o projeto não requer variáveis de ambiente. Quando necessário, criar arquivo `.env.local`:

```env
# Exemplo para futuras integrações
# API_URL=https://api.example.com
# NEXT_PUBLIC_API_KEY=your-key
```

### Configuração de Imagens Remotas

O projeto está configurado para aceitar imagens de:
- `randomuser.me` (avatares)
- `picsum.photos` (fotos genéricas)
- `images.unsplash.com` (fotos de alta qualidade)

Para adicionar novos domínios, edite `next.config.js`:

```javascript
images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "novo-dominio.com",
      port: "",
      pathname: "/**",
    },
  ],
}
```

### Convenções de Código

#### Nomenclatura

| Tipo | Convenção | Exemplo |
|------|-----------|---------|
| Componentes | PascalCase | `TalentCard.tsx` |
| Hooks | camelCase com `use` | `useFilter.ts` |
| Utilitários | camelCase | `formatDate.ts` |
| Tipos/Interfaces | PascalCase | `TalentProfile.ts` |
| Constantes | UPPER_SNAKE_CASE | `MAX_ITEMS` |

#### Estrutura de Componente

```typescript
"use client"; // Se necessário

import { memo } from "react";
// imports...

/**
 * Props description
 */
interface ComponentProps {
  readonly prop: Type; // Usar readonly para props
}

/**
 * Component description
 */
const Component = memo(function Component({
  prop,
}: ComponentProps) {
  // Implementation
});

export default Component;
```

#### Regras ESLint

- ✅ React em JSX scope não obrigatório
- ✅ PropTypes desabilitado (usar TypeScript)
- ✅ Hooks rules enforced
- ✅ Acessibilidade (jsx-a11y)
- ⚠️ Variáveis não utilizadas (warning)
- ⚠️ any explícito (warning)

---

## 🛤 Rotas e APIs

### Páginas

| Rota | Arquivo | Descrição |
|------|---------|-----------|
| `/` | `app/page.tsx` | Página inicial (vitrine de talentos) |

### API Routes

#### GET `/api/placeholder/[width]/[height]`

Gera imagens SVG placeholder dinamicamente.

**Parâmetros:**
- `width` (path): Largura em pixels
- `height` (path): Altura em pixels
- `text` (query): Texto a exibir (opcional)

**Exemplo:**
```
/api/placeholder/400/288?text=A
```

**Resposta:** SVG com gradient e texto centralizado

**Headers:**
- `Content-Type: image/svg+xml`
- `Cache-Control: public, max-age=31536000, immutable`

---

## 🧩 Componentes Detalhados

### CastingVitrine

**Localização:** `app/components/CastingVitrine.tsx`

Componente principal que orquestra toda a aplicação.

**Estado:**
- `searchTerm`: Termo de busca
- `selectedGender`: Filtro de gênero
- `selectedAgeRange`: Filtro de faixa etária
- `currentPage`: Página atual
- `selectedTalent`: Talento selecionado para detalhes
- `isDetailSheetOpen`: Estado da sidebar
- `itemsPerPage`: Itens por página (calculado dinamicamente)
- `selectedColumns`: Colunas do grid (null = auto)

**Features:**
- Filtragem em tempo real (useMemo)
- Paginação dinâmica baseada em viewport
- Grid responsivo configurável
- Lazy loading do TalentDetailSheet

---

### TalentCard

**Localização:** `app/components/TalentCard.tsx`

Card interativo para exibição de talento.

**Features:**
- Navegação de fotos com setas
- Contador de fotos
- Loading skeleton
- Fallback para imagem placeholder
- Informações on hover
- Status indicators
- Skill tags

**Props:**
- `talent: TalentProfile` - Dados do talento
- `onClick: (talent) => void` - Handler de clique
- `isPriority?: boolean` - Prioridade de carregamento

---

### TalentDetailSheet

**Localização:** `app/components/TalentDetailSheet.tsx`

Sidebar com detalhes completos do talento.

**Tabs:**
1. **Summary**: Contato, características físicas, bio, localização
2. **Photos**: Galeria de fotos com download
3. **Videos**: Vídeos embed (YouTube)
4. **Skills**: Categorias profissionais e habilidades

**Features:**
- Custom sidebar com animações
- Gerenciamento de estados de imagem
- Botões de ação (Favoritar, Compartilhar)

---

### CustomSidebar

**Localização:** `app/components/CustomSidebar.tsx`

Sidebar customizada sem uso de Dialog (evita problemas de DOM).

**Features:**
- Animações CSS customizadas
- Fechamento por Escape
- Overlay com blur
- Controle de scroll do body
- Responsivo (largura variável)

---

### AdvancedFilters

**Localização:** `app/components/AdvancedFilters.tsx`

Sistema de filtros avançados.

**Filtros:**
- Busca por nome
- Faixa etária (de/até)
- Gênero
- Etnia
- DRT
- Performance/Tipo
- Localização

**Features:**
- Filtros rápidos (Quick filters)
- Botões de ação (adicionar, ordenar, limpar)
- Badge Premium

---

### Componentes UI (shadcn)

**Localização:** `components/ui/`

| Componente | Descrição |
|------------|-----------|
| `Button` | Botão com variantes (default, destructive, outline, secondary, ghost, link) |
| `Card` | Container de card com header, content, footer |
| `Input` | Input de texto estilizado |
| `Select` | Select dropdown com Radix UI |
| `Tabs` | Sistema de abas com Radix UI |
| `Sheet` | Sidebar/Modal com Radix UI |
| `Badge` | Badge para tags |

---

## 🚀 Roadmap e Melhorias Futuras

### Fase Atual: Protótipo (v0.1.0)

✅ Listagem de talentos
✅ Sistema de filtros
✅ Visualização de detalhes
✅ Design responsivo
✅ Animações e micro-interações

### Próximas Fases Sugeridas

#### Fase 2: Backend Integration
- [ ] Integração com Strapi v4 ou API REST
- [ ] Autenticação (NextAuth.js)
- [ ] CRUD de talentos
- [ ] Upload de fotos/vídeos

#### Fase 3: Features Avançadas
- [ ] Sistema de favoritos
- [ ] Comparação de talentos
- [ ] Seleções/Castings
- [ ] Notificações em tempo real

#### Fase 4: Analytics & Admin
- [ ] Dashboard administrativo
- [ ] Analytics de visualizações
- [ ] Relatórios

#### Fase 5: Otimizações
- [ ] ISR/SSG para páginas públicas
- [ ] Image optimization com CDN
- [ ] Internacionalização (i18n)
- [ ] PWA support

### Melhorias Técnicas Sugeridas

1. **State Management**: Considerar Redux Toolkit ou Zustand para estado global
2. **Data Fetching**: TanStack Query para cache e sincronização
3. **Testing**: Jest + React Testing Library
4. **Monitoramento**: Sentry para error tracking
5. **CI/CD**: GitHub Actions para deploy automático

---

## 📞 Contato & Suporte

Para dúvidas sobre o projeto, consulte:
- Este documento
- Comentários no código (JSDoc)
- Issues no repositório

---

## 📄 Licença

Este projeto é privado e de uso interno.

---

*Documentação atualizada em: Dezembro 2024*
*Versão do Projeto: 0.1.0*

