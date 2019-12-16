/**
 * Created 2019/12/16 13:57 By lvmingyin
 */

import React, { useContext, useEffect, useRef } from 'react';
import { useMouse } from 'react-use';
import { MainContext } from '../utils/contexts';
import { ItemsProps } from '../types';

const OptionList = ({ items }: { items: Array<ItemsProps> }) => {
  const { getClass } = useContext(MainContext);
  const scroll = useRef<HTMLDivElement>(null);
  const { docX, docY, posX, posY, elX, elY, elW, elH } = useMouse(scroll);

  function handleScroll(e) {
    e.preventDefault();
    console.log(e);
  }

  console.log(docX,docY,posX,posY,elX,elY,elW,elH)

  return (
    <div className={getClass('popover-overlay-options')}>
      <div className={getClass('popover-overlay-options-scroll')} ref={scroll}>
        {items.map(n => (
          <div key={n.value} className={getClass('popover-overlay-options-item')}>
            <span className={getClass('popover-overlay-options-item-label')}>{n.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OptionList;
