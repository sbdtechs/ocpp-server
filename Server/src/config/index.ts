// Copyright (c) 2023 S44, LLC
// Copyright Contributors to the CitrineOS Project
//
// SPDX-License-Identifier: Apache 2.0

import { SystemConfig } from '@citrineos/base';
import { createLocalConfig } from './envs/local';
import { createDockerConfig } from './envs/docker';

function getConfig() {
  switch (process.env.APP_ENV) {
    case 'local':
      let localConfig = createLocalConfig();
      console.log('localConfig: ', localConfig);
      return localConfig;
    case 'docker':
      let dockerConfig = createDockerConfig();
      console.log('dockerConfig: ', dockerConfig);
      return dockerConfig;
    default:
      throw new Error('Invalid APP_ENV "${process.env.APP_ENV}"');
  }
}

export const systemConfig: SystemConfig = getConfig();
