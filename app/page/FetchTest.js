import React from 'react'

import {
    Text,
    View,
} from 'react-native'

/**
 *关于Fetch的基本用法
 * 1.get/post请求：fetch(url,{
 *                      header:POST,
 *                      method:{
 *                          'Accept':'application/json',
 *                          'Content-type':'application/json'
 *                      },
 *                      body:Json.stringify(result)
 *                  })
 *                  .then(response=>response.json())
 *                  .then(result=>{
 *                       //更新处理
 *                  }).catch(error=>{
 *                       //异常处理
 *                  })
 *
 *
 */
export default class FetchTest extends React.Component{
    constructor(props){
        super(props);
        this.state={
            result:'',
        }
    }
    submit(url,data){
      fetch(url,{
          method:'POST',
          header:{
              'Accept':'application/json',
              'Content-type':'application/json'
          },
          body:JSON.stringify(data)
      })
          .then(response=>response.json())
          .then(result=>{

              this.setState({
                  result:JSON.stringify(result)
              })
          })
          .catch(error=>{
              this.setState({
                  result:JSON.stringify(error)
              })
          })
    }

    getdata(url){
        fetch(url)
            .then(response=>response.json())
            .then(result=>{
                this.setState({
                    result:JSON.stringify(result)
                })
            })
            .catch(error=>{
                this.setState({
                    result:JSON.stringify(error)
                })
            })
    }
    render(){
        return (
            <View>
                <Text onPress={()=>this.submit('http://rap2api.taobao.org/app/mock/5418/POST/submit',{
                    userName:'xiaomin', password:'123456'})} >发送Post请求</Text>
                <Text onPress={()=>this.getdata('http://rap2api.taobao.org/app/mock/5418/GET/Info')}>发送GET请求</Text>
                <Text>返回结果:{this.state.result}</Text>
            </View>
        );
    }
}