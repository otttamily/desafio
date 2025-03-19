document.addEventListener("DOMContentLoaded", function () {
    carregarProdutos();
    carregarCategoriasNoSelect();
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
                document.getElementById("tax").value = categoriaSelecionada.taxa.toFixed(0); 
            }
        }
    }
});

function adicionarProduto() {
    let produtoId = document.getElementById("produto").value;
    let quantidade = parseInt(document.getElementById("amount").value);
    let precoUnitario = parseFloat(document.getElementById("unit").value);
    let taxaTexto = document.getElementById("tax").value.trim();
    let taxaPercentual = taxaTexto === "" ? 0 : parseFloat(taxaTexto);

    if (!produtoId || produtoId === "produto" || isNaN(quantidade) || quantidade <= 0 || precoUnitario <= 0 || isNaN(taxaPercentual)) {
        alert("Preencha todos os campos corretamente!");
        return;
    }

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
        produtoExistente.children[4].textContent = taxaPercentual + "%"; 
    } else {
        let novaLinha = document.createElement("tr");
        novaLinha.classList.add("t_conteudo");
        novaLinha.innerHTML = `
            <td class="t1 bd">${nomeProduto}</td>
            <td class="t2 bd">R$${precoUnitario.toFixed(2)}</td>
            <td class="t3 bd">${quantidade}</td>
            <td class="t5 bd">R$${(quantidade * precoUnitario).toFixed(2)}</td> 
            <td class="t6">
                <button class="editar" onclick="editarProduto(this)">Editar</button>
                <button class="remover" onclick="removerProduto(this)">Deletar</button>
            </td>
        `;
        tbody.appendChild(novaLinha);
    }

    calcularTotais();
    limparCampos();
}

function calcularTotais() {
    let linhas = document.querySelectorAll(".t_conteudo");
    let totalGeral = 0;
    let totalTaxa = 0;

    linhas.forEach((linha) => {
        let preco = parseFloat(linha.children[1].textContent.replace("R$", ""));
        let quantidade = parseInt(linha.children[2].textContent);
        let taxaPercentual = parseFloat(linha.children[4].textContent.replace("%", "")) || 0; 

        let totalLinha = quantidade * preco;
        let valorTaxa = (totalLinha * taxaPercentual) / 100;

        totalGeral += totalLinha
        totalTaxa += valorTaxa

        linha.children[3].textContent = `R$${totalLinha.toFixed(2)}`;
    });
}
    document.getElementById("total").value = totalGeral.toFixed(2);
    document.getElementById("tax").value = totalTaxa.toFixed(2); 


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
}

function removerProduto(botao) {
    let linha = botao.parentElement.parentElement;
    linha.remove();
    calcularTotais();
}

function cancelarProdutos() {
    document.querySelector("tbody").innerHTML = "";
    document.getElementById("total").value = "";
    document.getElementById("tax").value = "";
}

function limparCampos() {
    document.getElementById("produto").value = "produto";
    document.getElementById("amount").value = "";
    document.getElementById("unit").value = "";
    document.getElementById("tax").value = "";
}
        