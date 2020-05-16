function splitRow(row, delimiter) {
  const res = [];

  for (let i = 0; i < row.length; i++) {
    let end = i + 1;

    while (end < row.length && row[end] !== delimiter) end++;

    const start = row[i] === '"' ? i + 1 : i;

    res.push(row.slice(start, row[end - 1] === '"' ? end - 1 : end).trim());

    i = end + 1;
  }

  return res;
}

function parseCSVFile(str, delimiter = ',') {
  const rows = str.split('\n').filter(line => line).map(row => splitRow(row, delimiter));

  return { rows, rowsCount: rows.length };
}

module.exports = {
  parseCSVFile,
};
