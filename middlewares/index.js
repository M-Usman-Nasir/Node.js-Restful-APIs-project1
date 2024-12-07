const fs = require('fs').promises;

async function logReqRes (req, res, next) {
  try {
    await fs.appendFile('log.txt', `${Date.now()} - ${req.method} ${req.url}\n`);
  } catch (err) {
    console.error('Error writing to log file:', err);
  }
  next();
}

module.exports = {logReqRes};