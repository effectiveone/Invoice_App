FROM node:20-alpine

# Ustaw katalog roboczy w kontenerze
WORKDIR /appreact

# Skopiuj plik package.json i yarn.lock (jeśli istnieje)
COPY ./appreact/package.json ./
COPY ./appreact/yarn.lock ./
# Zainstaluj zależności projektu
RUN yarn install

# Skopiuj pozostałe pliki projektu do katalogu roboczego
COPY ./appreact .
# RUN yarn build

# Expose the port the app runs on
EXPOSE 3000

# Uruchom serwer deweloperski za pomocą react-scripts
CMD ["yarn", "start"]

