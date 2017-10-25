import {
    StackNavigator,
} from 'react-navigation';

import List from './src/pages/List.js';
import Detail from './src/pages/Detail.js';

const App = StackNavigator({ //利用导航栏生成界面
    List: {screen: List}, //电影列表页
    Detail: {screen: Detail}, //详情页
}, {
  headerMode: 'screen', //标题栏模式，内容连同标题栏一起改变
});

export default App; //导出App模块