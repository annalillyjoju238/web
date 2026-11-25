let products = [
    {name: "Laptop", price: 50000, category: "Electronics"},
    {name: "Mobile", price: 20000, category: "Electronics"},
    {name: "Shirt", price: 500, category: "Clothing"},
    {name: "Jeans", price: 1000, category: "Clothing"}
];

function displayProducts() {
    let search = document.getElementById("search").value.toLowerCase();
    let category = document.getElementById("category").value;

    let result = products.filter(p =>
        p.name.toLowerCase().includes(search) &&
        (category == "All" || p.category == category)
    );

    let output = "";

    result.forEach(p => {
        output += `
            <div class="product">
                <h3>${p.name}</h3>
                <p>Price: Rs.${p.price}</p>
                <p>Category: ${p.category}</p>
            </div>
        `;
    });

    document.getElementById("products").innerHTML = output;
}

document.getElementById("search").addEventListener("input", displayProducts);
document.getElementById("category").addEventListener("change", displayProducts);

displayProducts();