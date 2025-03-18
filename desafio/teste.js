document.addEventListener("DOMContentLoaded", () => {
    carregarCategorias();
    carregarProdutos();
});

//Função para salvar categoria no LocalStorage
function adicionarCategoria() {
    let nome = document.getElementById("categoriaNome").value;
    let taxa = document.getElementById("categoriaTaxa").value;

    if (nome === "" || taxa === "") {
        alert("Preencha todos os campos!");
        return;
    }

    let categorias = JSON.parse(localStorage.getItem("categorias")) || [];
    categorias.push({ nome, taxa });
    localStorage.setItem("categorias", JSON.stringify(categorias));

    document.getElementById("categoriaNome").value = "";
    document.getElementById("categoriaTaxa").value = "";
    carregarCategorias();
}

//Função para carregar categorias no <select>
function carregarCategorias() {
    let categorias = JSON.parse(localStorage.getItem("categorias")) || [];
    let select = document.getElementById("categoriaSelect");

    select.innerHTML = "<option value=''>Selecione uma categoria</option>";

    categorias.forEach((categoria, index) => {
        let option = document.createElement("option");
        option.value = index;
        option.textContent = `${categoria.nome} - ${categoria.taxa}%`;
        select.appendChild(option);
    });
}


//Função para salvar produto no LocalStorage
function adicionarProduto() {
    let nome = document.getElementById("produtoNome").value;
    let preco = document.getElementById("produtoPreco").value;
    let categoriaIndex = document.getElementById("categoriaSelect").value;

    if (nome === "" || preco === "" || categoriaIndex === "") {
        alert("Preencha todos os campos!");
        return;
    }

    let categorias = JSON.parse(localStorage.getItem("categorias")) || [];
    let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

    let categoriaSelecionada = categorias[categoriaIndex];

    produtos.push({
        nome,
        preco,
        categoria: categoriaSelecionada.nome,
        taxa: categoriaSelecionada.taxa
    });

    localStorage.setItem("produtos", JSON.stringify(produtos));

    document.getElementById("produtoNome").value = "";
    document.getElementById("produtoPreco").value = "";
    document.getElementById("categoriaSelect").value = "";

    carregarProdutos();
}

//Função para carregar produtos na lista
function carregarProdutos() {
    let produtos = JSON.parse(localStorage.getItem("produtos")) || [];
    let lista = document.getElementById("listaProdutos");

    lista.innerHTML = "";

    produtos.forEach((produto) => {
        let li = document.createElement("li");
        li.textContent = `${produto.nome} - R$${produto.preco} | ${produto.categoria} (${produto.taxa}%)`;
        lista.appendChild(li);
    });
}