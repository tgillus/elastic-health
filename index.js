const ElasticsearchHealthCheck = require('./lib/elasticsearch-health-check');

ElasticsearchHealthCheck.getHealthStatuses().then((statuses) => {
  console.log(statuses)
});
