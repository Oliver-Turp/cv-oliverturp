// app/api/print/route.js
import puppeteer from 'puppeteer';
import { NextResponse } from 'next/server';
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

    // Wait for fonts to load (modern approach)
    await page.evaluateHandle('document.fonts.ready');
    
    // Give it a tiny bit more time for any final rendering
    await new Promise(resolve => setTimeout(resolve, 500));

    // Generate PDF
    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '10mm',
        bottom: '10mm',
        left: '10mm',
        right: '10mm'
      },
      preferCSSPageSize: false
    });

    await browser.close();

    // Create filename from name (replace spaces with underscores, remove special chars)
    const sanitizedName = content.name
      .replace(/\s+/g, '_')
      .replace(/[^a-zA-Z0-9_-]/g, '');
    const filename = `${sanitizedName}_CV.pdf`;

    // Return PDF
    return new NextResponse(pdf, {
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