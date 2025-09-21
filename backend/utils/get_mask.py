import numpy as np
import cv2

def get_mask(img_rgb, threshold=40):
    """
    Takes in the original image and the annotated mask.
    Computes a new mask using region growing only inside of the annotated mask.
    """
    try:
      # get the grayscale version of the original image
      img_gray = cv2.cvtColor(img_rgb, cv2.COLOR_RGB2GRAY)
      # find the darkest reagion in the entrie image (starting point for region growing)
      seed = np.unravel_index(np.argmin(img_gray), img_gray.shape)
      # get the shape of the image
      h, w = img_gray.shape
      # create an image of all zeros
      mask = np.zeros((h, w), dtype=bool)
      region_pixels = []
      # initialize the stack with only the seed
      stack = [seed]
      # the continouelsy updated mean intensity of the images added to the mask
      region_mean = float(img_gray[seed])
      count = 1

      mask[seed] = True
      region_pixels.append(seed)

      # we always check each of the 4 neighbors
      neighbors = [(-1, 0), (1,0), (0,-1), (0,1)]

      # while the stack is not empty, continue region growing
      while len(stack) > 0:
          (x, y) = stack[-1] # get the last pixel added to the stack (current pixel)
          stack.pop() # remove the current pixel from the stack

          # iterate over all neighbors of the current pixel
          for (dx, dy) in neighbors:
              nx = x + dx # calculate neighbor's x-coordinate
              ny = y + dy # calculate neighbor's y-coordinate

              # check if the neighbor is within image bounds and not already in the mask
              if (0 <= nx <= h-1) and (0 <= ny <= w-1) and (mask[nx, ny] == 0):
                  pixel_val = float(img_gray[nx, ny]) # get the grayscale value of the neighbor pixel

                  # check if the neighbor's intensity is close to the seed pixel's intensity
                  if abs(pixel_val - float(img_gray[seed])) <= threshold:
                      mask[nx, ny] = True # add neighbor to the mask
                      stack.append((nx, ny)) # add neighbor to the stack for further processing
                      region_pixels.append((nx, ny)) # add neighbor to the list of region pixels

                      region_mean = (region_mean * count + pixel_val) / (count + 1) # update the mean intensity of the region
                      count += 1 # increment the count of pixels in the region

      if mask.sum() < 5: # fallback if the size of the mask is less than 5 pixels
        raise RuntimeError("size is less than 5 pixels")
      else:
          return mask # return the region growing mask
    except Exception as e:
      raise RuntimeError(f"Error computing mask: {e}") from e