// Variables

let sales = [];
let products = [
  { id: 1, name: "gorras", price: 25 },
  { id: 2, name: "sombreros", price: 30 },
  { id: 3, name: "camperas", price: 50 },
  { id: 4, name: "remeras", price: 20 },
];

// Función para hacer mayúscula la primer letra de un string
function firstCharToUpperCase(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Función para validar números positivos
function validPositiveNumber(amount) {
  if (parseInt(amount) > 0) {
    return parseInt(amount);
  } else if (isNaN(parseInt(amount))) {
    return "El valor ingresado no es un número. Por favor ingresá solamente números.";
  } else {
    return "El valor ingresado no es válido. Por favor ingresá un número positivo.";
  }
}

// Función para calcular valor total

function totalSales(salesArray) {
  let total = [];
  salesArray.forEach((element) => {
    total.push(element.transactionValue);
  });
  return total.reduce((a, b) => a + b, 0);
}

//Interactuando con el DOM

//Capturando nodos

let toggleButtonNode = document.getElementById("menu-toggle");
let sidebarNode = document.querySelector(".sidebar");

let resumeNode = document.getElementById("resume");
let salesNode = document.getElementById("sales");
let productsNode = document.getElementById("products");
let reportsNode = document.getElementById("reports");
let settingsNode = document.getElementById("settings");

let resumeLinkNode = document.getElementById("resume-link");
let salesLinkNode = document.getElementById("sales-link");
let productsLinkNode = document.getElementById("products-link");
let reportsLinkNode = document.getElementById("reports-link");
let settingsLinkNode = document.getElementById("settings-link");

let productSelectorNode = document.getElementById("product-selector");
let quantityInputNode = document.getElementById("quantity-input");
let addSale = document.getElementById("add-sale");

let salesRegisterNode = document.getElementById("sales-register");
let tableBody = document.getElementById("sales-table").querySelector("tbody");
let clearSalesNode = document.getElementById("clear-sales");

//Creando nodos

let resumeContent = document.createElement("section");
let salesContent = document.createElement("section");
let productsContent = document.createElement("section");
let reportsContent = document.createElement("section");
let settingsContent = document.createElement("section"); // esta quizas no se usa

// Función myOnClick

function myOnClick(node, callback) {
  node.addEventListener("click", callback);
}

//Sidebar

function sidebarActive() {
  if (sidebarNode.className === "sidebar") {
    sidebarNode.className = "sidebar sidebar-active";
  } else {
    sidebarNode.className = "sidebar";
  }
}

myOnClick(toggleButtonNode, sidebarActive);
myOnClick(resumeLinkNode, sidebarActive);
myOnClick(salesLinkNode, sidebarActive);
myOnClick(productsLinkNode, sidebarActive);
myOnClick(reportsLinkNode, sidebarActive);
myOnClick(settingsLinkNode, sidebarActive);

//Resumen
// Función para mostrar todas las ventas

function showSales() {
  if (sales.length === 0) {
    resumeContent.innerHTML =
      "<h3>No tienes ventas registradas el día de hoy</h3>";
    resumeNode.appendChild(resumeContent);
    return;
  } else {
    resumeContent.innerHTML = `<h3>Hoy registraste ${sales.length} ventas</h3>
                               <h3>Monto total vendido:$${totalSales(sales)}`;

    resumeNode.appendChild(resumeContent);
  }
}

//Ventas
// Función para mostrar los productos en el selector

function productsSelector() {
  products.forEach((element) => {
    let options = document.createElement("option");
    options.innerText = firstCharToUpperCase(element.name);
    productSelectorNode.appendChild(options);
  });
}

// Funcion tabla de ventas
function newRow(sale) {
  let row = document.createElement("tr");

  let product = document.createElement("td");
  product.innerText = sale.productSold;
  row.appendChild(product);

  let quantity = document.createElement("td");
  quantity.innerText = sale.quantity;
  row.appendChild(quantity);

  let value = document.createElement("td");
  value.innerText = sale.transactionValue;
  row.appendChild(value);

  let deleteColumn = document.createElement("td");
  let deleteButton = document.createElement("button");
  deleteButton.innerText = "Eliminar"; // la idea es poner un icono de tachito

  deleteButton.onclick = () => {
    sales = sales.filter((s) => s !== sale);
    row.remove();
    showSales();

    localStorage.setItem("sales", JSON.stringify(sales));
  };

  deleteColumn.appendChild(deleteButton);
  row.appendChild(deleteColumn);

  tableBody.appendChild(row);
}

// Función para registrar una venta
function salesRegister(productName, saleAmount) {
  let product = products.find(
    (product) => product.name === productName.toLowerCase()
  );
  let amount = validPositiveNumber(saleAmount);
  let transactionValue;

  if (product == undefined) {
    return "El producto no se encuentra en la lista no me hackees la página";
  } else if (typeof amount == "string") {
    return amount;
  } else {
    transactionValue = product.price * amount;
    let sale = {
      productSold: product.name,
      quantity: amount,
      transactionValue: transactionValue,
    };
    sales.push(sale);
    newRow(sale);

    localStorage.setItem("sales", JSON.stringify(sales));
    return "Has registrado una venta";
  }
}

// onclick del botón de agregar venta
addSale.onclick = () => {
  let previousMessage = document.querySelector("h4");
  if (previousMessage) {
    previousMessage.remove();
  }
  let res = salesRegister(productSelectorNode.value, quantityInputNode.value);
  let message = document.createElement("h4");
  message.innerText = res;
  salesRegisterNode.appendChild(message);
  showSales();
};

// Borrar local Storage

function clearLocalStorage() {
  localStorage.clear();
  sales = [];
  tableBody.innerHTML = "";
  showSales();
}
clearSalesNode.onclick = clearLocalStorage;

//Productos

//Reportes

//Acceder al local storage
function loadSales() {
  let salesStorage = localStorage.getItem("sales");
  if (salesStorage) {
    sales = JSON.parse(salesStorage);
    sales.forEach((sale) => {
      newRow(sale);
    });
  }
}

// Llamadas a las funciones
loadSales();
productsSelector();
showSales();
