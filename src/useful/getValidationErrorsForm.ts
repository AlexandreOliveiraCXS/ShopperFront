import {ValidationError} from 'yup';

interface Errors{
    [key:string]:string;
}

export default function getValidationErrorsForm(err:ValidationError):Errors {
    const validationErrors = {};

    err.inner.forEach((error)=>{
        validationErrors[error.path]= error.message;
    });

    return validationErrors;
}