# Docx2Pdf

Converts docx to pdf.

## Installation

Run `npm install docx2pdf`.

## Sample Usage

```js
import docx2pdf from 'docx2pdf';

...
const pdfStream = await docx2pdf('/path/to/file.docx');

// save file to S3
const s3 = await AWS.S3({ apiVersion: '2006-03-1' });
s3.upload({
  Bucket: 'BUCKET_NAME',
  Key: 'OUTPUT_FILE_NAME',
  Body: pdfStream
});

// save to local file
const fpOut = fs.createWriteStream('/path/to/output/file.pdf');
pdfStream.pipe(pdfStream);

// stream the pdf into http response
res.setHeader('content-type', 'application/pdf');
res.pipe(fpStream);
```
