FROM node:20-alpine

WORKDIR /app

# Copiar arquivos e instalar dependências
COPY frontend/package.json frontend/package-lock.json* ./
RUN npm install

# Copiar todo o código
COPY frontend .

# Expor porta
EXPOSE 3000

# Rodar em modo desenvolvimento (não build)
CMD ["npm", "run", "dev"]
