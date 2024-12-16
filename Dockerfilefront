# Etapa 1: Construção do projeto
FROM node:18 AS build

# Diretório de trabalho dentro do container
WORKDIR /app/Client

# Copiar os arquivos necessários de dependências
COPY Client/package.json Client/package-lock.json ./
# Caso utilize Yarn, troque package-lock.json por yarn.lock

# Instalar dependências
RUN npm install --frozen-lockfile

# Copiar o restante do código fonte para dentro do container
COPY Client/ ./

# Construir o projeto Vite
RUN npm run build

# Etapa 2: Produção com NGINX
FROM nginx:alpine

# Copiar os arquivos construídos da etapa anterior
COPY --from=build /app/Client/dist /usr/share/nginx/html

# Copiar configuração customizada do NGINX, se existir
COPY Client/nginx.conf /etc/nginx/conf.d/default.conf

# Expor a porta 80
EXPOSE 80

# Comando padrão para rodar o NGINX
CMD ["nginx", "-g", "daemon off;"]
