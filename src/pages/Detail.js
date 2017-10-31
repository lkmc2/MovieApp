import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    ActivityIndicator,
    AsyncStorage,
    TouchableOpacity,
    Linking,
} from 'react-native';

const api = 'https://api.douban.com/v2/movie/subject'; //请求网址

//详情页
export default class Detail extends Component {
    static navigationOptions = { //页面标题
        title: '详情页',
    };

    state = {
        data: {}, //空对象的子属性不会报错
        ready: false, //数据是否准备好
        videoUri: '', //预告片网址
    };

    async componentDidMount() {
        const {state: {params: {id}}} = this.props.navigation; //获取导航工具的状态

        let textData, jsonData;

        textData = await AsyncStorage.getItem(id); //根据key获取在数据库存储的信息

        if (textData) { //数据非空
            // alert('数据来自本地');
        } else { //数据为空
            // alert('数据来自网络请求');
            const rawData = await fetch(`${api}/${id}`); //请求获取数据
            textData = await rawData.text(); //将数据文本化
        }

        // title. summary
        // "images": {
        //     "small": "http://img3.doubanio.com/view/photo/s_ratio_poster/public/p494268647.webp",
        //     "large": "http://img3.doubanio.com/view/photo/s_ratio_poster/public/p494268647.webp",
        //     "medium": "http://img3.doubanio.com/view/photo/s_ratio_poster/public/p494268647.webp"
        // },

        //反序列化
        jsonData = JSON.parse(textData); //将数据文本json化
        jsonData.image = jsonData.images.large.replace('webp', 'jpg'); //将图片网址后缀替换成jpg，赋值给image属性

        //序列化
        // const textData = JSON.stringify(jsonData); //将json对象序列化
        AsyncStorage.setItem(id, textData); //将网页数据存入数据库，key为id号

        this.setState({
            data: jsonData, //设置数据
            ready: true, //标记数据已准备好
        });

        this.fetchVideo(jsonData.mobile_url); //获取预告片视频
    }

    fetchVideo = async (mobile_url) => { //获取预告片视频
        let pageHtml = await fetch(mobile_url); //获取该网页html代码
        pageHtml = await pageHtml.text(); //将网页代码变成纯文本

        const regex = /href="([\w|\W]*\.mp4)"/; //正则表达式
        const result = pageHtml.match(regex); //使用正则表达式获取html中的视频网址

        if (result && result[1]) { //如果视频网址存在，并且第二个结果存在
            const videoUrl = result[1]; //获取网址中的第二个值
            this.setState({
                videoUri: videoUrl //设置预告片网址为获取的第二个网址
            })
        }
    };

    playVideo = () => { //播放视频
        const {videoUri} = this.state; //获取预告片网址
        if (videoUri) { //网址存在
            Linking.openURL(videoUri); //播放该预告片
        } else {
            alert('正在获取预告片地址，请稍后再试');
        }
    };

    render() {
        const {data: {title, summary, image}, ready} = this.state; //取出状态中的属性
        // const {state, goBack} = this.props.navigation; //获取导航工具的状态

        return (
            <View>
                {/*是否已准备好数据*/}
                {
                    ready ?
                        <View>
                            <TouchableOpacity onPress={this.playVideo}>
                                <Image source={{uri: image}} style={styles.image}>
                                    <Image source={require('../img/play-icon.png')} style={styles.play}/>
                                </Image>
                            </TouchableOpacity>
                            <Text>{title}</Text>
                            <Text>{summary}</Text>
                        </View>
                        :
                        <ActivityIndicator size="large" style={styles.loading}/> //进度条
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    loading: {
        marginTop: 250,
    },
    image: {
        width: 150,
        height: 222,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'visible',
        zIndex: 1,
    },
    play: {
        width: 107,
        height: 107,
        position: 'absolute',
        right: -30,
        bottom: -30,
    },
});
