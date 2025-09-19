from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import os

app = FastAPI(title='Melanoma Detection API')

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://my-frontend-domain.com"],
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)


@app.post("/process")
async def process_image(file: UploadFile = File(...)):
  print(file)
  return JSONResponse(content={"result": 0.02})