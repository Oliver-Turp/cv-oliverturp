// app/api/print/route.js
import puppeteer from 'puppeteer';
import { NextResponse } from 'next/server';
import { PDFDocument } from 'pdf-lib';
import { content } from '../../../cv/content';

export async function GET(request) {
  let browser;

  try {
    // Get the base URL from the request
    const protocol = request.headers.get('x-forwarded-proto') || 'http';
    const host = request.headers.get('host');
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || `${protocol}://${host}`;

    // Launch browser
    browser = await puppeteer.launch({
      headless: 'new',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu'
      ]
    });

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