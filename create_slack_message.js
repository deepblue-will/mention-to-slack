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

  return {
    color: '#333',
    author_name: `${sender.login} ${action}`,
    title: `${issue.title} #${issue.number}(${repository.full_name})`,
    title_link: comment.html_url,
    text: comment.body,
  };
};

module.exports = createMessageFromGithub;
