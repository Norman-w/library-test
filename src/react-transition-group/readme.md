####2021年05月30日09:08:38
本测试还同时包含了styled-component的写法.我很不喜欢这种写法.

`import styled from "styled-components";
 import PropTypes from 'prop-types'
 import {CSSTransition} from 'react-transition-group'`
 这三个组件都是需要yarn add xxx的.
 
 https://reactcommunity.org/react-transition-group/
 这里是官方文档,我使用它是因为可能我需要用到这里面的`CSSTransition`
 他可以很方便的从两个css执行过度效果
 
 这样的过度效果可以很方便的在js文件中判断逻辑,然后在js中使用CSSTransition来切换视图类
 
 比如我要在一个组件中包含多个listitem,然后下面有一个add按钮.
 这个add按钮,是当我鼠标移动到list中才显示.如果直接设置style就没有动效.
 所以可以使用CSSTransition来控制在两个类中过度.
 
 
 除了CSSTransition以外,还可以使用行内写 className={someValue?'class1':'class2'};
 但是这种比较适合在render函数内写.如果是在一些其他组件中写的话就不太方便了,或者是在函数中的话,用CSSTransition
 可能会比较方便.
 
 ####目前只是把React Transition Group这个组件用上了
 但是具体的功能还没有研究,后续的研究可以在这里测试.
####2021年05月30日09:16:15