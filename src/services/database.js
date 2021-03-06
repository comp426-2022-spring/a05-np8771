// Put your database code here
// This ensures that things do not fail silently but will throw errors instead.
//this isn't in the reference code tho so im commenting it out!! "use strict";
// Require better-sqlite.
const Database = require('better-sqlite3');

const fs = require('fs');
const datadir = './data';

if (!fs.existsSync(datadir)) {
    fs.mkdirSync(datadir);
}

const logdb = new Database(datadir+'log.db');

const stmt = logdb.prepare(`SELECT name FROM sqlite_master WHERE type='table' and name='accesslog';`)
let row = stmt.get();
if (row === undefined) {
    console.log('Log database appears to be empty. Creating log database...')

    const sqlInit = `
        CREATE TABLE accesslog ( 
            id INTEGER PRIMARY KEY, 
            remoteaddr TEXT,
            remoteuser TEXT,
            time TEXT,
            method TEXT,
            url TEXT,
            protocol TEXT,
            httpversion TEXT,
            status TEXT, 
            referrer TEXT,
            useragent TEXT
        );
    `

    logdb.exec(sqlInit)
} else {
    console.log('Log database exists.')
}

module.exports = logdb