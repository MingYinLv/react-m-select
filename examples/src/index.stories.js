/**
 * Created 2019/11/19 10:56 By lvmingyin
 */

import React from 'react';
import { Button } from '@storybook/react/demo';

export default { title: '按钮' };


export const withText = () => <Button>Hello Button</Button>;

export const withEmoji = () => (
  <Button>
    <span role="img" aria-label="so cool">
      😀 😎 👍 💯
    </span>
  </Button>
);
