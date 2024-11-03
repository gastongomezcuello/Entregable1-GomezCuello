// Variables
let products = [];
let joinedProducts;
let sales = [];
let productsAmount;
let defaultProducts = ["gorras", "sombreros", "camperas", "remeras"];

// Función myOnClick

function myOnClick(node, callback) {
  node.addEventListener("click", callback);
}

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
function validPositiveNumber(promptMessage) {
  let amount = 0;
  while (amount <= 0 || isNaN(amount)) {
    amount = parseInt(
      prompt(
        `${promptMessage}\n(para correcto llamado a funciones no podrás cancelar este proceso, disculpá las molestias).`
      )
    );
    if (amount > 0) {
      console.log("Cantidad ingresada correctamente");
      return amount;
    } else if (isNaN(amount)) {
      console.log(
        "El valor ingresado no es un número. Por favor ingresá solamente números."
      );
      alert(
        "El valor ingresado no es un número. Por favor ingresá solamente números.\n(para correcto llamado a funciones no podrás cancelar este proceso, disculpá las molestias)."
      );
    } else {
      console.log("Debés ingresar un número positivo");
      alert("Debés ingresar un número positivo");
    }
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

// Función para preguntar al usuario si quiere registrar un producto
function askForRegister() {
  let startRegister;
  do {
    startRegister = prompt("¿Querés registrar una venta? (SI/NO)", "SI");
    if (startRegister === null) {
      console.log(
        "Proceso de registro cancelado. Actualizá para volver a iniciar"
      );
      alert("Proceso de registro cancelado. Actualizá para volver a iniciar");
      return;
    }
    startRegister = startRegister.toUpperCase();

    if (startRegister === "SI") {
      salesRegister();
    } else if (startRegister === "NO") {
      console.log("Terminaste el proceso de registro");
      alert("Terminaste el proceso de registro");
    } else {
      console.log("Ingresá una opción válida");
      alert("Ingresá una opción válida");
    }
  } while (startRegister !== "NO");
}

// Función para mostrar todas las ventas
function showSales() {
  if (sales.length === 0) {
    console.log("No hay ventas registradas.");
    alert("No hay ventas registradas");
    return;
  }

  console.log("Ventas registradas el día de hoy:");
  for (let sale of sales) {
    console.log(`${sale.amount} unidades de ${sale.product}`);
  }
  alert(
    `Registraste ${sales.length} ventas.\nPodés actualizar la página para volver a empezar`
  );
}

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
