const ElasticSearchHealthCheck = require('./lib/elasticsearch-health-check');

ElasticSearchHealthCheck.getHealthStatuses().then((statuses) => {
  console.log(statuses)
});
