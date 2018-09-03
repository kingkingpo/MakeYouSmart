import { Text,View, StyleSheet, TouchableOpacity} from 'react-native'
import propTypes from 'prop-types'
import React from 'react'

class RandomNumber extends React.Component{
    constructor(props)
    {
        super(props)

    }
/*     static propTypes = {
        index: this.propTypes.number.isRequied,
        onPress: propTypes.func.isRequied,
        isDisabled: propTypes.func.isRequied,
        num: propTypes.number.isRequied
    } */
    

   onPress=()=>{
         this.props.onPress(this.props.index) 
   }

    render(){
        return (
            <TouchableOpacity onPress={this.onPress}  style={[{backgroundColor:'purple'},{marginBottom:10}] }>
                 <Text  style={[ styles.num, this.props.isDisabled(this.props.index) && styles.disabled ]}>{this.props.num}</Text>
                 
            </TouchableOpacity>        
        )
    }
   
}


const styles = StyleSheet.create({

    num:{
       
        fontSize:30,
        width:70,
        margin:30,

    },
    numView:{

        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'space-around'
    },
    disabled:{
        opacity:0.1
    }
  })

  export default RandomNumber



         