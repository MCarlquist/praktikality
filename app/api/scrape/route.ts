import axios from 'axios';
import * as cheerio from 'cheerio';

export interface ScrapedData {
  title: string | null;
  description: string | null;
  headers: string[];
  paragraphs: string[];
  links: string[];
  images: string[];
}

/**
 * Scrapes a website and extracts common data elements
 * @param companyUrl - The URL to scrape
 * @returns Scraped data including title, description, headers, paragraphs, links, and images
 */
export async function scrapeWebsite(companyUrl: string): Promise<ScrapedData> {
  try {
    // Fetch the webpage with axios
    const response = await axios.get(companyUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      timeout: 10000
    });

    // Load the HTML into cheerio
    const $ = cheerio.load(response.data);

    // Extract title
    const title = $('title').text() || $('h1').first().text() || null;

    // Extract meta description
    const description = $('meta[name="description"]').attr('content') || null;

    // Extract all headers
    const headers: string[] = [];
    $('h1, h2, h3, h4, h5, h6').each((_, element) => {
      const text = $(element).text().trim();
      if (text) headers.push(text);
    });

    // Extract all paragraphs
    const paragraphs: string[] = [];
    $('p').each((_, element) => {
      const text = $(element).text().trim();
      if (text) paragraphs.push(text);
    });

    // Extract all links
    const links: string[] = [];
    $('a').each((_, element) => {
      const href = $(element).attr('href');
      if (href && !href.startsWith('#')) {
        links.push(href);
      }
    });

    // Extract all image URLs
    const images: string[] = [];
    $('img').each((_, element) => {
      const src = $(element).attr('src');
      if (src) images.push(src);
    });

    return {
      title,
      description,
      headers,
      paragraphs,
      links,
      images
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to scrape ${companyUrl}: ${error.message}`);
    }
    throw error;
  }
}

// Example Next.js API route handler
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const companyUrl = searchParams.get('url');

    if (!companyUrl) {
      return Response.json(
        { error: 'Missing url parameter' },
        { status: 400 }
      );
    }

    const data = await scrapeWebsite(companyUrl);
    return Response.json(data);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return Response.json(
      { error: message },
      { status: 500 }
    );
  }
}
