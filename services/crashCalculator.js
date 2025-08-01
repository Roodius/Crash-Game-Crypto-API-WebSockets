const crypto = require('crypto')

function CrashPointGenerator(seed,roundId,maxCrash = 120){
      const input = seed;
      const hash = crypto.createHash('sha256').update(input).digest('hex');
      const hexPart = hash.substring(0,8);
      const decimalValule = parseInt(hexPart,16);
      const maxCrash = 120;
      const crashPoint = 1 + (decimalValule % (maxCrash / 100)) / 100;
      return Math.round(crashPoint * 100) / 100;
}

module.exports = {
  CrashPointGenerator
}