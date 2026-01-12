
import './App.css'
import Left from './home/left/left'
import Right from './home/right/right'
function App() {

  return (
    <>
      <div className="flex h-screen w-screen overflow-hidden bg-slate-900 text-white">
        <Left />
        <Right />
      </div>
    </>
  )
}

export default App
