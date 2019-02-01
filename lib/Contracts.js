'use strict';

const Web3 = require('web3');
const AbiBinProvider = require('./AbiBinProvider');
const Mosaic = require('@openstfoundation/mosaic-tbd');
const Contracts = Mosaic.Contracts;
const abiBinProvider = new AbiBinProvider();

/**
 * The class exposes instance of different contracts. Dappy can use the
 * instances to call contract methods. This gives Dappy flexibility in calling
 * contract methods based on his use case.
 */
class BTContracts extends Contracts {
  constructor(originWeb3, auxiliaryWeb3) {
    super(originWeb3, auxiliaryWeb3);
    const oThis = this;

    oThis.originWeb3 = originWeb3;
    oThis.auxiliaryWeb3 = auxiliaryWeb3;
  }

  BrandedToken(address, options) {
    const oThis = this;
    let web3 = oThis.originWeb3;
    return BTContracts.getBrandedToken(web3, address, options);
  }

  GatewayComposer(address, options) {
    const oThis = this;
    let web3 = oThis.originWeb3;
    return BTContracts.getGatewayComposer(web3, address, options);
  }

  UtilityBrandedToken(address, options) {
    const oThis = this;
    let web3 = oThis.auxiliaryWeb3;
    return BTContracts.getUtilityBrandedToken(web3, address, options);
  }

  /**
   * Returns BrandedToken contract instance.
   *
   * @param originWeb3 Origin chain web3 object.
   * @param address BrandedToken contract address.
   * @param options Tx options.
   * @returns {web3.eth.Contract} Contract instance.
   * @constructor
   */
  static getBrandedToken(originWeb3, address, options) {
    originWeb3 = Contracts._getWeb3(originWeb3);
    let jsonInterface = abiBinProvider.getABI('BrandedToken');
    let contract = new originWeb3.eth.Contract(jsonInterface, address, options);
    return contract;
  }

  /**
   * Returns GatewayComposer contract instance.
   *
   * @param originWeb3 Origin chain web3 object.
   * @param address GatewayComposer contract instance.
   * @param options Tx options.
   * @returns {web3.eth.Contract} Contract instance.
   * @constructor
   */
  static getGatewayComposer(originWeb3, address, options) {
    originWeb3 = Contracts._getWeb3(originWeb3);
    let jsonInterface = abiBinProvider.getABI('GatewayComposer');
    let contract = new originWeb3.eth.Contract(jsonInterface, address, options);
    return contract;
  }

  /**
   * Returns UtilityBrandedToken contract instance.
   *
   * @param auxiliaryWeb3 Auxiliary chain web3 object.
   * @param address UtilityBrandedToken contract address.
   * @param options Tx options.
   * @returns {web3.eth.Contract} Contract instance.
   * @constructor
   */
  static getUtilityBrandedToken(auxiliaryWeb3, address, options) {
    auxiliaryWeb3 = Contracts._getWeb3(auxiliaryWeb3);
    let jsonInterface = abiBinProvider.getABI('UtilityBrandedToken');
    let contract = new auxiliaryWeb3.eth.Contract(jsonInterface, address, options);
    return contract;
  }

  /**
   * Returns web3 instance. If input param web3 is string url, it constructs web3 object from it.
   *
   * @param web3 Web3 object.
   * @returns {Web3} Web3 object.
   * @private
   */
  static _getWeb3(web3) {
    if (web3 instanceof Web3) {
      return web3;
    }
    if (typeof web3 === 'string') {
      return new Web3(web3);
    }
    throw 'Invalid web3. Please provide an instanceof Web3(version: ' + Web3.version + ' )';
  }
}

module.exports = BTContracts;