let users = [];

async function loadUsers() {
    try {
        let response = await fetch(
            "https://jsonplaceholder.typicode.com/users"
        );

        users = await response.json();

    } catch (error) {
        document.getElementById("results").innerHTML =
            "Unable to load data";
    }
}

document.getElementById("search").addEventListener("input", function() {

    let value = this.value.toLowerCase();

    let result = users.filter(user =>
        user.name.toLowerCase().includes(value)
    );

    let output = "";

    result.forEach(user => {
        output += `<div class="item">${user.name}</div>`;
    });

    document.getElementById("results").innerHTML =
        output || "No results found";
});

loadUsers();