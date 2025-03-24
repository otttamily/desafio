document.addEventListener("DOMContentLoaded", function () {
    carregarPedidos()
})

function carregarPedidos() {
    let pedidos = JSON.parse(localStorage.getItem("pedidos")) || []
    let tbody = document.querySelector(".t_fil tbody")

    tbody.innerHTML = ""

    pedidos.forEach((pedido) => {
        let linha = `
            <tr>
                <td class="t1 br">${pedido.codigo}</td>
                <td class="t2 br">$${pedido.taxa}</td>
                <td class="t3 br">$${pedido.total}</td>
                <td class="t4">
                    <a href="detail.html?pedido=${pedido.codigo}">
                        <button>View</button>
                    </a>
                </td>
            </tr>
        `
        tbody.innerHTML += linha
    })

    tbody.innerHTML += `
        <tr class="bb">
            <td class="alt br"></td>
            <td class="alt br"></td>
            <td class="alt br"></td>
            <td class="alt"></td>
        </tr>
    `
}
