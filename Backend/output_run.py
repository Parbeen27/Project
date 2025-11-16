from firebase import get_db_root

# Connect to Firebase
db = get_db_root()

# 1️⃣ Check all users
print("=== Users ===")
users = db.child("users").get()  # returns dict
if users:  # check if dict is not empty
    for uid, udata in users.items():
        print(f"User ID: {uid}, Data: {udata}")
else:
    print("No users found.")

# 2️⃣ Check all favorites
print("\n=== Favorites ===")
favorites = db.child("favorites").get()  # returns dict
if favorites:
    for uid, favs in favorites.items():
        print(f"User ID: {uid}, Favorites: {favs}")
else:
    print("No favorites found.")
