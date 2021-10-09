import React from 'react'
import {useState, useEffect} from 'react';
import { ProgressBar } from 'react-bootstrap';

function WordChainGame() {

  const [Text, setText] = useState('')
  const [Words, setWords] = useState([])
  const [Time, setTime] = useState(10)
  const [LastWord, setLastWord] = useState('')
  const [Switch,setSwitch] = useState(false)
  const [MSG, setMSG] = useState('단어를 입력해서 시작!')

  useEffect(() => {
    if(Switch){
      const tId = setInterval(() => {
        if(Time === 0){
          console.log('Game Over!')
          clearInterval(tId)
          alert("게임이 종료 되었습니다.")
          init();
          return
        }
        setTime(parseInt(Time)-1);
      },1000)

      return () => {
        clearInterval(tId)
      }
  }
}, [Time, Switch])

const init = () =>{
  setText('')
  setLastWord('')
  setMSG('단어를 입력해서 시작!')
  setWords([])
  setSwitch(false)
  setTime(10)
}

const onSubmit = (e) => {
  e.preventDefault();

  if(Switch === false){
    setSwitch(true)
  }

  //입력한 글씨가 3글자가 아님
  if(Text.length !== 3){
    setMSG("3글자를 입력해 주세요.")
    setText('')
    return
  }
  //이전 단어 끝 글자와 일치하지 않음
  if(LastWord.length>0 && LastWord[LastWord.length-1] !== Text[0]){
    setMSG("틀렸습니다.")
    setText('')
    return
  }
  
  if(Words.includes(Text)){
    setMSG("이미 사용된 단어입니다.")
    setText('')
    return
  }

  setLastWord(Text)
  const arr = Words.concat([Text])
  setWords(arr)
  setText('')
  setMSG('')
  setTime(10)
}

    return (
       <div className="game">
        <h1>쿵쿵따 게임</h1>
        <span className="timer">{Time>0 ? Time : "Time Out!"}</span>
        <ProgressBar style={{width:'73%'}}variant="danger" now={Time * 10} />
        <form onSubmit={onSubmit}>
          <input placeholder={"단어를 입력하세요."} onChange={(e)=>{setText(e.target.value)}} value={Text}></input>
          <button>클릭</button>
        </form>
          <span style={{height:'20px',color:"red",fontWeight:'500',marginBottom:'5px'}}>{MSG}</span>
          <div style={{width:"300px"}}>
            {Words.map((data,idx)=>(
              <span key={idx}>{`${data} > `}</span>
            ))}
          </div>
        </div>
    )
}

export default WordChainGame
