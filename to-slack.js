const { WebClient } = require('@slack/client');

const token = process.env.SLACK_TOKEN;
const web = new WebClient(token);

module.exports = async () => {
  const conversationId = 'C14G28YV8';
  try {
    await web.chat.postMessage({ channel: conversationId, text: 'Hello there' });
  } catch (error) {
    console.error(error);
  }
}