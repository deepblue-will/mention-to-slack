const { WebClient } = require('@slack/client');

const token = process.env.SLACK_TOKEN;
const web = new WebClient(token);

module.exports = async (conversationId, attachment) => {
  try {
    const res = await web.chat.postMessage({
      channel: conversationId,
      attachments: [attachment],
    });

    return res.ok;
  } catch (error) {
    console.error(error);
    return false;
  }
};
