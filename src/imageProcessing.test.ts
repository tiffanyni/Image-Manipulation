import assert from "node:assert";
import { COLORS, Image } from "../include/image.js";
import { flipColors, removeRed } from "./imageProcessing.js";
import { mapLine, imageMap, mapToGB, mapFlipColors } from "./imageProcessing.js";

describe("removeRed", () => {
  const whiteImage = Image.create(10, 10, COLORS.WHITE);
  const gbImage = removeRed(whiteImage);

  it("should remove red from the upper left corner", () => {
    const p = gbImage.getPixel(0, 0);

    assert(p[0] === 0, "The red channel should be 0.");
    assert(p[1] === 255, "The green channel should be 255.");
    assert(p[2] === 255, "The blue channel should be 255.");

    // or alternatively, using jest, if you'd like
    // https://jestjs.io/docs/expect#toequalvalue
    // Use expect with .toEqual to compare recursively all properties of object instances (also known as "deep" equality).

    expect(p).toEqual([0, 255, 255]);

    // This will produce output showing the exact differences between the two objects, which is really helpful
    // for debugging. However, again, please use the simpler assert syntax if this is too confusing.
    // Focus on making your tests well written and correct, rather than using one syntax or another.
  });

  it("should remove red from the center", () => {
    const p = gbImage.getPixel(5, 5);

    assert(p[0] === 0, "The red channel should be 0.");
    assert(p[1] === 255, "The green channel should be 255.");
    assert(p[2] === 255, "The blue channel should be 255.");
  });

  // More tests for removeRed go here.
  it("should remove red from the upper right corner", () => {
    const p = gbImage.getPixel(9, 0);
    assert(p[0] === 0, "The red channel should be 0.");
    assert(p[1] === 255, "The green channel should be 255.");
    assert(p[2] === 255, "The blue channel should be 255.");
  });

  it("should remove red from the lower left corner", () => {
    const p = gbImage.getPixel(0, 9);
    assert(p[0] === 0, "The red channel should be 0.");
    assert(p[1] === 255, "The green channel should be 255.");
    assert(p[2] === 255, "The blue channel should be 255.");
  });

  it("should remove red from the lower right corner", () => {
    const p = gbImage.getPixel(9, 9);
    assert(p[0] === 0, "The red channel should be 0.");
    assert(p[1] === 255, "The green channel should be 255.");
    assert(p[2] === 255, "The blue channel should be 255.");
  });

  it("should remove red from top left corner of dog image", () => {
    const dogImage = Image.loadImageFromGallery("dog");
    const prevCornerPixel = dogImage.getPixel(0, 0);
    const alteredDogImage = removeRed(dogImage);
    const alteredCornerPixel = alteredDogImage.getPixel(0, 0);

    assert(alteredCornerPixel[0] === 0);
    assert(alteredCornerPixel[1] === prevCornerPixel[1]);
    assert(alteredCornerPixel[2] === prevCornerPixel[2]);
  });
});

describe("flipColors", () => {
  // A white image is not particularly helpful in this context
  const whiteImage = Image.create(10, 10, COLORS.WHITE);
  whiteImage.setPixel(0, 0, [100, 0, 150]);

  it("should correctly flip top left corner", () => {
    const flippedWhiteImage = flipColors(whiteImage);
    const p = flippedWhiteImage.getPixel(0, 0);

    assert(p[0] === 75);
    assert(p[1] === 125);
    assert(p[2] === 50);
  });

  // More tests for flipColors go here.
  whiteImage.setPixel(9, 0, [250, 200, 80]);
  it("should correctly flip top right corner", () => {
    const flippedWhiteImage = flipColors(whiteImage);
    const p = flippedWhiteImage.getPixel(9, 0);

    assert(p[0] === 140);
    assert(p[1] === 165);
    assert(p[2] === 225);
  });
});

describe("mapLine", () => {
  // Tests for mapLine go here.
  const whiteImage = Image.create(10, 10, COLORS.WHITE);

  it("line 1 should become black", () => {
    mapLine(whiteImage, 1, () => [0, 0, 0]);
    const p = whiteImage.getPixel(0, 1);
    assert(p[0] === 0);
    assert(p[1] === 0);
    assert(p[2] === 0);

    const q = whiteImage.getPixel(5, 1);
    assert(q[0] === 0);
    assert(q[1] === 0);
    assert(q[2] === 0);
  });

  it("line 2 should remain white", () => {
    mapLine(whiteImage, 1, () => [0, 0, 0]);
    const r = whiteImage.getPixel(5, 2);
    assert(r[0] === 255);
    assert(r[1] === 255);
    assert(r[2] === 255);
  });

  it("line 8 should become the specified color", () => {
    mapLine(whiteImage, 8, () => [100, 50, 200]);
    const p = whiteImage.getPixel(2, 8);
    assert(p[0] === 100);
    assert(p[1] === 50);
    assert(p[2] === 200);

    const q = whiteImage.getPixel(5, 8);
    assert(q[0] === 100);
    assert(q[1] === 50);
    assert(q[2] === 200);
  });

  it("mapline should not modify anything because line number is out of bounds", () => {
    mapLine(whiteImage, -1, () => [100, 100, 100]);
    const p = whiteImage.getPixel(5, 5);
    assert(p[0] === 255);
    assert(p[1] === 255);
    assert(p[2] === 255);

    const q = whiteImage.getPixel(0, 0);
    assert(q[0] === 255);
    assert(q[1] === 255);
    assert(q[2] === 255);
  });

  it("mapline should not modify anything because line number not a valid integer", () => {
    mapLine(whiteImage, 0.5, () => [100, 100, 100]);
    const p = whiteImage.getPixel(5, 5);
    assert(p[0] === 255);
    assert(p[1] === 255);
    assert(p[2] === 255);

    const q = whiteImage.getPixel(0, 0);
    assert(q[0] === 255);
    assert(q[1] === 255);
    assert(q[2] === 255);
  });
});

describe("imageMap", () => {
  // Tests for imageMap go here.
  const whiteImage = Image.create(10, 10, COLORS.WHITE);
  //image should turn red completely
  const redImage = imageMap(whiteImage, () => [255, 0, 0]);

  it("top left corner should be red", () => {
    const p = redImage.getPixel(0, 0);
    assert(p[0] === 255);
    assert(p[1] === 0);
    assert(p[2] === 0);
  });

  it("top right corner should be red", () => {
    const p = redImage.getPixel(9, 0);
    assert(p[0] === 255);
    assert(p[1] === 0);
    assert(p[2] === 0);
  });

  it("center should be red", () => {
    const p = redImage.getPixel(5, 5);
    assert(p[0] === 255);
    assert(p[1] === 0);
    assert(p[2] === 0);
  });

  it("bottom left corner should be red", () => {
    const p = redImage.getPixel(0, 9);
    assert(p[0] === 255);
    assert(p[1] === 0);
    assert(p[2] === 0);
  });

  it("bottom right corner should be red", () => {
    const p = redImage.getPixel(9, 9);
    assert(p[0] === 255);
    assert(p[1] === 0);
    assert(p[2] === 0);
  });
});

describe("mapToGB", () => {
  // Tests for mapToGB go here.
  const whiteImage = Image.create(10, 10, COLORS.WHITE);
  const gbImage = mapToGB(whiteImage);

  it("should remove red from the top left corner", () => {
    const p = gbImage.getPixel(0, 0);
    assert(p[0] === 0);
    assert(p[1] === 255);
    assert(p[2] === 255);
  });

  it("should remove red from the top right corner", () => {
    const p = gbImage.getPixel(9, 0);
    assert(p[0] === 0);
    assert(p[1] === 255);
    assert(p[2] === 255);
  });

  it("should remove red from the center", () => {
    const p = gbImage.getPixel(5, 5);
    assert(p[0] === 0);
    assert(p[1] === 255);
    assert(p[2] === 255);
  });
});

describe("mapFlipColors", () => {
  // Tests for mapFlipColors go here.
  const whiteImage = Image.create(10, 10, COLORS.WHITE);

  whiteImage.setPixel(5, 5, [100, 200, 30]);
  const mapFlippedImage = mapFlipColors(whiteImage);
  it("should flip the colors", () => {
    const p = mapFlippedImage.getPixel(5, 5);
    assert(p[0] === 115);
    assert(p[1] === 65);
    assert(p[2] === 150);
  });

  it("the white pixel should stay the same", () => {
    const p = mapFlippedImage.getPixel(0, 0);
    assert(p[0] === 255);
    assert(p[1] === 255);
    assert(p[2] === 255);
  });
});
