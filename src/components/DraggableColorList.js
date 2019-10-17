import React from 'react';
import { SortableContainer } from 'react-sortable-hoc';
import DraggableColorBox from './DraggableColorBox';

const DraggableColorList = SortableContainer((props) => {
  const { colors, removeColor } = props;
  return (
    <div style={{height: '100%', display: 'flex', flexWrap: 'wrap' }}>
      {colors.map((color, index) => (
        <DraggableColorBox
          index={index}
          key={color.name}
          color={color}
          handleClick={() => removeColor(color.name)}
        />
      ))}
    </div>
  )
})

export default DraggableColorList;