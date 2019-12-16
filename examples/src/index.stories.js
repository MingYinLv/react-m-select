/**
 * Created 2019/11/19 10:56 By lvmingyin
 */

import React from 'react';
import Select from '../../';
import '../../dist/index.css';

export default { title: 'Select' };

const citys = [
  { label: '上海', value: '上海' },
  { label: '北京', value: '北京' },
  { label: '重庆', value: '重庆' },
  { label: '天津', value: '天津' },
  { label: '成都', value: '成都' },
  { label: '长沙', value: '长沙' },
  { label: '武汉', value: '武汉' },
  { label: '香港', value: '香港' },
  { label: '台湾', value: '台湾' },
];

export const simple = () => (
  <div style={{ padding: '10px' }}>
    <Select items={citys}>123</Select>
  </div>
);
