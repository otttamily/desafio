
document.addEventListener("DOMContentLoaded", function () {
    carregarProdutos()
})

function carregarProdutos() {
    let produtos = JSON.parse(localStorage.getItem("produtos")) || []
    let selectProduto = document.getElementById("produto")
    selectProduto.innerHTML = '<option value="produto" selected>Product</option>'

    produtos.forEach((produto) => {
        let option = document.createElement("option")
        option.value = produto.nome
        option.textContent = produto.nome
        selectProduto.appendChild(option)
    })
}

function adicionarProduto() {
    let nomeProduto = document.getElementById("produto").value
    let quantidade = parseInt(document.getElementById("amount").value)
    let precoUnitario = parseFloat(document.getElementById("unit").value)
    let taxa = parseFloat(document.getElementById("tax").value)

    if (!nomeProduto || quantidade <= 0 || precoUnitario <= 0 || isNaN(taxa)) {
        alert("Preencha todos os campos corretamente!")
        return
    }

    let totalProduto = quantidade * precoUnitario + taxa

    let novaLinha = `
        <tr class="t_conteudo">
            <td class="t1 bd">${nomeProduto}</td>
            <td class="t2 bd">$${precoUnitario.toFixed(2)}</td>
            <td class="t3 bd">${quantidade}</td>
            <td class="t4">$${totalProduto.toFixed(2)}</td>
        </tr>
    `

    document.querySelector("tbody").innerHTML += novaLinha

    calcularTotais()
}

function calcularTotais() {
    let linhas = document.querySelectorAll(".t_conteudo")
    let totalGeral = 0
    let totalTaxa = 0

    linhas.forEach((linha) => {
        let preco = parseFloat(linha.children[1].textContent.replace("$", ""))
        let quantidade = parseInt(linha.children[2].textContent)
        let totalLinha = parseFloat(linha.children[3].textContent.replace("$", ""))

        totalGeral += totalLinha
    })

    document.getElementById("total").placeholder = `$${totalGeral.toFixed(2)}`
    document.getElementById("tax").placeholder = `$${totalTaxa.toFixed(2)}`
}
