# firebase.py
import firebase_admin
from firebase_admin import credentials, db
import os

KEY_PATH = os.path.join(os.path.dirname(__file__), "firebase_key.json")

if not os.path.exists(KEY_PATH):
    raise RuntimeError("Place your Firebase service account JSON at backend/firebase_key.json")

cred = credentials.Certificate(KEY_PATH)

# Replace with your project's Realtime DB URL
DATABASE_URL = "https://mini-535fb-default-rtdb.asia-southeast1.firebasedatabase.app"

if not firebase_admin._apps:
    firebase_admin.initialize_app(cred, {
        "databaseURL": DATABASE_URL
    })

def get_db_root():
    return db.reference("/")
