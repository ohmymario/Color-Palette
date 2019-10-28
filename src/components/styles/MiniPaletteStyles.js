export default {
  root: {
    background: 'white',
    border: '1px solid black',
    borderRadius: '5px',
    padding: '0.5rem',
    position: 'relative',
    overflow: 'hidden',
    cursor: 'pointer',
    '&:hover $deleteIcon': {
      opacity: 1,
    }
  },
  colors: {
    backgroundColor: '#DAE1E4',
    height: '150px',
    width: '100%',
    borderRadius: '5px',
    overflow: 'hidden',
    display: 'flex',
    flexWrap: 'wrap',
    alignContent: 'flex-start',
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
  },
  delete: {

  },
  deleteIcon: {
    color: 'white',
    backgroundColor: '#dd3d30',
    width: '20px',
    height: '20px',
    position: 'absolute',
    right: '0px',
    top: '0px',
    padding: '10px',
    zIndex: 10,
    opacity: 0,
    transition: 'all 0.2s ease-in-out',
  },

}