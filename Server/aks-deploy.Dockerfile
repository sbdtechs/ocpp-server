FROM node:18 AS build

WORKDIR /usr/local/apps/citrineos

RUN mkdir -p /Server /00_Base /01_Data /02_Util /03_Modules/Certificates /03_Modules/Configuration /03_Modules/EVDriver /03_Modules/Monitoring /03_Modules/OcppRouter /03_Modules/Reporting  /03_Modules/SmartCharging /03_Modules/Transactions 
COPY . .
#COPY ./package-lock.json .
#COPY ./package.json .
#COPY /tsconfig.json .
#COPY /tsconfig.build.json .
COPY /Server /Server
COPY /00_Base /00_Base
COPY /01_Data /01_Data
COPY /02_Util /02_Util
COPY /03_Modules/Certificates /03_Modules/Certificates
COPY /03_Modules/Configuration /03_Modules/Configuration
COPY /03_Modules/EVDriver /03_Modules/EVDriver
COPY /03_Modules/Monitoring /03_Modules/Monitoring
COPY /03_Modules/OcppRouter /03_Modules/OcppRouter
COPY /03_Modules/Reporting /03_Modules/Reporting
COPY /03_Modules/SmartCharging /03_Modules/SmartCharging
COPY /03_Modules/Transactions /03_Modules/Transactions
      # - /usr/local/apps/citrineos/node_modules
      # - /usr/local/apps/citrineos/Server/node_modules
      # - /usr/local/apps/citrineos/00_Base/node_modules
      # - /usr/local/apps/citrineos/01_Data/node_modules
      # - /usr/local/apps/citrineos/02_Util/node_modules
      # - /usr/local/apps/citrineos/03_Modules/Certificates/node_modules
      # - /usr/local/apps/citrineos/03_Modules/Configuration/node_modules
      # - /usr/local/apps/citrineos/03_Modules/EVDriver/node_modules
      # - /usr/local/apps/citrineos/03_Modules/Monitoring/node_modules
      # - /usr/local/apps/citrineos/03_Modules/OcppRouter/node_modules
      # - /usr/local/apps/citrineos/03_Modules/Reporting/node_modules
      # - /usr/local/apps/citrineos/03_Modules/SmartCharging/node_modules
      # - /usr/local/apps/citrineos/03_Modules/Transactions/node_modules
      # - /usr/local/apps/citrineos/dist/
      # - /usr/local/apps/citrineos/Server/dist/
      # - /usr/local/apps/citrineos/00_Base/dist/
      # - /usr/local/apps/citrineos/01_Data/dist/
      # - /usr/local/apps/citrineos/02_Util/dist/
      # - /usr/local/apps/citrineos/03_Modules/Certificates/dist/
      # - /usr/local/apps/citrineos/03_Modules/Configuration/dist/
      # - /usr/local/apps/citrineos/03_Modules/EVDriver/dist/
      # - /usr/local/apps/citrineos/03_Modules/Monitoring/dist/
      # - /usr/local/apps/citrineos/03_Modules/OcppRouter/dist/
      # - /usr/local/apps/citrineos/03_Modules/Reporting/dist/
      # - /usr/local/apps/citrineos/03_Modules/SmartCharging/dist/
      # - /usr/local/apps/citrineos/03_Modules/Transactions/dist/

ENV APP_NAME='all'
ENV APP_ENV='docker'
#ENV CITRINEOS_UTIL_DIRECTUS_TOKEN=''

EXPOSE 8080 8081 8082 8085 8443 8444 9229

RUN npm run install-all && npm run build
RUN npm rebuild bcrypt --build-from-source && npm rebuild deasync --build-from-source

# The final stage, which copies built files and prepares the run environment
# Using a slim image to reduce the final image size
FROM node:18-slim
COPY --from=build /usr/local/apps/citrineos /usr/local/apps/citrineos

WORKDIR /usr/local/apps/citrineos

EXPOSE ${PORT}

CMD ["npm", "run", "start-docker-cloud"]
