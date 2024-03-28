const mammoth = require('mammoth');
const chromium = require('chrome-aws-lambda');

/**
 * pdf2docx
 * 
 * Converts docx to pdf.
 * 
 * @param  fpIn   {string}  Path to the pdf file
 */
async function pdf2docx (fpIn) {
  let browser;

  try {
    const html = (await mammoth.convertToHtml({ path: fpIn })).value;
    browser = await chromium.puppeteer.launch({
      args: chromium.args,
      defaultViewPort: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: true,
      ignoreHTTPSErrors: true
    });
    
    const page = await browser.newPage();
    await page.emulateMediaType('screen');
    await page.setContent(html, { waitUntil: 'networkidle0' });

    const pdfStream = await page.createPDFStream({
      format: 'A4',
      margin: {
        top: '50px',
        bottom: '50px',
        left: '30px',
        right: '30px',
      },
      preferCSSPageSize: true,
      printBackground: true,
    });

    pdfStream.on('end', async () => {
      await browser.close();
    });

    return pdfStream;
  } catch (err) {
    browser && await browser.close();
    throw err;
  }
}

module.exports = pdf2docx;
