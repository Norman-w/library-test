import ReactDOM from 'react-dom';
import TabBar from "./react-transition-group/App";
import SweetAlert2Test from "./sweetalert2/App";
import Demo from "./antd/TreeSelect/App";


// const testingDOM = <TabBar/>;
// const testingDOM = <SweetAlert2Test/>
const testingDOM = <Demo/>

ReactDOM.render(testingDOM, document.getElementById('root'));


if (module.hot)
{
    module.hot.accept();
}
