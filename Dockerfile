# Estágio de build
FROM node:18-alpine as build

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de configuração
COPY package*.json ./
COPY tsconfig*.json ./
COPY vite.config.ts ./

# Instala as dependências
RUN npm install

# Copia o código fonte
COPY src/ ./src/
COPY public/ ./public/

# Gera o build da aplicação
RUN npm run build

# Estágio de produção
FROM nginx:alpine

# Copia os arquivos de build para o nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copia a configuração do nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expõe a porta 80
EXPOSE 80

# Inicia o nginx
CMD ["nginx", "-g", "daemon off;"]