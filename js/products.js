// Traer los productos de la base de datos

async function getProducts() {
  try {
    let res = await fetch("./db/products.json");
    let data = await res.json();
    return data;
  } catch (err) {
    return err;
  }
}

// Seleccionar los productos

async function productsSelector() {
  let products = await getProducts();
  products.forEach((element) => {
    let option = document.createElement("option");
    option.innerText = element.name;
    productSelectorNode.appendChild(option);
  });
}

// Mostrar los productos

async function showProducts() {
  let products = await getProducts();

  products.forEach((element) => {
    let div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
    <div class="product-info">
      <h4>${element.name}</h4>
      <p>${element.description}</p>
      <p>Precio sugerido: $${element.price}</p>
    </div>
    `;
    ProductsContainer.appendChild(div);
  });
  productsNode.appendChild(ProductsContainer);
}

// Nodos

let productSelectorNode = document.getElementById("product-selector");
let ProductsContainer = document.createElement("section");
ProductsContainer.className = "grid-container products-container";
