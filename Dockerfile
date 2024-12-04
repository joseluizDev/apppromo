# Use a imagem oficial do Node.js como base
FROM node:16

# Crie e defina o diretório de trabalho no container
WORKDIR /app

# Copie os arquivos package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante do código para o container
COPY . .

# na porta 3000 e 80
EXPOSE 3000 80

# Defina o comando para rodar a aplicação
CMD ["node", "index.js"]
