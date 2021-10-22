let cart = []; //variavel para o carrinho
let modalQT = 1; //variavel para controle de qntdd
let modalkey = 0; //para guardar a pizza selecionada

//funcoes para auxilio querySelector e querySelectorAll
const qs = (el) => document.querySelector(el); //funcao para retornar o querySelector
const qsa = (el) => document.querySelectorAll(el); //funcao para retornar o querySelectorAll
//================================================================

//listagem das pizzas
pizzaJson.map((item, index) => {
  let pizzaItem = qs(".models .pizza-item").cloneNode(true); //funcao para clonar o item e tudo dentro dele

  //para carregar o id do modal
  pizzaItem.setAttribute("data-key", index);
  //informacoes da pizza
  pizzaItem.querySelector(".pizza-item--img img").src = item.img; //imagem da pizza
  pizzaItem.querySelector(
    ".pizza-item--price"
  ).innerHTML = `R$ ${item.price.toFixed(2)}`; //preço fixando as casas decimais para 2
  pizzaItem.querySelector(".pizza-item--name").innerHTML = item.name; //nome da pizza
  pizzaItem.querySelector(".pizza-item--desc").innerHTML = item.description; //descricao

  //modal para informações da pizza
  pizzaItem.querySelector("a").addEventListener("click", (e) => {
    e.preventDefault(); //para bloquear a ação de atualizar a tela na tag a

    //para preencher as informações das pizzas dentro do modal, quando clicamos no item
    let key = e.target.closest(".pizza-item").getAttribute("data-key"); //para acessar as key da pizza
    modalQT = 1;

    modalkey = key; //armazena a pizza escolhida

    qs(".pizzaBig img").src = pizzaJson[key].img;
    qs(".pizzaInfo h1").innerHTML = pizzaJson[key].name;
    qs(".pizzaInfo--desc").innerHTML = pizzaJson[key].description;
    qs(".pizzaInfo--actualPrice").innerHTML = `R$ ${pizzaJson[
      key
    ].price.toFixed(2)}`;

    qs(".pizzaInfo--size.selected").classList.remove("selected"); //para deselecionar o item

    qsa(".pizzaInfo--size").forEach((size, sizeIndex) => {
      if (sizeIndex == 2) {
        size.classList.add("selected");
      }
      size.querySelector("span").innerHTML = pizzaJson[key].sizes[sizeIndex];
    }); //para buscar o tamanho da pizza e prerencher

    qs(".pizzaInfo--qt").innerHTML = modalQT;

    qs(".pizzaWindowArea").style.opacity = "0"; //opacidade inicial
    qs(".pizzaWindowArea").style.display = "flex";
    setTimeout(() => {
      qs(".pizzaWindowArea").style.opacity = "1";
    }, 200); //timer para gerar uma animaçãozinha quando clicamos na pizza
  });

  qs(".pizza-area").append(pizzaItem); //pega o conteudo em pizza area e adiciona mais um conteúdo
});

//Eventos do MODAL

function closeModal() {
  qs(".pizzaWindowArea").style.opacity = "0"; //opacidade inicial
  setTimeout(() => {
    qs(".pizzaWindowArea").style.display = "none";
  }, 500); //timer para gerar uma animaçãozinha quando clicamos na pizza
}

qsa(".pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton").forEach(
  (item) => {
    item.addEventListener("click", closeModal);
  }
);

//para os botoes de + e -
qs(".pizzaInfo--qtmais").addEventListener("click", () => {
  modalQT++;
  qs(".pizzaInfo--qt").innerHTML = modalQT; //para atualizar o valor da variavel modal
});

qs(".pizzaInfo--qtmenos").addEventListener("click", () => {
  if (modalQT > 1) {
    modalQT--;
    qs(".pizzaInfo--qt").innerHTML = modalQT; //para atualizar o valor da variavel modal
  } //para que a qtdd n fique negativa
});

qsa(".pizzaInfo--size").forEach((size, sizeIndex) => {
  size.addEventListener("click", () => {
    //para trocar a seleção de um item desmarcando os outros
    qs(".pizzaInfo--size.selected").classList.remove("selected"); //para deselecionar o item
    size.classList.add("selected"); //para n quebrar qndo clicar no spam, usa se o size diretamente
  });
});

//botão adicionar no carrinho
qs(".pizzaInfo--addButton").addEventListener("click", () => {
  let size = parseInt(qs(".pizzaInfo--size.selected").getAttribute("data-key")); //pega o tamanho da pizza

  let identifier = pizzaJson[modalkey].id + "@" + size;

  let key = cart.findIndex((item) => item.identifier == identifier); //para ver se já existe um item igual adicionado no carrinho

  if (key > -1) {
    cart[key].qt += modalQT; //se ele achou, atualiza a quantidade, senão atualiza novo item no array
  } else {
    cart.push({
      identifier,
      id: pizzaJson[modalkey].id,
      size,
      qt: modalQT,
    }); //adiciona os items no objeto
  }

  updateCart();
  closeModal();
});

//carrinho mobile

qs(".menu-openner").addEventListener("click", () => {
  if (cart.length > 0) {
    qs("aside").style.left = "0";
  }
});

//fechar carrinho mobile
qs(".menu-closer").addEventListener("click", () => {
  qs("aside").style.left = "100vw";
});

//funcao para atualizar o carrinho
function updateCart() {
  qs(".menu-openner span").innerHTML = cart.length; //sempre qndo adicionarmos algo no carrrinho, vai mudar o valor do span

  if (cart.length > 0) {
    qs("aside").classList.add("show"); //mostrou o carrinho
    qs(".cart").innerHTML = "";

    //variaveis para calculo de valores
    let subtotal = 0;
    let desconto = 0;
    let total = 0;

    for (let i in cart) {
      let pizzaItem = pizzaJson.find((item) => item.id == cart[i].id); //procura o item no json pelo id
      subtotal += pizzaItem.price * cart[i].qt;

      let cartItem = qs(".models .cart--item").cloneNode(true);

      let pizzaSizeName;
      switch (cart[i].size) {
        case 0:
          pizzaSizeName = "P";
          break;
        case 1:
          pizzaSizeName = "M";
          break;
        case 2:
          pizzaSizeName = "G";
          break;
      }

      let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`;

      cartItem.querySelector("img").src = pizzaItem.img;
      cartItem.querySelector(".cart--item-nome").innerHTML = pizzaName;
      cartItem.querySelector(".cart--item--qt").innerHTML = cart[i].qt;

      cartItem
        .querySelector(".cart--item-qtmais")
        .addEventListener("click", () => {
          cart[i].qt++;
          updateCart();
        }); //para aumentar o valor de qt
      cartItem
        .querySelector(".cart--item-qtmenos")
        .addEventListener("click", () => {
          if (cart[i].qt > 1) {
            cart[i].qt--;
          } else {
            cart.splice(i, 1); //remove o item do carrinho
          }
          updateCart();
        });

      qs(".cart").append(cartItem);
    }

    desconto = subtotal * 0.1;
    total = subtotal - desconto;

    qs(".subtotal span:last-child").innerHTML = `R$ ${subtotal.toFixed(2)}`;
    qs(".desconto span:last-child").innerHTML = `R$ ${desconto.toFixed(2)}`;
    qs(".total span:last-child").innerHTML = `R$ ${total.toFixed(2)}`;
  } else {
    qs("aside").classList.remove("show");
    qs("aside").style.left = "100vw";
  }
}
