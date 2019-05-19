const axios = require('axios');

const client = axios.create({
  baseURL: 'http://localhost:9200/'
});

const translateStatus = (status) => {
  if (status === 'yellow') return 'Degraded';
  if (status === 'red') return 'Outage';
  return 'Operational';
};

const getCurrentLogstashIndexName = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const day = (today.getDate()).toString().padStart(2, '0');

  return `logstash-${year}-${month}-${day}`;
};

const getClusterHealth = () => {
  const component = 'Cluster';

  return client.get('_cat/health?format=json').then((response) => {
    return `Cluster ${translateStatus(response.data[0].status)}`;
  }).catch((error) => {
    const msg = `${component} Outage`;
    console.log(`${msg}: ${error.message}`);
    return msg;
  });
};

const getKibanaIndexHealth = () => {
  const component = '.kibana Index';

  return client.get('_cat/indices/.kibana?format=json').then((response) => {
    return `${component} ${translateStatus(response.data[0].status)}`;
  }).catch((error) => {
    const msg = `${component} Outage`;
    console.log(`${msg}: ${error.message}`);
    return msg;
  });
};

const getLogstashIndexHealth = () => {
  const logstashIndex = getCurrentLogstashIndexName();
  const component = `${logstashIndex} Index`;

  return client.get(`_cat/indices/${logstashIndex}?format=json`).then((response) => {
    return `${component} ${translateStatus(response.data[0].status)}`;
  }).catch((error) => {
    const msg = `${component} Outage`;
    console.log(`${msg}: ${error.message}`);
    return msg;
  });
};

const getHealthStatuses = () => {
  return Promise.all([
    getClusterHealth(),
    getKibanaIndexHealth(),
    getLogstashIndexHealth()
  ]);
};

module.exports = { getHealthStatuses };
