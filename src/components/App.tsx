import AppBar from './AppBar'

const App = () => (
  <div style={{
    backgroundColor: '#00000008',
    display: 'flex',
    justifyContent:'center',
    alignItems:'center',
    flexDirection: 'column',
  }}>
    <AppBar variant="temporary" /> 
    {/* <MainSection /> */}
  </div>
)

export default App