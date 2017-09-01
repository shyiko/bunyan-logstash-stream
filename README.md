# bunyan-logstash-stream

Bunyan's Logstash stream that I got tired copying around. All it does is adding `@timestamp` 
field. It DOES NOT remove bunyan's meta fields (so that [bunyan cli](https://github.com/trentm/node-bunyan#cli-usage) (e.g. `node app.js | bunyan`) 
would still work).

## Installation

```sh
npm install bunyan-logstash-stream --save
```

## Usage

```javascript
var bunyan = require('bunyan');
var LogstashStream = require('bunyan-logstash-stream');

var logger = bunyan.createLogger({
  name: "application-name",
  streams: [{
      type: 'raw', level: 'debug', stream: new LogstashStream(process.stdout)
  }]
});
```

## License

[MIT License](https://github.com/shyiko/bunyan-logstash-stream/blob/master/mit.license)

