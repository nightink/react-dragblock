
import React, { useEffect } from 'react';

import './index.less';

const DragBlock = (props) => {
  const { children, disabled, onChange } = props;

  const obj = {};
  let active = false;
  const mouseDown = (e) => {
    obj.currentX = e.clientX;
    active = true;
  };

  const mouseUp = (e) => {
    active = false;

    const db = window.document.querySelector('.drag-block');
    obj.left = document.defaultView.getComputedStyle(db).left;
    obj.currentX = e.clientX;

    onChange && onChange({
      left: parseInt(obj.left),
    });
  }

  const mouseMove = (e) => {
    if (!active) return;

    const left = parseInt(obj.left) + e.clientX - obj.currentX;
    if (left < 0) return;

    const db = window.document.querySelector('.drag-block');
    db.style.left = left + 'px';
  };

  useEffect(() => {
    if (disabled) return;

    const db = window.document.querySelector('.drag-block');
    obj.left = document.defaultView.getComputedStyle(db).left;

    window.document.addEventListener('mousemove', mouseMove);
    window.document.addEventListener('mouseup', mouseUp);

    return () => {
      window.document.removeEventListener('mousemove', mouseMove);
      window.document.removeEventListener('mouseup', mouseUp);
    };
  }, []);

  return (
    <div
      className={ disabled ? '' : 'drag-block' }
      onMouseDown={mouseDown}
    >{children}</div>
  );
}

export default DragBlock;
