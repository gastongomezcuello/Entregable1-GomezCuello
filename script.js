// Declaración de variables y constantes
const products = ["tijeras", "mochilas", "cajas", "cañas"];
let sales = [];

//Agregar un método para hacer mayúscula la primer letra de un string
String.prototype.firstCharToUpperCase = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

// Función para registrar una venta
function salesRegister() {
  let product;
  while (!products.includes(product)) {
    product = prompt(
      `Ingrese el nombre del producto vendido:
      \n${products[0].firstCharToUpperCase()} 
      \n${products[1].firstCharToUpperCase()} 
      \n${products[2].firstCharToUpperCase()} 
      \n${products[3].firstCharToUpperCase()}`
    ).toLowerCase();
    if (product === null) {
      console.log(
        "Proceso de registro cancelado. Actualice para volver a iniciar"
      );
      return;
    }
    if (products.includes(product)) {
      console.log("Producto seleccionado correctamente");
    } else {
      console.log(
        "El producto seleccionado no se encuentra entre las opciones"
      );
      alert("El producto seleccionado no se encuentra entre las opciones");
    }
  }
  let amount = 0;
  while (amount < 1 || isNaN(amount)) {
    amount = parseInt(prompt("Ingrese la cantidad vendida:"));
    if (amount > 0) {
      console.log("Cantidad ingresada correctamente");
    } else if (isNaN(amount)) {
      console.log("El valor ingresado no es un numero");
      alert("El valor ingresado no es un numero");
    } else {
      console.log("Debes ingresar un número positivo");
      alert("Debes ingresar un número positivo");
    }
  }
  sales.push({ product, amount });
  console.log(`Venta registrada: ${amount} unidades de ${product}`);
  alert(
    `Venta registrada: ${amount} unidades de ${product} \n Continúa con el registro`
  );
}

// Función para preguntar al usuario si quiere registrar un producto
function askForRegister() {
  let start;
  do {
    start = prompt("¿Quiere registrar una venta? (SI/NO)", "SI");
    if (start === null) {
      console.log(
        "Proceso de registro cancelado. Actualice para volver a iniciar"
      );
      alert("Proceso de registro cancelado. Actualice para volver a iniciar");
      return;
    }
    start = start.toUpperCase();

    if (start === "SI") {
      salesRegister();
    } else if (start === "NO") {
      console.log("Terminaste el proceso de registro");
      alert("Terminaste el proceso de registro");
    } else {
      console.log("Ingrese una opción válida");
      alert("Ingrese una opción válida");
    }
  } while (start !== "NO");
}

// Función para mostrar todas las ventas
function showSales() {
  if (sales.length === 0) {
    console.log("No hay ventas registradas.");
    alert("No hay ventas registradas");
    return;
  }

  console.log("Ventas registradas el dia de hoy:");
  for (let sale of sales) {
    console.log(`${sale.amount} unidades de ${sale.product}`);
  }
  alert(
    `Registraste ${sales.length} ventas \n Puedes actualizar la pagina para volver a empezar`
  );
}

// Llamadas a las funciones (recordar que la funcion de registro se llama dentro de la funcion askForRegister)

askForRegister();
showSales();
