import React from 'react';
import { TreeSelect } from 'antd';
import treeData from "./treeData";

const { SHOW_PARENT } = TreeSelect;


class Demo extends React.Component {
  state = {
    // value: ['0-0-0'],
  };
  componentDidMount() {
  }

  onChange = value => {
    console.log('onChange ', value);
    this.setState({ value });
  };

  render() {
    // for (let i=0;i<areaInfo.length;i++)
    // {
    //   areaInfo[i].value=areaInfo[i].key;
    // }
    // console.log(
    //   '他的:',treeData,
    //   '我的:', areaInfo,
    // )
    // treeData = areaInfo;
    const tProps = {
      treeData,
      value: this.state.value,
      onChange: this.onChange,
      treeCheckable: true,
      showCheckedStrategy: SHOW_PARENT,
      placeholder: '请选择',
      style: {
        width: '100%',
      },
    };
    return <TreeSelect {...tProps} />;
  }
}


export default Demo;
// ReactDOM.render(<Demo />, mountNode);
