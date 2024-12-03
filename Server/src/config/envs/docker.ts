// Copyright Contributors to the CitrineOS Project
//
// SPDX-License-Identifier: Apache 2.0

import { defineConfig, RegistrationStatusEnumType } from '@citrineos/base';
import path from 'path';

export function createDockerConfig() {

  console.log('DB_HOST: ', process.env.DB_HOST);
  console.log('DB_PORT: ', process.env.DB_PORT);
  console.log('DB_DATABASE: ', process.env.DB_DATABASE);
  console.log('DB_USER: ', process.env.DB_USER);
  //console.log('DB_PASSWORD: ', process.env.DB_PASSWORD);
  console.log('AMQP_BROKER_USER: ', process.env.AMQP_BROKER_USER);
  //console.log('AMQP_BROKER_PASSWORD: ', process.env.AMQP_BROKER_PASSWORD);
  console.log('AMQP_BROKER_HOST: ', process.env.AMQP_BROKER_HOST);
  console.log('AMQP_BROKER_PORT: ', process.env.AMQP_BROKER_PORT);
  console.log('DIRECTUS_EXTENSIONS_HOST: ', process.env.DIRECTUS_EXTENSIONS_HOST);
  console.log('DIRECTUS_EXTENSIONS_PORT: ', process.env.DIRECTUS_EXTENSIONS_PORT);
  console.log('APP_ENV: ', process.env.APP_ENV);

  return defineConfig({
    env: 'development',
    centralSystem: {
      host: '0.0.0.0',
      port: 8080,
    },
    modules: {
      certificates: {
        endpointPrefix: '/certificates',
      },
      configuration: {
        heartbeatInterval: 60,
        bootRetryInterval: 15,
        unknownChargerStatus: RegistrationStatusEnumType.Accepted,
        getBaseReportOnPending: true,
        bootWithRejectedVariables: true,
        autoAccept: true,
        endpointPrefix: '/configuration',
      },
      evdriver: {
        endpointPrefix: '/evdriver',
      },
      monitoring: {
        endpointPrefix: '/monitoring',
      },
      reporting: {
        endpointPrefix: '/reporting',
      },
      smartcharging: {
        endpointPrefix: '/smartcharging',
      },
      tenant: {
        endpointPrefix: '/tenant',
      },
      transactions: {
        endpointPrefix: '/transactions',
        costUpdatedInterval: 60,
      },
    },
    data: {
      sequelize: {
        host: process.env.DB_HOST, //'ocpp-db',
        port: Number(process.env.DB_PORT) || 5432, //5432,
        database: process.env.DB_DATABASE, //'citrine',
        dialect: 'postgres',
        username: process.env.DB_USER, //'citrine',
        password: process.env.DB_PASSWORD, //'citrine',
        storage: '',
        sync: false,
        alter: true,
      },
    },
    util: {
      cache: {
        memory: true,
      },
      messageBroker: {
        amqp: {
          url: 'amqp://' + process.env.AMQP_BROKER_USER + ':' + process.env.AMQP_BROKER_PASSWORD + '@' + process.env.AMQP_BROKER_HOST + ':' + process.env.AMQP_BROKER_PORT, //'amqp://guest:guest@amqp-broker:5672',
          exchange: process.env.AMQP_BROKER_EXCHANGE || 'citrineos',
        },
      },
      swagger: {
        path: '/docs',
        logoPath: path.resolve(
          path.dirname(__filename),
          '../../assets/logo.png',
        ),
        exposeData: true,
        exposeMessage: true,
      },
      directus: {
        host: process.env.DIRECTUS_EXTENSIONS_HOST,// 'directus',
        port: Number(process.env.DIRECTUS_EXTENSIONS_PORT) || 8055,//8055,
        generateFlows: true,
      },
      networkConnection: {
        websocketServers: [
          {
            id: '0',
            securityProfile: 0,
            allowUnknownChargingStations: true,
            pingInterval: 60,
            host: '0.0.0.0',
            port: 8081,
            protocol: 'ocpp2.0.1',
          },
          {
            id: '1',
            securityProfile: 1,
            allowUnknownChargingStations: false,
            pingInterval: 60,
            host: '0.0.0.0',
            port: 8082,
            protocol: 'ocpp2.0.1',
          },
          {
            id: '2',
            securityProfile: 2,
            allowUnknownChargingStations: false,
            pingInterval: 60,
            host: '0.0.0.0',
            port: 8443,
            protocol: 'ocpp2.0.1',
            tlsKeyFilePath: path.resolve(
              path.dirname(__filename),
              '../../assets/certificates/leafKey.pem',
            ),
            tlsCertificateChainFilePath: path.resolve(
              path.dirname(__filename),
              '../../assets/certificates/certChain.pem',
            ),
            rootCACertificateFilePath: path.resolve(
              path.dirname(__filename),
              '../../assets/certificates/rootCertificate.pem',
            ),
          },
          {
            id: '3',
            securityProfile: 3,
            allowUnknownChargingStations: false,
            pingInterval: 60,
            host: '0.0.0.0',
            port: 8444,
            protocol: 'ocpp2.0.1',
            tlsKeyFilePath: path.resolve(
              path.dirname(__filename),
              '../../assets/certificates/leafKey.pem',
            ),
            tlsCertificateChainFilePath: path.resolve(
              path.dirname(__filename),
              '../../assets/certificates/certChain.pem',
            ),
            mtlsCertificateAuthorityKeyFilePath: path.resolve(
              path.dirname(__filename),
              '../../assets/certificates/subCAKey.pem',
            ),
            rootCACertificateFilePath: path.resolve(
              path.dirname(__filename),
              '../../assets/certificates/rootCertificate.pem',
            ),
          },
        ],
      },
      certificateAuthority: {
        v2gCA: {
          name: 'hubject',
          hubject: {
            baseUrl: 'https://open.plugncharge-test.hubject.com',
            tokenUrl:
              'https://hubject.stoplight.io/api/v1/projects/cHJqOjk0NTg5/nodes/6bb8b3bc79c2e-authorization-token',
            isoVersion: 'ISO15118-2',
          },
        },
        chargingStationCA: {
          name: 'acme',
          acme: {
            env: 'staging',
            accountKeyFilePath: path.resolve(
              path.dirname(__filename),
              '../../assets/certificates/acme_account_key.pem',
            ),
            email: 'test@citrineos.com',
          },
        },
      },
    },
    logLevel: 2, // debug
    maxCallLengthSeconds: 5,
    maxCachingSeconds: 10,
    ocpiServer: {
      host: '0.0.0.0',
      port: 8085,
    },
  });
}
