const { chromium } = require('@playwright/test');

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  await page.route('**/*.{woff,woff2,ttf,otf}', route => route.abort());
  await page.route('**/*font*', route => route.abort());
  
  await page.setViewportSize({ width: 1440, height: 900 });
  
  console.log('Navigating to http://localhost...');
  await page.goto('http://localhost', { waitUntil: 'load' });
  
  // Scroll down to trigger all Framer Motion whileInView animations
  console.log('Scrolling down to trigger animations...');
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 100;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 30);
    });
  });

  // Wait for all elements to stabilize
  await page.waitForTimeout(2000);
  
  const screenshotPath = 'C:/Users/ZAGOOURS/.gemini/antigravity-cli/brain/bcf35d01-276a-4b1b-b9af-336935a0c688/current_landing.png';
  console.log(`Taking fullpage screenshot and saving to: ${screenshotPath}`);
  
  await page.screenshot({ 
    path: screenshotPath, 
    fullPage: true,
    animations: 'disabled',
    timeout: 8000
  });
  
  console.log('Screenshot taken successfully!');
  await browser.close();
}

main().catch(err => {
  console.error('Error taking screenshot:', err);
  process.exit(1);
});
