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

  //see: https://api.slack.com/docs/message-attachments
  return {
    color: '#333',
    pretext: `GitHub comment ${action}`,
    author_name: sender.login,
    author_link: sender.url,
    author_icon: sender.avatar_url,
    title: `${issue.title} #${issue.number}`,
    title_link: comment.html_url,
    text: comment.body,
    footer: repository.full_name,
    ts: new Date(comment.updated_at).getTime() / 1000,
  };
};

module.exports = createMessageFromGithub;
