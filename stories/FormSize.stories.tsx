import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import 'antd/lib/grid/style/index.less';
import 'antd/lib/style/index.less';

import {FormSize} from './FormSize';
import {FormSizeAntDesign} from './FormSize.antd';

export default {
  title: 'Example/Form size',
  component: FormSize,
  argTypes: {
    size: {
      options: ['small', 'default', 'large'],
      control: {type: 'radio'},
    },
    layout: {
      options: ['vertical', 'horizontal'],
      control: {type: 'radio'},
    },
    onSubmit: {action: 'submitted'},
  },
} as ComponentMeta<typeof FormSize>;

const Template: ComponentStory<typeof FormSize> = (args) => <FormSize {...args} />;
const TemplateAntDesign: ComponentStory<typeof FormSizeAntDesign> = (args) => <FormSizeAntDesign {...args} />;

export const ReactHookForm = Template.bind({});
ReactHookForm.args = {
  // More on composing args: https://storybook.js.org/docs/react/writing-stories/args#args-composition
  // ...HeaderStories.LoggedIn.args,
};

export const AntDesignForm = TemplateAntDesign.bind({});
AntDesignForm.args = {
  // ...HeaderStories.LoggedOut.args,
};
