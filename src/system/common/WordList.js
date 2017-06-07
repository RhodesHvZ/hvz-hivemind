'use strict'

/**
 * Dependencies
 * @ignore
 */
const cwd = process.cwd()
const fs = require('fs')
const path = require('path')
const crypto = require('crypto')

/**
 * WordList
 * @class
 *
 * Manage read-only stream for word list files
 */
class WordList {

  constructor () {
    this.adj = fs.readFileSync(path.join(cwd, 'word-lists', 'adj.txt'), { encoding: 'utf8' }).split('\n')
    this.noun = fs.readFileSync(path.join(cwd, 'word-lists', 'noun.txt'), { encoding: 'utf8' }).split('\n')
  }

  generateBiteCode () {
    let [adjIdx, nounIdx] = new Uint32Array(crypto.randomBytes(8))
    let adj = this.adj[adjIdx % this.adj.length]
    let noun = this.noun[nounIdx % this.noun.length]

    return `${adj} ${noun}`.toUpperCase()
  }

}

/**
 * Export
 * @ignore
 */
module.exports = new WordList()
