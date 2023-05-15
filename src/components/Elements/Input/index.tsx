import { useRef, useEffect, InputHTMLAttributes, useCallback } from 'react';
import { useField } from '@unform/core';
import "./styles.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string,
    type?: string,
    label?: string,
    value?: string,
}

const Input: React.FC<InputProps> = ({ name, type, label, value, ...rest }) => {
    const inputRef = useRef(null)
    const { fieldName, registerField, error, defaultValue } = useField(name);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef,
            getValue: ref => {
                return ref.current.value
            },
            setValue: (ref, value) => {
                ref.current.value = value
            },
            clearValue: ref => {
                ref.current.value = ''
            },
        })
    }, [fieldName, registerField])


    return (
        <>
            <input
                className=""
                type={type || 'text'}
                id={fieldName}
                ref={inputRef}
                value={value}
                defaultValue={defaultValue}
                {...rest}
            />
            {error && <span className="error">{error}</span>}
        </>
    )
}

export default Input;