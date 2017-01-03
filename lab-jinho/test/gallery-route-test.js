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

describe('Gallery Routes', function() {
  afterEach( done => {
    Promise.all([
      User.remove({}),
      Gallery.remove({})
    ])
    .then( () => done())
    .catch(done);
  });

  describe('POST: /api/gallery', () => {
    before( done => {
      new User(exampleUser)
      .generatePasswordHash(exampleUser.password)
      .then( user => user.save())
      .then( user => {
        this.tempUser = user;
        return user.generateToken();
      })
      .then( token => {
        this.tempToken = token;
        done();
      })
      .catch(done);
    });

    it('should return gallery', done => {
      request.post(`${url}/api/gallery`)
      .send(exampleGallery)
      .set({
        Authorization: `Bearer ${this.tempToken}`
      })
      .end((err, res) => {
        if (err) return done (err);
        console.log(res.body);
        let date = new Date(res.body.created).toString();
        console.log(date);
        expect(res.body.name).to.equal(exampleGallery.name);
        expect(res.body.desc).to.equal(exampleGallery.desc);
        expect(res.body.userID).to.equal(this.tempUser._id.toString());
        console.log(date);
        expect(date).to.not.equal('Invalid Date');
        done();
      });
    });
  });

  describe('GET: /api/gallery/:id', () => {
    before( done => {
      new User(exampleUser)
      .generatePasswordHash(exampleUser.password)
      .then( user => user.save())
      .then( user => {
        this.tempUser = user;
        return user.generateToken();
      })
      .catch(done);
    });
  })
});
