dayjs.locale("es");
// Graficos

let charts = {};

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

// Cantidades de productos vendidos

function productQuantities(salesArray) {
  let quantities = {};

  salesArray.forEach((sale) => {
    if (quantities[sale.productSold]) {
      quantities[sale.productSold] += sale.quantity;
    } else {
      quantities[sale.productSold] = sale.quantity;
    }
  });

  return quantities;
}

// Gráfico de ventas

function salesChart(chartID, productQties) {
  let canvas = document.getElementById(`${chartID}-chart`);
  if (!canvas) {
    canvas = document.createElement("canvas");
    canvas.id = `${chartID}-chart`;
  }

  let ctx = canvas.getContext("2d");

  let labels = Object.keys(productQties);
  let data = Object.values(productQties);

  if (charts[chartID]) {
    charts[chartID].data.labels = labels;
    charts[chartID].data.datasets[0].data = data;
    charts[chartID].update();
  } else {
    charts[chartID] = new Chart(ctx, {
      type: "pie",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Unidades vendidas",
            data: data,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
              "rgba(100, 149, 237, 0.2)",
              "rgba(240, 128, 128, 0.2)",
              "rgba(154, 205, 50, 0.2)",
              "rgba(255, 20, 147, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
              "rgba(100, 149, 237, 1)",
              "rgba(240, 128, 128, 1)",
              "rgba(154, 205, 50, 1)",
              "rgba(255, 20, 147, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            labels: {
              boxWidth: 10,
              padding: 10,
              textAlign: "left",
              font: {
                size: 9,
              },
            },
            position: "bottom",
          },
          tooltip: {
            enabled: true,
            bodyFont: {
              size: 9,
            },
          },
        },
      },
    });
  }
  return canvas;
}

// Producto más vendido del mes

function mostSoldProduct(salesArray) {
  let monthSales = monthlySales(salesArray);

  let quantities = productQuantities(monthSales);

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

  let quantities = productQuantities(monthSales);

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
    homeNode.appendChild(resumeContent);
    return;
  }

  let lastWeek = dayjs().subtract(7, "day");
  let lastYear = dayjs().subtract(1, "year");
  let monthSales = monthlySales(sales);
  let mostSold = mostSoldProduct(sales);
  resumeContent.innerHTML = `
  <div>
        <h3>Ventas de la última semana:</h3>
        <p> $${totalSales(
          sales.filter((sale) => dayjs(sale.date).isAfter(lastWeek))
        )}</p>
    </div>
    <div>
        <h3>Ventas del último mes:</h3>
        <p> $${totalSales(monthSales)}</p>
    </div>
    <div>
        <h3>Promedio diario de ventas en el último mes:</h3> 
        <p>$${dailyAverage(sales)}</p>
    </div>
    <div>
        <h3>Producto más vendido del mes:</h3> 
        <p>Este ha sido el producto más demandado el último mes:<br>${
          mostSold.name
        }</p>
        <p>¡Se vendieron ${mostSold.quantity} unidades!</p>
    </div>
    <div>
        <h3>Ventas del último año:</h3>
        <p> $${totalSales(
          sales.filter((sale) => dayjs(sale.date).isAfter(lastYear))
        )}</p>
    </div>
    <div>
        <h3>Ventas totales:</h3>
        <p> ${sales.length}</p>
    </div>
    <div>
        <h3>Monto total de ventas:</h3>
        <p> $${totalSales(sales)}</p>
    </div>
    
  `;
  homeNode.appendChild(resumeContent);
}

// Reportes

function showReports() {
  if (sales.length === 0) {
    reportsContent.innerHTML = "<h3>No tenés ventas registradas</h3>";
    reportsNode.appendChild(reportsContent);
    return;
  }

  let lessSold = lessSoldProduct(sales);
  let featured = featuredSale(sales);

  let totalSalesChart = salesChart("total-sales", productQuantities(sales));

  reportsContent.innerHTML = `
    
    <div class="featured-reports">
        
        <div>
            <h3>Producto menos vendido del mes:</h3> 
            <p>Este ha sido el producto menos demandado el último mes:<br>${
              lessSold.name
            }</p>
            <p>Se vendieron solo ${lessSold.quantity} unidades</p>
        </div>
         <div>
            <h3>Venta destacada del mes:</h3> 
            <p> 
                El ${dayjs(featured.date).format("DD [de] MMMM [de] YYYY")}
                vendiste a un mismo cliente ${featured.quantity} 
                unidades de ${featured.productSold} 
                por $${featured.transactionValue} <br>
                ¡Felicidades!
            </p>
        </div>
        
    </div>
  `;
  let div = document.createElement("div");
  div.className = "chart-container";
  div.appendChild(totalSalesChart);
  reportsContent.insertBefore(div, reportsContent.firstChild);
  reportsNode.appendChild(reportsContent);
}

// Nodos

let resumeContent = document.createElement("section");
resumeContent.className = "grid-container resume-container";
let reportsContent = document.createElement("section");
reportsContent.className = "grid-container reports-container";
