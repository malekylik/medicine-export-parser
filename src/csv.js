const { getMaximumValue } = require('./utils');

function CSV(rows) {
  this.rows = rows;
  this.rowCount = rows.length,
  this.columnCount = rows.length > 0 ? rows[0].length : 0;
  this.maxCellLength = getMaximumValue(rows.map(v => getMaximumValue(v, s => s.length)));

  return this;
}

CSV.prototype = {
  ...CSV.prototype,

  getRow(rowIndex) {
    const csv = this;

    if (rowIndex < 0 || rowIndex >= csv.rowsCount) {
      console.warn(`invalid row index ${rowIndex}, max rows length ${csv.rowsCount}`);

      return [];
    }

    return csv.rows[rowIndex];
  },

  map(mapF) {
    const csv = this;
    const res = [];

    console.log('csv', csv);

    for (let i = 0; i < csv.rows.length; i++) {
      res.push(mapF(csv.rows[i], i, csv.rows));
    }

    return res;
  },
};

function showCSVRow(csv, rowIndex) {
  const row = csv.getRow(rowIndex);
  const { maxCellLength } = csv;
  const line = [];

  for (let str of row) {
    line.push(str.padStart(maxCellLength));
  }

  return line.join('|');
}

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

  return new CSV(rows);
}

module.exports = {
  parseCSVFile,
  showCSVRow,
};
