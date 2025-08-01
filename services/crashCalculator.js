const crypto = require('crypto')

function CrashPointGenerator(seed,roundId,maxCrash = 30){
      const hash = crypto.createHash('sha256').update(seed + roundId).digest('hex');
  const decimal = parseInt(hash.substring(0, 13), 16);  // longer part of hash
  const rand = decimal / Math.pow(2, 52);               // normalize to 0-1 float

  let result = Math.max(1.00, 1 / (1 - rand));
  result = Math.min(result, maxCrash);  // clamp max
  return Math.round(result * 100) / 100;

}

module.exports = CrashPointGenerator
