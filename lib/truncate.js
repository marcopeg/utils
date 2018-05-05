
const truncate = (fullStr, strLen, separator) => {
    if (fullStr.length <= strLen) return fullStr;

    separator = separator || '...';

    var sepLen = separator.length,
        // eslint-disable-line
    charsToShow = strLen - sepLen,
        // eslint-disable-line
    frontChars = Math.ceil(charsToShow / 2),
        // eslint-disable-line
    backChars = Math.floor(charsToShow / 2); // eslint-disable-line

    return fullStr.substr(0, frontChars) + // eslint-disable-line
    separator + // eslint-disable-line
    fullStr.substr(fullStr.length - backChars); // eslint-disable-line
};

module.exports = truncate;