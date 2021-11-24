import {FormItemProps, Row, RowProps} from 'antd';
import {ConfigContext} from 'antd/lib/config-provider';
import SizeContext, {SizeType} from 'antd/lib/config-provider/SizeContext';
import FormItemInput, {FormItemInputProps} from 'antd/lib/form/FormItemInput';
import FormItemLabel from 'antd/lib/form/FormItemLabel';
import classNames from 'classnames';
import React, {
  Children,
  cloneElement,
  FunctionComponent,
  isValidElement,
  PropsWithChildren,
  ReactElement,
  useContext,
} from 'react';
import {ControllerRenderProps} from 'react-hook-form';

export type FormRowProps = RowProps & Pick<FormItemProps, 'label'> & Pick<FormItemInputProps, 'wrapperCol'>;

export const FormRow: FunctionComponent<FormRowProps> = ({
  children,
  className: classNameProp,
  wrapperCol,
  label,
  ...otherProps
}) => {
  const {getPrefixCls} = useContext(ConfigContext);
  const sizeContext = useContext(SizeContext);
  const prefixCls = getPrefixCls('form');
  const className = classNames(`${prefixCls}-item`, classNameProp);
  return (
    <Row className={className} {...otherProps}>
      <FormItemLabel prefixCls={prefixCls} label={label} />
      <FormItemInput prefixCls={prefixCls} errors={[]} warnings={[]} wrapperCol={wrapperCol}>
        {Children.map(children, (child) => {
          if (!isValidElement(child)) {
            return;
          }
          const element = child as ReactElement<
            PropsWithChildren<ControllerRenderProps & {id: string; size: SizeType}>
          >;
          return cloneElement(element, {
            size: sizeContext,
          });
        })}
      </FormItemInput>
    </Row>
  );
};
