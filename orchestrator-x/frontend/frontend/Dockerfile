FROM node:20-alpine

WORKDIR /app

# Copiar arquivos de dependência
COPY frontend/package.json frontend/package-lock.json* ./

# Instalar dependências
RUN npm install

# Copiar o resto do código
COPY frontend .

# Expor porta
EXPOSE 3000

# Rodar em modo desenvolvimento
CMD ["npm", "run", "dev"]
