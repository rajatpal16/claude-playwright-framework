# Playwright Automation Framework — UI, API & CI/CD

A complete TypeScript test automation framework built with Playwright, covering UI testing, API testing, authentication, network interception, and a full CI/CD pipeline with automated public reporting.

**Live test report:** https://rajatpal16.github.io/claude-playwright-framework/

## What this project covers

- **UI Automation** — Page Object Model architecture across 4 page classes (Login, Inventory, Cart, Checkout), testing a full e-commerce flow: login, cart management, sorting, and checkout
- **API Testing** — GET/POST requests, access-token authentication flows, and both positive and negative (401) test cases
- **Authentication** — `storageState`-based session reuse to avoid redundant UI logins across the suite
- **Network Interception & Mocking** — using `page.route()` to simulate API responses and validate real application behavior, including reverse-engineered mock matching against actual frontend logic
- **Event Synchronization** — `waitForResponse` and dialog-event handling for reliable, non-flaky async test flows
- **CI/CD** — GitHub Actions pipeline that runs the full suite on every push and automatically publishes the HTML report to GitHub Pages

## Tech Stack

- Playwright + TypeScript
- GitHub Actions (CI/CD)
- GitHub Pages (automated report publishing)

## Project Structure

\`\`\`
tests/
  saucedemo.spec.ts       # UI test suite (login, cart, checkout, sort)
  auth.setup.ts           # Authentication setup (runs before all tests)
  api/
    user.spec.ts          # API tests (GET/POST, access tokens)
  network/
    networkHandling.spec.ts  # waitForResponse, dialog handling, interception
pages/
  LoginPage.ts
  InventoryPage.ts
  CartPage.ts
  CheckoutPage.ts
playwright.config.ts
.github/workflows/playwright.yml
\`\`\`

## Running locally

\`\`\`bash
npm install
npx playwright install
npx playwright test
npx playwright show-report
\`\`\`

## Notable engineering decisions

- Chose `waitForEvent('dialog')` over a fire-and-forget `page.on('dialog', ...)` listener after diagnosing a CI-only flaky test caused by an async timing race condition
- Verified network mock payloads against the target application's actual JavaScript source (via browser DevTools) rather than assuming a plausible-looking response shape would trigger the correct UI behavior
