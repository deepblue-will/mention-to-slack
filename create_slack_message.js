const AccountUtil = require('./account_util');

const createMessageFromGithub = ({
  action,
  issue,
  pull_request,
  comment,
  review,
  repository,
  sender,
}) => {
  if (['deleted', 'closed'].includes(action)) {
    return null;
  }
  let pretext, body, title, titleUrl, updatedAt;
  if (comment) {
    pretext = `GitHub comment ${action}`;
    body = comment.body;
    updatedAt = comment.updated_at;
    titleUrl = comment.html_url;
  }

  if (review) {
    pretext = pretext ? pretext : `GitHub review ${action}`;
    body = body ? body : review.body;
    updatedAt = updatedAt ? updatedAt : review.updated_at;
    titleUrl = titleUrl ? titleUrl : review.html_url;
  }

  if (issue) {
    pretext = pretext ? pretext : `GitHub issue ${action}`;
    title = `${issue.title} #${issue.number}`;
    body = body ? body : issue.body;
    updatedAt = updatedAt ? updatedAt : issue.updated_at;
    titleUrl = titleUrl ? titleUrl : issue.html_url;
  }

  if (pull_request) {
    if (action === 'review_requested') {
      pretext = `GitHub ${action}`;
      body = pull_request.requested_reviewers
        .map(reviwer => `@${reviwer.login}`)
        .join(' ');
    } else {
      pretext = pretext ? pretext : `GitHub pull-request ${action}`;
      body = body ? body : pull_request.body;
    }
    title = title ? title : `${pull_request.title} #${pull_request.number}`;
    titleUrl = titleUrl ? titleUrl : pull_request.html_url;
    updatedAt = updatedAt ? updatedAt : pull_request.updated_at;
  }

  const mentions = AccountUtil.getMentions(body);
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
  }, body);

  //see: https://api.slack.com/docs/message-attachments
  return {
    color: '#333',
    pretext,
    author_name: sender.login,
    author_link: sender.url,
    author_icon: sender.avatar_url,
    title,
    title_link: titleUrl,
    text,
    footer: repository.full_name,
    ts: new Date(updatedAt).getTime() / 1000,
  };
};

module.exports = createMessageFromGithub;
