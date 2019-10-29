import chroma from 'chroma-js';
import sizes from './sizes';

export default {
  ColorBox: {
    width: '20%',
    height: props => props.showingFullPalette ? '25%': '50%',
    position: 'relative',
    cursor: 'pointer',
    transition: 'background 0.48s ease',
    '&:hover $copyButton': {
      opacity: 1,
      transition: '0.5s',
    },
    [sizes.down('lg')]: {
      width: '25%',
      height: props => props.showingFullPalette ? '20%': 'calc(100% / 3)',
    },
    [sizes.down('md')]: {
      width: '50%',
      height: props => props.showingFullPalette ? '10%': '20%',
    },
    [sizes.down('xs')]: {
      width: '100%',
      height: props => props.showingFullPalette ? '5%': '10%',
    },
  },
  textColor: {
    color: props => chroma.contrast(props.background, "black") < 6 ? 'rgba(255,255,255,0.95)' : 'rgba(0,0,0,0.85)'
  },
  seeMore: {
    background: 'rgba(255, 255, 255, 0.3)',
    position: 'absolute',
    border: 'none',
    right: '0px',
    bottom: '0px',
    width: '60px',
    height: '30px',
    textAlign: 'center',
    lineHeight: '30px',
    textTransform: 'uppercase',
  },
  copyButton: {
    /* Sizing */
    position: 'absolute',
    width: '100px',
    height: '30px',
    display: 'inline-block',
    /* Offset to center button */
    marginLeft: '-50px',
    marginTop: '-15px',
    top: '50%',
    left: '50%',
    /* Visual */
    border: 'none',
    background: 'rgba(255, 255, 255, 0.3)',
    fontSize: '1rem',
    lineHeight: '30px',
    textAlign: 'center',
    textTransform: 'uppercase',
    textDecoration: 'none',
    outline: 'none',
    opacity: '0',
  },
  boxContent: {
    position: 'absolute',
    padding: '10px',

    // Temp fix for horizontal
    // scrollbar due to long color names
    // width: '100%',
    // width: '80%',
    overflow: 'hidden',
    left: '0px',
    bottom: '0px',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    fontSize: '12px',
  },
  copyOverlay: {
    opacity: '0',
    zIndex: '0',
    width: '100%',
    height: '100%',
    transition: 'transform 0.6s ease-in-out',
    transform: 'scale(0.1)',
  },
  showOverlay: {
    position: 'absolute',
    opacity: '1',
    transform: 'scale(50)',
    zIndex: '10',
  },
  copyMessage: {
    position: 'fixed',
    left: '0',
    right: '0',
    top: '0',
    bottom: '0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',

    fontSize: '4rem',
    transform: 'scale(0.1)',
    opacity: '0',
    color: 'white',
    '& h1': {
      fontWeight: '400',
      textShadow: '1px 2px black',
      background: 'rgba(255, 255, 255, 0.2)',
      width: '100%',
      textAlign: 'center',
      marginBottom: '0',
      padding: '1rem',
      textTransform: 'uppercase',
      [sizes.down('xs')]: {
        fontSize: '6rem',
      }
    },
    '& p': {
      fontSize: '2rem',
      fontWeight: '100',
    }
  },
  showMessage: {
    opacity: '1',
    transform: 'scale(1)',
    zIndex: '25',
    transition: 'all 0.4s ease-in-out',
    transitionDelay: '0.1s',
  }
}