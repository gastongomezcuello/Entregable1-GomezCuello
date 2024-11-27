// Variables

let sales = [];

// Función myOnClick

function myOnClick(node, callback) {
  node.addEventListener("click", callback);
}

// Nodos

let toggleButtonNode = document.getElementById("menu-toggle");
let sidebarNode = document.querySelector(".sidebar");

let homeNode = document.getElementById("home");
let salesNode = document.getElementById("sales");
let productsNode = document.getElementById("products");
let reportsNode = document.getElementById("reports");

let homeLinkNode = document.getElementById("home-link");
let salesLinkNode = document.getElementById("sales-link");
let productsLinkNode = document.getElementById("products-link");
let reportsLinkNode = document.getElementById("reports-link");

// Sidebar

function sidebarActive() {
  if (sidebarNode.className === "sidebar") {
    sidebarNode.className = "sidebar sidebar-active";
  } else {
    sidebarNode.className = "sidebar";
  }
}

myOnClick(toggleButtonNode, sidebarActive);
myOnClick(homeLinkNode, sidebarActive);
myOnClick(salesLinkNode, sidebarActive);
myOnClick(productsLinkNode, sidebarActive);
myOnClick(reportsLinkNode, sidebarActive);

// Llamadas a las funciones
loadSales();
productsSelectors();
showSales();
showProducts();
showReports();
