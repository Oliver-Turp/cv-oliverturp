// app/api/print/route.js
import fs from 'fs';
import puppeteer from 'puppeteer';
import { executablePath } from 'puppeteer';
import { NextResponse } from 'next/server';
import { PDFDocument } from 'pdf-lib';
import { content } from '../../../cv/content';

const PDF_LAUNCH_ARGS = [
  '--no-sandbox',
  '--disable-setuid-sandbox',
  '--disable-dev-shm-usage',
  '--disable-gpu',
  '--font-render-hinting=medium'
];

/**
 * @param {string} resolvedExe
 * @param {boolean} exeExists
 * @param {string | undefined} envExe
 * @param {boolean} envExeOk
 */
async function launchPuppeteerForPdf(resolvedExe, exeExists, envExe, envExeOk) {
  if (envExeOk && envExe) {
    return puppeteer.launch({
      headless: true,
      executablePath: envExe,
      args: PDF_LAUNCH_ARGS
    });
  }

  // win32: bundled chrome.exe often exists (existsSync true) but spawn fails with UNKNOWN (-4094).
  if (process.platform === 'win32') {
    try {
      return puppeteer.launch({
        headless: true,
        channel: 'chrome',
        args: PDF_LAUNCH_ARGS
      });
    } catch (chanErr) {
      if (exeExists) {
        return puppeteer.launch({
          headless: true,
          executablePath: resolvedExe,
          args: PDF_LAUNCH_ARGS
        });
      }
      throw chanErr;
    }
  }

  if (exeExists) {
    return puppeteer.launch({
      headless: true,
      executablePath: resolvedExe,
      args: PDF_LAUNCH_ARGS
    });
  }

  return puppeteer.launch({
    headless: true,
    channel: 'chrome',
    args: PDF_LAUNCH_ARGS
  });
}

export async function GET(request) {
  let browser;

  try {
    // Get the base URL from the request
    const protocol = request.headers.get('x-forwarded-proto') || 'http';
    const host = request.headers.get('host');
    const baseUrl = (
      process.env.NEXT_PUBLIC_BASE_URL || `${protocol}://${host}`
    ).replace(/\/+$/, '');

    const resolvedExe = executablePath();
    const exeExists = fs.existsSync(resolvedExe);
    const envExe = process.env.PUPPETEER_EXECUTABLE_PATH;
    const envExeOk = Boolean(envExe && fs.existsSync(envExe));

    browser = await launchPuppeteerForPdf(
      resolvedExe,
      exeExists,
      envExe,
      envExeOk
    );

    const page = await browser.newPage();

    // Navigate to your CV page
    await page.goto(`${baseUrl}/print-view`, {
      waitUntil: 'networkidle0',
      timeout: 30000
    });

    // Wait for fonts to load
    await page.evaluateHandle('document.fonts.ready');
    await new Promise(resolve => setTimeout(resolve, 500));

    // Generate PDF from Puppeteer
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '10mm',
        bottom: '10mm',
        left: '10mm',
        right: '10mm'
      },
      preferCSSPageSize: false,
      tagged: true
    });

    await browser.close();

    // Load PDF with pdf-lib to add metadata
    const pdfDoc = await PDFDocument.load(pdfBuffer);

    // Set comprehensive metadata for ATS compliance
    pdfDoc.setTitle(`${content.name} - Curriculum Vitae`);
    pdfDoc.setAuthor(content.name);
    pdfDoc.setSubject(`Curriculum Vitae - ${content.title}`);

    // Create keywords from title and common CV terms
    const keywords = [
      'CV',
      'Resume',
      'Curriculum Vitae',
      content.name,
      ...content.title.split('|').map(s => s.trim())
    ];
    pdfDoc.setKeywords(keywords);

    pdfDoc.setProducer('Puppeteer + pdf-lib');
    pdfDoc.setCreator('Next.js CV Generator');
    pdfDoc.setCreationDate(new Date());
    pdfDoc.setModificationDate(new Date());

    // Save the PDF with embedded metadata
    const pdfWithMetadata = await pdfDoc.save();

    // Create filename
    const sanitizedName = content.name
      .replace(/\s+/g, '_')
      .replace(/[^a-zA-Z0-9_-]/g, '');
    const filename = `${sanitizedName}_CV.pdf`;

    // Return PDF
    return new NextResponse(pdfWithMetadata, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`
      }
    });
  } catch (error) {
    console.error('PDF generation error:', error);

    if (browser) {
      await browser.close();
    }

    return NextResponse.json(
      { error: 'Failed to generate PDF', details: error.message },
      { status: 500 }
    );
  }
}
