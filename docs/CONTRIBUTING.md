# 🤝 Guia de Contribuição

> Como contribuir para o projeto Angels Model Casting

---

## 📋 Índice

1. [Setup do Ambiente](#-setup-do-ambiente)
2. [Padrões de Código](#-padrões-de-código)
3. [Estrutura de Commits](#-estrutura-de-commits)
4. [Criando Novos Componentes](#-criando-novos-componentes)
5. [Adicionando Novos Talentos](#-adicionando-novos-talentos)
6. [Estilização](#-estilização)
7. [Checklist de PR](#-checklist-de-pr)

---

## 🛠 Setup do Ambiente

### Requisitos

- Node.js 18+ (recomendado: 20 LTS)
- Git
- Editor com suporte a TypeScript (VS Code recomendado)

### Extensões VS Code Recomendadas

```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "prisma.prisma",
    "formulahendry.auto-rename-tag"
  ]
}
```

### Instalação

```bash
# 1. Clone o repositório
git clone <repository-url>
cd Angels-Model-Casting

# 2. Instale dependências
npm install

# 3. Rode o servidor de desenvolvimento
npm run dev

# 4. Acesse http://localhost:3000
```

---

## 📝 Padrões de Código

### TypeScript

```typescript
// ✅ BOM - Interface com readonly
interface TalentCardProps {
  readonly talent: TalentProfile;
  readonly onClick: (talent: TalentProfile) => void;
  readonly isPriority?: boolean;
}

// ❌ RUIM - Sem readonly, sem tipagem
interface Props {
  talent: any;
  onClick: Function;
}
```

### Componentes React

```typescript
// ✅ BOM - Componente memoizado com JSDoc
"use client";

import { memo } from "react";

/**
 * Componente de card de talento
 * Exibe informações básicas e foto do talento
 */
interface TalentCardProps {
  readonly talent: TalentProfile;
  readonly onClick: (talent: TalentProfile) => void;
}

const TalentCard = memo(function TalentCard({
  talent,
  onClick,
}: TalentCardProps) {
  // Handlers
  const handleClick = () => {
    onClick(talent);
  };

  return (
    <div onClick={handleClick}>
      {/* ... */}
    </div>
  );
});

export default TalentCard;
```

### Hooks

```typescript
// ✅ BOM - useCallback para handlers passados como props
const handleTalentClick = useCallback((talent: TalentProfile) => {
  setSelectedTalent(talent);
  setIsDetailSheetOpen(true);
}, []);

// ✅ BOM - useMemo para cálculos derivados
const filteredTalents = useMemo(() => {
  return talentos.filter((talent) => {
    // ...filtros
  });
}, [searchTerm, selectedGender, selectedAgeRange]);
```

### Imports

```typescript
// ✅ BOM - Ordem de imports
// 1. React/Next.js
import { useState, useMemo, useCallback } from "react";
import Image from "next/image";

// 2. Bibliotecas externas
import { MapPin, Calendar } from "lucide-react";

// 3. Componentes UI
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// 4. Componentes locais
import TalentCard from "./TalentCard";

// 5. Tipos
import { TalentProfile } from "../types/TalentProfile";

// 6. Dados/Utils
import { talentos } from "../data/talentos";
```

---

## 📦 Estrutura de Commits

### Formato

```
<tipo>(<escopo>): <descrição curta>

[corpo opcional]

[footer opcional]
```

### Tipos

| Tipo | Descrição |
|------|-----------|
| `feat` | Nova funcionalidade |
| `fix` | Correção de bug |
| `docs` | Documentação |
| `style` | Formatação (sem mudança de código) |
| `refactor` | Refatoração |
| `perf` | Melhoria de performance |
| `test` | Testes |
| `chore` | Manutenção |

### Exemplos

```bash
# Feature
feat(filters): adiciona filtro por etnia

# Bug fix
fix(TalentCard): corrige navegação de fotos em mobile

# Documentação
docs: atualiza README com instruções de setup

# Refatoração
refactor(CastingVitrine): extrai lógica de filtros para hook
```

---

## 🧩 Criando Novos Componentes

### 1. Crie o Arquivo

```bash
# Componentes de domínio
touch app/components/NomeComponente.tsx

# Componentes UI reutilizáveis
touch components/ui/nome-componente.tsx
```

### 2. Estrutura Base

```typescript
"use client";

import { memo } from "react";

/**
 * Descrição do componente
 */
interface NomeComponenteProps {
  readonly propriedade: Tipo;
}

/**
 * NomeComponente
 * 
 * Descrição detalhada do que o componente faz
 */
const NomeComponente = memo(function NomeComponente({
  propriedade,
}: NomeComponenteProps) {
  return (
    <div className="...">
      {/* Conteúdo */}
    </div>
  );
});

export default NomeComponente;
```

### 3. Adicione ao Export (se necessário)

Se for um componente UI, considere exportar em um index:

```typescript
// components/ui/index.ts
export * from "./button";
export * from "./card";
export * from "./nome-componente";
```

---

## 👤 Adicionando Novos Talentos

### Estrutura de Dados

Edite `app/data/talentos.ts`:

```typescript
{
  id: "nome-sobrenome-XX",        // Formato: nome-sobrenome-numero
  name: "Nome Completo",
  age: 25,
  gender: "Female",               // "Female" | "Male" | "Non-binary"
  city: "São Paulo",
  state: "SP",
  mainPhotoUrl: "https://...",    // URL da foto principal
  
  details: {
    ethnicity: "Branca",          // Branca, Negra, Parda, Asiática, Indígena
    heightCm: 170,
    weightKg: 58,
    hairType: "Liso",             // Liso, Ondulado, Cacheado, Crespo
    hairColor: "Castanho",
    eyeColor: "Verde",
    bio: "Descrição do talento...",
  },
  
  skills: ["Atuação", "Dança", "Canto"],
  
  photos: [
    "https://...",                // URLs das fotos
  ],
  
  videos: [
    {
      title: "Título do Vídeo",
      url: "https://www.youtube.com/embed/...",  // URL embed
    },
  ],
  
  rating: 4.5,                    // 1.0 a 5.0
  skillTags: ["F", "E", "O"],     // F, E, O, R
  status: {
    isOnline: true,
    isPremium: true,
    isAvailable: true,
  },
}
```

### Validações

- **ID**: Único, formato kebab-case
- **Fotos**: URLs válidas (randomuser.me, picsum.photos, unsplash)
- **Vídeos**: Apenas URLs embed do YouTube
- **skillTags**: Apenas valores válidos: F, E, O, R

---

## 🎨 Estilização

### CSS Variables

Use as variáveis CSS definidas em `globals.css`:

```tsx
// ✅ BOM - Usando variáveis
<div className="bg-primary text-primary-foreground" />
<div className="border-border rounded-lg shadow-md" />

// ❌ RUIM - Hardcoding cores
<div className="bg-[#2D1B69] text-white" />
```

### Classes Utilitárias Customizadas

```tsx
// Gradientes
<div className="bg-corporate-gradient" />

// Hover effects
<div className="hover-lift hover-glow" />

// Transições
<div className="transition-professional" />

// Cards
<div className="card-interactive card-professional" />

// Loading
<div className="loading-skeleton" />
```

### Animações

```tsx
// Stagger animation para listas
<div className="stagger-animation">
  {items.map(item => <Item key={item.id} />)}
</div>

// Fade in up
<div className="fade-in-up" />

// Scale in
<div className="animate-fade-in-scale" />
```

### Responsividade

```tsx
// Mobile-first approach
<div className="
  px-4 py-2           // Mobile
  sm:px-6 sm:py-4     // Tablet (640px+)
  lg:px-8 lg:py-6     // Desktop (1024px+)
  xl:px-10 xl:py-8    // Large (1280px+)
" />

// Grid responsivo
<div className="
  grid
  grid-cols-1         // Mobile: 1 coluna
  sm:grid-cols-2      // Tablet: 2 colunas
  lg:grid-cols-3      // Desktop: 3 colunas
  xl:grid-cols-4      // Large: 4 colunas
  gap-4 sm:gap-6
" />
```

---

## ✅ Checklist de PR

Antes de abrir um Pull Request, verifique:

### Código

- [ ] Sem erros de TypeScript (`npm run build`)
- [ ] Sem erros de ESLint (`npm run lint`)
- [ ] Componentes com JSDoc
- [ ] Props com `readonly`
- [ ] Handlers memoizados (useCallback)

### UI/UX

- [ ] Responsivo (mobile, tablet, desktop)
- [ ] Acessível (labels, alt text, keyboard nav)
- [ ] Animações suaves
- [ ] Estados de loading
- [ ] Estados de erro

### Performance

- [ ] Imagens otimizadas (Next/Image)
- [ ] Componentes memoizados (memo)
- [ ] Lazy loading quando apropriado
- [ ] Sem re-renders desnecessários

### Documentação

- [ ] Código comentado quando necessário
- [ ] Props documentadas
- [ ] README atualizado (se aplicável)

### Testes (quando implementados)

- [ ] Testes unitários passando
- [ ] Testes de integração passando
- [ ] Coverage mantido

---

## 🐛 Reportando Bugs

### Template

```markdown
## Descrição
Descrição clara do bug.

## Passos para Reproduzir
1. Vá para '...'
2. Clique em '...'
3. Scroll até '...'
4. Veja o erro

## Comportamento Esperado
O que deveria acontecer.

## Screenshots
Se aplicável, adicione screenshots.

## Ambiente
- OS: [ex: Windows 11]
- Browser: [ex: Chrome 120]
- Node.js: [ex: 20.10.0]
```

---

## 💡 Sugerindo Features

### Template

```markdown
## Problema
Descrição do problema que a feature resolve.

## Solução Proposta
Descrição clara da solução.

## Alternativas Consideradas
Outras soluções que você considerou.

## Contexto Adicional
Qualquer outra informação relevante.
```

---

## 📞 Dúvidas?

- Consulte a documentação em `/docs`
- Abra uma issue com a label `question`
- Entre em contato com o time

---

*Obrigado por contribuir! 🎉*

