
var util = require('util');
var exec = require('child_process').exec;
var commandbase = 'networksetup';
var servicename = 'Wi-Fi';

function startSocks() {
  var cmd = util.format('%s -setsocksfirewallproxystate %s on', 
    commandbase, servicename);
  var ch = exec(cmd);
  ch.stderr.pipe(process.stderr);
  ch.stdout.pipe(process.stdout);
}

function closeSocks() {
  var cmd = util.format('%s -setsocksfirewallproxystate %s off', 
    commandbase, servicename);
  var ch = exec(cmd);
  ch.stderr.pipe(process.stderr);
  ch.stdout.pipe(process.stdout);
}

function loadbypass() {
  var bypassList = require('./bypass.json')
  if (!Array.isArray(bypassList)) {
    throw new Error('bypass array required');
  }
  var cmd = util.format('%s -setproxybypassdomains %s %s',
    commandbase, servicename, bypassList.join(' '));
  var ch = exec(cmd);
  ch.stderr.pipe(process.stderr);
  ch.stdout.pipe(process.stdout);
}

exports.startSocks = startSocks;
exports.closeSocks = closeSocks;
exports.loadbypass = loadbypass;
