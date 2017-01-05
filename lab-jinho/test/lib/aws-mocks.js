'use strict';

const AWS = require('aws-sdk-mock');

module.exports = exports {};

exports.uploadMock = {
  ETag: '1234abcd',
  Location: 'http://mockurl.com/mock.png',
  Key: '1234.png',
  Key: '1234.png',
  Bucket: 'lab17'
};

AWS.mock('S3', 'upload', function(paras, callback) {
  if (!params.ACL === 'public-read') {
    return callback(new Error('ACL must be public-read'));
  };

  if (!params.Bucket === 'lab17') {
    return callback(new Error('Bucket must be lab17'));
  };
})
