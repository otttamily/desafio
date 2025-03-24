document.addEventListener("DOMContentLoaded", function () {
    carregarProdutos()
})

function carregarProdutos() {
    let produtos = JSON.parse(localStorage.getItem("produtos")) || []
    let selectProduto = document.getElementById("produto")
    selectProduto.innerHTML = '<option value="produto" selected>Product</option>'

    produtos.forEach((produto) => {
        let option = document.createElement("option")
        option.value = produto.id
        option.textContent = produto.nome
        selectProduto.appendChild(option)
    })
}

document.getElementById("produto").addEventListener("change", function () {
    let produtoId = this.value
    if (produtoId && produtoId !== 'produto') {
        let produtos = JSON.parse(localStorage.getItem("produtos")) || []
        let produtoSelecionado = produtos.find(produto => produto.id == produtoId)

        if (produtoSelecionado) {
            document.getElementById("unit").value = produtoSelecionado.preco.toFixed(2)
            let categoria = produtoSelecionado.categoria
            let categorias = JSON.parse(localStorage.getItem("categorias")) || []
            let categoriaSelecionada = categorias.find(cat => cat.nome === categoria)
            if (categoriaSelecionada) {
                document.getElementById("tax").value = categoriaSelecionada.taxa.toFixed(0) + "%"
            }
        }
    }
})

function adicionarProduto() {
    let produtoId = document.getElementById("produto").value
    let quantidade = parseInt(document.getElementById("amount").value)
    let precoUnitario = parseFloat(document.getElementById("unit").value)
    let taxaPercentual = parseFloat(document.getElementById("tax").value)

    if (!produtoId || produtoId === "produto" || isNaN(quantidade) || quantidade <= 0 || precoUnitario <= 0 || isNaN(taxaPercentual)) {
        alert("Preencha todos os campos corretamente!")
        return
    }

    let produtos = JSON.parse(localStorage.getItem("produtos")) || []
    let produtoSelecionado = produtos.find(produto => produto.id == produtoId)

    if (!produtoSelecionado) {
        alert("Produto não encontrado!")
        return
    }

    if (quantidade > produtoSelecionado.quantidade) {
        alert(`Estoque insuficiente! Apenas ${produtoSelecionado.quantidade} unidades disponíveis.`)
        return
    }

    let nomeProduto = produtoSelecionado.nome

    let tbody = document.querySelector("tbody")
    let linhas = document.querySelectorAll(".t_conteudo")
    let produtoExistente = Array.from(linhas).find(linha => linha.children[0].textContent === nomeProduto)

    if (produtoExistente) {
        let quantidadeAtual = parseInt(produtoExistente.children[2].textContent)
        let novaQuantidade = quantidadeAtual + quantidade

        if (novaQuantidade > produtoSelecionado.quantidade) {
            alert(`Estoque insuficiente! Apenas ${produtoSelecionado.quantidade} unidades disponíveis.`)
            return
        }

        produtoExistente.children[2].textContent = novaQuantidade
    } else {
        let novaLinha = document.createElement("tr")
        novaLinha.classList.add("t_conteudo")
        novaLinha.innerHTML = `
            <td class="t1 bd">${nomeProduto}</td>
            <td class="t2 bd">$${precoUnitario.toFixed(2)}</td>
            <td class="t3 bd">${quantidade}</td>
            <td class="t5 bd"></td>
            <td class="t6">
                <button class="remover" onclick="removerProduto(this)">deletar</button>
            </td>
        `
        tbody.appendChild(novaLinha)
    }

    calcularTotais()

    document.getElementById("produto").value = "produto"
    document.getElementById("amount").value = ""
    document.getElementById("unit").value = ""
    document.getElementById("tax").value = ""
}

function calcularTotais() {
    let linhas = document.querySelectorAll(".t_conteudo")
    let totalGeral = 0
    let totalTaxa = 0

    linhas.forEach((linha) => {
        let preco = parseFloat(linha.children[1].textContent.replace("$", ""))
        let quantidade = parseInt(linha.children[2].textContent)
        
        let produtos = JSON.parse(localStorage.getItem("produtos")) || []
        let produtoSelecionado = produtos.find(produto => produto.nome === linha.children[0].textContent)

        let taxaPercentual = 0
        if (produtoSelecionado) {
            let categorias = JSON.parse(localStorage.getItem("categorias")) || []
            let categoriaSelecionada = categorias.find(cat => cat.nome === produtoSelecionado.categoria)
            if (categoriaSelecionada) {
                taxaPercentual = parseFloat(categoriaSelecionada.taxa) || 0
            }
        }

        let valorTaxa = (preco * taxaPercentual / 100) * quantidade
        totalTaxa += valorTaxa

        let totalLinha = quantidade * preco
        linha.children[3].textContent = totalLinha.toFixed(2)
        totalGeral += totalLinha
    });

    totalGeral += totalTaxa

    document.querySelector(".f_total").value = totalGeral.toFixed(2)
    document.querySelector(".f_tax").value = totalTaxa.toFixed(2)
}

function removerProduto(botao) {
    let linha = botao.parentElement.parentElement
    linha.remove()
    calcularTotais()
}

function cancelarProdutos() {
    document.querySelector("tbody").innerHTML = ""
    document.querySelector(".f_total").value = ""
    document.querySelector(".f_tax").value = ""
} 

function salvarPedido(taxa, total) {
    let pedidos = JSON.parse(localStorage.getItem("pedidos")) || []
    let codigo = pedidos.length + 1

    let produtosPedido = []
    let linhas = document.querySelectorAll(".t_conteudo")

    linhas.forEach((linha) => {
        let produtoNome = linha.children[0].textContent;
        let produtoPreco = parseFloat(linha.children[1].textContent.replace('$', ''))
        let produtoQuantidade = parseInt(linha.children[2].textContent)
        produtosPedido.push({
            nome: produtoNome,
            preco: produtoPreco,
            quantidade: produtoQuantidade,
            total: produtoPreco * produtoQuantidade
        })
    })

    let novoPedido = {
        codigo: codigo,
        taxa: taxa.toFixed(2),
        total: total.toFixed(2),
        produtos: produtosPedido
    }

    pedidos.push(novoPedido);
    localStorage.setItem("pedidos", JSON.stringify(pedidos))
}

function finalizarPedido() {
    let total = parseFloat(document.querySelector(".f_total").value) || 0
    let taxa = parseFloat(document.querySelector(".f_tax").value) || 0

    if (total === 0) {
        alert("Nenhum produto foi adicionado!")
        return
    }

    let produtos = JSON.parse(localStorage.getItem("produtos")) || []
    let linhas = document.querySelectorAll(".t_conteudo")

    linhas.forEach((linha) => {
        let produtoNome = linha.children[0].textContent
        let quantidadeVendida = parseInt(linha.children[2].textContent)

        let produtoNoEstoque = produtos.find(produto => produto.nome === produtoNome)
        if (produtoNoEstoque) {
            produtoNoEstoque.quantidade -= quantidadeVendida
        }
    })

    localStorage.setItem("produtos", JSON.stringify(produtos))

    salvarPedido(taxa, total)

    alert("Pedido finalizado com sucesso!")

    carregarProdutos()
    cancelarProdutos()
}

console.log(JSON.parse(localStorage.removeItem("pedidos")))
