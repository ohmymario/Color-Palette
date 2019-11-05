import sizes from './sizes';

export default {
  root: {
    backgroundColor: 'blue',
    height: '100vh',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  container: {
    // Entire Container is half of the root element
    width: '50%',
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    flexWrap: 'wrap',
    [sizes.down('xl')]: {
      width: '80%',
    },
    [sizes.down('xs')]: {
      width: '75%',
    }
  },
  nav: {
    color: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    '& a': {
      textDecoration: 'none',
      color: 'white',
    },
  },
  palettes: {
    // 3 Boxes per Row
    boxSizing: 'border-box',
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 30%)',
    gridGap: '2.5rem',
    [sizes.down('md')]: {
      // 2 Boxes per Row
      gridTemplateColumns: 'repeat(2, 50%)',
      gridGap: '1rem',
    },
    [sizes.down('xs')]: {
      // 1 Box per Row
      gridTemplateColumns: 'repeat(1, 100%)',
      gridGap: '1rem',
    }
  },
};
