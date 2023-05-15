import React, { useCallback, useEffect, useState } from 'react';
import api from '../../services/api';
import "./styles.css";

interface iPacks {
  id: string,
  pack_id: string,
  product_id: string,
  qty: number,
  value: number,
  products: [{
    idProduct: string,
    description: string,
    cost_price: number,
    sales_price: number
  }]
}


function ListCombo() {
  const [listPacks, setListPacks] = useState<iPacks[]>();

  useEffect(() => {
    api.get('pack/')
      .then((res) => {
        var listPacks = res.data;

        setListPacks(listPacks);
      });
  }, []);

  return (
    <div className='Conteiner'>
      {listPacks && listPacks.map(pack => (
        <div className='ConteinerPack'>
          <div className='Labels'>
            <label className='Label'>
              Codigo do Pack:
              <p>{pack.pack_id}</p>
            </label>
            <label className='Label'>
              Valor Total do Pack:
              <p>{pack.value}</p>
            </label>
          </div>
          <table>
            <thead>
              <tr>
                <th>Codigo</th>
                <th>Descrição</th>
                <th>Preço Custo</th>
                <th>Preço Venda</th>
                <th>Quantidade por Combo</th>
                <th>Preço Total</th>
              </tr>
            </thead>
            <tbody>
              {pack.products.map(p => (
                <tr>
                  <th>{p.idProduct}</th>
                  <th>{p.description}</th>
                  <th>{p.cost_price}</th>
                  <th>{p.sales_price}</th>
                  <th>{pack.qty}</th>
                  <th>{p.sales_price * pack.qty}</th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))
      }
    </div >);
}

export default ListCombo;
