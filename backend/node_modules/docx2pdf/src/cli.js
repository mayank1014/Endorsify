#!/usr/bin/env node
const pdf2docx = require('./index');
const fs = require('fs');

(async function (fpIn, fpOut) {
  const fpOutStream = fs.WriteStream(fpOut);
  const pdfStream = await pdf2docx(fpIn);
  pdfStream.pipe(fpOutStream);
})(...process.argv.slice(2));
