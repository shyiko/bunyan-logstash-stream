function LogstashStream(stream) {
  if (!stream) {
    throw new Error('"stream" is required');
  }
  this.stream = stream;
}

LogstashStream.prototype.write = function (msg) {
  if (!this.stream) {
    throw new Error('stream has ended');
  }
  msg['@timestamp'] = msg.time;
  this.stream.write(JSON.stringify(msg) + '\n');
};

LogstashStream.prototype.end = function () {
  arguments.length &&
    this.write.apply(this, Array.prototype.slice.call(arguments));
  this.stream = null;
};

module.exports = LogstashStream;
