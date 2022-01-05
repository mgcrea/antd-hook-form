import {FormProps as AntFormProps} from 'antd';
import {ConfigContext} from 'antd/lib/config-provider';
import SizeContext, {SizeContextProvider, SizeType} from 'antd/lib/config-provider/SizeContext';
import {FormContext, FormContextProps} from 'antd/lib/form/context';
import classNames from 'classnames';
import {FormProps as RcFormProps} from 'rc-field-form/lib/Form';
import React, {FormHTMLAttributes, PropsWithChildren, ReactElement, useContext, useEffect, useMemo} from 'react';
import {
  FieldValues,
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
  UseFormProps,
  WatchObserver,
} from 'react-hook-form';
import {filterDirtyValues} from './utils';

// Support @mgcrea/antd-extended
type ExtendedSizeType = SizeType | 'x-small' | 'x-large' | 'xx-large';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type BaseFormProps<Values = any> = Omit<AntFormProps<Values>, keyof RcFormProps<Values>>;
type EligibleBaseFormProps = Pick<
  BaseFormProps,
  'colon' | 'hideRequiredMark' | 'labelAlign' | 'labelCol' | 'layout' | 'prefixCls' | 'requiredMark' | 'wrapperCol'
>;
// type NonSupportedProps = Omit<BaseFormProps, keyof EligibleBaseFormProps>
type HTMLFormProps = FormHTMLAttributes<HTMLFormElement>;

export type FormProps<T extends FieldValues = FieldValues> = UseFormProps<T> & {
  name?: string;
  onSubmit: SubmitHandler<T>;
  onSubmitError?: SubmitErrorHandler<T>;
  onValuesChange?: WatchObserver<T>;
} & EligibleBaseFormProps & {
    size: ExtendedSizeType;
    onlyChangedValues?: boolean;
  } & Pick<HTMLFormProps, 'className' | 'style'>;

export const Form = <T extends FieldValues = FieldValues>({
  name,
  className = '',
  style,
  children,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onSubmit,
  onSubmitError,
  onValuesChange,
  onlyChangedValues,
  size: propSize,
  layout = 'horizontal',
  prefixCls: propPrefixCls,
  colon,
  labelAlign,
  labelCol,
  wrapperCol,
  hideRequiredMark,
  requiredMark: propRequiredMark,
  ...otherProps
}: PropsWithChildren<FormProps<T>>): ReactElement => {
  const {watch, formState, ...methods} = useForm<T>(otherProps);
  useEffect(() => {
    if (!onValuesChange) {
      return;
    }
    const subscription = watch((value, info) => {
      onValuesChange(value, info);
    });
    return () => subscription.unsubscribe();
  }, [onValuesChange, watch]);

  const contextSize = useContext(SizeContext);
  const {getPrefixCls, direction, form: contextForm} = useContext(ConfigContext);
  const prefixCls = getPrefixCls('form', propPrefixCls);
  const size = propSize || contextSize;

  const requiredMark = useMemo(() => {
    if (propRequiredMark !== undefined) {
      return propRequiredMark;
    }
    if (contextForm?.requiredMark !== undefined) {
      return contextForm.requiredMark;
    }
    if (hideRequiredMark) {
      return false;
    }
    return true;
  }, [hideRequiredMark, propRequiredMark, contextForm]);

  const formContextValue = useMemo<FormContextProps>(
    () => ({
      name,
      labelAlign,
      labelCol,
      wrapperCol,
      vertical: layout === 'vertical',
      colon,
      requiredMark,
      itemRef: () => () => null,
    }),
    [name, labelAlign, labelCol, wrapperCol, layout, colon, requiredMark],
  );

  const formClassName = classNames(
    prefixCls,
    {
      [`${prefixCls}-${layout}`]: true,
      [`${prefixCls}-hide-required-mark`]: requiredMark === false,
      [`${prefixCls}-rtl`]: direction === 'rtl',
      [`${prefixCls}-${size}`]: size,
    },
    className,
  );

  const onValid: SubmitHandler<T> = async (values, event) => {
    return await onSubmit(onlyChangedValues ? filterDirtyValues(formState.dirtyFields, values) : values, event);
  };

  return (
    <SizeContextProvider size={size as SizeType}>
      <FormContext.Provider value={formContextValue}>
        <FormProvider watch={watch} formState={formState} {...methods}>
          <form
            name={name}
            className={formClassName}
            onSubmit={methods.handleSubmit(onValid, onSubmitError)}
            style={style}
          >
            {children}
          </form>
        </FormProvider>
      </FormContext.Provider>
    </SizeContextProvider>
  );
};
