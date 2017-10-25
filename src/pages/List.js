import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    FlatList,
    ActivityIndicator
} from 'react-native';

import Item from '../components/item.js';

// import movies from './movies.json';

const api = 'http://api.douban.com//v2/movie/in_theaters'; //请求的api网址

//电影列表页
export default class List extends Component {
    static navigationOptions = { //页面标题
        // title: '列表页', //标题栏文字
        header: null, //隐藏标题栏
    };

    state = {
        // movies: movies.subjects, //默认电影数据为movies.json的本地数据
        movies: [], //默认电影数据为空数组
        refreshing: false, //当前是否在刷新，用于控制FlatList的下拉
        ready: false, //第一次数据是否加载完成
        childState: '', //子组件传回的数据
    };

    isRefreshing = false; //用于控制是否要刷新数据
    start = 0; //开始的页数
    count = 12; //每一次加载的数量

    fetchData = (start = 0, count = 12) => { //用于获取数据
        if (this.isRefreshing) { //当前在刷新，中断函数
            return;
        }

        this.setState({
            refreshing: true, //设置当前为刷新状态
        });

        this.isRefreshing = true; //设置数据正在刷新

        console.log('loading...');

        return fetch(`${api}?start=${start}&count=${count}`) //拼接请求的网址
            .then((response) => response.text())
            .then((responseText) => {
                const json = JSON.parse(responseText); //使用JSON对象解析json，出错时可以抛异常
                this.setState({
                    // movies: json.subjects, //使用网络电影数据替换本地数据
                    refreshing: false, //将FlatList的刷新状态设置为false
                });
                this.isRefreshing = false; //设置数据不在刷新
                return json; //返回json数据
            })
            .catch((error) => {
                console.error(error);
            })
    };

    // freshData = () => { //刷新数据
    //     this.fetchData().then(json => {
    //         this.setState({
    //             movies: json.subjects, //使用网络电影数据替换本地数据
    //         })
    //     })
    // };

    freshData = async () => { //刷新数据(异步写法)
        const json = await this.fetchData(); //获取电影数据
        console.log('json=' + json);
        this.setState({
            movies: json.subjects, //使用网络电影数据替换本地数据
        })
    };

    fetchMore = async () => {
        const json = await this.fetchData(this.start, this.count); //获取电影数据
        if (json) { //当json非空的情况下执行
            this.start += this.count; //设置当前最大下标加12
            this.setState({
                movies: this.state.movies.concat(json.subjects), //将原来数据和新数据拼接成一个新数组
            })
        }
    };

    async componentDidMount() { //组件挂载时调用的方法
        // setTimeout(() => {
        //     this.fetchData(); //获取数据
        // }, 3000);
        await this.fetchMore(); //加载更多数据，使用await后，下一行代码将等到await行执行完成后才会执行
        this.setState({
            ready: true, //设置第一次加载数据完成
        })
    }

    render() {
        const {movies, refreshing, ready, childState} = this.state; //从state中获取电影数据、是否在刷新
        const {navigate} = this.props.navigation; //获取导航工具

        return (
            <View>
                <Text>子组件传回的数据：{childState}</Text>
                {
                    ready ?
                        <FlatList
                            numColumns={3}
                            style={styles.row}
                            keyExtractor={item => item.id}
                            data={movies}
                            onRefresh={this.freshData}
                            onEndReached={this.fetchMore}
                            onEndReachedThreshold={0.001}
                            refreshing={refreshing}
                            ListFooterComponent={() => {
                                return refreshing && <ActivityIndicator size="large"/>
                            }}
                            renderItem={({item}) =>
                                <Item
                                    title={item.title}
                                    image={item.images.medium}
                                    stars={item.rating.stars}
                                    average={item.rating.average}
                                    onPress={() => navigate('Detail', {
                                        id: item.id,
                                        callback: (data) => {
                                            this.setState({
                                                childState: data
                                            })
                                        }
                                    })}
                                />
                            }
                        />
                        :
                        <ActivityIndicator size="large" style={styles.loading}/>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    row: {
        paddingHorizontal: 5,
    },
    loading: {
        marginTop: 250,
    }
});
