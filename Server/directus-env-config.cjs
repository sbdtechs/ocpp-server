// Copyright Contributors to the CitrineOS Project
//
// SPDX-License-Identifier: Apache 2.0
/* eslint-disable */
module.exports = function (_env) {
  const config = {
    // API Paths
    CITRINEOS_SUBSCRIPTION_API_PATH: '/data/ocpprouter/subscription',
    DIRECTUS_CHARGING_STATION_UPDATE_STATUS_PATH:
      '/charging-stations/update-station-status',
    // Environment-specific urls
    CITRINEOS_URL: 'http://ocpp-server-citrineos-http.tenants.svc.cluster.local:8080',
    DIRECTUS_URL: 'http://ocpp-server-directus-http.tenants.svc.cluster.local:8055',
  };

  return config;
};
