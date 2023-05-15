import React from 'react';
import "./styles.css";
import { FiArchive, FiAlignJustify, FiCodesandbox } from "react-icons/fi";

const Home = () => {
  return (
    <nav className='Container'>
      <a href='/drop' className='Link'>
        <FiArchive />
        <p>Drop CSV</p>
      </a>

      <a href='/ListProduts' className='Link'>
        <FiAlignJustify />
        <p>Lista Produtos</p>
      </a>

      <a href='/ListCombo' className='Link'>
        <FiCodesandbox />
        <p>Lista Compos</p>
      </a>
    </nav>
  );
}

export default Home;
