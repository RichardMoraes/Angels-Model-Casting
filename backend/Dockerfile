# ================================
# Base Stage - Dependências de build
# ================================
FROM node:22-alpine AS base

# Instalar dependências de build necessárias para módulos nativos
RUN apk add --no-cache \
    build-base \
    gcc \
    autoconf \
    automake \
    zlib-dev \
    libpng-dev \
    vips-dev \
    git

# Usar Yarn Classic (1.x) que vem com Node.js
# Não usar corepack que ativa Yarn 4 (Berry)

WORKDIR /app

# ================================
# Development Stage
# ================================
FROM base AS development

# Copiar arquivos de dependências
COPY package.json yarn.lock* ./

# Instalar todas as dependências (incluindo devDependencies)
RUN yarn install --network-timeout 600000

# Copiar código fonte
COPY . .

# Expor porta
EXPOSE 1337

# Comando para desenvolvimento (hot reload)
CMD ["yarn", "develop"]

# ================================
# Builder Stage - Build de produção
# ================================
FROM base AS builder

# Copiar arquivos de dependências
COPY package.json yarn.lock* ./

# Instalar dependências
RUN yarn install --network-timeout 600000

# Copiar código fonte
COPY . .

# Build do Strapi (admin panel)
RUN yarn build

# ================================
# Production Stage - Imagem final otimizada
# ================================
FROM node:22-alpine AS production

# Instalar apenas runtime dependencies para vips
RUN apk add --no-cache vips-dev

WORKDIR /app

# Definir ambiente de produção
ENV NODE_ENV=production

# Copiar arquivos necessários do builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/yarn.lock* ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/config ./config
COPY --from=builder /app/src ./src

# Criar diretório para uploads
RUN mkdir -p ./public/uploads

# Expor porta
EXPOSE 1337

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:1337/_health || exit 1

# Comando para produção
CMD ["yarn", "start"]
