const team = require('./team.json');

module.exports = {
  fromGithubName: githubName => {
    return Object.keys(team).find(key => team[key].github === githubName);
  },
};
