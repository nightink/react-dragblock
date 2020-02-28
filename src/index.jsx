import React, { useEffect, useRef } from 'react';

// import './index.less';

const DragBlock = (props) => {
  const {
    children,
    horizontal = false,
    vertical = false,
    disabled,
    defaultPosition,
    onChange,
  } = props;
  const dragblockEl = useRef(null);

  const obj = {};
  let active = false;
  const mouseDown = (e) => {
    obj.currentX = e.clientX;
    obj.currentY = e.clientY;
    active = true;
  };

  const mouseUp = (e) => {
    // 如果未激活 不应该执行鼠标事件
    if (!active) return;

    active = false;

    const nodeStyle = document.defaultView.getComputedStyle(dragblockEl.current);
    const x = parseInt(nodeStyle.left);
    const y = parseInt(nodeStyle.top);

    obj.currentX = e.clientX;
    obj.currentY = e.clientY;

    if (obj.x !==x || obj.y !== y) {
      obj.x = x;
      obj.y = y;
      onChange && onChange({
        x: parseInt(obj.x),
        y: parseInt(obj.y),
      });
    }
  }

  const mouseMove = (e) => {
    if (!active) return;

    const left = parseInt(obj.x) + e.clientX - obj.currentX;
    const top = parseInt(obj.y) + e.clientY - obj.currentY;

    let x = 0;
    let y = 0;
    if (left >= 0 && !vertical) {
      dragblockEl.current.style.left = left + 'px';
    }

    if (!horizontal) {
      dragblockEl.current.style.top = top + 'px';
    }

    // console.log(x, y, obj.left, e.clientX, obj.currentX);
  };

  useEffect(() => {
    if (disabled) return;

    const nodeStyle = document.defaultView.getComputedStyle(dragblockEl.current);
    const x = parseInt(nodeStyle.left);
    const y = parseInt(nodeStyle.top);
    obj.x = defaultPosition?.x || x;
    obj.y = defaultPosition?.y || y;

    window.document.addEventListener('mousemove', mouseMove);
    window.document.addEventListener('mouseup', mouseUp);

    return () => {
      window.document.removeEventListener('mousemove', mouseMove);
      window.document.removeEventListener('mouseup', mouseUp);
    };
  });

  const Children = React.Children.only(children);
  const classNameList = Children.props.className?.split(' ') || [];
  if (!disabled) {
    classNameList.push('react-dragblock');
  }

  return React.cloneElement(Children, {
    className: classNameList.join(' '),
    style: {
      ...Children.props.style,
      cursor: 'move',
      position: 'absolute',
      left: `${defaultPosition?.x}px`,
      top: `${defaultPosition?.y}px`,
    },
    ref: dragblockEl,
    onMouseDown: mouseDown,
  });

  // return (
  //   <div
  //     ref={dragblockEl}
  //     className="react-dragblock"
  //     onMouseDown={mouseDown}
  //     style={{
  //       left: `${defaultPosition?.x}px`,
  //       top: `${defaultPosition?.y}px`,
  //     }}
  //   >{children}</div>
  // );
}

export default DragBlock;
