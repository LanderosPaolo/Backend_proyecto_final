# Usamos una imagen de Node.js para el backend
FROM node:latest

# Crear y establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos necesarios y el package.json
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto de los archivos del frontend
COPY . .

# Definimos las variables de entorno
ENV PORT=3000
ENV DB_PORT=5432
ENV DB_HOST=comicskitesdb
ENV DB_USER=postgres
ENV DB_PASSWORD=postgres
ENV DB_NAME=comics
ENV JWT_SECRET=ultrasecreto

# Instalamos las dependencias
RUN npm install

# Exponemos el puerto 3000 para el backend
EXPOSE 3000

# Comando para iniciar el servidor
CMD ["node", "src/index.js"]
