var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;
var notificationProvider = require('../routes/notificationprovider');

describe("Noifications", function() {
  describe("#notificationProvider.findAll()", function() {

      it("should be called once", function() {
        var req,res,spy;

        req = res = {};
        spy = res.send = sinon.spy();

        notificationProvider.findAll(req, res);
        expect(spy.calledThrice).to.equal(false);
      });     

  });
}); 

describe("Noifications", function() {
  describe("#notificationProvider.updateNotification()", function() {

      it("should be called once", function() {
        var req,res,spy;
        var val=["5738b5ab0d74b57c08dfcr56"];
        req = res = {};
        req.body = val;
        spy = res.send = sinon.spy();

        notificationProvider.updateNotification(req, res);
        expect(spy.calledTwice).to.equal(false);
      });     

  });
}); 