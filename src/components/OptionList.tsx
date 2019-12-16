/**
 * Created 2019/12/16 13:57 By lvmingyin
 */

import React, { useContext, useEffect, useRef } from 'react';
import { useRafState } from 'react-use';
import { MainContext } from '../utils/contexts';
import { ItemsProps } from '../types';
import useTouch, { EventType } from '../utils/useTouch';

const computeA = (f: number) => {
  const m = 6;
  return f / m;
};

const findNear = ({ value, step, min, max }) => {
  const result = Math.round(value / step) * 30;
  if (result > max) return max;
  else if (result < min) return min;
  return result;
};

const OptionList = ({ items }: { items: Array<ItemsProps> }) => {
  const { getClass } = useContext(MainContext);
  const [scrollY, setScrollY] = useRafState(0);
  const [lastMoveDiff, setLastMoveDiff] = useRafState(0);
  const minScroll = -(items.length - 1) * 30;
  const maxScroll = 0;
  const options = useRef<HTMLDivElement>(null);
  const touch = useTouch(options);

  useEffect(() => {
    if (touch.eventType === EventType.End) {
      setScrollY(findNear({ value: scrollY, step: 30, min: minScroll, max: maxScroll }));
    }
    if (touch.eventType !== EventType.Move) return;
    const vertical = touch.directions.vertical;
    setLastMoveDiff(vertical);

    if (scrollY - vertical < minScroll) {
      setScrollY(minScroll);
    } else if (scrollY - vertical > maxScroll) {
      setScrollY(maxScroll);
    } else {
      const tmpY = scrollY - vertical;
      setScrollY(tmpY);
    }
  }, [touch]);
  return (
    <div className={getClass('popover-overlay-options')} ref={options}>
      <div
        className={getClass('popover-overlay-options-scroll')}
        style={{
          transform: `translate3d(0, ${scrollY}px, 0)`,
        }}
      >
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
