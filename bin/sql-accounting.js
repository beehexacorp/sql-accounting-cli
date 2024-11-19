#!/usr/bin/env node

const { execSync } = require('child_process');
const { Command } = require('commander');
const { deploy } = require('../lib/deploy');
const { expose } = require('../lib/expose');
const { login } = require('../lib/login');

const program = new Command();

program
  .name('sql-accounting')
  .description('CLI tool for SQL Accounting application management')
  .version('1.0.0');

program
  .command('install')
  .description('Deploy SQL Accounting to IIS')
  .requiredOption('--app-name <name>', 'Name of the IIS application')
  .requiredOption('--port <port>', 'Port number for the application')
  .option('--use-windows-service <boolean>', 'Set to true to deploy as a Windows Service', 'false')
  .action((options) => {
    deploy(options.appName, options.port, options.useWindowsService);
  });

program
  .command('expose')
  .description('Set up Cloudflare tunnels for SQL Accounting')
  .requiredOption('--provider <provider>', 'Cloudflare or other provider')
  .requiredOption('--secret <secret>', 'Authentication secret for the tunnel')
  .action((options) => {
    expose(options.provider, options.secret);
  });

program
  .command('login')
  .description('Login to SQL Accounting')
  .requiredOption('--username <username>', 'SQL Accounting username')
  .requiredOption('--password <password>', 'SQL Accounting password')
  .action((options) => {
    login(options.username, options.password);
  });

// Check for empty arguments and display help if needed
if (process.argv.length <= 2) {
    program.outputHelp();
    process.exit(0);
} else {
    program.parse(process.argv);
}