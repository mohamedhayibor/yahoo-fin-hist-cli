#!/usr/bin/env node
// MIT Licensed <> Mohamed Hayibor

const open = require('open');
const meow = require('meow');
const toClipboard = require('to-clipboard');
const cheerio = require('cheerio');
const got = require('got');

const cli = meow(`
  Usage:

  $ fin <ticker> <date> --flag

  Example: (copies aapl closing price on clipboard)
  $ fin aapl 24-Aug-17 -c

  Example: (opens yahoo finance page for date)
  $ fin aapl 24-Aug-17

`, {
  alias: {
    'v': 'version',
    'h': 'help',
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


/*********************************************
 * Case: copying closing price to clipboard
 */
if (cli.flags.c) {
  let link = `https://finance.yahoo.com/quote/${ ticker }/history?period1=${ dateInMilli / 1000 }&period2=${ dateInMilli / 1000 }&interval=1d&filter=history&frequency=1d`;

  got(link).then(res => {
    let $ = cheerio.load( res.body );

    let closingSpan = $('tr.BdT').children()['4'].children[0];
    let closingPrice = closingSpan.children[0].data;

    // copying closingPrice to clipboard
    toClipboard.sync( closingPrice );

    console.log(`
> The closing price for ${ticker} on ${date}: ${closingPrice}

It's already copied to your clipboaard.`);
  });
}
