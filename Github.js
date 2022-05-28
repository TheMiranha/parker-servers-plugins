const axios = require('axios');
const ENDPOINT = 'https://api.github.com/users/themiranha';

async function getRepos() {
	var response = await axios.get(ENDPOINT + '/repos');
  return response.data;
}

async function getPackageFile(repo) {
  var response = await axios.get('https://raw.githubusercontent.com/'+repo+'/main/package.json');
  return response.data;
}

async function getPlugins() {
  var repos = await getRepos();
  var plugins = repos.filter(repo => repo.name.indexOf('parker-desktop-plugins-') > -1);
  plugins = plugins.map(repo => repo.full_name);
  var res = [];
  for (var i = 0; i < plugins.length; i++) {
    var package = await getPackageFile(plugins[i]);
    res.push({package, repo: plugins[i]});
  }
  return res;
}

module.exports = { getPlugins }