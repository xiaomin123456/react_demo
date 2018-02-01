import React,{Component} from 'react'
import PropTypes from 'prop-types';
import {
    Platform,
    StyleSheet,
    Text,
    Image,
    View,
    StatusBar
} from 'react-native'


const NAV_BAR_ANDROID_HEIGHT=50;
const NAV_BAR_IOS_HEIGHT=44;
const STATU_BAR_HEIGHT=20;
const StatusBarShape={
    backgroundColor:PropTypes.string,
    barStyle:PropTypes.oneOf('default', 'light-content', 'dark-content' ),
    hidden:PropTypes.bool
}

 class NavigationBar  extends Component <{}>{
    static  propTypes={
        style:View.propTypes.style,
        title:PropTypes.string,
        titleView:PropTypes.element,
        hide:PropTypes.bool,
        leftButton:PropTypes.element,
        rightButton:PropTypes.element,
        statusBar: PropTypes.shape()

    }
    static defaultProps={
        statusBar:{
            barStyle:'light-content',
            hidden:false
        }
    }
    constructor(props){
        super(props);
        this.state={
            title:'',
            hide:false
        }
    }

    render(){
        let statusBar=<View style={[styles.statusBar,this.props.statusBar]}>
            <StatusBar  {...this.props.statusBar}/>
        </View>
        let titleView=this.props.titleView?this.props.titleView:<Text style={styles.title}>{this.props.title}</Text>;
        let content=<View style={styles.navbar}>
                {this.props.leftButton}
                <View style={styles.titleViewContainer}>
                    {titleView}
                </View>

                {this.props.rightButton}
                </View>;
                return(
                <View style={[styles.container,this.props.style]}>
                    {statusBar}
                    {content}
                </View>
                );
    };
}
const styles=StyleSheet.create({
    container:{
       backgroundColor:'gray'
    },

    navbar:{
        //主轴：水平轴
        flexDirection:'row',
        //子元素沿着主轴的排列方式
        justifyContent:'space-between',
        //子元素沿着次轴的排列方式
        alignItems:'center',
        backgroundColor:'red',
        height:Platform.OS==='ios'?NAV_BAR_IOS_HEIGHT:NAV_BAR_ANDROID_HEIGHT,

    },
    titleViewContainer:{
        justifyContent:'center',
         alignItems:'center',
        position:'absolute',
        left:40,
        right:40,
        top:0,
        bottom:0,
    },
    title:{
        fontSize:20,
        color:'white'
    },
    statusBar:{
        height:Platform.OS==='iso'?STATU_BAR_HEIGHT:0,
    }

});
export default  NavigationBar;

