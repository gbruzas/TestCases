const { Builder, By, Key, until } = require("selenium-webdriver");
const assert = require("assert");
const fs = require("fs");
const addContext = require("mochawesome/addContext");

const driver = new Builder().forBrowser("chrome").build();

describe("EscapeTool", function() {
  it("Goes to CS tools", async function() {
    await driver.get(
      "https://cstools.flynn-qa-us-east-1.nexus.bazaarvoice.com/"
    );
  });
  it("Selects Escape tool from the menu:", async function() {
    await driver.findElement(By.css(".Burger")).click();
    await driver.findElement(By.linkText("Escape Tool")).click();
  });
  it("Enter keys'ども ありがと ｍｒ。ろぼと'", async function() {
    await driver
      .findElement(By.id("inputArea"))
      .sendKeys("ども ありがと ｍｒ。 ろぼと");
    await driver.findElement(By.id("escape")).click();
  });
  it('verifies the output is equal: "\\u3069\\u3082 \\u3042\\u308A\\u304C\\u3068 \\uFF4D\\uFF52\\u3002 \\u308D\\u307C\\u3068"', async function() {
    assert(
      (await driver.findElement(By.id("outputArea")).getText()) ==
        "\\u3069\\u3082 \\u3042\\u308A\\u304C\\u3068 \\uFF4D\\uFF52\\u3002 \\u308D\\u307C\\u3068"
    );
    await driver.takeScreenshot().then(function(data) {
      fs.writeFileSync("img.png", data, "base64");
    });
    addContext(
      this,
      "/Users/gediminas.bruzas/Documents/TestCases/Escape_Tool/img.png"
    );
  });
  it("Escapes from: 7365637265742068657861646563696d616c20656e636f64696e67", async function() {
    await driver.get(
      "https://cstools.flynn-qa-us-east-1.nexus.bazaarvoice.com/"
    );
    await driver.findElement(By.css(".Burger")).click();
    await driver.findElement(By.linkText("Escape Tool")).click();
    await driver.findElement(By.id("inputArea")).click();
    await driver
      .findElement(By.id("inputArea"))
      .sendKeys("7365637265742068657861646563696d616c20656e636f64696e67");
    await driver.findElement(By.id("hex2ascii")).click();
    assert(
      (await driver.findElement(By.id("outputArea")).getText()) ==
        "secret hexadecimal encoding"
    );
  });
});
