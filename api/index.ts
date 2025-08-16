import app from '../src/app';
import { createServer } from 'http';

export default (req, res) => {
  createServer(app).emit('request', req, res);
};
