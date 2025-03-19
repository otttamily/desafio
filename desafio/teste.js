/*document.addEventListener("DOMContentLoaded", function () {
    carregarProdutos();
    carregarCategoriasNoSelect(); // Carregar as categorias também, se necessário
});

function carregarProdutos() {
    let produtos = JSON.parse(localStorage.getItem("produtos")) || [];
    let selectProduto = document.getElementById("produto");
    selectProduto.innerHTML = '<option value="produto" selected>Product</option>';

    produtos.forEach((produto) => {
        let option = document.createElement("option");
        option.value = produto.id;
        option.textContent = produto.nome;
        selectProduto.appendChild(option);
    });
}

// Preencher os campos de preço e taxa ao selecionar um produto
document.getElementById("produto").addEventListener("change", function() {
    let produtoId = this.value;
    if (produtoId && produtoId !== 'produto') {
        let produtos = JSON.parse(localStorage.getItem("produtos")) || [];
        let produtoSelecionado = produtos.find(produto => produto.id == produtoId);
        
        if (produtoSelecionado) {
            document.getElementById("unit").value = produtoSelecionado.preco.toFixed(2);
            let categoria = produtoSelecionado.categoria;
            let categorias = JSON.parse(localStorage.getItem("categorias")) || [];
            let categoriaSelecionada = categorias.find(cat => cat.nome === categoria);
            if (categoriaSelecionada) {
                document.getElementById("tax").value = categoriaSelecionada.taxa.toFixed(2);
            }
        }
    }
});

function adicionarProduto() {
    let nomeProduto = document.getElementById("produto").value;
    let quantidade = parseInt(document.getElementById("amount").value);
    let precoUnitario = parseFloat(document.getElementById("unit").value);
    let taxaPercentual = parseFloat(document.getElementById("tax").value);

    if (!nomeProduto || quantidade <= 0 || precoUnitario <= 0 || isNaN(taxaPercentual)) {
        alert("Preencha todos os campos corretamente!");
        return;
    }

    let linhas = document.querySelectorAll(".t_conteudo");
    let produtoExistente = Array.from(linhas).find(linha => linha.children[0].textContent === nomeProduto);

    if (produtoExistente) {
        let quantidadeAtual = parseInt(produtoExistente.children[2].textContent);
        quantidade += quantidadeAtual;
        produtoExistente.children[2].textContent = quantidade;
    } else {
        let novaLinha = `
            <tr class="t_conteudo">
                <td class="t1 bd">${nomeProduto}</td>
                <td class="t2 bd">$${precoUnitario.toFixed(2)}</td>
                <td class="t3 bd">${quantidade}</td>
                <td class="t5"></td>
            </tr>
        `;
        document.querySelector("tbody").innerHTML += novaLinha;
    }

    calcularTotais();

    // Limpar campos após adicionar produto
    document.getElementById("produto").value = "produto";
    document.getElementById("amount").value = "";
    document.getElementById("unit").value = "";
    document.getElementById("tax").value = "";
}

function calcularTotais() {
    let linhas = document.querySelectorAll(".t_conteudo");
    let totalGeral = 0;
    let totalTaxa = 0;

    linhas.forEach((linha) => {
        let preco = parseFloat(linha.children[1].textContent.replace("$", ""));
        let quantidade = parseInt(linha.children[2].textContent);
        let taxaPercentual = parseFloat(document.getElementById("tax").value);
        let valorTaxa = (preco * taxaPercentual / 100) * quantidade;
        totalTaxa += valorTaxa;
        let totalLinha = (quantidade * preco) + valorTaxa;
        linha.children[3].textContent = `$${totalLinha.toFixed(2)}`;
        totalGeral += totalLinha;
    });

    document.querySelector(".f_total").value = totalGeral.toFixed(2);
    document.querySelector(".f_tax").value = totalTaxa.toFixed(2);
}

function cancelarProdutos() {
    document.querySelector("tbody").innerHTML = "";
    document.querySelector(".f_total").value = "";
    document.querySelector(".f_tax").value = "";
}
*/

document.addEventListener("DOMContentLoaded", function () {
    carregarProdutos();
    carregarCategoriasNoSelect(); // Carregar as categorias também, se necessário
});

function carregarProdutos() {
    let produtos = JSON.parse(localStorage.getItem("produtos")) || [];
    let selectProduto = document.getElementById("produto");
    selectProduto.innerHTML = '<option value="produto" selected>Product</option>';

    produtos.forEach((produto) => {
        let option = document.createElement("option");
        option.value = produto.id;
        option.textContent = produto.nome;
        selectProduto.appendChild(option);
    });
}

// Preencher os campos de preço e taxa ao selecionar um produto
document.getElementById("produto").addEventListener("change", function () {
    let produtoId = this.value;
    if (produtoId && produtoId !== 'produto') {
        let produtos = JSON.parse(localStorage.getItem("produtos")) || [];
        let produtoSelecionado = produtos.find(produto => produto.id == produtoId);

        if (produtoSelecionado) {
            document.getElementById("unit").value = produtoSelecionado.preco.toFixed(2);
            let categoria = produtoSelecionado.categoria;
            let categorias = JSON.parse(localStorage.getItem("categorias")) || [];
            let categoriaSelecionada = categorias.find(cat => cat.nome === categoria);
            if (categoriaSelecionada) {
                document.getElementById("tax").value = categoriaSelecionada.taxa.toFixed(0) + "%";
            }
        }
    }
})

function adicionarProduto() {
    let produtoId = document.getElementById("produto").value;
    let quantidade = parseInt(document.getElementById("amount").value);
    let precoUnitario = parseFloat(document.getElementById("unit").value);
    let taxaPercentual = parseFloat(document.getElementById("tax").value.replace("%", ""));

    if (!produtoId || produtoId === "produto" || isNaN(quantidade) || quantidade <= 0 || precoUnitario <= 0 || isNaN(taxaPercentual)) {
        alert("Preencha todos os campos corretamente!");
        return;
    }

    // Buscar nome do produto pelo ID
    let produtos = JSON.parse(localStorage.getItem("produtos")) || [];
    let produtoSelecionado = produtos.find(produto => produto.id == produtoId);

    if (!produtoSelecionado) {
        alert("Produto não encontrado!");
        return;
    }

    let nomeProduto = produtoSelecionado.nome;

    let tbody = document.querySelector("tbody");
    let linhas = document.querySelectorAll(".t_conteudo");
    let produtoExistente = Array.from(linhas).find(linha => linha.children[0].textContent === nomeProduto);

    if (produtoExistente) {
        let quantidadeAtual = parseInt(produtoExistente.children[2].textContent);
        quantidade += quantidadeAtual;
        produtoExistente.children[2].textContent = quantidade;
    } else {
        let novaLinha = document.createElement("tr");
        novaLinha.classList.add("t_conteudo");
        novaLinha.innerHTML = `
            <td class="t1 bd">${nomeProduto}</td>
            <td class="t2 bd">$${precoUnitario.toFixed(2)}</td>
            <td class="t3 bd">${quantidade}</td>
            <td class="t5 bd"></td>
            <td class="t6">
                <button class="remover" onclick="removerProduto(this)">deletar</button>
            </td>
        `;
        tbody.appendChild(novaLinha);
    }

    calcularTotais();

    // Limpar campos após adicionar produto
    document.getElementById("produto").value = "produto";
    document.getElementById("amount").value = "";
    document.getElementById("unit").value = "";
    document.getElementById("tax").value = "";
}

function calcularTotais() {
    let linhas = document.querySelectorAll(".t_conteudo");
    let totalGeral = 0;
    let totalTaxa = 0;

    linhas.forEach((linha) => {
        let preco = parseFloat(linha.children[1].textContent.replace("$", ""));
        let quantidade = parseInt(linha.children[2].textContent);
        let taxaPercentual = parseFloat(document.getElementById("tax").value.replace("%", ""));
        let valorTaxa = (preco * taxaPercentual / 100) * quantidade;
        totalTaxa += valorTaxa;
        let totalLinha = (quantidade * preco);
        linha.children[3].textContent = `$${totalLinha.toFixed(2)}`;
        totalGeral += totalLinha;
    });

    document.querySelector(".f_total").value = totalGeral.toFixed(2);
    document.querySelector(".f_tax").value = totalTaxa.toFixed(2);
}


/*Função para editar a quantidade de um produto
function editarProduto(botao) {
    let linha = botao.parentElement.parentElement;
    let quantidadeAtual = linha.children[2].textContent;
    let novaQuantidade = prompt("Editar quantidade:", quantidadeAtual);

    if (novaQuantidade !== null && !isNaN(novaQuantidade) && novaQuantidade > 0) {
        linha.children[2].textContent = parseInt(novaQuantidade);
        calcularTotais();
    } else {
        alert("Quantidade inválida!");
    }
}*/

// Função para remover um produto da lista
function removerProduto(botao) {
    let linha = botao.parentElement.parentElement;
    linha.remove();
    calcularTotais();
}

function cancelarProdutos() {
    document.querySelector("tbody").innerHTML = "";
    document.querySelector(".f_total").value = "";
    document.querySelector(".f_tax").value = "";
} 