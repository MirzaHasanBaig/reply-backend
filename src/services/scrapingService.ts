const puppeteer  = require("puppeteer")
const { logger }  = require("../utils/logger")

export const scrapeWebsite = async (url, selectors[]) => {
  try {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(url)

    const scrapedData: any = {}

    for (const selector of selectors) {
      scrapedData[selector] = await page.$eval(selector, (el) => el.textContent)
    }

    await browser.close()

    logger.info(`Scraped website: ${url}`)
    return scrapedData
  } catch (error) {
    logger.error(`Error scraping website: ${error}`)
    throw error
  }
}

export const scrapeSocialMedia = async (platform, profileUrl) => {
  // Implement platform-specific scraping logic
  // This is a placeholder implementation
  try {
    const data = await scrapeWebsite(profileUrl, ["h1", ".bio", ".followers"])
    logger.info(`Scraped ${platform} profile: ${profileUrl}`)
    return data
  } catch (error) {
    logger.error(`Error scraping ${platform} profile: ${error}`)
    throw error
  }
}

