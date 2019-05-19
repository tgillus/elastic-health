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
  return getHealthStatus('Cluster', '_cat/health');
};

const getKibanaIndexHealth = () => {
  return getHealthStatus('.kibana Index', '_cat/indices/.kibana');
};

const getLogstashIndexHealth = () => {
  const logstashIndex = getCurrentLogstashIndexName();

  return getHealthStatus(`${logstashIndex} Index`, `_cat/indices/${logstashIndex}`);
};

const getHealthStatus = (component, url) => {
  return client.get(`${url}?format=json`).then((response) => {
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
