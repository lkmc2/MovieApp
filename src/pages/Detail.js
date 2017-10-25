import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';

//详情页
export default class Detail extends Component {
    static navigationOptions = { //页面标题
        title: '详情页',
    };
    render() {
        const {state, goBack} = this.props.navigation; //获取导航工具的状态

        return (
            <View>
                <Text>电影详情页</Text>
                <Text>电影id：{state.params.id}</Text>
                <Text onPress={() => {
                    state.params.callback('You are my everything');
                    goBack();
                }}>返回</Text>
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
