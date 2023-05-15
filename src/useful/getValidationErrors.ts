import getCurrentPrice from "./getCurrentPrice";

interface Errors {
    index: number,
    product: string,
    Error: string[]
}

export default async function getValidationErrors(prop) {
    var validationErrors: Errors[] = [];

    await Promise.all(Object.keys(prop).map(async (p, index) => {
        const Error = [];

        if (!parseFloat(prop[p].salesPrice))
            Error.push("Preço de custo não preenchido");

        if (!parseFloat(prop[p].salesPrice))
            Error.push("Preço de venda não preenchido");

        if (parseFloat(prop[p].salesPrice) < parseFloat(prop[p].costPrice))
            Error.push("O preço de venda não pode ser menor que o de custo (Financeiro)");

        const currentPrice = await getCurrentPrice(p);

        var discount = (currentPrice - parseFloat(prop[p].salesPrice)) / currentPrice * 100;
        discount = discount < 0 ? (discount * -1) : discount;

        if (discount !== 0 && (discount > 10.5 || discount < 9.8))
            Error.push("O Reajuste não pode ser maior ou menor que 10% (Marketing)");

        if (Error.length > 0) {
            console.log("Error.length: " + Error.length)

            validationErrors.push({
                index: index,
                product: p,
                Error: Error
            });
        }
    }));

    console.log("Errors: " + validationErrors.length)
    return validationErrors;
}