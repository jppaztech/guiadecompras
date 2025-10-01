document.addEventListener('DOMContentLoaded', () => {
    // Pega os elementos importantes da página
    const produtos = document.querySelectorAll('.produto');
    const lista = document.getElementById('minha-lista');
    const btnEnviar = document.getElementById('btn-enviar-whatsapp');
    const clickSound = document.getElementById('clickSound');

    // Função para tocar o som de click
    function playClickSound() {
        clickSound.currentTime = 0; // Reinicia o som para tocar novamente se clicado rápido
        clickSound.play();
    }

    // Função para remover um item da lista pelo seu nome
    function removerItemDaLista(nomeDoProduto) {
        const itens = lista.querySelectorAll('li');
        itens.forEach(item => {
            if (item.dataset.nome === nomeDoProduto) {
                lista.removeChild(item);
            }
        });
    }
    
    // Função para adicionar um item na lista visual
    function adicionarItemNaLista(nomeDoProduto) {
        const itemDaLista = document.createElement('li');
        itemDaLista.textContent = nomeDoProduto;
        itemDaLista.dataset.nome = nomeDoProduto; // Guarda o nome para referência

        const btnRemover = document.createElement('button');
        btnRemover.textContent = 'X';
        btnRemover.className = 'remover-item';
        
        btnRemover.onclick = function() {
            playClickSound(); // Toca o som ao remover
            // Encontra o botão original do produto e "deseleciona"
            const produtoOriginal = document.querySelector(`.produto[data-nome="${nomeDoProduto}"]`);
            if (produtoOriginal) {
                produtoOriginal.classList.remove('selecionado');
            }
            // Remove o item da lista
            lista.removeChild(itemDaLista);
        };

        itemDaLista.appendChild(btnRemover);
        lista.appendChild(itemDaLista);
    }


    // Adiciona o "escutador" de clique para cada botão de produto
    produtos.forEach(produto => {
        produto.addEventListener('click', () => {
            playClickSound(); // Toca o som em qualquer clique
            const nome = produto.dataset.nome;
            
            // Verifica se o produto JÁ está selecionado
            if (produto.classList.contains('selecionado')) {
                // Se sim, remove a seleção e o item da lista
                produto.classList.remove('selecionado');
                removerItemDaLista(nome);
            } else {
                // Se não, adiciona a seleção e o item na lista
                produto.classList.add('selecionado');
                adicionarItemNaLista(nome);
            }
        });
    });

    // Adiciona a função de enviar para o WhatsApp
    btnEnviar.addEventListener('click', () => {
        playClickSound(); // Toca o som também no botão de enviar
        const itens = document.querySelectorAll('#minha-lista li');
        if (itens.length === 0) {
            alert('Sua lista está vazia!');
            return;
        }

        let mensagem = 'Olá! Segue a lista de compras:\n';
        itens.forEach(item => {
            mensagem += `- ${item.dataset.nome}\n`;
        });
        
        const mensagemCodificada = encodeURIComponent(mensagem);
        window.open(`https://api.whatsapp.com/send?text=${mensagemCodificada}`, '_blank');
    });
});