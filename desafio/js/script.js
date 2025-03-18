
/*function adicionarCategoria() {
        const categoryName = document.getElementById('categoryname').value
        const tax = document.getElementById('tax').value
    
        if (categoryName && tax) {
            const category = {
                name: categoryName,
                tax: tax
            }
    
            let categories = JSON.parse(localStorage.getItem('categories')) || []
    
            categories.push(category)
    
            localStorage.setItem('categories', JSON.stringify(categories))
    
            document.getElementById('categoryname').value = ''
            document.getElementById('tax').value = ''
    
            atualizarTabela()
        } else {
            alert("Por favor, preencha todos os campos.")
        }
    }
    
function atualizarTabela() {
        const categories = JSON.parse(localStorage.getItem('categories')) || []
        const tbody = document.getElementById('teste')
    
        tbody.innerHTML = ''
    
        categories.forEach((category, index) => {
            const row = document.createElement('tr')
            row.innerHTML = 
                `<td class="t1 bd">${index + 1}</td>
                <td class="t2 bd">${category.name}</td>
                <td class="t3 bd">${category.tax}</td>
                <td class="t4">
                <button onclick="removerCategoria(${index})">Delete</button>
                </td>`
            tbody.appendChild(row)
        })
    }
    
function removerCategoria(index) {
        let categories = JSON.parse(localStorage.getItem('categories')) || []
    
        categories.splice(index, 1)
    
        localStorage.setItem('categories', JSON.stringify(categories))
    
        atualizarTabela()
    }
    
    window.onload = atualizarTabela*/

    document.addEventListener("DOMContentLoaded", () => {
        carregarCategorias();
    });
    
    //Função para adicionar uma categoria ao LocalStorage
    function adicionarCategoria() {
        let nome = document.getElementById("categoryname").value.trim();
        let taxa = document.getElementById("tax").value.trim();
    
        if (nome === "" || taxa === "") {
            alert("Preencha todos os campos!");
            return;
        }
    
        let categorias = JSON.parse(localStorage.getItem("categorias")) || [];
    
        let novaCategoria = {
            id: Date.now(), // Gera um ID único
            nome,
            taxa: parseFloat(taxa)
        };
    
        categorias.push(novaCategoria);
        localStorage.setItem("categorias", JSON.stringify(categorias));
    
        document.getElementById("categoryname").value = "";
        document.getElementById("tax").value = "";
        
        carregarCategorias();
    }
    
    //Função para carregar categorias na tabela
    function carregarCategorias() {
        let categorias = JSON.parse(localStorage.getItem("categorias")) || [];
        let tabela = document.getElementById("teste");
    
        tabela.innerHTML = ""; // Limpa antes de atualizar
    
        categorias.forEach((categoria, index) => {
            let row = tabela.insertRow();
    
            row.innerHTML = `
                <td class="t1 bd">${index + 1}</td>
                <td class="t2 bd">${categoria.nome}</td>
                <td class="t3 bd">${categoria.taxa}%</td>
                <td class="t4"><button onclick="removerCategoria(${categoria.id})">Delete</button></td>
            `;
        });
    }
    
    //Função para remover uma categoria
    function removerCategoria(id) {
        let categorias = JSON.parse(localStorage.getItem("categorias")) || [];
        let novasCategorias = categorias.filter(categoria => categoria.id !== id);
    
        localStorage.setItem("categorias", JSON.stringify(novasCategorias));
        carregarCategorias();
    }