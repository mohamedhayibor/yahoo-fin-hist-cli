#!/usr/bin/env node
const open = require('open');
const meow = require('meow');

const cli = meow(`
  Usage:

  $ fin <ticker> <date> --flag

  For example:
  $ fin aapl '24-Aug-17' -d

`, {
  alias: {
    'v': 'version',
    'h': 'help',
    'd': 'day',
    'c': 'copy-to-clipboard',
    'f': 'five-days',
    't': 'ten-days',
    'm': 'month'
  }
});

let args = cli.input;

/**
 * In case no argument exit immediately
 */
if (args.length == 0) {
  console.log("Execute `fin -h` for commands");
  process.exit(1);
}

let ticker = cli.input[0].trim().toUpperCase();

/**
 * Simplest use case: opening historical page
 * with no specifications.
 */
if (args.length === 1) {
  open(`https://finance.yahoo.com/quote/${ ticker }/history`);
}


let date1 = cli.input[1].trim();

let date1Mil = Date.parse(date1);
// note: a day is 86400000 milliseconds == 86,400 seconds
let date2Mil = date1Mil + 86400000;

// open(`https://finance.yahoo.com/quote/${ ticker }/history?period1=${ date1Mil }`);

open(`https://finance.yahoo.com/quote/${ ticker }/history?period1=${ date1Mil / 1000 }&period2=${ date2Mil / 1000 }&interval=1d&filter=history&frequency=1d`);