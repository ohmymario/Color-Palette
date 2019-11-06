import sizes from './sizes';

const styles = {
  root: {
    width: '20%',
    height: '25%',
    display: 'inline-block',
    position: 'relative',
    cursor: 'pointer',
    '&:hover svg': {
      color: 'white',
      transform: 'scale(1.2)'
    },
    [sizes.down('lg')]: {
      width: '25%',
      height: '20%',
    },
    [sizes.down('md')]: {
      width: '50%',
      height: '10%',
    },
    [sizes.down('sm')]: {
      width: '100%',
      height: '5%',
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

export default styles;