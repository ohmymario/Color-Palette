import sizes from './sizes';

export default {
  Navbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: '6vh',
  },
  logo: {
    marginRight: '15px',
    padding: '0 13px',
    fontSize: '22px',
    backgroundColor: '#eceff1',
    fontFamily: 'Roboto',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    '& a': {
      textDecoration: 'none',
      color: 'black',
    },
    [sizes.down('xs')]: {
      display: 'none',
    }
  },
  slider: {
    width: '340px',
    margin: '0 10px',
    display: 'inline-block',
    [sizes.down('md')]: {
      width: '300px',
    },
    [sizes.down('sm')]: {
      width: '130px',
    }
  },
  selectContainer: {
    marginLeft: 'auto',
    marginRight: '1rem',
  },
}