const toSlack = require('./slack/to_slack');
const SlackAttachmentBuilder = require('./slack/slack_attachment_builder');

module.exports.fromGithub = async (
  { body, queryStringParameters },
  context,
  callback,
) => {
  if (!(queryStringParameters && queryStringParameters.channelId)) {
    callback(null, {
      statusCode: 400,
      body: 'must add query params',
    });
    return;
  }

  let payload;
  try {
    payload = JSON.parse(body);
  } catch (e) {
    console.error(e);
    callback(null, {
      statusCode: 400,
      body: 'json parse error',
    });
    return;
  }

  const message = SlackAttachmentBuilder.fromGithub(payload);
  const response = {
    statusCode: 200,
    body: '',
  };
  if (message) {
    const res = await toSlack(queryStringParameters.channelId, message);
    response.statusCode = res ? 200 : 500;
    response.body = res ? 'success' : 'slack error';
  } else {
    response.body = 'noop';
  }

  callback(null, response);
};
