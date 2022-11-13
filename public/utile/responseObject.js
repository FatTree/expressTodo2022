exports.responseObj = function(result, message, data) {
    this.result = result;
    this.message = message;
    this.data = data;
    return this;
}