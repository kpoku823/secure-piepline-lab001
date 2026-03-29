const express = require('express');
const { exec } = require('child_process');

const app = express();

app.get('/', (req, res) => {
  res.send('Secure Pipeline Lab Running 🚀');
});

// 🚨 VULNERABLE ENDPOINT
app.get('/run', (req, res) => {
  const userInput = req.query.cmd;

  exec(userInput, (error, stdout, stderr) => {
    if (error) {
      return res.send(`Error: ${error.message}`);
    }
    res.send(`Output: ${stdout}`);
  });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});