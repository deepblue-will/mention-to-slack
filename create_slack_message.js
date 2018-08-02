const AccountUtil = require('./account_util');

const createMessageFromGithub = ({
  action,
  issue,
  comment,
  repository,
  sender,
}) => {
  if (!['created', 'edited'].includes(action)) {
    return null;
  }

  const mentions = AccountUtil.getMentions(comment.body);
  if (!mentions) {
    return null;
  }

  const text = mentions.reduce((str, mention) => {
    const slackName = AccountUtil.getSlackNameByGitHub(mention);
    if (slackName) {
      return str.replace(new RegExp(mention, 'g'), slackName);
    } else {
      return str;
    }
  }, comment.body);

  //see: https://api.slack.com/docs/message-attachments
  return {
    color: '#333',
    pretext: `GitHub comment ${action}`,
    author_name: sender.login,
    author_link: sender.url,
    author_icon: sender.avatar_url,
    title: `${issue.title} #${issue.number}`,
    title_link: comment.html_url,
    text,
    footer: repository.full_name,
    ts: new Date(comment.updated_at).getTime() / 1000,
  };
};

module.exports = createMessageFromGithub;
