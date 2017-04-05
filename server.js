'use strict'

/**
 * Dependencies
 * @ignore
 */

/**
 * Module Dependencies
 * @ignore
 */
const Events = require('./src/events')
const UserManager = require('./src/user')

Events.SYSTEM_NEW_MAIL({foo: 'bar'})

Events.USER_AUTH({foo: {bar: 'baz'}})
