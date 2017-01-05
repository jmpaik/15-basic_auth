'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const debug = require('debug')('cfgram:pic-route-test');

const Pic = require('../model/pic.js');
const User = require('../model/user.js');
const Gallery = require('../model/gallery.js');

const serverToggle = require('./lib/server-toggle.js');
const server = require('../server.js');

const url = `http://localhost:${process.env.PORT}`;

const exampleUser = {
  username: 'example user',
  password: '1234',
  email: 'user@test.com'
};

const exampleGallery = {
  name: 'test gallery',
  desc: 'test gallery description'
};

const examplePic = {
  name: 'example pic',
  desc: 'example pic description',
  image: `${__dirname}/data/tester.png`
};
