import { COLORS, Image } from "../include/image.js";
//added Color manually
//import type { Color } from "../include/image.js";
import { removeRed, flipColors, mapLine, imageMap, mapToGB, mapFlipColors } from "./imageProcessing.js";

const randomImage = Image.loadImageFromGallery();
const randomImage2 = Image.loadImageFromGallery();
const pencilsImage = Image.loadImageFromGallery("pencils");
const dogImage = Image.loadImageFromGallery("dog");

//creates an image with red stripes 
const imgWithRedLines = Image.create(100, 100, COLORS.WHITE);
for (let x = 0; x < imgWithRedLines.width; ++x) {
  for (let y = 0; y < imgWithRedLines.height; y += 10) {
    imgWithRedLines.setPixel(x, y, COLORS.RED);
  }
}
imgWithRedLines.show();


//removes the red from an image 
const newRandomImage2 = removeRed(randomImage2);
newRandomImage2.show();

//flips the color (take the average of the other 2 colors)
const newPencils = flipColors(pencilsImage);
newPencils.show();

 
//tests mapLine function suppling a function that returns the color white 
mapLine(dogImage, 100, () => COLORS.WHITE);
dogImage.show();


//tests mapToGB
mapToGB(imgWithRedLines).show();

//tests mapFlipColors
mapFlipColors(imgWithRedLines).show(); 
