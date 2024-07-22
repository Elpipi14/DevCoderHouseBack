const mp = new MercadoPago("APP_USR-1a6020a1-1ab3-4451-9923-de4ad3dfae58", {
    locale: "es-AR"
});

document.getElementById("checkout_mp").addEventListener("click", async () => {
    try {
        const cartItems = Array.from(document.querySelectorAll('.cart-item')).map(item => {
            return {
                title: item.querySelector('.product_title').textContent.trim(),
                quantity: parseInt(item.querySelector('.quantity_span').textContent.trim()),
                unit_price: parseFloat(item.querySelector('.price').textContent.trim().replace('$', '')) / parseInt(item.querySelector('.quantity_span').textContent.trim())
            };
        });

        const totalAmount = parseFloat(document.querySelector('.cash span').textContent.trim().replace('$', ''));

        // Crear preferencia
        const preference = {
            items: cartItems,
            back_urls: {
                success: "http://localhost:8080/",
                failure: "http://localhost:8080/login-error",
                pending: "http://localhost:8080/login-error"
            },
            auto_return: "approved",
            external_reference: "ORDER_ID_1234",
            notification_url: "http://localhost:8080/"
        };

        // Llamada a tu backend para crear la preferencia
        const response = await fetch('http://localhost:8080/create-preference', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(preference)
        });

        const data = await response.json();

        // Redirigir al usuario al checkout de MercadoPago
        window.location.href = data.init_point;
    } catch (error) {
        alert("Error al enviar la solicitud...");
    }
});

const createCheckoutButton = (preferenceId) => {
    const bricksBuilder = mp.bricks();

    const renderComponent = async () => {
        // Corrección para evitar que se dupliquen los botones:
        if (window.checkoutButton) window.checkoutButton.unmount();
        // Si ya existe el botón lo voy a desmontar.
        window.checkoutButton = await bricksBuilder.create("wallet", "wallet_container", {
            initialization: {
                preferenceId: preferenceId
            }
        });
    };
    renderComponent();
};
