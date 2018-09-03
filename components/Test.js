import { Text,View, StyleSheet, Button} from 'react-native'
import React from 'react'
import RandomNumber from './RandomNumber'
import shuffle from 'lodash.shuffle'
class Test extends React.Component{
    constructor(props)
    {
        super(props)
        
        this.state={
            disabled:[],
            remainingSeconds: this.props.remainingSecond
        }
        this.gameStatus='Playing'
        this.isNumberSelected=this.isNumberSelected.bind(this)
        this.selectNumber=this.selectNumber.bind(this)
        this.sumRandNum=this.sumRandNum.bind(this)
    }

    selectNumber =(numberIndex) => {
        this.setState( (preState)=>({
            disabled:[...preState.disabled,numberIndex]
        }))
    }
    isNumberSelected = (index) => {
        return this.state.disabled.indexOf(index)>=0;
    }
    // gameStatus: 
    calcGameStatus =(nextState) => {
        
        const sumSelected = nextState.disabled.reduce( (acc, curr)=> {  return acc+this.suffledRandomNumbers[curr]},0 )
       
        if(nextState.remainingSeconds===0){
            return 'Lost'
        }
        if(sumSelected<this.sumRandNum()){
            return 'Playing'
        }
        else if(sumSelected==this.sumRandNum()){
            return 'Win'
        }
        else if(sumSelected>this.sumRandNum()){
            return 'Lost'
        }else {
            return 'Err'
        }
       
    }
    
    componentWillUpdate(nextProps,nextState){
        if( nextState.disabled !== this.state.disabled || nextState.remainingSeconds===0){
                this.gameStatus=this.calcGameStatus(nextState); 
                
                if(this.gameStatus!=='Playing'){
                    clearInterval(this.interverId)
                }  
        }
        
    }
    
    componentDidMount(){
        this.interverId= setInterval( () => {
            this.setState((prevState) => {
                return { remainingSeconds: prevState.remainingSeconds -1}
            }, () => {
                if (this.state.remainingSeconds==0) {
                    clearInterval(this.interverId)
                }
                
            })
        }, 1000)

    }

    componentWillUnmount(){
        clearInterval(this.interverId)
    }
    randomNumbers=Array.from({length:this.props.num}).map(()=> 1 + Math.floor(Math.random()*10)) //1~10
    suffledRandomNumbers = shuffle(this.randomNumbers)
    sumRandNum(){ return this.randomNumbers.slice(0,this.props.num-2).reduce((a,b)=>a+b,0)}

    render(){
        const gameStatus= this.gameStatus;
        return (
            <View style={{margin:30}}>
            <View style={styles.sumView}>
                <Text style={[styles.sum,{marginTop:30},
                            styles[`STATUS_${gameStatus}`]]}>{this.sumRandNum()}</Text></View>
            <View style={styles.numView}>

                {this.suffledRandomNumbers.map((num,i)=>
                 <RandomNumber  key={i}  
                                 
                                num={num}
                                index={i}
                                isDisabled={(i)=>this.isNumberSelected(i)}
                                onPress={this.selectNumber}
                                >
                      
                </RandomNumber>
                )}
         
         
            </View>
                {/* <Button onPress={()=>()}></Button> */}
                <Text >{this.state.remainingSeconds}</Text>
            </View>
        )
    }
   
}


const styles = StyleSheet.create({
    sum: {
        fontSize:40,
        width:70
       
    },
    sumView:{
        //flexDirection:'row',
        //alignContent:'center'
        alignItems:'center'
    },
    num:{
        backgroundColor:'blue',
        fontSize:30,
        width:70,
        margin:30,
    /*     marginHorizontal:15,
        marginVertical:25 */
      //  justifyContent:'center'
    },
    numView:{

        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'space-around'
    },
    STATUS_Playing:{
        backgroundColor: 'grey',
    },
    STATUS_Win:{
        backgroundColor: 'green',
    },
    STATUS_Lost:{
        backgroundColor: 'red',
    },
    STATUS_Err:{
        backgroundColor: '#fff',
    }
  })

  export default Test