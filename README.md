# react-dragblock

react drag block

## use

```jsx
import DragBlock from 'react-dragblock';

// ...

<DragBlock onChange={obj => console.log(obj.left)}>
  <div
    style={{
      width: '100px',
      padding: '4px',
      backgroundColor: '#a09c9c',
      color: '#fff',
    }}
  >来啊～拽我啊</div>
</DragBlock>
```

## API

| 参数 | 说明 | 类型 | 默认值 | 注意 |
| ---- | ---- | ---- | ------ | ---- |
| disabled | 禁止拖拽 | boolean | false | 无 |
| horizontal | 仅水平方向拖拽 | boolean | false | 无 |
| vertical | 仅垂直方向拖拽 | boolean | false | 无 |
| defaultPosition | 设置默认定位 | object{ x, y } | { x: 0, y: 0 } | 无 |
| onChange | 拖拽停止，会触发 onChange 函数 | Function({ left }) | 无 | 无 |
