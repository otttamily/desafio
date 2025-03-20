const urlParams = new URLSearchParams(window.location.search);
const pedidoId = parseInt(urlParams.get("id"));

const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];

const pedido = pedidos.find(p => p.id === pedidoId);

if (pedido) {
    document.getElementById("product").value = pedido.produto;
    document.getElementById("code").value = pedido.codigo;
    document.getElementById("amount").value = pedido.quantidade;
    document.getElementById("value").value = pedido.valor.toFixed(2);
    document.getElementById("tax").value = pedido.taxa.toFixed(2);
    document.getElementById("total").value = pedido.total.toFixed(2);
    document.getElementById("purchasevalue").value = pedido.total.toFixed(2);
} else {
    alert("Pedido não encontrado!");
}