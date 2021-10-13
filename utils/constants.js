/* eslint-disable no-useless-escape */
const regexUrl = /https?:\/\/(www\.)?[a-z0-9\-_~:\/?#[\]@!$&'()*+,;=]{1,}\.[a-z0-9\-._~:\/?#[\]@!$&'()*+,;=]{1,}/i;

const allowedCors = [
  'http://bakaev.nomoredomains.club',
  'https://bakaev.nomoredomains.club',
  'http://localhost:3000',
  'https://localhost:3000',
];

const options = {
  origin: [
    'http://bakaev.nomoredomains.club',
    'https://bakaev.nomoredomains.club',
    'http://localhost:3000',
    'https://localhost:3000',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization', 'Accept', 'Set-Cookie'],
  // credentials: true,
};

const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

module.exports = {
  regexUrl,
  allowedCors,
  DEFAULT_ALLOWED_METHODS,
  options,
};
