# Etapa 1: Construção do projeto
FROM node:18 AS build

# Diretório de trabalho dentro do container
WORKDIR /app

# Copiar os arquivos de dependências
COPY package.json package-lock.json ./
# Caso esteja usando o yarn, use 'yarn.lock' ao invés de 'package-lock.json'

# Instalar dependências
RUN npm install  # Ou 'yarn install' se estiver usando o Yarn

# Copiar todo o código fonte para dentro do container
COPY . .

# Construir o projeto
RUN npm run build  # Ou 'yarn build' se estiver usando o Yarn

# Etapa 2: Produção
FROM nginx:alpine

# Copiar os arquivos construídos da etapa anterior
COPY --from=build /app/dist /usr/share/nginx/html

# Expor a porta 80 para acesso externo
EXPOSE 80

# Iniciar o servidor Nginx (não é necessário rodar o Vite aqui porque ele é um servidor de desenvolvimento)
CMD ["nginx", "-g", "daemon off;"]
