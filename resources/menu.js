var itemsJSON = [];
var selectedCategories = [];


function createLayout() {
    var optionsMenu = document.getElementById("optionsMenu");

    // Obtenha a lista de itens do servidor
    fetch('/resources/data/Items do Menu.json')
        .then(response => response.json())
        .then(data => {
            itemsJSON = data;

            // Ordena os itens alfabeticamente pelo título
            itemsJSON.sort((a, b) => a.titulo.localeCompare(b.titulo));

            // Crie uma lista de categorias exclusivas com base nos títulos dos itens
            var uniqueCategories = [...new Set(itemsJSON.map(item => item.categoria))];

            // Adicione "All" à lista de categorias
            uniqueCategories.unshift("Todos");

            // Crie os botões de filtro com base nas categorias
            uniqueCategories.forEach(function (category) {
                var button = document.createElement("button");
                button.textContent = category;
                button.id = category;
                button.addEventListener("click", function () {
                    console.log("Botão clicado: " + category);
                    toggleCategorySelection(category);
                    filterItems();
                    onClickButtonMenuFilter(button.id);
                });
                optionsMenu.appendChild(button);
            });

            // Inicialize o layout com base nas categorias
            filterItems();
        })
        .catch(error => {
            console.error('Erro ao obter dados do servidor:', error);
        });
}
function toggleCategorySelection(category) {
    // Verifica se a categoria já está selecionada e a remove
    if (selectedCategories.includes(category)) {
        selectedCategories = selectedCategories.filter((c) => c !== category);
    } else {
        // Adiciona a categoria à lista de seleção
        selectedCategories.push(category);
    }
}

function filterItems() {
    // Filtra os itens com base nas categorias selecionadas
    targetCategories = itemsJSON.filter(function (item) {
        // Se a lista de categorias selecionadas incluir "All" ou se o título do item estiver na lista, mantenha o item
        return selectedCategories.includes("All") || selectedCategories.includes(item.categoria);
    });

    // Obtém o contêiner onde você deseja exibir os itens
    var itemContainer = document.getElementById("itemContainer");

    // Limpa o conteúdo do contêiner
    itemContainer.innerHTML = '';

    // Itera sobre os itens filtrados e infla no HTML
    targetCategories.forEach(function (item) {
        // Cria um contêiner div para cada item
        var itemDiv = document.createElement("div");
        itemDiv.classList.add("item-container"); // Adicione uma classe para estilização, se desejar

        var h1Element = document.createElement("h1");
        h1Element.textContent = item.titulo;

        

        if (item.imagem != "") {
            var imgElement = document.createElement("img");
            imgElement.src = item.imagem;
            itemDiv.appendChild(imgElement);
        }
        
        itemDiv.appendChild(h1Element);

        if (item.descricao != "") {
            var pDescriptionElement = document.createElement("p");
            pDescriptionElement.textContent = item.descricao;
            itemDiv.appendChild(pDescriptionElement);
        }
        
        var pCategoryElement = document.createElement("p");
        pCategoryElement.textContent = "Categoria: " + item.categoria;
        itemDiv.appendChild(pCategoryElement);

        // Adiciona o contêiner do item ao contêiner principal
        itemContainer.appendChild(itemDiv);

        setTimeout(function () {
            itemDiv.classList.add("show");
        }, 10);
    
    });

    // Aqui você pode usar a variável 'targetCategories' como quiser, por exemplo, para exibir os itens na página.
    console.log("Itens filtrados:", targetCategories);
}


function onClickButtonMenuFilter(idButton) {
    console.log("Botão do filtro clicado: " + idButton);

    var button = document.getElementById(idButton);

    // Verifica se o botão possui a classe "active"
    if (button.classList.contains("active")) {
        button.classList.remove("active");
    } else {
        button.classList.add("active");
    }
}

// Inicia a criação do layout quando a página é carregada
window.onload = createLayout;
