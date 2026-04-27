import './App.css'
import Header from './components/header'
import NavBar from './components/navBar'
import Slides from './components/slides'

function App() {
  return (
    <>
      <Header></Header>
      <NavBar></NavBar>
      <div style={{height: '150vh'}}>
        <Slides></Slides>
      </div>
    </>
  )
}

export default App
