import React from 'react'
import { withStyles } from '@material-ui/styles';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = {
  root: {
    width: '20%',
    height: '25%',
    margin: '0 auto',
    display: 'inline-block',
    position: 'relative',
    cursor: 'pointer',
    marginBottom: '-3.5px',
    '&:hover svg': {
      color: 'white',
      transform: 'scale(1.2)'
    }
  },
  boxContent: {
    position: 'absolute',
    left: '0px',
    bottom: '0px',
    padding: '10px',
    width: '100%',
    letterSpacing: '1px',
    textTransform: 'uppercase',

    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    color: 'rgba(0, 0, 0, 0.5)',
    fontSize: '12px',
  },
  deleteIcon: {
    transition: 'all 0.3s ease-in-out'
  }
}

const DraggableColorBox = (props) => {
  const { color:{name, color}, classes, handleClick } = props;
  return (
    <div className={classes.root} style={{backgroundColor: color}}>

      <div className={classes.boxContent}>
        <span>{name}</span>
        <DeleteIcon
          className={classes.deleteIcon}
          onClick={handleClick}
        />
      </div>

    </div>
  )
}

export default withStyles(styles)(DraggableColorBox);