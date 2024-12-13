const fs = require('fs').promises;

const logReqRes = (logFilePath) => {
  return (req, res, next) => {
    const log = `Request: ${req.method} ${req.url}\nResponse Status: ${res.statusCode} \n date: ${Date.now()}\n\n`;
    fs.appendFile(logFilePath, log, (err) => {
      if (err) {
        console.error("Failed to write log:", err);
      }
    });
    next();
  };
};

// Example usage:
module.exports = {logReqRes};