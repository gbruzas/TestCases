const { Builder, By, Key, until } = require("selenium-webdriver");
const assert = require("assert");
const addContext = require("mochawesome/addContext");

describe("UAS Generator", function() {
  this.timeout(30000);
  let driver;
  let vars;
  beforeEach(async function() {
    driver = await new Builder().forBrowser("chrome").build();
    await driver.manage().setTimeouts({ implicit: 15000 });
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
    await driver.findElement(By.id("maxage")).sendKeys("45");
    await driver.findElement(By.css(".Button:nth-child(3)")).click();
    await driver.findElement(By.css(".FormTextArea")).click();
    vars["UAS"] = await driver
      .findElement(By.css(".TextBlock:nth-child(2) > code"))
      .getText();
    await driver.findElement(By.css(".FormTextArea")).sendKeys(vars["UAS"]);
    await driver.findElement(By.css(".normal")).click();
    assert(
      (await driver.findElement(By.css(".success > .\\_Rfxe_")).getText()) ==
        "success!"
    );
    addContext(this, "UAS used in this test case:");
    addContext(this, vars["UAS"]);
  });
});
