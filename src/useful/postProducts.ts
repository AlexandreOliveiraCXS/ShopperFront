import api from "../services/api";

export default async function postProducts(listProduct) {
          
    if (!!listProduct) {
        await api.post('product/', {
            listProduct
        }).then((res) => {
            console.log(res.data);
        });
    }
}
