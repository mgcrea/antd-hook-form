import {Form as BaseForm, FormHandle, FormProps} from './Form';
import {FormItem, FormItemProps} from './FormItem';
import {FormRow, FormRowProps} from './FormRow';

export type {FormProps, FormItemProps, FormRowProps, FormHandle};
const Form = Object.assign(BaseForm, {Item: FormItem, Row: FormRow});
export {Form, FormItem, FormRow};
