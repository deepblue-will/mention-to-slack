const ACCOUNTS = require('../accounts');

const MENTION_REGEXP = /(?:^|[^a-zA-Z0-9_＠!@#$%&*])(?:(?:@|＠)(?!\/))([a-zA-Z0-9/_.-]+)(?:\b(?!@|＠)|$)/g;

class AccountUtil {
  static getSlackNameByGitHub(name) {
    return AccountUtil._getSlackName('github', name);
  }

  static getMentions(text) {
    const matches = text.match(MENTION_REGEXP);
    return matches ? matches.map((str) => str.trim()): null;
  }

  static _getSlackName(serviceName, name) {
    const account = ACCOUNTS.find(account => account[serviceName] === name);
    return account ? account.slack : null;
  }
}

module.exports = AccountUtil;
