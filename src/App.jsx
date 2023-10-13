import {useState, useCallback, useEffect, useRef} from 'react'
import './App.css'


function App() {

 const [length, setLength] = useState(8)
 const [numbers,setNumbers] = useState()
 const [characters,setCharacters] = useState()
 const [password,setPassword] = useState("")

 const passwordRef = useRef(null)

 let passwordGenerators = useCallback(() => {
  let pass = ""
  let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
  
  if(numbers) str += "0123456789"
  if(characters) str += "~!@#$%^&*()_+"
  
  for (let i = 1; i <= length; i++ ){
    let char = Math.floor(Math.random() * str.length +1)
    pass += str.charAt(char)
  }
  setPassword(pass)

}, [length, numbers, characters, setPassword])

const copyPasswordToClipboard = useCallback(()=>{
  passwordRef.current?.select()
  window.navigator.clipboard.writeText(password)
}, [password])
 
useEffect(() =>{
  passwordGenerators()
}, [length,numbers, characters, passwordGenerators])

  return (
    <>
     <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-white border-4 bg-gray-700'>
      <h1 className='text-white text-center my-3' >Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4 text-black font-bold'>
        <input 
        type='text' 
        value={password}
        className='outline-none w-full py-1 px-3'
        placeholder='password'
        readOnly
        ref={passwordRef}
        />
        <button onClick={copyPasswordToClipboard} className='outline-none bg-green-700 text-white px-3 py-0.5 shrink-0 hover:bg-purple-700'> copy </button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input
          type='range'
          min={6}
          max={100}
          value={length}
          className='cursor-pointer'
          onChange={(e) => {setLength(e.target.value)}}
          />
          <label>Length: {length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input 
          type='checkbox'
          defaultChecked={numbers}
          id="numberinput"
          onChange={()=>{
            setNumbers((prev) => !prev);
          }}
          />
          <label htmlFor='numberinput'>Numbers</label>
        </div>

        <div className='flex items-center gap-x-1'>
          <input 
          type='checkbox'
          defaultChecked={characters}
          id="characterinput"
          onChange={()=>{
            setCharacters((prev) => !prev);
          }}
          />
          <label htmlFor='characterinput'>Charcters</label>
        </div>

      </div>
     </div>
    </>
  )
}

export default App
