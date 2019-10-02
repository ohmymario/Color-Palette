export default {
  root: {
    background: 'white',
    border: '1px solid black',
    borderRadius: '5px',
    padding: '0.5rem',
    position: 'relative',
    overflow: 'hidden',
    '&:hover': {
      cursor: 'pointer',
    }
  },
  colors: {
    backgroundColor: '#DAE1E4',
    height: '150px',
    width: '100%',
    borderRadius: '5px',
    overflow: 'hidden',
    display: 'flex',
    flexWrap: 'wrap'
  },
  title: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '0',
    color: 'black',
    paddingTop: '0.5rem',
    fontSize: '1rem',
    position: 'relative',
  },
  emoji: {
    marginLeft: '0.5rem',
    fontSize: '1.2rem',
  },
  miniColor: {
    height: '25%',
    width: '20%',
    position: 'relative',
  }
}