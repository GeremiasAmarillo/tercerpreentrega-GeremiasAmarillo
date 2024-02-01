class Cart {
    constructor(products) {
        this.products = products || [];
    }

    addToCart(product) {
        const existingProduct = this.products.find(item => item.id === product.id);

        if (existingProduct) {
            existingProduct.units += 1;
        } else {
            this.products.push({ ...product, units: 1 });
        }

        this.saveCart();
    }

    clearCart() {
        this.products = [];
        this.saveCart();
    }

    getCount() {
        return this.products.reduce((acc, product) => acc + product.units, 0);
    }

    getSum() {
        return this.products.reduce((acc, product) => acc + product.price * product.units, 0);
    }

    getProducts() {
        return [...this.products];
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.products));
    }
}