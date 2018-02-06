import React, { PureComponent } from 'react';

import {
    Text,
    View,
    FlatList,
    TouchableOpacity,
    TextInput
} from 'react-native'

/**
 * 采坑：1._renderItem方法中未用return，导致视图未能显示
 * 2.scrollToIndex报错未定义
 */

export default class ListViewTest extends PureComponent{
    dataContainer=[]

    constructor(props){
        super(props);
        this.state={
            sourceData:[],
            selected:(new Map(): Map<string, boolean>),
            refreshing:false,
            indexText: ''
        }
    }
    componentWillMount(){
        let newData=[];
        for (let i=0;i<10;i++){
           let obj={
               id:i,
               title:"sb"+i
           }
            newData.push(obj);
        }

        this.dataContainer=this.dataContainer.concat(newData)
        this.setState({
            sourceData:this.dataContainer,
        })
    }

    /**
     * 此函数用于为给定的item生成一个不重复的Key。
     * Key的作用是使React能够区分同类元素的不同个体，以便在刷新时能够确定其变化的位置，减少重新渲染的开销。
     * 若不指定此函数，则默认抽取item.key作为key值。若item.key也不存在，则使用数组下标
     *
     * @param item
     * @param index
     * @private
     */
    _keyExtractor=(item,index)=>item.id;

    _onPressItem = (id: string) => {
        // updater functions are preferred for transactional updates
        this.setState((state) => {
            // copy the map rather than modifying state.
            const selected = new Map(state.selected);
            selected.set(id, !selected.get(id)); // toggle
            return {selected};
        });
    };
    /**
     * 使用箭头函数防止不必要的re-render；
     * 如果使用bind方式来绑定onPressItem，每次都会生成一个新的函数，导致props在===比较时返回false，
     * 从而触发自身的一次不必要的重新render，也就是FlatListItem组件每次都会重新渲染。
     * @param item
     * @private
     */
    _renderItem =({item})=>{
        return ( <MyListView
            id={item.id}
            onPressItem={this._onPressItem}
            selected={!!this.state.selected.get(item.id)}
            title={item.title}
        />)


    }
    /**
     * 上拉加载更多
     * @private
     */
    _onEndReached = ()=> {
        let newData=[];
        let length = this.dataContainer.length;
        if (length>=100){
            return;
        }
        for (var i=length;i<length+10;i++){
            let obj={
                id:i,
                title:"sb"+i
            }
            newData.push(obj);
        }
        this.dataContainer=this.dataContainer.concat(newData);
        this.setState({
            sourceData: this.dataContainer
        });
    }
    /**
     * 下拉刷新
     * @private
     */
    _onRefresh=()=>{
        this.state.refreshing=true;
        setTimeout(()=>{
            this.state.refreshing=false;
        },3000);
    }
// 跳转到指定位置
    _doActionToItem = () => {
        this.flatList.scrollToIndex({ viewPosition: 0, index: this.state.indexText });
    };

// 跳转到内容最底端
    _doActionToBottom = () => {
        this.scrollToEnd();
    };
    // Header布局
    _renderHeader = () => (
        <View style={{ flexDirection:'row' }}>
            <TextInput
                style={{ height:50, flex:1 }}
                placeholder='请输入行号'
                onChangeText={ (text)=> {this.setState={ indexText: text }} }
            />
            <TouchableOpacity
                onPress={ this._doActionToItem }
                style={{ height:50, width:90, backgroundColor:'green', justifyContent:'center', alignItems:'center' }}
            >
                <Text style={{ color:'#fff' }}>跳转到指定行</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={ this._doActionToBottom }
                style={{ height:50, width:90, backgroundColor:'red', justifyContent:'center', alignItems:'center' }}
            >
                <Text style={{ color:'#fff' }}>跳转到底部</Text>
            </TouchableOpacity>
        </View>
    );

    // Footer布局
    _renderFooter = () => (
        <View style={{height:40,backgroundColor:'white',borderTopWidth:1,borderTopColor:'#000',margin:'auto',justifyContent:'center',alignItems: 'center' }}>
            <Text>Footer</Text></View>
    );

    // 自定义分割线
    _renderItemSeparatorComponent = ({highlighted}) => (
        <View style={{ height:1, backgroundColor:'#000' }}></View>
    );

    // 空布局
    _renderEmptyView = () => (
        <View><Text>EmptyView</Text></View>
    );

    render(){
        return (<FlatList
            extraData={this.state}
            data={this.state.sourceData}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
            // 决定当距离内容最底部还有多远时触发onEndReached回调；数值范围0~1，例如：0.5表示可见布局的最底端距离content最底端等于可见布局一半高度的时候调用该回调
            onEndReachedThreshold={0.1}
            //上拉加载
            onEndReached={this._onEndReached}
            //下拉刷新
            onRefresh={this._onRefresh}
            //设置刷新状态
            refreshing={this.state.refreshing}
            // ListHeaderComponent={ this._renderHeader }
            ListFooterComponent={ this._renderFooter }
            ItemSeparatorComponent={ this._renderItemSeparatorComponent }
            ListEmptyComponent={ this._renderEmptyView }
            getItemLayout={(data, index) => ( { length: 40, offset: (40 + 1) * index + 50, index } )}
        />);
    }
}

class MyListView extends PureComponent{
    _onPress = () => {
        this.props.onPressItem(this.props.id);
    };
    render(){
        return(
            <TouchableOpacity
                {...this.props}
                onPress={this._onPress}
                style={{ height: 40, justifyContent: 'center', alignItems: 'center',backgroundColor:'white' }}
                >
                <Text>{this.props.title}</Text>
            </TouchableOpacity>
        )
    }
}
