# yahoo-fin-hist-cli

Automating "getting historical prices".

## Usage

Examples queries:

```sh
  > fin <ticker> <date>      (opens page with open close... for that single day)

  > fin <ticker> <date> -c   (gets the historical `close price` and copies it to the clipboard)

  > fin <ticker>             (opens historical prices page of that security)

  > fin <ticker> <date> -f   (opens page with open close... for a 5 days range)

  > fin <ticker> <date> -t   (opens page with open close... for a 10 days range)

  > fin <ticker> <date> -m   (opens page with open close... for a 30 days range)

```

## Installation

If you don't have `NodeJS` already [download it](https://nodejs.org/en/download/). You'll get npm with it.

```sh
> npm i -g yahoo-fin-hist-cli
```

Then you can run the `fin` command from anywhere.

## Demos
[](..gif)

### Raison D'etre

Excel monkey tasks are hard and emotionally taxing. Automate the task of getting historical security prices.

## License
MIT © [Mohamed Hayibor](http://github.com/mohamedhayibor)