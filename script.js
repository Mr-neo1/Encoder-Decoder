// Centralized error handling function
function handleEncodingError(encodingType, error) {
  return `Error encoding data with ${encodingType}: ${error.message}`;
}

function handleDecodingError(decodingType, error) {
  return `Error decoding data with ${decodingType}: ${error.message}`;
}

// Encoding functions
function encodeBase32(data) {
  try {
    const encodedData = btoa(data);
    return `Base32 Encoded: ${encodedData}`;
  } catch (error) {
    return handleEncodingError('Base32', error);
  }
}

function encodeBase64(data) {
  try {
    const encodedData = btoa(data);
    return `Base64 Encoded: ${encodedData}`;
  } catch (error) {
    return handleEncodingError('Base64', error);
  }
}

function encodeAscii85(data) {
  try {
    const encodedData = unescape(encodeURIComponent(data));
    return `Ascii85 Encoded: ${btoa(encodedData)}`;
  } catch (error) {
    return handleEncodingError('Ascii85', error);
  }
}

function encodeBaudot(data) {
  const baudotTable = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const encodedData = data.toUpperCase().split('').map(char => {
    const index = baudotTable.indexOf(char);
    return index !== -1 ? String.fromCharCode(index + 65) : char;
  }).join('');
  return `Baudot Encoded: ${encodedData}`;
}

function encodeUnicodeCodePoints(data) {
  const encodedData = data.split('').map(char => `\\u${char.charCodeAt(0).toString(16)}`).join('');
  return `Unicode Code Points Encoded: ${encodedData}`;
}

function encodeUrl(data) {
  try {
    const encodedData = encodeURIComponent(data);
    return `URL Encoded: ${encodedData}`;
  } catch (error) {
    return handleEncodingError('URL', error);
  }
}

function encodePunycode(data) {
  try {
    // Use a Punycode library for encoding
    const encodedData = punycode.encode(data);
    return `Punycode Encoded: ${encodedData}`;
  } catch (error) {
    return handleEncodingError('Punycode', error);
  }
}

function encodeBootstring(data) {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
  for (const char of data) {
    if (alphabet.indexOf(char) === -1) {
      return 'Invalid character for Bootstring encoding';
    }
  }
  let result = '';
  for (const char of data) {
    const index = alphabet.indexOf(char);
    result += alphabet[index + 1] + alphabet[index];
  }
  return `Bootstring Encoded: ${result}`;
}

function encodeInteger(data) {
  const parsedData = parseInt(data, 10);
  if (isNaN(parsedData)) {
    return 'Invalid input for Integer encoding';
  }
  return `Integer Encoded: ${parsedData}`;
}

// Decoding functions
function decodeBase32(data) {
  try {
    const decodedData = atob(data);
    return `Base32 Decoded: ${decodedData}`;
  } catch (error) {
    return handleDecodingError('Base32', error);
  }
}

function decodeAscii85(data) {
  try {
    const decodedData = atob(data);
    return `Ascii85 Decoded: ${decodedData}`;
  } catch (error) {
    return handleDecodingError('Ascii85', error);
  }
}

function decodeBaudot(data) {
  const baudotTable = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const decodedData = data.split('').map(char => {
    const index = baudotTable.indexOf(char);
    return index !== -1 ? String.fromCharCode(index + 65) : char;
  }).join('');
  return `Baudot Decoded: ${decodedData}`;
}

function decodeUnicodeCodePoints(data) {
  const decodedData = data.split('\\u').map(codepoint => {
    if (codepoint) {
      return String.fromCharCode(parseInt(codepoint, 16));
    }
    return '';
  }).join('');
  return `Unicode Code Points Decoded: ${decodedData}`;
}

function decodeUrl(data) {
  try {
    const decodedData = decodeURIComponent(data);
    return `URL Decoded: ${decodedData}`;
  } catch (error) {
    return handleDecodingError('URL', error);
  }
}

function decodePunycode(data) {
  try {
    // Use a Punycode library for decoding
    const decodedData = punycode.decode(data);
    return `Punycode Decoded: ${decodedData}`;
  } catch (error) {
    return handleDecodingError('Punycode', error);
  }
}

function decodeBootstring(data) {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
  for (const char of data) {
    if (alphabet.indexOf(char) === -1) {
      return 'Invalid character for Bootstring decoding';
    }
  }
  let result = '';
  for (let i = 0; i < data.length; i += 2) {
    const char1 = alphabet.indexOf(data[i]);
    const char2 = alphabet.indexOf(data[i + 1]);
    result += alphabet[char2 - char1];
  }
  return `Bootstring Decoded: ${result}`;
}

function decodeInteger(data) {
  const parsedData = parseInt(data, 10);
  if (isNaN(parsedData)) {
    return 'Invalid input for Integer decoding';
  }
  return `Integer Decoded: ${parsedData}`;
}

function performOperation() {
  const data = document.getElementById('data').value;
  const encodingType = document.getElementById('encodingType').value;
  const operationType = document.getElementById('operationType').value;
  let result;

  if (operationType === 'encode') {
    result = encodeData(data, encodingType);
  } else if (operationType === 'decode') {
    result = decodeData(data, encodingType);
  } else {
    result = 'Invalid operation type';
  }

  document.getElementById('result').innerText = result;
}

function encodeData(data, encodingType) {
  switch (encodingType) {
    case 'base32':
      return encodeBase32(data);
    case 'base64':
      return encodeBase64(data);
    case 'ascii85':
      return encodeAscii85(data);
    case 'baudot':
      return encodeBaudot(data);
    case 'unicode':
      return encodeUnicodeCodePoints(data);
    case 'url':
      return encodeUrl(data);
    case 'punycode':
      return encodePunycode(data);
    case 'bootstring':
      return encodeBootstring(data);
    case 'integer':
      return encodeInteger(data);
    default:
      return 'Invalid encoding type';
  }
}

function decodeData(data, encodingType) {
  switch (encodingType) {
    case 'base32':
      return decodeBase32(data);
    case 'ascii85':
      return decodeAscii85(data);
    case 'baudot':
      return decodeBaudot(data);
    case 'unicode':
      return decodeUnicodeCodePoints(data);
    case 'url':
      return decodeUrl(data);
    case

 'punycode':
      return decodePunycode(data);
    case 'bootstring':
      return decodeBootstring(data);
    case 'integer':
      return decodeInteger(data);
    default:
      return 'Invalid decoding type';
  }
}
