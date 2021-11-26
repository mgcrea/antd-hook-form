# antd-hook-form

## Features

- Provides a `<Form />` component that enables you to use [react-hook-form](https://react-hook-form.com/) with [AntDesign](https://ant.design/)
- Replaces the default AntDesign [field-form](https://github.com/react-component/field-form) form handling
- Written from the ground up with [TypeScript](https://www.typescriptlang.org/)

## Install

```sh
npm install @mgcrea/antd-hook-form
```

## Quickstart

```tsx
import React from 'react';
import {Form, FormProps} from '@mgcrea/antd-hook-form';

function App() {
  const onSubmit = (data) => console.log(data);

  return (
    <Form labelCol={{span: 4}} wrapperCol={{span: 14}} layout="horizontal" onSubmit={onSubmit}>
      <Form.Item name="input1" label="Input">
        <Input />
      </Form.Item>
      <Form.Row wrapperCol={{span: 14, offset: 4}}>
        <Button htmlType="submit">Button</Button>
      </Form.Row>
    </Form>
  );
}
```
