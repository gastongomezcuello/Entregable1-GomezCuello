// Validar que el número sea positivo

function validPositiveNumber(amount) {
  if (parseInt(amount) > 0) {
    return parseInt(amount);
  } else if (isNaN(parseInt(amount))) {
    return "El valor ingresado no es un número. Por favor, ingresá solamente números.";
  } else {
    return "El valor ingresado no es válido. Por favor, ingresá un número positivo.";
  }
}

// Registrar una venta

async function salesRegister(productName, saleAmount, date) {
  try {
    let products = await getProducts();
    let product = products.find(
      (product) => product.name.toLowerCase() === productName.toLowerCase()
    );
    if (!product) {
      return "El producto no se encuentra en la lista. No me hackees la página.";
    }

    let amount = validPositiveNumber(saleAmount);
    if (typeof amount === "string") {
      return amount;
    }

    if (!date) {
      return "Por favor, ingresá una fecha válida.";
    }

    let transactionValue = product.price * amount;

    let sale = {
      productSold: product.name,
      quantity: amount,
      transactionValue: transactionValue,
      date: dayjs(date).toISOString(),
    };

    sales.push(sale);
    newRow(sale);

    localStorage.setItem("sales", JSON.stringify(sales));
    return "Has registrado una venta.";
  } catch (err) {
    return err;
  }
}

// Agrergar una fila a la tabla de ventas

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
  deleteButton.innerText = "Eliminar";

  deleteButton.onclick = () => {
    sales = sales.filter((saleToDel) => saleToDel !== sale);
    row.remove();
    showSales();
    showReports();

    localStorage.setItem("sales", JSON.stringify(sales));
  };

  deleteColumn.appendChild(deleteButton);
  row.appendChild(deleteColumn);

  tableBody.insertBefore(row, tableBody.firstChild);

  if (tableBody.children.length > 14) {
    tableBody.lastChild.remove();
  }
}

// Limpiar el localStorage

function clearLocalStorage() {
  localStorage.clear();
  sales = [];
  tableBody.innerHTML = "";
  showSales();
}

// Nodos

let salesRegisterNode = document.getElementById("sales-register");
let quantityInputNode = document.getElementById("quantity-input");
let dateInputNode = document.getElementById("date-input");
let addSale = document.getElementById("add-sale");
let tableBody = document.getElementById("sales-table").querySelector("tbody");
let clearSalesNode = document.getElementById("clear-sales");

// Eventos

addSale.onclick = async () => {
  let previousMessage = document.querySelector("h4");
  if (previousMessage) {
    previousMessage.remove();
  }

  let res = await salesRegister(
    productSelectorNode.value,
    quantityInputNode.value,
    dateInputNode.value
  );

  let message = document.createElement("h4");
  message.innerText = res;
  salesRegisterNode.appendChild(message);
  showSales();
  showReports();
};

clearSalesNode.onclick = clearLocalStorage;
