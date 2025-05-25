FROM node:20-alpine

# Ustaw katalog roboczy w kontenerze
WORKDIR /appreact

# Skopiuj plik package.json i package-lock.json
COPY ./appreact/package.json ./
COPY ./appreact/package-lock.json ./

# Zainstaluj zależności projektu
RUN npm install --legacy-peer-deps

# Skopiuj pozostałe pliki projektu do katalogu roboczego
COPY ./appreact .
# RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Uruchom serwer deweloperski za pomocą react-scripts
CMD ["npm", "start"]

