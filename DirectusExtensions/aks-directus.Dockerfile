FROM directus/directus:10.10.5
RUN mkdir -p /directus /directus/uploads /directus/extensions/directus-extension-charging-stations-bundle/src
# Buid directus extensions
USER root
ADD "/DirectusExtensions/tsconfig.build.json" /directus/
ADD "/Server/directus-env-config.cjs" /directus/config.cjs
COPY /Server/data/directus/uploads /directus/uploads

# Charging stations bundle
COPY /DirectusExtensions/charging-stations-bundle/src /directus/extensions/directus-extension-charging-stations-bundle/src
COPY /DirectusExtensions/charging-stations-bundle/package.json /directus/extensions/directus-extension-charging-stations-bundle/package.json
COPY /DirectusExtensions/charging-stations-bundle/tsconfig.json /directus/extensions/directus-extension-charging-stations-bundle/tsconfig.json
RUN npm install --prefix /directus/extensions/directus-extension-charging-stations-bundle && npm run build --prefix /directus/extensions/directus-extension-charging-stations-bundle
EXPOSE 8055
ENV APP_NAME='all'
#ENV KEY='1234567890'
#ENV SECRET='0987654321'
#ENV ADMIN_EMAIL='admin@citrineos.com'
#ENV ADMIN_PASSWORD='CitrineOS!'
ENV CONFIG_PATH='/directus/config.cjs'
ENV EXTENSIONS_AUTO_RELOAD='true'
ENV EXTENSIONS_CACHE_TTL='1s'
ENV DB_CLIENT='pg'
ENV DB_HOST=ocpp-db
ENV DB_PORT=5432
ENV DB_DATABASE='citrine'
# ENV DB_USER='citrine'
# ENV DB_PASSWORD='citrine'
ENV WEBSOCKETS_ENABLED='true'
USER node

# Note: if creating image for cloud deployment where host mirroring is not possible, Server/data and Server/directus-env-config.cjs will need to be copied into the image