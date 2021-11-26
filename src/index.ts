import {Form as BaseForm, FormProps} from './Form';
import {FormItem, FormItemProps} from './FormItem';
import {FormRow, FormRowProps} from './FormRow';

export type {FormProps, FormItemProps, FormRowProps};
const Form = Object.assign(BaseForm, {Item: FormItem, Row: FormRow});
export {Form, FormItem, FormRow};
