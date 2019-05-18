const axios = require('axios');

const client = axios.create({
  baseURL: 'http://localhost:9200/'
});

const translateStatus = (status) => {
  if (status === 'yellow') return 'Degraded';
  if (status === 'red') return 'Outage';
  return 'Operational';
};

const getClusterHealth = () => {
  return client.get('_cat/health?format=json').then((response) => {
    return `Cluster ${translateStatus(response.data[0].status)}`;
  }).catch(() => "Cluster Outage");
};

const getIndexHealth = () => {
  return client.get('_cat/indices/.kibana?format=json').then((response) => {
    return `Kibana Index ${translateStatus(response.data[0].status)}`;
  }).catch(() => "Kibana Index Outage");
};

const getHealthStatuses = () => {
  return Promise.all([getClusterHealth(), getIndexHealth()]);
};

module.exports = { getHealthStatuses };
