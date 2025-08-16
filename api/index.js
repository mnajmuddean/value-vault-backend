const app = require('../dist/app').default;
const { createServer } = require('http');

module.exports = (req, res) => {
  createServer(app).emit('request', req, res);
};
