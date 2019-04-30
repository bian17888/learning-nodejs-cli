const util = {
  notEmpty(input) {
    const result = input === "" ? "The value is required" : true;
    return result;
  }
};

module.exports = util;
