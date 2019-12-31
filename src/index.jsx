import React, { useEffect, useRef } from 'react';

import './index.less';

const DragBlock = (props) => {
  const { children, horizontal = false, vertical = false, disabled, onChange } = props;
  const dragblockEl = useRef(null);

  const obj = {};
  let active = false;
  const mouseDown = (e) => {
    obj.currentX = e.clientX;
    obj.currentY = e.clientY;
    active = true;
  };

  const mouseUp = (e) => {
    active = false;

    obj.left = document.defaultView.getComputedStyle(dragblockEl.current).left;
    obj.top = document.defaultView.getComputedStyle(dragblockEl.current).top;
    obj.currentX = e.clientX;
    obj.currentY = e.clientY;

    onChange && onChange({
      left: parseInt(obj.left),
      top: parseInt(obj.left),
    });
  }

  const mouseMove = (e) => {
    if (!active) return;

    const left = parseInt(obj.left) + e.clientX - obj.currentX;
    const top = parseInt(obj.top) + e.clientY - obj.currentY;

    if (left >= 0 && !vertical) {
      dragblockEl.current.style.left = left + 'px';
    }

    if (!horizontal) {
      dragblockEl.current.style.top = top + 'px';
    }
  };

  useEffect(() => {
    if (disabled) return;

    obj.left = document.defaultView.getComputedStyle(dragblockEl.current).left;
    obj.top = document.defaultView.getComputedStyle(dragblockEl.current).top;

    window.document.addEventListener('mousemove', mouseMove);
    window.document.addEventListener('mouseup', mouseUp);

    return () => {
      window.document.removeEventListener('mousemove', mouseMove);
      window.document.removeEventListener('mouseup', mouseUp);
    };
  });

  return (
    <div
      className={ disabled ? '' : 'drag-block' }
      ref={dragblockEl}
      onMouseDown={mouseDown}
    >{children}</div>
  );
}

export default DragBlock;
