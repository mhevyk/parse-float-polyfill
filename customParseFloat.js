function customParseFloat(value) {
  if (typeof value === "number") {
    return value;
  }

  value = value.toString();

  if (value.startsWith("Infinity")) {
    return Infinity;
  }

  if (value.startsWith("-Infinity")) {
    return -Infinity;
  }

  let sign = 1;
  let result = 0;
  let hasDecimal = false;
  let hasDigits = false;
  let exponentialMultiplier = 1;
  let decimalMultiplayer = 1;
  let exponentPart = "";

  let charIndex = 0;

  // skip spaces in the start
  while (value[charIndex] === " ") {
    charIndex++;
  }

  // handle signs
  if (value[charIndex] === "-") {
    sign = -1;
    charIndex++;
  } else if (value[charIndex] === "+") {
    charIndex++;
  }

  const CHAR_CODES = {
    DOT: ".".charCodeAt(),
    ZERO_DIGIT: "0".charCodeAt(),
    NINE_DIGIT: "9".charCodeAt(),
    EXPONENT_UPPER: "E".charCodeAt(),
    EXPONENT_LOWER: "e".charCodeAt(),
  };

  while (charIndex < value.length) {
    const charCode = value.charCodeAt(charIndex);
    if (charCode === CHAR_CODES.DOT && !hasDecimal) {
      hasDecimal = true;
    } else if (
      charCode === CHAR_CODES.EXPONENT_UPPER ||
      charCode === CHAR_CODES.EXPONENT_LOWER
    ) {
      exponentPart = value.slice(charIndex);
      break;
    } else if (
      charCode >= CHAR_CODES.ZERO_DIGIT &&
      charCode <= CHAR_CODES.NINE_DIGIT
    ) {
      hasDigits = true;
      const digit = charCode - CHAR_CODES.ZERO_DIGIT;
      if (hasDecimal) {
        decimalMultiplayer /= 10;
        result += digit * decimalMultiplayer;
      } else {
        result = result * 10 + digit;
      }
    } else {
      break;
    }

    charIndex++;
  }

  if (!hasDigits) {
    return NaN;
  }

  if (exponentPart) {
    const exponentPartWithoutDot = exponentPart.slice(1);
    const exponentValue = parseInt(exponentPartWithoutDot);
    if (!Number.isNaN(exponentValue)) {
      exponentialMultiplier = Math.pow(10, exponentValue);
    }
  }

  return sign * result * exponentialMultiplier;
}

module.exports = customParseFloat;
