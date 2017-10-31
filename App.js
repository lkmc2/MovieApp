import {
    StackNavigator,
    TabNavigator,
} from 'react-navigation';

import List from './src/pages/List.js';
import Detail from './src/pages/Detail.js';
import Cinemas from './src/pages/Cinemas.js';
import MyMovies from './src/pages/MyMovies.js';

const MyTab = TabNavigator({ //利用导航底栏生成界面
    List: {screen: List}, //电影列表页
    Cinemas: {screen: Cinemas}, //影院页
    MyMovies: {screen: MyMovies}, //我的电影页
}, {
    tabBarPosition: 'bottom',
    animationEnabled: true,
    tabBarOptions: {
        activeTintColor: '#0390EB',
        inactiveTintColor: '#fff',
        labelStyle: {
            fontSize: 16,
        },
        style: {
            backgroundColor: '#222',
        },
    },
});

const App = StackNavigator({ //利用标题导航栏生成界面
    Home: {screen: MyTab}, //底栏生成的界面
    Detail: {screen: Detail}, //详情页
}, {
  headerMode: 'screen', //标题栏模式，内容连同标题栏一起改变
});

export default App; //导出App模块