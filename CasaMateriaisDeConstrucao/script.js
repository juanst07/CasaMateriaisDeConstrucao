// Adiciona item ao carrinho
function adicionarAoCarrinho(nome, preco) {
  let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

  const itemExistente = carrinho.find(item => item.nome === nome);
  if (itemExistente) {
    itemExistente.quantidade += 1;
  } else {
    carrinho.push({ nome, preco, quantidade: 1 });
  }

  localStorage.setItem('carrinho', JSON.stringify(carrinho));
  alert(`${nome} adicionado ao carrinho!`);
}

// Exibe carrinho na página carrinho.html
function exibirCarrinho() {
  const carrinhoContainer = document.getElementById('carrinho-itens');
  const totalContainer = document.getElementById('total');
  let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

  if (carrinho.length === 0) {
    carrinhoContainer.innerHTML = "<p>Seu carrinho está vazio.</p>";
    totalContainer.textContent = '';
    return;
  }

  let total = 0;
  carrinhoContainer.innerHTML = '';

  carrinho.forEach(item => {
    const itemEl = document.createElement('div');
    itemEl.className = 'carrinho-item';
    itemEl.innerHTML = `
      <strong>${item.nome}</strong><br>
      Quantidade: ${item.quantidade}<br>
      Preço unitário: R$ ${item.preco.toFixed(2)}<br>
      Subtotal: R$ ${(item.quantidade * item.preco).toFixed(2)}<hr>
    `;
    carrinhoContainer.appendChild(itemEl);
    total += item.quantidade * item.preco;
  });

  totalContainer.textContent = `Total: R$ ${total.toFixed(2)}`;
}

// Limpa carrinho
function limparCarrinho() {
  localStorage.removeItem('carrinho');
  location.reload();
}
