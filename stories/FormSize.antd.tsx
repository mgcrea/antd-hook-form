import React, {FunctionComponent} from 'react';
import {
  Form,
  FormProps,
  Input,
  Button,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
} from 'antd';

export const FormSizeAntDesign: FunctionComponent<FormProps & {onSubmit: () => void}> = ({
  onSubmit: onFinish,
  ...props
}) => {
  return (
    <div style={{margin: 32}}>
      <Form labelCol={{span: 4}} wrapperCol={{span: 14}} onFinish={onFinish} {...props}>
        <Form.Item name="input1" label="Input">
          <Input />
        </Form.Item>
        <Form.Item name="select1" label="Select">
          <Select>
            <Select.Option value="demo">Demo</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="radio1" label="RadioGroup">
          <Radio.Group>
            <Radio.Button value="moto">Moto</Radio.Button>
            <Radio.Button value="car">Car</Radio.Button>
            <Radio.Button value="bus">Bus</Radio.Button>
            <Radio.Button value="truck">Truck</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="treeselect1" label="TreeSelect">
          <TreeSelect treeData={[{title: 'Light', value: 'light', children: [{title: 'Bamboo', value: 'bamboo'}]}]} />
        </Form.Item>
        <Form.Item name="cascader1" label="Cascader">
          <Cascader
            options={[
              {
                value: 'zhejiang',
                label: 'Zhejiang',
                children: [
                  {
                    value: 'hangzhou',
                    label: 'Hangzhou',
                  },
                ],
              },
            ]}
          />
        </Form.Item>
        <Form.Item name="datepicker1" label="DatePicker">
          <DatePicker />
        </Form.Item>
        <Form.Item name="inputnumber1" label="InputNumber">
          <InputNumber />
        </Form.Item>
        <Form.Item name="switch1" label="Switch" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item wrapperCol={{span: 14, offset: 4}}>
          <Button htmlType="submit">Button</Button>
        </Form.Item>
      </Form>
    </div>
  );
};
