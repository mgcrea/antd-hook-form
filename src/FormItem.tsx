// https://github.com/ant-design/ant-design/blob/master/components/form/FormItem.tsx

import {FormItemProps as BaseFormItemProps, Row, RowProps} from 'antd';
import {ConfigContext} from 'antd/lib/config-provider';
// import RCFormContext from 'rc-field-form/lib/FormContext';
import SizeContext, {SizeType} from 'antd/lib/config-provider/SizeContext';
import {FormContext} from 'antd/lib/form/context';
import FormItemInput from 'antd/lib/form/FormItemInput';
import FormItemLabel from 'antd/lib/form/FormItemLabel';
import classNames from 'classnames';
import React, {
  Children,
  cloneElement,
  isValidElement,
  PropsWithChildren,
  ReactElement,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from 'react';
import {UseControllerProps, ControllerRenderProps, FieldValues, useController, useFormContext} from 'react-hook-form';

export type FormItemProps<T> = Pick<UseControllerProps<T>, 'name' | 'rules' | 'defaultValue' | 'control'> &
  Pick<BaseFormItemProps, 'trigger' | 'valuePropName' | 'label' | 'noStyle' | 'getValueFromEvent'> &
  RowProps;

export const FormItem = <T extends FieldValues = FieldValues>({
  children,
  className,
  control: propControl,
  name,
  label,
  rules,
  defaultValue,
  trigger = 'onChange',
  valuePropName = 'value',
  noStyle,
  prefixCls: propPrefixCls,
  getValueFromEvent,
  ...otherProps
}: PropsWithChildren<FormItemProps<T>>): ReactElement => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const control = propControl || useFormContext<T>().control;
  const {
    field: {ref, value, onChange, ...field},
    fieldState,
  } = useController<T>({
    name,
    control,
    rules,
    defaultValue,
  });

  // @NOTE use a stable ref for the onChange callback
  // https://github.com/react-hook-form/react-hook-form/pull/5113#issuecomment-988172807
  const handleChangeRef = useRef(onChange);
  useEffect(() => {
    handleChangeRef.current = (event) => onChange(event);
  }, [onChange]);
  const handleChange = useCallback(
    (...args) => handleChangeRef.current(...(getValueFromEvent ? [getValueFromEvent(...args)] : args)),
    [getValueFromEvent],
  );

  const {getPrefixCls} = useContext(ConfigContext);
  const sizeContext = useContext(SizeContext);
  const formContext = useContext(FormContext);
  // const rcFormContext = useContext(RCFormContext);

  const fieldId = formContext.name ? `${formContext.name}_${name}` : name;
  const validateStatus = fieldState.invalid ? 'error' : 'success';
  const errors = fieldState.error ? [fieldState.error.message || fieldState.error.type] : [];
  const prefixCls = getPrefixCls('form', propPrefixCls);

  const formItem = (
    <>
      <FormItemLabel prefixCls={prefixCls} htmlFor={fieldId} required={!!rules?.required} label={label} />
      <FormItemInput prefixCls={prefixCls} validateStatus={validateStatus} errors={errors} warnings={[]}>
        {Children.map(children, (child) => {
          if (!isValidElement(child)) {
            return;
          }
          const element = child as ReactElement<
            PropsWithChildren<ControllerRenderProps & {id: string; size: SizeType}>
          >;
          return cloneElement(element, {
            id: element.props.id ?? fieldId,
            [valuePropName]: value,
            [trigger]: handleChange,
            size: element.props.size ?? sizeContext,
            ...field,
          });
        })}
      </FormItemInput>
    </>
  );
  if (noStyle) {
    return formItem;
  }
  return (
    <Row
      className={classNames(className, `${prefixCls}-item`, {
        [`${prefixCls}-item-with-help`]: errors.length,
        [`${prefixCls}-item-has-error`]: validateStatus === 'error',
      })}
      {...otherProps}
    >
      {formItem}
    </Row>
  );
};
