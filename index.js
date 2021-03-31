#!/usr/bin/env node

const inquirer = require('inquirer')
const git = require('simple-git')()
const currentGitBranch = git.branch(['-a']).then(result => result.current)

const questions = [
  {
    name: 'type',
    type: 'list',
    choices: ['feat', 'fix', 'refactor', 'test'],
    messages:'Choose a commit type',
  },
  {
    name: 'scope',
    type: 'input',
    messages: 'Enter scope message'
  },
  {
    name: 'summary',
    type: 'input',
    messages: 'Enter summary message'
  }
]

inquirer
  .prompt(questions)
    .then(({ type, scope, summary }) => {
      git.add('.')
      git.commit(`${type}(${(scope)}): ${summary}`)
      git.push(['--set-upstream', 'origin', currentGitBranch])
    })
    .catch(err =>{console.log(err)})