var assert = require('assert');
var request = require('supertest');
var express = require('express');
var app = require('../app');

describe('home', function() {
  describe('GET /', function() {
    it('should get response', function(done) {
      request(app)
        .get('/')
        .expect('Content-Type', 'text/html; charset=UTF-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });
  });
});
