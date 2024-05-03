import type { Color, Image } from "../include/image.js";

/**
 * Removes all red color from an image
 * @param img An image
 * @returns A new image where each pixel has the red channel removed
 */
export function removeRed(img: Image): Image {
  const copy = img.copy();
  const coordinates = copy.coordinates();
  for (let i = 0; i < coordinates.length; ++i) {
    //gets the color at the specified pixel
    const prevColor = copy.getPixel(coordinates[i][0], coordinates[i][1]);
    copy.setPixel(coordinates[i][0], coordinates[i][1], [0, prevColor[1], prevColor[2]]);
  }
  return copy;
}

/**
 * Flips the colors of an image
 * @param img An image
 * @returns A new image where each pixel's channel has been
 *  set as the truncated average of the other two
 */
export function flipColors(img: Image): Image {
  const copy = img.copy();
  const coordinates = copy.coordinates();
  for (let i = 0; i < coordinates.length; ++i) {
    const prevColor = copy.getPixel(coordinates[i][0], coordinates[i][1]);
    const avgRed = Math.trunc((prevColor[1] + prevColor[2]) / 2);
    const avgGreen = Math.trunc((prevColor[0] + prevColor[2]) / 2);
    const avgBlue = Math.trunc((prevColor[0] + prevColor[1]) / 2);
    copy.setPixel(coordinates[i][0], coordinates[i][1], [avgRed, avgGreen, avgBlue]);
  }
  return copy;
}

/**
 * Modifies the given `img` such that the value of each pixel
 * in the given line is the result of applying `func` to the
 * corresponding pixel of `img`. If `lineNo` is not a valid line
 * number, then `img` should not be modified.
 * @param img An image
 * @param lineNo A line number
 * @param func A color transformation function
 */
export function mapLine(img: Image, lineNo: number, func: (c: Color) => Color): void {
  if (lineNo >= img.height || lineNo < 0 || !Number.isInteger(lineNo)) {
    return;
  }

  for (let w = 0; w < img.width; ++w) {
    img.setPixel(w, lineNo, func(img.getPixel(w, lineNo)));
  }
  return;
}

/**
 * The result must be a new image with the same dimensions as `img`.
 * The value of each pixel in the new image should be the result of
 * applying `func` to the corresponding pixel of `img`.
 * @param img An image
 * @param func A color transformation function
 */
export function imageMap(img: Image, func: (c: Color) => Color): Image {
  const copy = img.copy();
  for (let i = 0; i < img.height; ++i) {
    mapLine(copy, i, func);
  }
  return copy;
}

/**
 * Removes all red color from an image
 * @param img An image
 * @returns A new image where each pixel has the red channel removed
 */
export function mapToGB(img: Image): Image {
  const newImage = imageMap(img, c => [0, c[1], c[2]]);
  return newImage;
}

/**
 * Flips the colors of an image
 * @param img An image
 * @returns A new image where each pixels channel has been
 *  set as the truncated average of the other two
 */
export function mapFlipColors(img: Image): Image {
  const newImage = imageMap(img, Color => [
    Math.trunc((Color[1] + Color[2]) / 2),
    Math.trunc((Color[0] + Color[2]) / 2),
    Math.trunc((Color[0] + Color[1]) / 2),
  ]);
  return newImage;
}
