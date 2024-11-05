// Variables
let products = [];
let sales = [];
let defaultProducts = [
  {
    name: "gorras",
    price: 25,
  },
  {
    name: "sombreros",
    price: 30,
  },
  {
    name: "camperas",
    price: 50,
  },
  {
    name: "remeras",
    price: 20,
  },
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

// Función para registrar una venta
function salesRegister(productName, saleAmount) {
  let product = products.find((product) => product.name === productName);
  let amount = validPositiveNumber(saleAmount);
  let transactionValue;

  if (product == undefined) {
    return "El producto no se encuentra en la lista no me hackees la página";
  } else if (typeof amount == "string") {
    return amount;
  } else {
    transactionValue = product.price * amount;
    sales.push({
      productSold: product.name,
      quantity: amount,
      transactionValue: transactionValue,
    });
    return "Has registrado una venta";
  }
}

//Interactuando con el DOM

// Función myOnClick

function myOnClick(node, callback) {
  node.addEventListener("click", callback);
}

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

//Creando nodos

let resumeContent = document.createElement("section");
let salesContent = document.createElement("section");
let productsContent = document.createElement("section");
let reportsContent = document.createElement("section");
let settingsContent = document.createElement("section"); // esta quizas no se usa

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
  }
  resumeContent.innerHTML = `<h3>Hoy registraste ${sales.length} ventas</h3>`;

  resumeNode.appendChild(resumeContent);
}

//Ventas

//Productos

//Reportes

// resumeContent.innerHTML = `<h3>Ventas del día de hoy</h3>
//                            <p>${sales.length}</p> `

// Saludo al usuario y petición de cantidad de productos
alert(
  "Bienvenido al simulador de registro!\nAquí podrás cargar tus productos y registrar tus ventas de manera fácil y rápida."
);
productsAmount = validPositiveNumber(
  "Comencemos!\nIngresá el número de productos que quieres cargar a tu lista"
);

// Llamadas a las funciones
chargeProducts(productsAmount);
joinProducts(products);
askForRegister();
showSales();
