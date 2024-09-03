// Corrected encoding functions
function encodeBase32(data) {
  try {
    const encodedData = new TextEncoder().encode(data);
    return `Base32 Encoded: ${btoa(String.fromCharCode(...encodedData))}`;
  } catch (error) {
    return "Error encoding data with Base32";
  }
}

function encodeBase64(data) {
  try {
    const encodedData = btoa(data);
    return `Base64 Encoded: ${encodedData}`;
  } catch (error) {
    return "Error encoding data with Base64";
  }
}

function encodeAscii85(data) {
  try {
    const encodedData = ascii85.encode(data).toString(); // Assume ascii85 library is used
    return `Ascii85 Encoded: ${encodedData}`;
  } catch (error) {
    return "Error encoding data with Ascii85";
  }
}

function encodeBaudot(data) {
  const baudotTable = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const encodedData = data
    .toUpperCase()
    .split("")
    .map((char) => {
      const index = baudotTable.indexOf(char);
      return index !== -1 ? String.fromCharCode(index + 65) : char;
    })
    .join("");
  return `Baudot Encoded: ${encodedData}`;
}

function encodeUnicodeCodePoints(data) {
  const encodedData = data
    .split("")
    .map((char) => `\\u${char.charCodeAt(0).toString(16)}`)
    .join("");
  return `Unicode Code Points Encoded: ${encodedData}`;
}

function encodeUrl(data) {
  try {
    const encodedData = encodeURIComponent(data);
    return `URL Encoded: ${encodedData}`;
  } catch (error) {
    return "Error encoding data with URL encoding";
  }
}

function encodePunycode(data) {
  try {
    const encodedData = punycode.encode(data); // Assume Punycode library is used
    return `Punycode Encoded: ${encodedData}`;
  } catch (error) {
    return "Error encoding data with Punycode";
  }
}

function encodeBootstring(data) {
  const alphabet =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
  let result = "";
  for (const char of data) {
    const index = alphabet.indexOf(char);
    if (index === -1) {
      return "Invalid character";
    }
    result += alphabet[(index + 1) % alphabet.length];
  }
  return `Bootstring Encoded: ${result}`;
}

function encodeInteger(data) {
  return `Integer Encoded: ${parseInt(data, 10)}`;
}

// Corrected decoding functions
function decodeBase32(data) {
  try {
    const decodedData = atob(data);
    return `Base32 Decoded: ${new TextDecoder().decode(
      new Uint8Array(decodedData.split("").map((c) => c.charCodeAt(0)))
    )}`;
  } catch (error) {
    return "Error decoding data with Base32";
  }
}

function decodeAscii85(data) {
  try {
    const decodedData = ascii85.decode(data).toString(); // Assume ascii85 library is used
    return `Ascii85 Decoded: ${decodedData}`;
  } catch (error) {
    return "Error decoding data with Ascii85";
  }
}

function decodeBaudot(data) {
  const baudotTable = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const decodedData = data
    .split("")
    .map((char) => {
      const index = baudotTable.indexOf(char);
      return index !== -1 ? String.fromCharCode(index + 65) : char;
    })
    .join("");
  return `Baudot Decoded: ${decodedData}`;
}

function decodeUnicodeCodePoints(data) {
  const decodedData = data
    .split("\\u")
    .slice(1)
    .map((codepoint) => String.fromCharCode(parseInt(codepoint, 16)))
    .join("");
  return `Unicode Code Points Decoded: ${decodedData}`;
}

function decodeUrl(data) {
  try {
    const decodedData = decodeURIComponent(data);
    return `URL Decoded: ${decodedData}`;
  } catch (error) {
    return "Error decoding data with URL encoding";
  }
}

function decodePunycode(data) {
  try {
    const decodedData = punycode.decode(data); // Assume Punycode library is used
    return `Punycode Decoded: ${decodedData}`;
  } catch (error) {
    return "Error decoding data with Punycode";
  }
}

function decodeBootstring(data) {
  const alphabet =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
  let result = "";
  for (let i = 0; i < data.length; i += 1) {
    const char1 = alphabet.indexOf(data[i]);
    if (char1 === -1) {
      return "Invalid character";
    }
    result += alphabet[(char1 - 1 + alphabet.length) % alphabet.length];
  }
  return `Bootstring Decoded: ${result}`;
}

function decodeInteger(data) {
  return `Integer Decoded: ${parseInt(data, 10)}`;
}

// Function to perform encoding/decoding operation
function performOperation() {
  const data = document.getElementById("data").value;
  const encodingType = document.getElementById("encodingType").value;
  const operationType = document.getElementById("operationType").value;
  let result;

  if (operationType === "encode") {
    result = encodeData(data, encodingType);
  } else if (operationType === "decode") {
    result = decodeData(data, encodingType);
  } else {
    result = "Invalid operation type";
  }

  document.getElementById("result").innerText = result;
}

// Function to route data to correct encoding/decoding functions
function encodeData(data, encodingType) {
  switch (encodingType) {
    case "base32":
      return encodeBase32(data);
    case "base64":
      return encodeBase64(data);
    case "ascii85":
      return encodeAscii85(data);
    case "baudot":
      return encodeBaudot(data);
    case "unicode":
      return encodeUnicodeCodePoints(data);
    case "url":
      return encodeUrl(data);
    case "punycode":
      return encodePunycode(data);
    case "bootstring":
      return encodeBootstring(data);
    case "integer":
      return encodeInteger(data);
    default:
      return "Invalid encoding type";
  }
}

function decodeData(data, encodingType) {
  switch (encodingType) {
    case "base32":
      return decodeBase32(data);
    case "ascii85":
      return decodeAscii85(data);
    case "baudot":
      return decodeBaudot(data);
    case "unicode":
      return decodeUnicodeCodePoints(data);
    case "url":
      return decodeUrl(data);
    case "punycode":
      return decodePunycode(data);
    case "bootstring":
      return decodeBootstring(data);
    case "integer":
      return decodeInteger(data);
    default:
      return "Invalid encoding type";
  }
}
