document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/cart/totalItems', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwtToken')}` // Ajusta esto según cómo almacenes el token
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        document.getElementById('contador').textContent = data.totalItems;
    } catch (error) {
        console.error('Error fetching total items:', error);
    }
});
