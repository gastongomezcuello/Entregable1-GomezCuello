// Variables
let products = [];
let joinedProducts;
let sales = [];
let productsAmount;
let defaultProducts = ["gorras", "sombreros", "camperas", "remeras"];



// Agregar un función para hacer mayúscula la primer letra de un string
function firstCharToUpperCase(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Función para agrupar productos en una lista
function joinProducts(productsList) {
  joinedProducts = productsList
    .map((product) => firstCharToUpperCase(product))
    .join("\n");
}

// Función para validar e ingresar números positivos
function validPositiveNumber(amount) {
    if (parseInt(amount) > 0) {
      console.log("Cantidad ingresada correctamente");
      return amount;
    } else if (isNaN(parseInt(amount))) {
      console.log(
        "El valor ingresado no es un número. Por favor ingresá solamente números."
      );
    } else {
      console.log("Debés ingresar un número positivo");
    }
  }


// Función para cargar productos
function chargeProducts(amount) {
  for (let i = 0; i < amount; i++) {
    let status;
    while (status != "ok") {
      let product;
      product = prompt(`Ingresá tu producto número ${i + 1} :`);
      if (product === null) {
        alert(
          "Proceso cancelado. Tu lista de productos será cargada por defecto."
        );
        console.log(
          "Proceso cancelado. Tu lista de productos será cargada por defecto."
        );
        return (products = defaultProducts);
      } else if (!isNaN(product) || product === "") {
        alert(
          "No se pudo cargar tu producto. Asegurate de no ingresar números ni dejar espacios en blanco"
        );
        console.log("Error al cargar nuevo producto.");
      } else {
        products.push(product.toLowerCase());
        status = "ok";
      }
    }
  }
}

// Función para registrar una venta
function salesRegister() {
  let product;
  while (!products.includes(product)) {
    product = prompt(
      `Escribí el producto que hayas vendido. Estos son los productos disponibles:\n${joinedProducts}`
    );
    if (product === null) {
      console.log(
        "Proceso de registro cancelado. Actualizá para volver a iniciar."
      );
      alert("Proceso de registro cancelado. Actualizá para volver a iniciar.");
      return;
    }
    if (products.includes(product.toLowerCase())) {
      console.log("Producto seleccionado correctamente.");
      product = product.toLowerCase();
    } else {
      console.log(
        "El producto seleccionado no se encuentra entre las opciones. Intenta nuevamente"
      );
      alert(
        "El producto seleccionado no se encuentra entre las opciones. Intenta nuevamente"
      );
    }
  }
  let amount = validPositiveNumber("Ingresá la cantidad que hayas vendido.");
  sales.push({ product, amount });
  console.log(`Venta registrada: ${amount} unidades de ${product}`);
  alert(
    `Venta registrada: ${amount} unidades de ${product} \n Continuá con el registro.`
  );
}







//Interactuando con el DOM

// Función myOnClick

function myOnClick(node, callback) {
  node.addEventListener("click", callback);
}

//Capturando nodos

let toggleButtonNode = document.getElementById("menu-toggle");
let sidebarNode = document.querySelector(".sidebar");
let resumeNode = document.getElementById("resume")
let salesNode = document.getElementById("sales")
let productsNode = document.getElementById("products")
let reportsNode = document.getElementById("reports")
let settingsNode = document.getElementById("settings")

console.log(resumeNode);
//Creando nodos

let resumeContent = document.createElement("section")
let salesContent = document.createElement("section")
let productsContent = document.createElement("section")
let reportsContent = document.createElement("section")
let settingsContent = document.createElement("section") // esta quizas no se usa 




//Renderizando resume
// Función para mostrar todas las ventas


function showSales() {
  if (sales.length === 0) {
    resumeContent.innerHTML = "<h3>No tienes ventas registradas el día de hoy</h3>"
    resumeNode.appendChild(resumeContent)
     return
  }
  resumeContent.innerHTML = `<h3>Hoy registraste ${sales.length} ventas</h3>`
  for (let sale of sales) {
    let saleInfo = document.createElement ("p")
    saleInfo.innerText = `${sale.amount} unidades de ${sale.product}`
    resumeContent.appendChild(saleInfo)
  }
  resumeNode.appendChild(resumeContent)
}



// resumeContent.innerHTML = `<h3>Ventas del día de hoy</h3>
//                            <p>${sales.length}</p> `

//Funciones

myOnClick(toggleButtonNode, ()=>{
  if (sidebarNode.className === "sidebar") {
    sidebarNode.className = "sidebar sidebar-active"
  }
  else {
    sidebarNode.className = "sidebar"
  }
})

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


