import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';

//详情页
export default class Cinemas extends Component {
    static navigationOptions = { //页面标题
        title: '我的电影',
        header: null, //隐藏标题栏
    };
    render() {
        const {state, goBack} = this.props.navigation; //获取导航工具的状态

        return (
            <View>
                <Text>我的电影</Text>
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
