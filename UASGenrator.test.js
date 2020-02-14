const { Builder, By, Key, until } = require("selenium-webdriver");
describe("UAS Generator", function() {
  this.timeout(30000);
  let driver;
  let vars;
  beforeEach(async function() {
    driver = await new Builder().forBrowser("chrome").build();
    await driver.manage().setTimeouts({ implicit: 30000 });
    vars = {};
  });
  afterEach(async function() {});
  it("generates and Validates User Auth String", async function() {
    await driver.get(
      "https://cstools.flynn-qa-us-east-1.nexus.bazaarvoice.com/"
    );
    await driver.findElement(By.linkText("UAS Generator")).click();
    await driver.findElement(By.css("input")).click();
    await driver.findElement(By.css("input")).sendKeys("TestCustomer");
    await driver.findElement(By.css(".Button")).click();
    await driver.findElement(By.xpath("//input[@value='']")).click();
    await driver.findElement(By.xpath("//div[5]/div[7]")).click();
    await driver.findElement(By.id("userid")).click();
    await driver.findElement(By.id("userid")).sendKeys("TestID");
    await driver.findElement(By.id("email")).click();
    await driver.findElement(By.id("email")).sendKeys("email@adress.com");
    await driver.findElement(By.id("username")).click();
    await driver.findElement(By.id("username")).sendKeys("NameUser");
    await driver.findElement(By.id("maxage")).click();
    await driver.findElement(By.id("maxage")).sendKeys("33");
    await driver.findElement(By.xpath("(//button[@type='button'])[2]")).click();
    await driver.findElement(By.css(".FormTextArea")).click();
    vars["UAS"] = await driver
      .findElement(By.css(".TextBlock:nth-child(2) > code"))
      .getText();
    await driver.findElement(By.css(".FormTextArea")).sendKeys(vars["UAS"]);
    await driver.findElement(By.css(".normal")).click();
    (await driver.findElement(By.css(".success > .\\_Rfxe_")).getText()) ===
      "success!";
  });

  // it("opens Feed Manager Lite", async function() {
  //   await driver.get(
  //     "https://cstools.flynn-qa-us-east-1.nexus.bazaarvoice.com/"
  //   );
  //   await driver.findElement(By.linkText("Feed Manager Lite")).click();
  // });
});
