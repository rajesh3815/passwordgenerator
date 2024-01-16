import React from 'react'
import { useEffect } from 'react';
import { useState, useCallback, useRef } from 'react'
import "./App.css"
const App = () => {
  const [length, setLength] = useState(8);
  const [isNum, setIsNum] = useState(false);
  const [isChar, setIsChar] = useState(false);
  const [pwd, setPwd] = useState("");

  let inps = useRef()
  let btns = useRef()
  const passwordGenerator = useCallback(() => {
    let str = "";
    let password = "";
    str += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    isNum ? str += "123456789" : ""
    isChar ? str += "!@#$%^&*(){}[]|\~`" : ""
    for (let i = 0; i < length; i++) {
      let rand = Math.floor((Math.random() * str.length + 1))
      password += str.charAt(rand);
    }
    setPwd(password)
  }, [length, isNum, isChar, setPwd])

  useEffect(() => { passwordGenerator() }, [length, isChar, isNum, passwordGenerator])
  return (
    <>
      <div className='w-full max-w-md mx-auto  shadow-md 
     rounded-lg px-4 my-8 text-orange-500 bg-gray-600 flex flex-col justify-center align-middle'
      >
        <div>
          <div className='flex shadow rounded-lg overflow-hidden mb-4 my-5'>
            <input
              type='text'
              value={pwd}
              className='w-full py-1 px-3 h-full'
              placeholder='password'
              ref={inps}
              readOnly
            ></input>
            <button
              onClick={() => {
                inps.current?.select();
                // inps.current?.setSelectionRange(0,4)
                window.navigator.clipboard.writeText(pwd)
              }}
              className='btn'
            >copy</button>
          </div>

          <label htmlFor="checkbox" className='px-2'>
            <input type="checkbox"
              name="checkbox"
              defaultChecked={isNum}
              onChange={() => { setIsNum((prev) => !prev) }} />
            Numbers
          </label>

          <label htmlFor="checkbox" className='px-2'>
            <input type="checkbox"
              name="checkbox"
              defaultChecked={isChar}
              onChange={() => { setIsChar((prev) => !prev) }}

            />
            Charecters
          </label>
          <label htmlFor="" className='px-1 '>length({length})
            <input type='range' min={8} max={100}
              value={length} className='cursor-pointer'
              onChange={(e) => { setLength(e.target.value) }}></input>
          </label>

        </div>

      </div>

    </>
  )
}

export default App