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

// async function showProducts() {
//   let products = await getProducts();
//   products.forEach((element) => {
//     let div = document.createElement("div");
//     div.className = "product";
//     div.innerHTML = `
//     <div class="product-info">
//       <h3>${element.name}</h3>
//       <p>${element.description}</p>
//       <p>$${element.price}</p>
//     </div>
//     `;
//     productsNode.appendChild(div);
//   });
// }

// Nodos

let productSelectorNode = document.getElementById("product-selector");
