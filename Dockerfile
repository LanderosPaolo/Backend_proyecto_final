# Usar la imagen oficial de Node.js como base
FROM node:latest

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar el archivo package.json e instalar las dependencias
COPY package.json package-lock.json ./
RUN npm install

# Copiar el archivo .env con la configuración de las variables de entorno
COPY .env .env

# Establecer las variables de entorno
ENV PORT=3000
ENV DB_HOST=db
ENV DB_USER=postgres
ENV DB_PASSWORD=postgres
ENV DB_NAME=comics
ENV JWT_SECRET=ultrasecreto

# Copiar el resto del código fuente
COPY . .

# Exponer el puerto en el que se ejecuta el servidor Express
EXPOSE 3000

# Comando para iniciar el servidor
CMD ["npm", "start"]
