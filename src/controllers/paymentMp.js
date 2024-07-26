//Importamos de MercadoPago: 
import {MercadoPagoConfig, Preference} from "mercadopago"; 

//Configuramos las credenciales: 
const client = new MercadoPagoConfig({
    access_token: "..",
})


export const createOrder = async (req, res) => {
    const { items, back_urls, auto_return, external_reference, notification_url } = req.body;

    const body = {
        items,
        back_urls,
        auto_return,
        external_reference,
        notification_url
    };

    try {
        const preference = new Preference(client);
        const response = await preference.create(body);
        res.json({
            id: response.body.id,
            init_point: response.body.init_point
        });
    } catch (error) {
        console.error("Error creating preference:", error);
        res.status(500).send('Error creating preference');
    }
};

