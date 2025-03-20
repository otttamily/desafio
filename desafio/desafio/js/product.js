document.addEventListener("DOMContentLoaded", () => {
    carregarCategoriasNoSelect()
    carregarProdutos()
})


function carregarCategoriasNoSelect() {
    let categorias = JSON.parse(localStorage.getItem("categorias")) || []
    let select = document.getElementById("category")

    select.innerHTML = `<option value="">Selecione uma categoria</option>`

    categorias.forEach(categoria => {
        let option = document.createElement("option")
        option.value = categoria.id
        option.textContent = `${categoria.nome}`
        select.appendChild(option)
    })
}


function adicionarProduto() {
    let nome = document.getElementById("productname").value.trim()
    let quantidade = document.getElementById("amount").value.trim()
    let preco = document.getElementById("unitprice").value.trim()
    let categoriaId = document.getElementById("category").value

    if (nome === "" || quantidade === "" || preco === "" || categoriaId === "") {
        alert("Preencha todos os campos!")
        return
    }

    let categorias = JSON.parse(localStorage.getItem("categorias")) || []
    let produtos = JSON.parse(localStorage.getItem("produtos")) || []

    let categoriaSelecionada = categorias.find(c => c.id == categoriaId)

    let novoProduto = {
        id: Date.now(),
        nome,
        quantidade: parseInt(quantidade),
        preco: parseFloat(preco),
        categoria: categoriaSelecionada.nome,
        taxa: categoriaSelecionada.taxa
    }

    produtos.push(novoProduto)
    localStorage.setItem("produtos", JSON.stringify(produtos))

    document.getElementById("productname").value = ""
    document.getElementById("amount").value = ""
    document.getElementById("unitprice").value = ""
    document.getElementById("category").value = ""

    carregarProdutos()
    console.log(adicionarProduto)
}

function carregarProdutos() {
    let produtos = JSON.parse(localStorage.getItem("produtos")) || []
    let tabela = document.getElementById("tb")

    tabela.innerHTML = ""

    produtos.forEach((produto, index) => {
        let row = tabela.insertRow()

        row.innerHTML = `
            <td class="t1 br">${index + 1}</td>
            <td class="t2 br">${produto.nome}</td>
            <td class="t3 br">${produto.quantidade}</td>
            <td class="t4 br">R$${produto.preco.toFixed(2)}</td>
            <td class="t5 br">${produto.categoria}</td>
            <td class="t6"><button onclick="removerProduto(${produto.id})">Delete</button></td>
        `
    })
}

function removerProduto(id) {
    let produtos = JSON.parse(localStorage.getItem("produtos")) || []
    let novosProdutos = produtos.filter(produto => produto.id !== id)

    localStorage.setItem("produtos", JSON.stringify(novosProdutos))
    carregarProdutos()
}