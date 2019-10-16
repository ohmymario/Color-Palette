import React from 'react';
import { SortableContainer } from 'react-sortable-hoc';
import DraggableColorBox from './DraggableColorBox';

const DraggableColorList = SortableContainer((props) => {
  const { colors, removeColor } = props;
  return (
    // need these styles
    // height: 100%;
    // display: flex;
    // flex-wrap: wrap;
    <div style={{height: '100%'}}>
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