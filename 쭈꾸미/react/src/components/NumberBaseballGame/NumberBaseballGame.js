import React,{useState, useEffect} from 'react'
import {withRouter} from  'react-router-dom'

function NumberBaseballGame(props) {

    const [Ball, setBall] = useState(['','','',''])
    const [HomeRun, setHomeRun] = useState('')
    const [NewNumber, setNewNumber] = useState('')
    const [Result, setResult] = useState('')
    const [Numbers, setNumbers] = useState('')
    const [Game, setGame] = useState(false)

    let strike = 0;
    let ball = 0;

    useEffect(() => {
        console.log(Numbers)
    }, [Numbers])

    const startGameHandler = () => {
        setNumbers('')
        setBall(['','','',''])
        setNewNumber('')
        setHomeRun('')
        setResult('')
        randomNumber()
        randomNumber()
        setGame(true)
    }

    const onClickButton = (e) => {

        e.preventDefault()

        if(!Number(NewNumber) || NewNumber.length !== 4){
            alert("4자리 숫자를 입력하세요.");
            setNewNumber('')
            return;
        }else{ 
            console.log(Numbers);
            for(let i=0;i<4;i++){
                if (NewNumber[i] === Numbers[i]){
                    strike += 1;

                    Ball[i] = NewNumber[i] 
                    setBall(Ball)
                }else{
                    for(let j=0;j<4;j++){
                        if(NewNumber[i] === Numbers[j]){
                            ball += 1;
                        }
                    }
                }
            }
            setResult(Result + NewNumber + ' ' + strike + 's '+ ball + 'b' +'\n')
            if(strike === 4){
                setHomeRun("HomeRun!")
                setGame(false)
            }
            strike = 0;
            ball = 0;
            setNewNumber('')
        }  
    }

    const randomNumber = () => {

        let tmp = ''

        while(tmp.length !== 4){ 
            let flag = false;
            let num = Math.floor(Math.random() * 10);
            for(let i=0 ; i < tmp.length ; i+=1){
                if(String(num) === tmp[i]){
                    flag = true;
                    break;
                }
            }
            if(flag !== true){tmp = tmp + num}
        }
        setNumbers(tmp)
    }

    return (
        <>
        <div className="game" style={{backgroundColor:'rgb(255, 179, 179)'}}>
            <h1>숫자야구 게임</h1>
            <span className="homerun" style={{color:'red', fontSize:'1.2rem'}}>{HomeRun}</span>
            <div className="balls">
                <div className="ball"><span>{Ball[0]}</span></div>
                <div className="ball"><span>{Ball[1]}</span></div>
                <div className="ball"><span>{Ball[2]}</span></div>
                <div className="ball"><span>{Ball[3]}</span></div>
            </div>
            {
                Game && 
                <form onSubmit={onClickButton} style={{marginBottom:'10px'}}>
                    <input placeholder={"숫자를 입력하세요."} onChange={(e)=>{setNewNumber(e.target.value)}} value={NewNumber}></input>
                    <button onClick={onClickButton}>클릭</button>
                </form>
            }
            <div className="result" style={{maxHeight:'100px', overflow:'scroll', margin:'10px'}}>
            {
                Result.split('\n').map(line => (
                    <>
                        <span>{line}</span>
                        <br/>
                    </>
                ))
            }
            </div>
            {
                Game?<div className="mainBtn NBGbtn" onClick={startGameHandler}>재시작</div>
                :<div className="mainBtn NBGbtn" onClick={startGameHandler}>시작</div>
            }
            <span></span>
        </div>
        {/* <div className="mainBtn" 
            style={{marginTop:'20px',backgroundColor:'pink'}} 
            onClick={()=>{props.history.push('/')}}>메인으로</div> */}
        </>
    )
}

export default withRouter(NumberBaseballGame)
