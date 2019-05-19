const ElasticsearchHealthCheck = require('./lib/elasticsearch-health-check');

ElasticsearchHealthCheck.getHealthStatuses().then((statuses) => {
  statuses.map(status => console.log(status));
});
