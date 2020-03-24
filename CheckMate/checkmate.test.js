// const chrome = require("selenium-webdriver/chrome");
const { Builder, By, until } = require("selenium-webdriver");
const assert = require("assert");

// const screen = {
//   width: 1900,
//   height: 800
// }

const driver = new Builder()
  .forBrowser("chrome")
  // .setChromeOptions(new chrome.Options()
  //     .headless().windowSize(screen))
  .build();

describe("Checkmate Test", function() {
  it("should navigate to Scraper page and confirm that the page title is 'Scraper'", async function() {
    driver.get(
      "https://checkmate-frontend.us-east-1a.bosun.prod.bazaarvoice.com/scraper"
    );
    const title = await driver.findElement(By.xpath("//span[2]")).getText();
    assert.equal(title, "Scraper");
  });
  it("Should enter PDP URL", async function() {
    await driver
      .findElement(By.css(".FormRow:nth-child(1) .FormTextInput"))
      .sendKeys(
        "https://www.styltom.co.uk/collections/all-products/products/stylpro-easy-on-the-eye"
      );
  });
  it("Clicks Submit button", async function() {
    await driver.findElement(By.css(".Button")).click();
  });
  it("Checks whether the PDP details has been returned. Waiting limit 30s.", async function() {
    await driver.wait(
      until.elementLocated(By.css("div:nth-child(1) > h1")),
      30000
    );
  });
  it("checks Page info table is present", async function() {
    const pageInfo = await driver.findElements(
      By.css(".\\_Rfx5_ > div > div:nth-child(1)")
    );
    assert(pageInfo.length);
  });
  it("checks $BVConfigure table is present", async function() {
    const BVConfigure = await driver.findElements(
      By.css(".\\_Rfx5_ > div > div:nth-child(2)")
    );
    assert(BVConfigure.length);
  });
  it("checks BVRRContainer tableis present", async function() {
    const BVRRContainer = await driver.findElements(
      By.css(".\\_Rfx5_ > div > div:nth-child(3)")
    );
    assert(BVRRContainer.length);
  });
  it("checks SEO Sting is present table", async function() {
    const seoString = await driver.findElements(
      By.css(".\\_Rfx5_ > div > div:nth-child(3)")
    );
    assert(seoString.length);
  });
  it("checks BV Script is present table", async function() {
    const bvScript = await driver.findElements(
      By.css(".\\_Rfx5_ div:nth-child(5)")
    );
    assert(bvScript.length);
  });
});
