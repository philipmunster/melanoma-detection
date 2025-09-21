import requests
import time

url = "http://localhost:8000/process"
files = {"file": open("test_img.png", "rb")}  # Ensure test.txt exists

for i in range(5):
    response = requests.post(url, files=files)
    print(f"Request {i+1}: Status {response.status_code}")
    if response.status_code == 429:
        print("Rate limit hit!")
        break