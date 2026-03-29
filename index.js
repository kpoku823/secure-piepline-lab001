const express = require('express');
const { execFile } = require('child_process');
const rateLimit = require('express-rate-limit');

const app = express();

const runLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // limit each IP to 10 /run requests per windowMs
  message: 'Too many requests to /run. Please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

app.get('/', (req, res) => {
  res.send('Secure Pipeline Lab Running 🚀');
});

// 🚨 VULNERABLE ENDPOINT
app.get('/run', runLimiter, (req, res) => {
  const userInput = req.query.cmd;

  // Allowlist of safe commands that can be run via this endpoint.
  // Keys are user-supplied command names; values define the executable and fixed args.
  const allowedCommands = {
    date:    { file: 'date',    args: [] },
    uptime:  { file: 'uptime',  args: [] },
    hostname:{ file: 'hostname',args: [] }
  };

  const cmdConfig = allowedCommands[userInput];
  if (!cmdConfig) {
    return res.status(400).send('Invalid or unsupported command.');
  }

  execFile(cmdConfig.file, cmdConfig.args, (error, stdout, stderr) => {
    if (error) {
      return res.send(`Error: ${error.message}`);
    }
    res.send(`Output: ${stdout}`);
  });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});