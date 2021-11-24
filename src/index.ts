import {Form, FormProps} from './Form';
import {FormItem, FormItemProps} from './FormItem';
import {FormRow, FormRowProps} from './FormRow';

export type {FormProps, FormItemProps, FormRowProps};
export {Form, FormItem, FormRow};
export default Object.assign(Form, {Item: FormItem, Row: FormRow});
