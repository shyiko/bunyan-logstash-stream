function LogstashStream(stream, o) {
  if (!stream) {
    throw new Error('"stream" is required');
  }
  this.stream = stream;
  if (o != null && typeof o.replacer === 'function') {
    this.replacer = o.replacer
  } else {
    this.replacer = function () {}
  }
}

LogstashStream.prototype.write = function (msg) {
  if (!this.stream) {
    throw new Error('stream has ended');
  }
  msg['@timestamp'] = msg.time;
  this.stream.write(JSON.stringify(msg, this.replacer()) + '\n');
};

LogstashStream.prototype.end = function () {
  arguments.length &&
    this.write.apply(this, Array.prototype.slice.call(arguments));
  this.stream = null;
};

LogstashStream.replaceCycleWith = function (cycleValue) {
  return function () {
    var cache = [];
    return function(key, value) {
      if (typeof value === 'object' && value !== null) {
        if (cache.indexOf(value) !== -1) {
            return cycleValue;
        }
        cache.push(value);
      }
      return value;
    }
  }
}

module.exports = LogstashStream;
