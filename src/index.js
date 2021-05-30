import ReactDOM from 'react-dom';
import TabBar from "./react-transition-group/App";
import SweetAlert2Test from "./sweetalert2/App";


// const testingDOM = <TabBar/>;
const testingDOM = <SweetAlert2Test/>

ReactDOM.render(testingDOM, document.getElementById('root'));


if (module.hot)
{
    module.hot.accept();
}