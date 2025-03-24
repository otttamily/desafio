document.addEventListener("DOMContentLoaded", () => {
        carregarCategorias()
    })

    function testando(str) {
        return str.replace(/</g, "&lt;").replace(/>/g, "&gt;")
                  .replace(/"/g, "&quot;").replace(/'/g, "&# 039;");
    }
  
    function adicionarCategoria() {
        let nome = document.getElementById("categoryname").value.trim()
        let taxa = document.getElementById("tax").value.trim()
    
        if (nome === "" || taxa === "") {
            alert("Preencha todos os campos!")
            return
        }
            if(taxa < 0){
                alert("Preencha o campo 'Tax' corretamente!")
                document.getElementById("tax").value = ""
                return
            }
    
        let categorias = JSON.parse(localStorage.getItem("categorias")) || []
    
        let novaCategoria = {
            id: Date.now(), 
            nome,
            taxa: parseFloat(taxa)
        }
    
        categorias.push(novaCategoria);
        localStorage.setItem("categorias", JSON.stringify(categorias))
    
        document.getElementById("categoryname").value = ""
        document.getElementById("tax").value = ""
        
        carregarCategorias()
    }
    
    function carregarCategorias() {
        let categorias = JSON.parse(localStorage.getItem("categorias")) || []
        let tabela = document.getElementById("teste")
    
        tabela.innerHTML = ""
    
        categorias.forEach((categoria, index) => {
            let row = tabela.insertRow()
    
            row.innerHTML = `
                <td class="t1 bd">${index + 1}</td>
                <td class="t2 bd">${testando(categoria.nome)}</td>
                <td class="t3 bd">${categoria.taxa}%</td>
                <td class="t4"><button onclick="removerCategoria(${categoria.id})">Delete</button></td>
            `
        })
    }
   
    function removerCategoria(id) {
        let categorias = JSON.parse(localStorage.getItem("categorias")) || []
        let novasCategorias = categorias.filter(categoria => categoria.id !== id)
    
        localStorage.setItem("categorias", JSON.stringify(novasCategorias))
        carregarCategorias()
    }

    console.log(JSON.parse(localStorage.getItem("categorias")))