import os
import cv2
import numpy as np
import pandas as pd

# import all utils
from backend.utils import *
    
def get_ABC(image_file):
  try: 
    # load the image
    img_rgb, img_gray = readImageFile(image_file)
    # apply the hair removal function with the optimal parameters found through cohens kappa
    blackhat, tresh, img_hairless = remove_hair(img_rgb, img_gray, kernel_size=5, threshold=10, radius=3)
    # use the original image and the annotated mask to compute our own region growing mask
    img_mask = get_mask(img_hairless)
    # fallback if the img_mask could not be compute and therefore it's all black
    if np.sum(img_mask) == 0:
        return
    # COMPUTE ABC FEATURES:
    A = get_feature_A(img_mask) # get asymmetry
    B = get_feature_B(img_mask) # get border
    C = get_feature_C(img_hairless, img_mask) # get color

    # return the ABC features
    yield img_hairless, img_mask, A, B, C

  # throw an exception if an error ocurred
  except Exception as e:
      print(f"Error with image: {os.path.basename(image_file)}. Error is {e}")


def readImageFile(file_path):
    """
    helper function to read the files
    """
    # read image as an 8-bit array
    img_bgr = cv2.imread(file_path)
    # convert to RGB
    img_rgb = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2RGB)
    # convert the original image to grayscale
    img_gray = cv2.cvtColor(img_rgb, cv2.COLOR_RGB2GRAY)

    return img_rgb, img_gray