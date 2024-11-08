# Etapa 1: Construcción
FROM node:16-alpine AS builder

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos de dependencias
COPY package.json package-lock.json ./

# Instalar las dependencias necesarias para construir la aplicación
RUN npm ci

# Copiar el resto del código fuente
COPY . .

# Establecer la variable de entorno para producción
ENV NODE_ENV production

# Construir la aplicación
RUN npm run build

# Eliminar las dependencias de desarrollo
RUN npm prune --production

# Etapa 2: Imagen final
FROM node:16-alpine

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar las dependencias de producción y el código compilado desde la etapa de construcción
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next

# Exponer el puerto en el que Next.js servirá la aplicación
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]
