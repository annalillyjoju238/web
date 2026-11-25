from flask import Flask, render_template, request, redirect
import sqlite3

app = Flask(__name__)

# Create employee table
def create_table():
    con = sqlite3.connect("employee.db")
    con.execute("""
        CREATE TABLE IF NOT EXISTS employees (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            department TEXT,
            salary REAL
        )
    """)
    con.commit()
    con.close()

# Display and search employees
@app.route("/")
def index():
    search = request.args.get("search", "")

    con = sqlite3.connect("employee.db")
    employees = con.execute("""
        SELECT * FROM employees
        WHERE name LIKE ? OR CAST(id AS TEXT) LIKE ?
    """, ('%' + search + '%', '%' + search + '%')).fetchall()

    con.close()
    return render_template("index.html", employees=employees)

# Add employee
@app.route("/add", methods=["POST"])
def add():
    name = request.form["name"]
    department = request.form["department"]
    salary = request.form["salary"]

    con = sqlite3.connect("employee.db")
    con.execute(
        "INSERT INTO employees (name, department, salary) VALUES (?, ?, ?)",
        (name, department, salary)
    )
    con.commit()
    con.close()

    return redirect("/")

# Update employee
@app.route("/edit/<int:id>", methods=["GET", "POST"])
def edit(id):
    con = sqlite3.connect("employee.db")

    if request.method == "POST":
        name = request.form["name"]
        department = request.form["department"]
        salary = request.form["salary"]

        con.execute("""
            UPDATE employees
            SET name=?, department=?, salary=?
            WHERE id=?
        """, (name, department, salary, id))

        con.commit()
        con.close()
        return redirect("/")

    employee = con.execute(
        "SELECT * FROM employees WHERE id=?", (id,)
    ).fetchone()

    con.close()
    return render_template("edit.html", employee=employee)

# Delete employee
@app.route("/delete/<int:id>", methods=["POST"])
def delete(id):
    con = sqlite3.connect("employee.db")
    con.execute("DELETE FROM employees WHERE id=?", (id,))
    con.commit()
    con.close()

    return redirect("/")

if __name__ == "__main__":
    create_table()
    app.run(debug=True)