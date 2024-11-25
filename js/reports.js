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
  console.log(sales);

  let lastWeek = dayjs().subtract(7, "day");
  let lastMonth = dayjs().subtract(1, "month");
  let lastYear = dayjs().subtract(1, "year");

  reportsContent.innerHTML = `
    <p>Ventas de la última semana: $${totalSales(
      sales.filter((sale) => dayjs(sale.date).isAfter(lastWeek))
    )}</p>
    <p>Ventas del último mes: $${totalSales(
      sales.filter((sale) => dayjs(sale.date).isAfter(lastMonth))
    )}</p>
    <p>Ventas del último año: $${totalSales(
      sales.filter((sale) => dayjs(sale.date).isAfter(lastYear))
    )}</p>
  `;
  reportsNode.appendChild(reportsContent);
}

// Nodos

let resumeContent = document.createElement("section");
let reportsContent = document.createElement("section");
