import "./styles.css";
import React, { useCallback, useRef, useState } from 'react';

import Dropzone, { useDropzone } from 'react-dropzone';
import getValidationErrors from '../../useful/getValidationErrors';

import { Form } from "@unform/web";
import { FormHandles, Scope } from "@unform/core";

import postProducts from '../../useful/postProducts';
import Input from '../../components/Elements/Input';


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

  useDropzone({
    accept: {
      'text/csv': [
        '.csv, text/csv, application/vnd.ms-excel, application/csv, text/x-csv, application/x-csv, text/comma-separated-values, text/x-comma-separated-values',
      ],
    }
  })

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
    <div className="Container">
      {!csv &&
        <Dropzone onDrop={acceptedFiles => onDrop(acceptedFiles)}>
          {({ getRootProps, getInputProps }) => (
            <section className='Dropzone'>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Insira o arquivo do tipo CVS aqui!</p>
              </div>
            </section>
          )}
        </Dropzone>
      }

      {csv && (
        <>
          <div className="RowHeader">
            <p className="Code">{csv.header[0]}</p>
            <p className="DescriptionHeader">{csv.header[1]}</p>
            <p className="">{csv.header[2]}</p>
            <p className="SalesPrice">{csv.header[3]}</p>
          </div>

          <Form
            ref={formRef}
            onSubmit={handleSubmit}
            className="Form"
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
            <div className="ContainerButton">
            <button className="Button" type="submit" >Salvar</button>
            </div>
          </Form>

        </>
      )}
    </div>
  );
}

export default Drop;
