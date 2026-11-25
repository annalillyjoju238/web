from flask import Flask, render_template, request, redirect, session
import sqlite3
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.secret_key = "my_secret_key"

@app.route("/")
def index():
    return redirect("/register")

# Create database
def create_table():
    con = sqlite3.connect("users.db")
    con.execute("""CREATE TABLE IF NOT EXISTS users
                (username TEXT UNIQUE, password TEXT)""")
    con.close()

# Registration
@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        username = request.form["username"].strip()
        password = request.form["password"]

        if not username or len(password) < 8:
            return "Enter valid details and 8 character password"

        hashed = generate_password_hash(password)

        try:
            con = sqlite3.connect("users.db")
            con.execute("INSERT INTO users VALUES (?, ?)",
                        (username, hashed))
            con.commit()
            con.close()
            return redirect("/login")
        except sqlite3.IntegrityError:
            return "Username already exists"

    return render_template("register.html")

# Login
@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        username = request.form["username"].strip()
        password = request.form["password"]

        con = sqlite3.connect("users.db")
        user = con.execute(
            "SELECT * FROM users WHERE username = ?",
            (username,)
        ).fetchone()
        con.close()

        if user and check_password_hash(user[1], password):
            session["user"] = username
            return redirect("/home")

        return "Invalid username or password"

    return render_template("login.html")

# Home page
@app.route("/home")
def home():
    if "user" in session:
        return render_template("home.html",
                               username=session["user"])
    return redirect("/login")

# Logout
@app.route("/logout")
def logout():
    session.pop("user", None)
    return redirect("/login")

if __name__ == "__main__":
    create_table()
    app.run(debug=True)