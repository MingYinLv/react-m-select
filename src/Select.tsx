/**
 * Created 2019/11/18 14:54 By lvmingyin
 */

import React, { useRef, useState, useEffect, Fragment } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import './Select.less';
import { SelectProps } from './types';
import OptionList from './components/OptionList';
import { MainContext } from './utils/contexts';

function has(value) {
  return typeof value !== 'undefined';
}

const Select = (props: SelectProps) => {
  const container = useRef<HTMLDivElement>(document.createElement('div'));
  const [visible, setVisible] = useState(false);
  const [animateVisible, setAnimateVisible] = useState(false);
  const [firstClick, setFirstClick] = useState(false);

  function getClass(name: string, ...classnames) {
    return classNames(`${props.prefixCls || 'm-zhinanmao-select'}-${name}`, ...classnames);
  }

  function handleAnimationEnd() {
    setAnimateVisible(visible);
  }

  function handleClickInput() {
    setFirstClick(true);
    setVisible(true);
    setAnimateVisible(true);
    props.onVisibleChange && props.onVisibleChange(true);
  }

  function handleClickHide() {
    setVisible(false);
    props.onVisibleChange && props.onVisibleChange(false);
  }

  useEffect(() => {
    document.body.append(container.current);
    return function() {
      document.body.removeChild(container.current);
    };
  }, []);

  useEffect(() => {
    setVisible(props.visible || false);
  }, [props.visible]);

  function renderSelect() {
    if (!firstClick) return '';
    return ReactDOM.createPortal(
      <div
        onAnimationEnd={handleAnimationEnd}
        className={getClass('popover', {
          [getClass('popover-show')]: animateVisible,
        })}
      >
        <div
          className={getClass('popover-mask', {
            fadeIn: visible,
            fadeOut: !visible,
          })}
        />
        <div
          className={getClass('popover-overlay', {
            fadeInUp: visible,
            fadeOutDown: !visible,
          })}
        >
          <div className={getClass('popover-overlay-head')}>
            <div className={getClass('popover-overlay-cancel')} onClick={handleClickHide}>
              取消
            </div>
            <div className={getClass('popover-overlay-fill')} />
            <div className={getClass('popover-overlay-confirm')}>确定</div>
          </div>
          <OptionList items={props.items} />
        </div>
      </div>,
      container.current,
    );
  }

  return (
    <MainContext.Provider value={{ getClass }}>
      <div className={getClass('select')} onClick={handleClickInput}>
        {props.children}
      </div>
      {renderSelect()}
    </MainContext.Provider>
  );
};

export default Select;
