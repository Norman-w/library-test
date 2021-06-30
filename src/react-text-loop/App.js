import React, {Component} from 'react';
import TextLoop from 'react-text-loop';
import './App.css'

class TextLoopTest extends Component {
  state=
    {
      tips:['当前更新时间是:2021年06月25日22:36:13🌶',
        '后一条是:2021年06月25日22:37:12'
      ],
    }
  onClickChangeBtn()
  {
    let tips = this.state.tips;
    if(tips.length>1)
    {
      //就要最后一个
      tips = [tips[tips.length-1]];
    }
    tips.push('最后更新时间'+new Date().getTime());
    this.setState({tips:tips}
    ,()=>
      {
        console.log(this.state.tips)
      }
    );
  }
  render() {
    let testDOM1 = <div className={'div1'}><TextLoop>
      <div>
        <span>First item</span>
        <span>Second item</span>
      </div>
      <div>Third item</div>
      <div>after third item</div>
      <div>2021年06月25日22:31:49</div>
      <div>2021年06月25日22:31:52</div>
    </TextLoop>
      <div style={{marginLeft:3,color:'#7c8a2f'}}>after the text loop items</div></div>;
    let testDOM2 = <div className={'div1'}>
      <button onClick={this.onClickChangeBtn.bind(this)}>点击修改</button>
      <button onClick={()=>{
        this.setState({tips:['就剩下一条了']})
      }}>就留一条</button>
      <TextLoop>
        {this.state.tips.map((item,index)=>
        {
          return <div key={item}>{item}</div>
        })}
      </TextLoop>
      <div>这前面是内容,我是为了测试动态位置的📢</div>
    </div>;
    return testDOM2;
  }
}

export default TextLoopTest;
