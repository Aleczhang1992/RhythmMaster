import './js/libs/weapp-adapter'  //导入了小游戏官方提供的适配器，用于注入canvas以及模拟DOM以及BOM
import './js/libs/symbol'  //导入symbol的polyfill，主要用于模拟ES6类的私有变量
/****
 * 
 ES 6 新的数据类型 
 * *****/

import Main from './js/main'//导入Main类并实例化Main

new Main()
