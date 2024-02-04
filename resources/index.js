var itemsJSON = [];
var selectedCategories = [];

var menuLayoutModule = (function () {
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

                // Crie os botões de filtro com base nas categorias
                createFilterButtons(optionsMenu);

                // Inicialize o layout com base nas categorias
                filterItems();
            })
            .catch(error => {
                console.error('Erro ao obter dados do servidor:', error);
            });
    }

    function createFilterButtons(optionsMenu) {
        // Crie uma lista de categorias exclusivas com base nos títulos dos itens
        var uniqueCategories = [...new Set(itemsJSON.map(item => item.categoria))];

        // Adicione "Todos" à lista de categorias
        uniqueCategories.unshift("Todos");

        // Crie os botões de filtro com base nas categorias
        uniqueCategories.forEach(function (category) {
            var button = document.createElement("button");
            button.textContent = category;
            button.id = category;
            button.addEventListener("click", function () {
                onClickButtonMenuFilter(button.id);
            });
            optionsMenu.appendChild(button);
        });
    }

    function toggleCategorySelection(category) {
        // Se a categoria for "Todos", limpa a lista de seleção
        if (category === "Todos") {
            selectedCategories = ["Todos"];
        } else {
            // Remove todas as categorias existentes
            selectedCategories = [];
            // Adiciona a categoria à lista de seleção
            selectedCategories.push(category);
        }
    }
    

    function filterItems() {
        // Filtra os itens com base nas categorias selecionadas
        targetCategories = itemsJSON.filter(function (item) {
            // Se a lista de categorias selecionadas incluir "Todos" ou se o título do item estiver na lista, mantenha o item
            return selectedCategories.includes("Todos") || selectedCategories.includes(item.categoria);
        });

        // Obtém o contêiner onde você deseja exibir os itens
        var itemContainer = document.getElementById("itemContainer");

        // Limpa o conteúdo do contêiner
        itemContainer.innerHTML = '';

        // Itera sobre os itens filtrados e infla no HTML
        targetCategories.forEach(function (item) {
            // Cria um contêiner div para cada item
            var itemDiv = createItemContainer(item);

            // Adiciona o contêiner do item ao contêiner principal
            itemContainer.appendChild(itemDiv);

            setTimeout(function () {
                itemDiv.classList.add("show");
            }, 10);
        });

        // Aqui você pode usar a variável 'targetCategories' como quiser, por exemplo, para exibir os itens na página.
        console.log("Itens filtrados:", targetCategories);
    }

    function createItemContainer(item) {
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

        return itemDiv;
    }

    function onClickButtonMenuFilter(idButton) {
        console.log("Botão do filtro clicado: " + idButton);

        // Atualize a seleção de categorias
        toggleCategorySelection(idButton);

        // Desmarca todos os outros botões
        var allButtons = document.querySelectorAll("#optionsMenu button");
        allButtons.forEach(function (otherButton) {
            if (otherButton.id !== idButton) {
                otherButton.classList.remove("active");
            }
        });

        // Alterna a classe "active" apenas no botão clicado
        var button = document.getElementById(idButton);
        if (button.classList.contains("active")) {
            button.classList.remove("active");
        } else {
            button.classList.add("active");
        }

        // Filtra os itens após atualizar a seleção de categorias
        filterItems();
    }

    return {
        createLayout: createLayout,
        filterItems: filterItems,
        onClickButtonMenuFilter: onClickButtonMenuFilter
    };

})();


// Inicia a criação do layout quando a página é carregada
window.onload = function () {
    menuLayoutModule.createLayout();
};


// Inicia a criação do layout quando a página é carregada
window.onload = function () {
    menuLayoutModule.createLayout();
};


function showPage(pageId) {
    // Oculta todas as páginas com uma transição suave
    document.querySelectorAll('.page').forEach(function (page) {
        page.style.opacity = '0';
        page.style.display = "none";
    });

    // Mostra a página desejada com uma transição suave
    var nextPage = document.getElementById(pageId);
    nextPage.style.display = 'block';
    setTimeout(function () {
        nextPage.style.opacity = '1';
    }, 10); // Adiciona um pequeno atraso para garantir que a página esteja completamente exibida antes de aplicar a transição
    setTimeout(function () {
        window.scrollTo(0, 0);
    }, 500); // Tempo correspondente à duração da transição (0.5s)
}

getFragment() //When the page is started it will back 
function getFragment() {
    var fragmento = window.location.hash.substring(1);

    // Switch para lidar com diferentes valores do fragmento
    switch (fragmento) {
        case '#':
            showPage('pg1')
            break;
        case 'menu':
            showPage('pg2')
            break;
        case 'contato':
            showPage('pg3')
            break;

        default:
            console.log('Fragmento desconhecido:', fragmento);
    }
}