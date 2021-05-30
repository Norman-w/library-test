import ReactDOM from 'react-dom';
import TabBar from "./react-transition-group/App";


const testingDOM = <TabBar/>;


ReactDOM.render(testingDOM, document.getElementById('root'));


if (module.hot)
{
    module.hot.accept();
}