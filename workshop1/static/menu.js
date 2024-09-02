let cart = [];

document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const checkoutButton = document.getElementById('checkout');
    const menuSection = document.getElementById('menu');
    const cartSection = document.getElementById('cart');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const name = button.getAttribute('data-name');
            const price = parseFloat(button.getAttribute('data-price'));
            addToCart(name, price);
            updateCartDisplay();
        });
    });

    checkoutButton.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Your cart is empty. Please add items before checking out.');
        } else {
            alert('Thank you for your order! Total: $' + calculateTotal());
            cart = [];
            updateCartDisplay();
        }
    });

    document.querySelector('nav').addEventListener('click', (event) => {
        event.preventDefault();
        if (event.target.getAttribute('href') === '#menu') {
            menuSection.classList.remove('hidden');
            cartSection.classList.add('hidden');
        } else if (event.target.getAttribute('href') === '#cart') {
            menuSection.classList.add('hidden');
            cartSection.classList.remove('hidden');
        }
    });

    function addToCart(name, price) {
        const existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ name, price, quantity: 1 });
        }
    }

    function updateCartDisplay() {
        cartItemsContainer.innerHTML = '';
        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.textContent = `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`;
            cartItemsContainer.appendChild(itemElement);
        });
        cartTotalElement.textContent = 'Total: $' + calculateTotal();
    }

    function calculateTotal() {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    }
});