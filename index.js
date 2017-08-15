function getRepositories() {
  let username = document.getElementById('username').value
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayRepositories);
  req.open("GET", `https://api.github.com/users/${username}/repos`)
  req.send()
}

function getBranches(el) {
  let username = el.dataset.username
  let repo = el.dataset.repository
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayBranches);
  req.open("GET", `https://api.github.com/repos/${username}/${repo}/branches`)
  req.send()
}

function getCommits(el) {
  let username = el.dataset.username
  let repo = el.dataset.repository
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits);
  req.open("GET", `https://api.github.com/repos/${username}/${repo}/commits`)
  req.send()
}

function displayRepositories(event, data) {
  var repos = JSON.parse(this.responseText)
  const repoList = `<ul>${repos.map(r => '<li><a href="' + r.html_url + '">' + r.name + '</a><a data-username="' + r.owner.login + '" data-repository=""' + r.name + '"" href="#">' + r.name + '</a><a href="' + r.html_url + '">' + r.name + '</a></li>').join('')}</ul>`
  document.getElementById("repositories").innerHTML = repoList
}

function displayCommits(event, data) {
  var commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(c => '<li>' + c.author.login + '-' + c.commit.author.name + '-' + c.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}

function displayBranches(event, data) {
  var branches = JSON.parse(this.responseText)
  const branchesList = `<ul>${branches.map(r => '<li>' + r.name + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = branchesList
}

