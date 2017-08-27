# yahoo-fin-hist-cli

Automate "getting historical prices". :sunglasses:

## Usage

```sh
$ fin aapl 24-Aug-17 -c

> The closing price for AAPL on 24-Aug-17: 159.27

> It's already copied to your clipboaard.
```

Possible queries:

```sh
  # Main use cases

  > fin <ticker> <date> -c   (gets the historical `close price` and copies it to the clipboard)

  > fin <ticker> <date>      (opens page with open close... for that single day)

  > fin <ticker>             (opens historical prices page of that security)

  ## Extra features

  > fin <ticker> <date> -f   (opens page with open close... for a 5 days range)

  > fin <ticker> <date> -t   (opens page with open close... for a 10 days range)

  > fin <ticker> <date> -m   (opens page with open close... for a 30 days range)

```

## Installation

If you don't have `NodeJS` already [download it](https://nodejs.org/en/download/). You'll get npm with it.

Install this package with this command:
```sh
$ npm install -g yahoo-fin-hist-cli
```

Then you can run the `fin` command from anywhere.

## Demos
[](..gif)

### Raison D'etre

"Excel-monkey" tasks are hard and emotionally taxing. Automate as much you can.

## License
MIT © [Mohamed Hayibor](http://github.com/mohamedhayibor)