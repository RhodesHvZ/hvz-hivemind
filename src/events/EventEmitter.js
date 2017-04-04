'use strict'

/**
 * Dependencies
 * @ignore
 */
const Emitter = require('events')

/**
 * Module Dependencies
 * @ignore
 */
const EventsEnum = require('./EventsEnum')

/**
 * EventEmitter
 */
class EventEmitter extends Emitter {

  constructor () {
    super()

    this.setMaxListeners(0) // Infinite amount of listeners per action type.

    // Define action functions for each event in the EventsEnum file
    Object.keys(EventsEnum).forEach(key => {
      Object.defineProperty(this, key, {
        value: (...event) => this.emit(key, Object.assign(...event)),
        enumerable: false,
        writable: false,
        configurable: false
      })

      this.on(key, event => this.writeEvent(key, event))
    })

    this.on('error', (err) => this.handleError(err))
  }

  get eventList () {
    return EventsEnum
  }

  handleError (err) {
    console.error(err)
  }

  writeEvent (type, event) {
    // TODO
    console.log(type, JSON.stringify(event, null, 2))
  }

}

/**
 * Export
 */
module.exports = EventEmitter
