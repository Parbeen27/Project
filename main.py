# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

# Import firebase initialization (will raise if key missing)
import firebase  # ensures firebase initialized

from auth_router import router as auth_router

app = FastAPI(title="FastAPI + Firebase Auth Demo")

# Allow React app on localhost:3000 and 3001
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://k88w0rln-3000.inc1.devtunnels.ms"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)

@app.get("/")
def read_root():
    return {"message": "Backend running. Use /signup and /login"}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
