from flask import Flask, render_template, request
import sqlite3

app = Flask(__name__)

# Create database table
def create_table():
    con = sqlite3.connect("contact.db")
    con.execute("""CREATE TABLE IF NOT EXISTS contacts
                (name TEXT, email TEXT, message TEXT)""")
    con.close()

@app.route("/", methods=["GET", "POST"])
def contact():
    if request.method == "POST":
        name = request.form["name"]
        email = request.form["email"]
        message = request.form["message"]

        con = sqlite3.connect("contact.db")
        con.execute("INSERT INTO contacts VALUES (?, ?, ?)",
                    (name, email, message))
        con.commit()
        con.close()

        return "Message submitted successfully!"

    return render_template("index.html")

if __name__ == "__main__":
    create_table()
    app.run(debug=True)