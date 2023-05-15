import api from "../services/api";

export default async function getCurrentPrice(idProduct: string): Promise<number> {
    var price = 0;

    await api.get('product/', {
        params: { idProduct }
    }).then((res) => {
        price = res.data.sales_price;
    });

    return price;
}