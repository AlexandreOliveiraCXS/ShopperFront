import React, { useCallback, useRef, useState } from 'react';
import "./styles.css";

import Dropzone from 'react-dropzone';
import getValidationErrors from '../../useful/getValidationErrors';

import * as Yup from 'yup';
import { Form } from "@unform/web";
import { FormHandles, Scope } from "@unform/core";

import postProducts from '../../useful/postProducts';
import getValidationErrorsForm from '../../useful/getValidationErrorsForm';
import Input from '../../components/Elements/Input';
import { json } from 'stream/consumers';
import { parse } from 'path';


interface iResult {
  header: string[],
  data: string[][]
}

interface iData {
  code: string,
  description: string,
  costPrice: string,
  salesPrice: string
}

interface Errors {
  index: number,
  product: string,
  Error: string[]
}

function Drop() {
  const formRef = useRef<FormHandles>(null);
  const [csv, setCsv] = useState<iResult>();

  const parseCSV = (text: string | undefined) => {
    const reg = /"/ig;

    if (!text) {
      return {
        header: [],
        data: []
      };
    };

    const [header, ...content] = text.replaceAll(reg, '').split('\n');

    const data: string[][] = [];

    content.forEach((item, index) => {
      const colunms = item.split(',');


      if (colunms.length !== 4)
        alert("Algum dado do CSV está incorreto verificar as linha: "
          + (index + 2));
      else
        data.push(colunms);
    });

    const result: iResult = {
      header: header.split(','),
      data: data
    }

    return result;
  }

  const onDrop = useCallback((acceptedFiles: any[]) => {

    acceptedFiles.forEach((file) => {
      const reader = new FileReader()

      reader.onabort = () => alert('file reading was aborted');
      reader.onerror = () => alert('file reading has failed');
      reader.onload = () => {
        const binaryStr = reader.result
        setCsv(parseCSV(binaryStr?.toString()));
      }
      reader.readAsBinaryString(file);
    })
  }, []);

  const handleSubmit = useCallback(async (data: iData) => {
    formRef?.current.setErrors({});
    const errors = await getValidationErrors(data);
    Promise.all([errors]);
console.log(errors.length)    
    errors.forEach((e) => {
      formRef?.current.setFieldError(e.product + ".salesPrice", e.Error.toString());
    });

    const arrayRowProducts: iData[] = [];

    Object.keys(data).map(async (p, index) => {

      const object: iData = {
        code: p,
        description: data[p].description,
        costPrice: data[p].costPrice,
        salesPrice: data[p].salesPrice,
      };

      arrayRowProducts.push(object);
    });

    const produts: iData[] = [];

    arrayRowProducts.find(product => {
      var constains = false;
      errors.find((error) => {
        if (product.code === error.product)
          constains = true;
      });

      if (!constains)
        produts.push(product);
    });

    postProducts(produts);
  }, []);

  return (
    <div className="Conteiner">
      {!csv &&
        <Dropzone onDrop={acceptedFiles => onDrop(acceptedFiles)}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
              </div>
            </section>
          )}
        </Dropzone>
      }

      {csv && (
        <>
          <div className="RowBody">
            <p className="Code">{csv.header[0]}</p>
            <p className="Description">{csv.header[1]}</p>
            <p className="CostPrice">{csv.header[2]}</p>
            <p className="SalesPrice">{csv.header[3]}</p>
          </div>

          <Form
            ref={formRef}
            onSubmit={handleSubmit}
          >
            {csv.data.map((row, index) => (
              <div className="RowBody">
                <Scope path={row[0]}>
                  <div className="Code">{row[0]}</div>
                  <Input
                    disabled
                    className="Description"
                    name="description"
                    defaultValue={row[1]}
                  />
                  <Input
                    className="CostPrice"
                    name="costPrice"
                    defaultValue={row[2]}
                  />
                  <Input
                    className="SalesPrice"
                    name="salesPrice"
                    defaultValue={row[3]}
                  />
                </Scope>
              </div>
            ))}
            <button type="submit" >Salvar</button>
          </Form>

        </>
      )}
    </div>
  );
}

export default Drop;
