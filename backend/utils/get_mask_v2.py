import numpy as np
import cv2

def get_mask_v2(img_rgb, kernel_size=3, opening_iter=2, dilation_iter=3, dt_thresh=0.5, largest_only=True):
    """
    Segment lesion with watershed and return a boolean mask.
    True = lesion region(s), False = background.
    If largest_only=True, keep only the largest connected lesion.
    """
    gray_img = cv2.cvtColor(img_rgb, cv2.COLOR_RGB2GRAY)

    # 1) Otsu threshold (invert: lesions are typically darker → become white foreground)
    _, thresh = cv2.threshold(gray_img, 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)

    # 2) Open to remove small noise
    kernel = np.ones((kernel_size, kernel_size), np.uint8)
    opening = cv2.morphologyEx(thresh, cv2.MORPH_OPEN, kernel, iterations=opening_iter)

    # 3) Sure background by dilation
    sure_bg = cv2.dilate(opening, kernel, iterations=dilation_iter)

    # 4) Sure foreground by distance transform + threshold
    dist_transform = cv2.distanceTransform(opening, cv2.DIST_L2, 5)
    _, sure_fg = cv2.threshold(dist_transform, dt_thresh * dist_transform.max(), 255, 0)
    sure_fg = np.uint8(sure_fg)

    # 5) Unknown = bg - fg
    unknown = cv2.subtract(sure_bg, sure_fg)

    # 6) Markers for watershed
    _, markers = cv2.connectedComponents(sure_fg)
    markers = markers + 1              # background starts at 1
    markers[unknown == 255] = 0        # unknown regions as 0

    # 7) Watershed (requires 3-channel image)
    img_color = cv2.cvtColor(gray_img, cv2.COLOR_GRAY2BGR)
    markers = cv2.watershed(img_color, markers)  # boundaries become -1

    # 8) Build boolean mask: labels > 1 are foreground regions (exclude boundary -1 and bg 1)
    mask = markers > 1

    if largest_only and mask.any():
        # keep only the largest connected component
        num, labels = cv2.connectedComponents(mask.astype(np.uint8))
        if num > 1:
            sizes = [(labels == i).sum() for i in range(1, num)]
            keep = 1 + int(np.argmax(sizes))
            mask = labels == keep

    return mask.astype(bool)