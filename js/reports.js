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
    resumeContent.innerHTML =
      "<h3>No tienes ventas registradas el día de hoy</h3>";
    resumeNode.appendChild(resumeContent);
    return;
  }

  resumeContent.innerHTML = `
    <h3>Resumen de ventas</h3>
    <p>Ventas registradas: ${sales.length}</p>
    <p>Monto total: $${totalSales(sales)}</p>
  `;
  resumeNode.appendChild(resumeContent);
}

// Nodos

let resumeContent = document.createElement("section");
