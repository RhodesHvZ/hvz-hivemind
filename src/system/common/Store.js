'use strict'

/**
 * Dependencies
 * @ignore
 */
const { createStore } = require('redux')

/**
 * Module Dependencies
 * @ignore
 */
const DatabaseConnector = require('../../db')
const Config = require('../../config')

/**
 * Store
 * @class
 */
class Store {

  /**
   * constructor
   *
   * @param {Object} initialState
   */
  constructor (initialState) {
    let { constructor: { reducer } } = this
    let reducerFunc = (oldState, action) => reducer.handle(oldState, action)

    if (initialState) {
      this.store = createStore(reducerFunc, initialState)
    } else {
      this.store = createStore(reducerFunc)
    }
  }

  /**
   * reducer
   *
   * @description
   * Abstract method to get the reducer class associated with the manager.
   *
   * @throws {Error} This must be overriden in child class
   */
  static get reducer () {
    throw new Error('This must be overriden in child class')
  }

  /**
   * databaseConfig
   *
   * @description
   * Abstract method to get the database metadata for the manager
   *
   * @throws {Error} This must be overriden in the child class
   *
   * @example
   * static get databaseConfig () {
   *   return {
   *     type: 'typeName'
   *   }
   * }
   */
  static get databaseConfig () {
    throw new Error('This must be overriden in child class')
  }

  /**
   * get state
   *
   * @return {Object} state
   */
  get state () {
    return this.store.getState()
  }

  /**
   * dispatch
   *
   * @param {Object} action
   */
  dispatch (action) {
    this.store.dispatch(action)
  }

  /**
   * replaceReducer
   *
   * @param {Function|Object} reducer
   */
  replaceReducer (reducer) {
    let reducerFunc = (oldState, action) => reducer.handle(oldState, action)
    this.store.replaceReducer(reducerFunc)
  }

  /**
   * subscribe
   *
   * @todo do we actually need this?
   * @param {Function} func
   */
  subscribe (func) {
    this.store.subscribe(func)
  }

}

/**
 * Export
 * @ignore
 */
module.exports = Store
