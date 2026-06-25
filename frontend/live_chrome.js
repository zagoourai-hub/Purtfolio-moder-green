const { chromium } = require('@playwright/test');

async function main() {
  console.log('Launching interactive Chrome (headless: false)...');
  const browser = await chromium.launch({ 
    headless: false,
    slowMo: 100
  });
  
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  
  console.log('Navigating to http://localhost/login...');
  // Use 'load' instead of 'networkidle' to avoid HMR websocket timeout issues
  await page.goto('http://localhost/login', { waitUntil: 'load', timeout: 30000 });
  
  console.log('Filling login credentials...');
  await page.fill('input[type="email"]', 'admin@porto.com');
  await page.fill('input[type="password"]', 'password123');
  
  await page.waitForTimeout(1000);
  console.log('Submitting login form...');
  await page.click('button[type="submit"]');
  
  console.log('Waiting for redirect to dashboard...');
  await page.waitForURL('**/dashboard', { timeout: 15000 });
  
  console.log('Dashboard loaded successfully! Keeping Chrome open for 45 seconds for your inspection...');
  await page.waitForTimeout(45000);
  
  console.log('Closing browser.');
  await browser.close();
}

main().catch(err => {
  console.error('Error running live chrome test:', err);
  process.exit(1);
});
