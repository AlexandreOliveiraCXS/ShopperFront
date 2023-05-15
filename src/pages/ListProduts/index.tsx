import React, { useCallback, useEffect, useState } from 'react';
import api from '../../services/api';
import "./styles.css";

interface iProducts {
  code: string, name: string, cost_price: string, sales_price: string
}

function ListProduts() {
  const [listProducts, setListProducts] = useState<iProducts[]>();
  useEffect(() => {
    api.get('product/all')
      .then((res) => {
        var resultRequest = res.data;
        setListProducts(resultRequest);
      });
  }, []);

  return (
    <div className="Conteiner">
      <table>
        <thead className='Header'>
          <tr>
            <th>Codigo</th>
            <th>Descrição</th>
            <th>Preço Custo</th>
            <th>Preço Venda</th>
          </tr>
        </thead>
        <tbody className='rowBody'>
          {listProducts && listProducts.map(p => (
            <tr key={p.code}>
              <th>{p.code}</th>
              <th>{p.name}</th>
              <th>{p.cost_price}</th>
              <th>{p.sales_price}</th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListProduts;
