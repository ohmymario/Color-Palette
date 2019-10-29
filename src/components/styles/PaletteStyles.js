import sizes from './sizes';

export default {
  Palette: {
    height: '100vh',
    // overflow: 'hidden',
  },
  PaletteColors: {
    height: '90vh',
    display: 'flex',
    flexWrap: 'wrap',
    alignContent: 'flex-start',
  },
  PaletteFooter: {
    backgroundColor: 'white',
    height: '4vh',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    fontWeight: 'bold',
  },
  emoji: {
    fontSize: '1.5rem',
    margin: '0 1rem',
  },
  goBack: {
    backgroundColor: 'black',
    width: '20%',
    height: '50%',
    position: 'relative',
    cursor: 'pointer',
    '& a': {
      color: 'white',
      border: 'none',
      background: 'rgba(255, 255, 255, 0.3)',
      position: 'absolute',
      width: '100px',
      height: '30px',
      display: 'inline-block',
      top: '50%',
      left: '50%',
      marginLeft: '-50px',
      marginTop: '-15px',
      textAlign: 'center',
      outline: 'none',
      fontSize: '1rem',
      lineHeight: '30px',
      textTransform: 'uppercase',
      textDecoration: 'none',
    },
    [sizes.down('lg')]: {
      width: '25%',
      height: 'calc(100% / 3)',
    },
    [sizes.down('md')]: {
      width: '50%',
      height: '20%',
    },
    [sizes.down('xs')]: {
      width: '100%',
      height: '10%',
    }
  }
}