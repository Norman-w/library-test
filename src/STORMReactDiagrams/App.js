import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './main.css';
import createEngine, {DefaultLinkModel, DefaultNodeModel, DiagramModel} from '@projectstorm/react-diagrams';
import { JSCustomNodeFactory } from './JSCustomNodeFactory';
import { JSCustomNodeModel } from './JSCustomNodeModel';
import {CanvasWidget} from "@projectstorm/react-canvas-core";
import './rewrite.scss'
import {DefaultPortModel} from "storm-react-diagrams";

// create an instance of the engine
const engine = createEngine();
const {Component} = React;

// register the two engines
engine.getNodeFactories().registerFactory(new JSCustomNodeFactory());

// create a diagram model
const model = new DiagramModel();

//####################################################
// now create two nodes of each type, and connect them

const node1 = new JSCustomNodeModel({ color: 'rgb(192,255,0)' });
node1.setPosition(50, 50);

const node2 = new DefaultNodeModel('Node 2', 'rgb(192,255,0)');
// node2.addInPort('In');
const port2 = new DefaultPortModel(true,'in2','输入2', 'in2');
node2.addPort(port2);

const link1 = new DefaultLinkModel();
link1.setSourcePort(node1.getPort('out'));
link1.setTargetPort(node2.getPort('in2'));

const link2 = new DefaultLinkModel();
link2.setSourcePort(node1.getPort('out'));
// link2.setTargetPort(node2.getPort('in2'));

model.addAll(node1, node2, link1,link2);

//####################################################

// install the model into the engine
engine.setModel(model);

class App extends Component {
    render() {
        return (
            <CanvasWidget className='srd-demo-canvas' engine={engine} />
        );
    }
}

export default App;