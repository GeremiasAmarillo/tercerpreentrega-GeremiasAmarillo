const modal = new bootstrap.Modal('#modalCarrito', {});
const btnModalCarrito = document.querySelector('#btnModalCarrito');
const cartCount = document.querySelector('#cartCount');
const cartSum = document.querySelector('#cartSum');
const inputSearch = document.querySelector('#inputSearch');
const listProducts = document.querySelector('#listProducts');
const modalListProducts = document.querySelector('#modalListProducts');
const btnClose = document.querySelector('#btnClose');
const btnSave = document.querySelector('#btnSave');
const btnClearCart = document.querySelector('#btnClearCart');
const listCart = JSON.parse(localStorage.getItem('cart')) || [];
const cart = new Cart(listCart);

cartCount.innerText = cart.getCount();


btnModalCarrito.addEventListener('click', function () {
    const list = cart.getProducts();
    cartSum.innerText = cart.getSum();

    redenCart(list);

    modal.show();
})

btnSave.addEventListener('click', () => {

    localStorage.removeItem('cart');
})

btnClose.addEventListener('click', () => {
    modal.hide();
})

btnClearCart.addEventListener('click', () => {
    cart.clearCart();
    cartCount.innerText = cart.getCount();
    modal.hide();
});



inputSearch.addEventListener('input', (event) => {
    const search = event.target.value;
    const newList = products.filter((product) => 
    product.name.toLowerCase().includes(search.toLowerCase()));
    renderProducts(newList);
})

btnOrder.addEventListener('click', () => {
    products.sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();

        if (nameA < nameB) {
            return -1;
        } else if (nameA > nameB) {
            return 1;
        }
         return 0;
    });

    renderProducts(products);
    btnOrder.setAttribute('disabled', true);
});

document.getElementById('btnOrderPrice').addEventListener('click', () => {
    products.sort((a, b) => a.price - b.price);

    renderProducts(products);
    btnOrder.setAttribute('disabled', true);
});

 /*  recoriendo los productos */
const renderProducts = (list) => {
    listProducts.innerHTML = '';
    list.forEach(product => {
        listProducts.innerHTML += // html
            `<div class="col-sm-4 col-md-3">
                <div class="card p-5">
                    <h4 class="text-center">${product.name} </h4>
                    <img class="img-fluid" src="${product.img}" alt="${product.name}">
                    <h3 class="text-center">$${product.price} </h3>
                    <button id="${product.id} " type="button" class="btn btn-warning btnAdCart">
                        <i></i> Agregar
                    </button>
                </div>
            </div>`;
    });
/* escuchador de productos */ 
    const btns = document.querySelectorAll('.btnAdCart');
    btns.forEach(btn => {
        btn.addEventListener('click', addToCart)
    });

}

const addToCart = (e) => {
    const id = e.target.id;
    const product = products.find(item => item.id == id);
    console.table(product);
    cart.addToCart(product);
    cartCount.innerText = cart.getCount();

    Toastify({
        text: "Agregado al Carrito",
        className: "info",
        style: {
          background: "linear-gradient(45deg, red, blue)",
        }
      }).showToast();
    
}

const redenCart = (list) => {
    modalListProducts.innerHTML = '';
    list.forEach(product => {
        modalListProducts.innerHTML +=            
        
        
            `<tr>
                <td> ${product.name} </td>
                <td> ${product.units}</td>
                <td>$${product.price}</td>
                <td>$${product.price * product.units}</td>

            </tr>`
    });
}
renderProducts(products);