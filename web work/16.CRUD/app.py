from flask import Flask, render_template, request, redirect
import sqlite3

app = Flask(__name__)

# Create database table
def create_table():
    con = sqlite3.connect("students.db")
    con.execute("""
        CREATE TABLE IF NOT EXISTS students (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT
        )
    """)
    con.commit()
    con.close()

# Read records
@app.route("/")
def index():
    con = sqlite3.connect("students.db")
    students = con.execute("SELECT * FROM students").fetchall()
    con.close()
    return render_template("index.html", students=students)

# Add record
@app.route("/add", methods=["POST"])
def add():
    name = request.form["name"]
    email = request.form["email"]

    con = sqlite3.connect("students.db")
    con.execute("INSERT INTO students (name, email) VALUES (?, ?)",
                (name, email))
    con.commit()
    con.close()

    return redirect("/")

# Update record
@app.route("/edit/<int:id>", methods=["GET", "POST"])
def edit(id):
    con = sqlite3.connect("students.db")

    if request.method == "POST":
        name = request.form["name"]
        email = request.form["email"]

        con.execute("UPDATE students SET name=?, email=? WHERE id=?",
                    (name, email, id))
        con.commit()
        con.close()
        return redirect("/")

    student = con.execute(
        "SELECT * FROM students WHERE id=?", (id,)
    ).fetchone()

    con.close()
    return render_template("edit.html", student=student)

# Delete record
@app.route("/delete/<int:id>", methods=["POST"])
def delete(id):
    con = sqlite3.connect("students.db")
    con.execute("DELETE FROM students WHERE id=?", (id,))
    con.commit()
    con.close()

    return redirect("/")

if __name__ == "__main__":
    create_table()
    app.run(debug=True)