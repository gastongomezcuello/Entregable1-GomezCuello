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
      return "El producto no se encuentra en la lista. Por favor, seleccioná un producto válido.";
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
    newTable(sales);

    localStorage.setItem("sales", JSON.stringify(sales));
    return "Has registrado una venta.";
  } catch (err) {
    return err;
  }
}

// Tabla de ventas

function newTable(salesArray) {
  tableBody.innerHTML = "";
  salesArray.forEach((sale) => {
    newRow(sale);
  });
}

function newRow(sale) {
  let row = document.createElement("tr");

  let date = document.createElement("td");
  date.innerText = dayjs(sale.date).format("DD/MM/YY");
  row.appendChild(date);

  let product = document.createElement("td");
  product.innerText = sale.productSold;
  row.appendChild(product);

  let quantity = document.createElement("td");
  quantity.innerText = sale.quantity;
  row.appendChild(quantity);

  let value = document.createElement("td");
  value.innerText = `$${sale.transactionValue}`;
  row.appendChild(value);

  let deleteColumn = document.createElement("td");
  let deleteButton = document.createElement("button");
  deleteButton.innerText = "Eliminar";

  deleteButton.onclick = () => {
    confirmAlert(() => {
      sales = sales.filter((saleToDel) => saleToDel !== sale);
      row.remove();

      localStorage.setItem("sales", JSON.stringify(sales));
      showSales();
      showReports();

      return "Venta eliminada con éxito.";
    });
  };

  deleteColumn.appendChild(deleteButton);
  row.appendChild(deleteColumn);

  tableBody.insertBefore(row, tableBody.firstChild);

  if (tableBody.children.length > 14) {
    tableBody.lastChild.remove();
  }
}

// Filtrar ventas

function filterSales(from, to, product, graterThan, lessThan) {
  let filterDefaults = {
    from: "1900-01-01",
    to: "9999-12-31",
    product: "Todos los productos",
    graterThan: 0,
    lessThan: 999999999,
  };

  from = from || filterDefaults.from;
  to = to || filterDefaults.to;
  product = product || filterDefaults.product;
  graterThan = graterThan || filterDefaults.graterThan;
  lessThan = lessThan || filterDefaults.lessThan;

  if (from > to) {
    return {
      filteredSales: sales,
      message: "La fecha de inicio no puede ser mayor a la fecha de fin.",
    };
  }
  if (graterThan > lessThan) {
    return {
      filteredSales: sales,
      message: "'Monto mayor a' no puede ser menor que 'Monto menor a'.",
    };
  }

  let filteredSales = sales.filter((sale) => {
    let saleDate = dayjs(sale.date);
    let fromDate = dayjs(from);
    let toDate = dayjs(to).endOf("day");

    if (product === "Todos los productos") {
      return (
        saleDate.isAfter(fromDate) &&
        saleDate.isBefore(toDate) &&
        sale.transactionValue >= graterThan &&
        sale.transactionValue <= lessThan
      );
    } else {
      return (
        saleDate.isAfter(fromDate) &&
        saleDate.isBefore(toDate) &&
        sale.productSold === product &&
        sale.transactionValue > graterThan &&
        sale.transactionValue < lessThan
      );
    }
  });

  if (filteredSales.length === 0) {
    return {
      filteredSales: sales,
      message: "No se encontraron ventas con los filtros aplicados.",
    };
  }
  return {
    filteredSales,
    message: "Filtros aplicados con éxito.",
  };
}

// Alerta de confirmación

function confirmAlert(callback) {
  Swal.fire({
    title: "¿Estás seguro?",
    text: "No podrás revertir esta acción!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, eliminar!",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Desapareció!",
        text: callback(),
        icon: "success",
      });
    }
  });
}

// Limpiar el localStorage

function clearLocalStorage() {
  localStorage.clear();
  sales = [];
  tableBody.innerHTML = "";
  showSales();
  showReports();
  return "Listado de ventas limpio con éxito.";
}

// Nodos

let salesHistoryNode = document.getElementById("sales-history");

let salesFormNode = document.getElementById("sales-form");

let addProductSelectorNode = document.getElementById("product-selector-add");
let quantityInputNode = document.getElementById("quantity-input");
let dateInputNode = document.getElementById("date-input");
let addSaleButton = document.getElementById("add-sale");

let tableBody = document.getElementById("sales-table").querySelector("tbody");
let clearSalesNode = document.getElementById("clear-sales");

let buttonsContainer = document.getElementById("buttons-container");

let filterSalesButton = document.getElementById("filter-sales");
let filterFromNode = document.getElementById("from-date");
let filterToNode = document.getElementById("to-date");
let filterProductSelectorNode = document.getElementById(
  "product-selector-filter"
);
let filterGTNode = document.getElementById("greater-than");
let filterLTNode = document.getElementById("less-than");
// Eventos

filterSalesButton.onclick = () => {
  let previousMessage = document.querySelector(".filter-message");
  if (previousMessage) {
    previousMessage.remove();
  }

  let res = filterSales(
    filterFromNode.value,
    filterToNode.value,
    filterProductSelectorNode.value,
    filterGTNode.value,
    filterLTNode.value
  );
  let message = document.createElement("h4");
  message.className = "filter-message";
  message.innerText = res.message;

  salesHistoryNode.insertBefore(message, buttonsContainer);

  newTable(res.filteredSales);
};

addSaleButton.onclick = async () => {
  let previousMessage = document.querySelector(".register-message");
  if (previousMessage) {
    previousMessage.remove();
  }

  let res = await salesRegister(
    addProductSelectorNode.value,
    quantityInputNode.value,
    dateInputNode.value
  );

  let message = document.createElement("h4");
  message.className = "register-message";
  message.innerText = res;
  salesFormNode.insertBefore(message, addSaleButton);
  showSales();
  showReports();
};

clearSalesNode.onclick = () => confirmAlert(() => clearLocalStorage());
