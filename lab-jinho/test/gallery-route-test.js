'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const mongoose = require('mongoose');
const Promise = require('bluebird');

mongoose.Promise = Promise;

const User = require('../model/user.js');
const Gallery = require('../model/gallery.js');

require('../server.js');

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
