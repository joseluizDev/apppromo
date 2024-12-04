# Usar a imagem oficial do Node.js como base
FROM node:20

# Criar e definir o diretório de trabalho no container
WORKDIR /app

# Copiar os arquivos package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instalar as dependências
RUN npm install

# Copiar o restante do código para dentro do container
COPY . .

# Expor a porta 3000
EXPOSE 3000

# Definir o comando para rodar a aplicação
CMD ["node", "index.js"]
