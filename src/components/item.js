import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    TouchableOpacity,
} from 'react-native';

const {width, height} = Dimensions.get('window'); //获取屏幕宽高

const thirdWidth = width / 3; //三分之一的宽度

const imageWidth = thirdWidth - 10 * 2; //图片宽度

const imageHeight = imageWidth / 0.697; //图片高度，0.697是宽高比，300 / 429

// export default class Item extends Component<{}> {
//     render() {
//         const {title, image} = this.props;
//
//         return (
//             <View style={styles.container}>
//                 <Image
//                     source={{uri: image}}
//                     style={styles.image}/>
//                 <Text
//                     numberOfLines={1}
//                     style={styles.title}>{title}</Text>
//             </View>
//         );
//     }
// }

//参数stars是字符串 35表示有三颗星，都是满星；40表示有四颗星，但是最后一颗只到一半
const renderStars = (stars, average) => { //星星控件
    // if (stars === '00') { //数据等于00
    //     return; //相当于返回undefined
    // }

    const total = 5; //星星的数量5个
    let full, half, empty; //满星、半颗星、空星
    full = parseInt(stars[0]) - 1;

    if (stars[1] ===  '5') {
        full++;
        half = 0;
        empty = total - full;
    } else {
        half = 1;
        empty = total - full - half;
    }

    const results = [];

    let i;
    for (i = 0; i < full; i++) { //放满格的星星
        results.push(
            <Image
                key={i}
                style={styles.stars}
                source={require('../img/star-full.png')}
            />
        );
    }

    if(half) { //放半格的星星（当half等于0时，为假；等于1时为真）
        results.push(
            <Image
                key={i}
                style={styles.stars}
                source={require('../img/star-half.png')}
            />
        );
    }

    let j;
    for (j = 0; j < empty; j++) { //放空星星
        results.push(
            <Image
                key={i + j + 1}
                style={styles.stars}
                source={require('../img/star-empty.png')}
            />
        );
    }

    results.push(
        <Text
            key={i + j + 1}
            style={styles.text}>{average}
        </Text>
    );

    return (
        <View style={styles.starsWrapper}>
            {results}
        </View>
    )
};

const Item = (props) => { //改成无状态组件，纯函数组件
        const {title, image, stars, average, onPress} = props;

        //由于View没有onPress事件，所以引入TouchableOpacity
        return (
            <TouchableOpacity style={styles.container} onPress={onPress}>
                <Image
                    source={{uri: image}}
                    style={styles.image}/>
                <Text
                    numberOfLines={1}
                    style={styles.title}>{title}</Text>
                {renderStars(stars, average)}
            </TouchableOpacity>
        );
};

export default Item; //导出Item组件

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        width: imageWidth,
        marginLeft: 15,
    },
    image: {
        width: imageWidth,
        height: imageHeight,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 5,
    },
    stars: {
        width: 10,
        height: 10,
    },
    starsWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    text: {
        marginLeft: 5,
        color: '#ffc219',
    },
});
