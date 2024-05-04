# Image-Manipulation

Any image you see on your computer screen consists of tiny square dots known as pixels. Pixels are arranged in a grid and each pixel has x and y coordinates that identify its position in the grid. All coordinates are non-negative integers and the top-left corner has the coordinates (0, 0). Therefore, the x-coordinate increases as you move right and the y-coordinate increases as you move down.


Finally, every pixel has a color that is represented using the three primary colors (i.e., red, green, and blue). Therefore, to set the color of a pixel, you have to specify how much red, green, and blue to use. Each of these primary colors has an integer intensity between 0 and 255 (inclusive). For example, to get a black pixel, we can set the intensity of the three primary colors to 0, thus the black pixel value is [0, 0, 0], and to get a white pixel we can set the intensity of the three primary colors to 255, thus the white color pixel value is [255, 255, 255].

In this project, I used a very simple image manipulation library that enables you to load images from a gallery, set the color of each pixel, and read the color of each pixel. These are the only primitive functions you need to build sophisticated image processing functions.
