# Étape 1 : Build de l'app avec Node
FROM node:24-alpine3.21 AS builder

WORKDIR /app

COPY package.json ./
RUN npm install \
 && rm -rf node_modules package-lock.json \
 && npm install
COPY . .
RUN npm run build

# Étape 2 : Nginx pour servir les fichiers statiques
FROM nginx:1.25-alpine AS web

# Copie le build dans le dossier public de nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Copie une config nginx custom si besoin
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80