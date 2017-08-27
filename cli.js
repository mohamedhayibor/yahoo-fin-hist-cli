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
 * Case: no arguments exit immediately
 */
if (args.length == 0) {
  console.log("Execute `fin -h` for commands");
  process.exit(1);
}

let ticker = cli.input[0].trim().toUpperCase();

/********************************************
 * Simplest use case: opening historical page
 * with no specifications.
 */
if (args.length === 1) {
  open(`https://finance.yahoo.com/quote/${ ticker }/history`);
  process.exit(1);
}

let date = cli.input[1].trim();
let dateInMilli = Date.parse(date);

/*********************************************
 * Case: opening page with only specified date
 */
if (Object.keys(cli.flags).length == 0) {
  open(`https://finance.yahoo.com/quote/${ ticker }/history?period1=${ dateInMilli / 1000 }&period2=${ dateInMilli / 1000 }&interval=1d&filter=history&frequency=1d`);
  process.exit(1);
}

/*********************************************
 * Case: opening page with a 5 day range
 * note: a day is 86400000 milliseconds
 */
if (cli.flags.f) {
  let start = (dateInMilli - (86400000 * 2)) / 1000;
  let end = (dateInMilli + (86400000 * 2)) / 1000;
  open(`https://finance.yahoo.com/quote/${ ticker }/history?period1=${ start }&period2=${ end }&interval=1d&filter=history&frequency=1d`);

  process.exit(1);
}

/*********************************************
 * Case: opening page with a 10 day range
 */
if (cli.flags.t) {
  let start = (dateInMilli - (86400000 * 5)) / 1000;
  let end = (dateInMilli + (86400000 * 5)) / 1000;
  open(`https://finance.yahoo.com/quote/${ ticker }/history?period1=${ start }&period2=${ end }&interval=1d&filter=history&frequency=1d`);

  process.exit(1);
}

/*********************************************
 * Case: opening page with a 30 day range
 */
if (cli.flags.m) {
  let start = (dateInMilli - (86400000 * 15)) / 1000;
  let end = (dateInMilli + (86400000 * 15)) / 1000;
  open(`https://finance.yahoo.com/quote/${ ticker }/history?period1=${ start }&period2=${ end }&interval=1d&filter=history&frequency=1d`);

  process.exit(1);
}
