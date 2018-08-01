const { WebClient } = require('@slack/client');

const slackName = require('./slack_name');

const token = process.env.SLACK_TOKEN;
const web = new WebClient(token);

module.exports = async () => {
  const conversationId = 'C14G28YV8';
  const name = slackName.fromGithubName('@deepblue-will');
  try {
    const res = await web.chat.postMessage({
      channel: conversationId,
      text: `${name} aaaa`,
    });

    return res.ok;
  } catch (error) {
    console.error(error);
    return false
  }
};
