const toSlack = require('./to_slack');

module.exports.fromGithub = async ({body, queryStringParameters}, context, callback) => {
  const res = await toSlack();
  const response = {
    statusCode: res ? 200 : 500,
    body: res ? 'success' : 'slack error',
  };

  callback(null, response);
};
