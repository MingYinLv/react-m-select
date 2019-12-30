/**
 * Created 2019/12/16 13:57 By lvmingyin
 */

import React, { useContext, useEffect, useRef, useState } from 'react';
import useRafState from 'react-use/lib/useRafState';
import TWEEN from '@tweenjs/tween.js';
import { MainContext } from '../utils/contexts';
import { ItemsProps } from '../types';
import useTouch, { EventType } from '../utils/useTouch';

function animate(time) {
  requestAnimationFrame(animate);
  TWEEN.update(time);
}
requestAnimationFrame(animate);

const findNear = ({ value, step, min, max }) => {
  const result = Math.round(value / step) * 30;
  if (result > max) return max;
  else if (result < min) return min;
  return result;
};

interface TweenProps {
  onUpdate: () => TweenProps;
  start: () => TweenProps;
  stop: () => TweenProps;
  easing: () => TweenProps;
}

const OptionList = ({ items }: { items: Array<ItemsProps> }) => {
  const offset = 60;
  const { getClass } = useContext(MainContext);
  const [scrollY, setScrollY] = useState(0);
  const [tween, setTween] = useState<TweenProps | null>(null);
  const [lastMoveDiff, setLastMoveDiff] = useRafState(0);
  const minScroll = -(items.length - 1) * 30 - offset;
  const maxScroll = offset;
  const options = useRef<HTMLDivElement>(null);
  const touch = useTouch(options);

  useEffect(() => {
    if (touch.eventType === EventType.End) {
      let end = scrollY - lastMoveDiff * 5;
      if (end > maxScroll) end = maxScroll;
      else if (end <= minScroll) end = minScroll;

      end = findNear({ value: end, step: 30, min: minScroll + offset, max: maxScroll - offset });

      const t: TweenProps = new TWEEN.Tween({ y: scrollY })
        .to({ y: end }, 1000)
        .easing(TWEEN.Easing.Quadratic.Out)
        .onUpdate(({ y }) => {
          setScrollY(y);
        })
        .start();
      setTween(t);
    } else if (touch.eventType === EventType.Start) {
      if (tween) tween.stop();
    } else if (touch.eventType !== EventType.Move) return;
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
        {items.map((n, i) => (
          <div key={i} className={getClass('popover-overlay-options-item')}>
            <span className={getClass('popover-overlay-options-item-label')}>{n.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OptionList;
