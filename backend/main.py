from fastapi import FastAPI, File, UploadFile, HTTPException, Request, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from slowapi.middleware import SlowAPIMiddleware
import asyncio
from contextlib import asynccontextmanager
from PIL import Image
from io import BytesIO
import os
from dotenv import load_dotenv
from backend.utils import get_ABC
import matplotlib.pyplot as plt
from backend.services.inference import predict_proba_from_features

limiter = Limiter(key_func=get_remote_address)
app = FastAPI(title='Melanoma Detection API')
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)
app.add_middleware(SlowAPIMiddleware)

app.add_middleware(
  CORSMiddleware,
  allow_origins=["http://localhost:3000", "https://my-frontend-domain.com"],
  allow_credentials=True,
  allow_methods=["GET", "POST"],
  allow_headers=["*"],
)

load_dotenv()

API_KEY = os.getenv("API_KEY")
async def verify_api_key(api_key: str = None):
  if not api_key or api_key != API_KEY:
    raise HTTPException(status_code=401, detail="Invalid API key")
  return True

import numpy as np
import matplotlib.pyplot as plt
import cv2

@app.post("/process")
@limiter.limit("3/minute")
@limiter.limit("20/hour")
async def process_image(request: Request, file: UploadFile = File(...), api_key_valid: bool = Depends(verify_api_key)):
  try:
    async with asyncio.timeout(30): # 30 sec to process image

      content = await file.read()

      nparr = np.frombuffer(content, np.uint8)
      img_bgr = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
      plt.imshow(img_bgr)

      # check size
      if len(content) > 5 * 1024 * 1024:
        raise HTTPException(status_code=400, detail="File is too large. Max size is 5 MB.")

      # check type
      if file.content_type not in ['image/jpeg', 'image/jpg', 'image/png']:
        raise HTTPException(status_code=400, detail='Only PNG, JPG and JPEG files allowed.')

      # check content is actually an image
      try:
        Image.open(BytesIO(content)).verify()
      except Exception:
        raise HTTPException(status_code=400, detail="Uploaded file is not a valid image.")
      
      print(f"Processing file: {file.filename}, size: {len(content)} bytes")

      img_hairless, img_mask, A, B, C = get_ABC(content)

      proba = predict_proba_from_features([A, B, C])

      # return JSONResponse(content={"result": proba, "img_hairless": img_hairless, "img_mask": img_mask})
      return JSONResponse(content={"result": float(proba)})
  except asyncio.TimeoutError:
     raise HTTPException(status_code=408, detail='Processing took too long. Please try again.')