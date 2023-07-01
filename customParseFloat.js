function customParseFloat(value) {
  //1. return value if it has type number
  if (typeof value === "number") {
    return value;
  }

  //2. handle case when object with property toString() is passed, for example { toString: () => return '3.14' }
  if (typeof value === "object" && value.hasOwnProperty("toString")) {
    value = value.toString();
  }

  //3. return NaN if it is something another than a string
  if (typeof value !== "string") {
    return NaN;
  }

  //4. handle Infinity or -Infinity in the beginning of the string
  if (value.startsWith("Infinity")) {
    return Infinity;
  }

  if (value.startsWith("-Infinity")) {
    return -Infinity;
  }

  //5. initialize variables
  let charIndex = 0;
  let sign = 1;
  let result = 0;

  let wasDigitFound = false;
  let wasDecimalFound = false;

  let currentDecimalMupliplayer = 1;
  let exponentPart = null;
  let exponentMultiplier = 1;

  //6. handle signs at the beginning
  if (value[charIndex] === "-") {
    sign = -1;
    charIndex++;
  } else if (value[charIndex] === "+") {
    sign = 1;
    charIndex++;
  }

  //7. skipping all spaces at the beginning of the string
  while (value[charIndex] === " ") {
    charIndex++;
  }

  //8. Initialize char codes map for better readability
  const CHAR_CODES = {
    DOT: ".".charCodeAt(),
    EXPONENT_LOWER: "e".charCodeAt(),
    EXPONENT_UPPER: "E".charCodeAt(),
    ZERO_DIGIT: "0".charCodeAt(),
    NINE_DIGIT: "9".charCodeAt(),
  };

  //9. Start to loop while value ends
  while (charIndex < value.length) {
    //10. Get char code of each char
    const charCode = value.charCodeAt(charIndex);

    //11. Handle dot
    if (charCode === CHAR_CODES.DOT && !wasDecimalFound) {
      wasDecimalFound = true;
    } else if (
      charCode === CHAR_CODES.EXPONENT_LOWER ||
      charCode === CHAR_CODES.EXPONENT_UPPER
    ) {
      //12. handle exponents (upper and lower), dont forget to BREAK!
      exponentPart = value.slice(charIndex);
      break;
    } else if (
      charCode >= CHAR_CODES.ZERO_DIGIT &&
      charCode <= CHAR_CODES.NINE_DIGIT
    ) {
      //13. handle digits range (0-9)
      wasDigitFound = true;
      const digit = charCode - CHAR_CODES.ZERO_DIGIT;
      if (wasDecimalFound) {
        currentDecimalMupliplayer /= 10;
        result += digit * currentDecimalMupliplayer;
      } else {
        result = result * 10 + digit;
      }
    } else {
      break;
    }
    charIndex++;
  }

  //14. return NaN, if we didn`t found digits
  if (!wasDigitFound) {
    return NaN;
  }

  //15. If exponents part is present, convert it to multiplier
  if (exponentPart) {
    const exponentValue = parseInt(exponentPart.slice(1));
    if (!Number.isNaN(exponentValue)) {
      exponentMultiplier = Math.pow(10, exponentValue);
    }
  }

  //16. rounding to 15 symbols to avoid mistakes in rounding numbers
  return Number((sign * result * exponentMultiplier).toFixed(15));
}

module.exports = customParseFloat;
