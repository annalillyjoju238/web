// Registration validation
document.getElementById("registerForm").onsubmit = function(e) {
    e.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let valid = true;

    document.getElementById("nameError").innerHTML = "";
    document.getElementById("emailError").innerHTML = "";
    document.getElementById("passwordError").innerHTML = "";

    if (name == "") {
        document.getElementById("nameError").innerHTML = "Name is required";
        valid = false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        document.getElementById("emailError").innerHTML = "Enter valid email";
        valid = false;
    }

    if (password.length < 8) {
        document.getElementById("passwordError").innerHTML =
            "Password must contain at least 8 characters";
        valid = false;
    }

    if (valid) {
        alert("Registration successful!");
    }
};

// Login validation
document.getElementById("loginForm").onsubmit = function(e) {
    e.preventDefault();

    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;

    document.getElementById("loginEmailError").innerHTML = "";
    document.getElementById("loginPasswordError").innerHTML = "";

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        document.getElementById("loginEmailError").innerHTML =
            "Enter valid email";
    }

    if (password.trim() == "") {
        document.getElementById("loginPasswordError").innerHTML =
            "Password is required";
    }
};