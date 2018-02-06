/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import TabNavigator from 'react-native-tab-navigator'
import NavigationBar from './widget/NavigationBar'
import ListViewTest from './app/page/ListViewTest'
import FetchTest from './app/page/FetchTest'
import {
  Platform,
  StyleSheet,
  Text,
    Image,
  View
} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


export default class App extends Component<{}> {
  constructor(){
    super();
    this.state={
        selectedTab:'精选'
    }
  }
  render() {
    return (
        <View style={styles.container}>
            <NavigationBar
                title={this.state.selectedTab.valueOf()}
                style={{backgroundColor:'red'}}
            />
            <TabNavigator>
                <TabNavigator.Item
                    selected={this.state.selectedTab === '精选'}
                    selectedTitleStyle={{color:'#5dc890'}}
                    title="精选"
                    renderIcon={() => <Image style={styles.img} source={require('./res/img/jinxuan_gray.png')} />}
                    renderSelectedIcon={() => <Image style={styles.img} source={require('./res/img/jinxuan_green.png')} />}
                    onPress={() => this.setState({ selectedTab: '精选' })}>
                    <ListViewTest/>
                </TabNavigator.Item>
                <TabNavigator.Item
                    selected={this.state.selectedTab === '书架'}
                    selectedTitleStyle={{color:'#5dc890'}}
                    title="书架"
                    renderIcon={() => <Image style={styles.img} source={require('./res/img/shujia_gray.png')} />}
                    renderSelectedIcon={() => <Image style={styles.img} source={require('./res/img/shujia_green.png')} />}
                    onPress={() => this.setState({ selectedTab: '书架' })}>
                    <FetchTest />
                </TabNavigator.Item>
                <TabNavigator.Item
                    selected={this.state.selectedTab === '发现'}
                    selectedTitleStyle={{color:'#5dc890'}}
                    title="发现"
                    renderIcon={() => <Image style={styles.img} source={require('./res/img/faxian_gray.png')} />}
                    renderSelectedIcon={() => <Image style={styles.img} source={require('./res/img/faxian_green.png')} />}
                    onPress={() => this.setState({ selectedTab: '发现' })}>
                    <View style={styles.page3}/>
                </TabNavigator.Item>
                <TabNavigator.Item
                    selected={this.state.selectedTab === '我的'}
                    selectedTitleStyle={{color:'#5dc890'}}
                    title="我的"
                    renderIcon={() => <Image style={styles.img} source={require('./res/img/wode_gray.png')} />}
                    renderSelectedIcon={() => <Image style={styles.img} source={require('./res/img/wode_green.png')} />}
                    onPress={() => this.setState({ selectedTab: '我的' })}>
                    <View style={styles.page4}/>
                </TabNavigator.Item>
            </TabNavigator>
        </View>

    );
  }
}

const styles = StyleSheet.create({
    container:{ flex: 1,
        backgroundColor:'gray'
    },
  page1:{
        flex: 1,
        backgroundColor:'red',
    },
    page2:{
        flex: 1,
        backgroundColor:'yellow',
    },
    page3:{
        flex: 1,
        backgroundColor:'green',
    },
    page4:{
        flex: 1,
        backgroundColor:'blue',
    },
    img:{
      width:22,
      height:22
    }

});
