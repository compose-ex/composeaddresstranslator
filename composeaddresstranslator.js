var util = require('util');
var cassandra = require('cassandra-driver');

function ComposeAddressTranslator() {}

util.inherits(ComposeAddressTranslator, cassandra.policies.addressResolution.AddressTranslator);

ComposeAddressTranslator.prototype.translate = function(address, port, callback) {
    origAddress = address + ":" + port;
    newAddress = ComposeAddressTranslator.address_map.get(origAddress) || origAddress;
    callback(newAddress);
};

ComposeAddressTranslator.prototype.setMap = function (addresses) {
  ComposeAddressTranslator.address_map = new Map();

  Object.keys(addresses).forEach(key => {
      ComposeAddressTranslator.address_map.set(key, addresses[key]);
  });
};

ComposeAddressTranslator.prototype.getMap = function () {
  return ComposeAddressTranslator.address_map;
};

ComposeAddressTranslator.prototype.getContactPoints = function () {
  return Array.from(ComposeAddressTranslator.address_map.values());
};

module.exports.ComposeAddressTranslator=ComposeAddressTranslator;
