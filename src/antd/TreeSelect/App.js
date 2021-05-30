import React from 'react';
import { TreeSelect } from 'antd';
import treeData from "./treeData";

const { SHOW_PARENT } = TreeSelect;

// let treeData = [
//   {
//     title: 'Node1',
//     value: '0-0',
//     key: '0-0',
//     children: [
//       {
//         title: 'Child Node1',
//         value: '0-0-0',
//         key: '0-0-0',
//         children: [
//           {
//             title: 'Child Node1',
//             value: '0-0-0-0',
//             key: '0-0-0-0',
//           },
//         ]
//       },
//     ],
//   },
//   {
//     title: 'Node2',
//     value: '0-1',
//     key: '0-1',
//     children: [
//       {
//         title: 'Child Node3',
//         value: '0-1-0',
//         key: '0-1-0',
//       },
//       {
//         title: 'Child Node4',
//         value: '0-1-1',
//         key: '0-1-1',
//       },
//       {
//         title: 'Child Node5',
//         value: '0-1-2',
//         key: '0-1-2',
//       },
//     ],
//   },
// ];



class Demo extends React.Component {
  state = {
    // value: ['0-0-0'],
  };
  componentDidMount() {
    let n = treeData.sort(function (a, b) {
      // console.log(a[x])
      var x = 'key'//要排序字段
      if (a[x] < b[x]) {
        return -1
      }
      if (a[x] > b[x]) {
        return 1
      }
      return 0;
    });
    console.log('排序后:',n, treeData)
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
