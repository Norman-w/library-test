import ReactDOM from 'react-dom';
// import TabBar from "./react-transition-group/App";
// import SweetAlert2Test from "./sweetalert2/App";
// import Demo from "./antd/TreeSelect/App";
// import TextLoopTest from "./react-text-loop/App";
// import {TextInput} from "simple-component-library";
// import VideoReact from "./video-react/App";
// import MovieUserGuide from "./video-react/MovieUserGuide";
import App from './STORMReactDiagrams/App';

// const testingDOM = <TabBar/>;
// const testingDOM = <SweetAlert2Test/>
// const testingDOM = <Demo/>
// const testingDOM = <TextLoopTest/>
// const testingDOM = <TextInput/>
// const testingDOM = <VideoReact/>
// const testingDOM = <MovieUserGuide/>
const testingDOM = <App></App>
ReactDOM.render(testingDOM, document.getElementById('root'));


if (module.hot)
{
    module.hot.accept();
}
