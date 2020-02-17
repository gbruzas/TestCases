const { Builder, By, Key, until } = require("selenium-webdriver");
const assert = require("assert");

describe("EscapeTool", function() {
  this.timeout(30000);
  let driver;
  let vars;
  beforeEach(async function() {
    driver = await new Builder().forBrowser("chrome").build();
    vars = {};
  });
  afterEach(async function() {
    await driver.quit();
  });
  it("EscapeTool", async function() {
    await driver.get(
      "https://cstools.flynn-qa-us-east-1.nexus.bazaarvoice.com/"
    );
    await driver.findElement(By.css(".Burger")).click();
    await driver.findElement(By.linkText("Escape Tool")).click();
    await driver.findElement(By.id("inputArea")).click();
    await driver
      .findElement(By.id("inputArea"))
      .sendKeys("ども ありがと ｍｒ。 ろぼと");
    await driver.findElement(By.id("escape")).click();
    assert(
      (await driver.findElement(By.id("outputArea")).getText()) ==
        "\\\\u3069\\\\u3082 \\\\u3042\\\\u308A\\\\u304C\\\\u3068 \\\\uFF4D\\\\uFF52\\\\u3002 \\\\u308D\\\\u307C\\\\u3068"
    );
    await driver
      .findElement(By.id("inputArea"))
      .sendKeys("7365637265742068657861646563696d616c20656e636f64696e67");
    await driver.findElement(By.id("hex2ascii")).click();
    await driver.findElement(By.id("outputArea")).click();
    assert(
      (await driver.findElement(By.id("outputArea")).getText()) ==
        "secret hexadecimal encoding"
    );
  });
});
