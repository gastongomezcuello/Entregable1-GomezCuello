dayjs.locale("es");

// Cargar ventas del localStorage

function loadSales() {
  let salesStorage = localStorage.getItem("sales");
  if (salesStorage) {
    sales = JSON.parse(salesStorage);
    sales.forEach((sale) => {
      newRow(sale);
    });
  }
}

// Monto total de ventas

function totalSales(salesArray) {
  return salesArray.reduce((acc, sale) => acc + sale.transactionValue, 0);
}

// Ventas del mes

function monthlySales(salesArray) {
  let lastMonth = dayjs().subtract(1, "month");
  return salesArray.filter((sale) => dayjs(sale.date).isAfter(lastMonth));
}

// Producto más vendido del mes

function mostSoldProduct(salesArray) {
  let monthSales = monthlySales(salesArray);

  let quantities = {};

  monthSales.forEach((sale) => {
    if (quantities[sale.productSold]) {
      quantities[sale.productSold] += sale.quantity;
    } else {
      quantities[sale.productSold] = sale.quantity;
    }
  });

  let mostSold = {
    name: "",
    quantity: 0,
  };

  for (let product in quantities) {
    if (quantities[product] > mostSold.quantity) {
      mostSold.name = product;
      mostSold.quantity = quantities[product];
    }
  }

  return mostSold;
}

// Producto menos vendido del mes

function lessSoldProduct(salesArray) {
  let monthSales = monthlySales(salesArray);

  let quantities = {};

  monthSales.forEach((sale) => {
    if (quantities[sale.productSold]) {
      quantities[sale.productSold] += sale.quantity;
    } else {
      quantities[sale.productSold] = sale.quantity;
    }
  });

  let lessSold = {
    name: "",
    quantity: Infinity,
  };

  for (let product in quantities) {
    if (quantities[product] < lessSold.quantity) {
      lessSold.name = product;
      lessSold.quantity = quantities[product];
    }
  }

  return lessSold;
}

// Venta destacada del mes

function featuredSale(salesArray) {
  let monthSales = monthlySales(salesArray);

  let featured = monthSales.reduce((prev, current) =>
    prev.transactionValue > current.transactionValue ? prev : current
  );

  return featured;
}

// Promedio diario de ventas del mes

function dailyAverage(salesArray) {
  let monthSales = monthlySales(salesArray);
  let days = dayjs().daysInMonth();
  return (totalSales(monthSales) / days).toFixed(2);
}

// Mostrar resumen de ventas

function showSales() {
  if (sales.length === 0) {
    resumeContent.innerHTML = "<h3>No tenés ventas registradas</h3>";
    resumeNode.appendChild(resumeContent);
    return;
  }

  resumeContent.innerHTML = `
    <p>Ventas registradas: ${sales.length}</p>
    <p>Monto total: $${totalSales(sales)}</p>
  `;
  resumeNode.appendChild(resumeContent);
}

// Reportes: semanal, mensual, anual

function showReports() {
  if (sales.length === 0) {
    reportsContent.innerHTML = "<h3>No tenés ventas registradas</h3>";
    reportsNode.appendChild(reportsContent);
    return;
  }

  let lastWeek = dayjs().subtract(7, "day");
  let lastYear = dayjs().subtract(1, "year");
  let monthSales = monthlySales(sales);
  let mostSold = mostSoldProduct(sales);
  let lessSold = lessSoldProduct(sales);
  let featured = featuredSale(sales);

  reportsContent.innerHTML = `
    <div class="reports">
        <p>Ventas de la última semana: $${totalSales(
          sales.filter((sale) => dayjs(sale.date).isAfter(lastWeek))
        )}</p>
        <p>Ventas del último mes: $${totalSales(monthSales)}</p>
        <p>Ventas del último año: $${totalSales(
          sales.filter((sale) => dayjs(sale.date).isAfter(lastYear))
        )}</p>
    </div>
    <div class="featured-reports">
        <div>
            <h3>Producto más vendido del mes:</h3> 
            <p>Este ha sido el producto mas demandado el ùltimo mes:<br>${
              mostSold.name
            }</p>
            <p>¡Se vendieron ${mostSold.quantity} unidades!</p>
        </div>
        <div>
            <h3>Producto menos vendido del mes:</h3> 
            <p>Este ha sido el producto menos demandado el ùltimo mes:<br>${
              lessSold.name
            }</p>
            <p>Se vendieron solo ${lessSold.quantity} unidades</p>
        </div>
        <h3>Venta destacada del mes:</h3> 
        <p> 
            El ${dayjs(featured.date).format("DD [de] MMMM [de] YYYY")}
            vendiste a un mismo cliente ${featured.quantity} 
            unidades de ${featured.productSold} 
            por $${featured.transactionValue} <br>
            ¡Felicidades!
        </p>
        <h3>Promedio diario de ventas en el ultimo mes:</h3> 
        <p>$${dailyAverage(sales)}</p>
    </div>
  `;
  reportsNode.appendChild(reportsContent);
}

// Nodos

let resumeContent = document.createElement("section");
let reportsContent = document.createElement("section");
