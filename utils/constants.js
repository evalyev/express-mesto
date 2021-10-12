/* eslint-disable no-useless-escape */
const regexUrl = /https?:\/\/(www\.)?[a-z0-9\-_~:\/?#[\]@!$&'()*+,;=]{1,}\.[a-z0-9\-._~:\/?#[\]@!$&'()*+,;=]{1,}/i;

const allowedCors = [
  'http://bakaev.nomoredomains.club',
  'https://bakaev.nomoredomains.club',
  'localhost:3000'
];

const DEFAULT_ALLOWED_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE";

module.exports = {
  regexUrl,
  allowedCors,
  DEFAULT_ALLOWED_METHODS
};
