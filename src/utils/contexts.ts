/**
 * Created 2019/12/16 14:47 By lvmingyin
 */

import React from 'react';
import { IMainContext } from '../types';

export const MainContext = React.createContext<IMainContext>({ getClass: () => '' });
