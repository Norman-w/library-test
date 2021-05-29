import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import styled from "styled-components";
import PropTypes from 'prop-types'
import {CSSTransition} from 'react-transition-group'

export default class TabBar extends Component{
    constructor(props) {
        super(props);
        this.state = {
            active:1,
            left:0,
            animationIn:false
        }
    }

    changeTab = (i) => {
        const length = this.props.tabs.length;
        this.setState({
            active:i,
            left: (100 / length) * (i - 1) + '%',
            animationIn:true
        })
        if(this.props.changeTab){
            this.props.changeTab();
        }
    }

    render() {
        const { tabs } = this.props;
        const { active, left } = this.state;
        const Root = styled.div`
        display: flex;
        alignItems: center;
        position: relative;
        .tab_bar {
            position: relative;
            height: 44px;
            line-height: 44px;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 8px 0;
            width:${100 / tabs.length}%;
            box-sizing: border-box;
            font-size: 15px;
            &:after{
                content:"";
                position: absolute;
                background-color: #ddd;
                display: block;
                z-index: 1;
                top: auto;
                right: auto;
                bottom: 0;
                left:0 ;
                width: 100%;
                height: 1px;
                transform: scaleY(0.5);
            }
        }
        .tab_bar_active {
            color: #108ee9;
        }
        .tab_bar_underline {
            position: absolute;
            border: 1px #108ee9 solid;
            -webkit-transform: translate3d(0, 0, 0);
            transform: translate3d(0, 0, 0);
            width: ${100 / tabs.length}%;
            left:${left};
            z-index: 2;
            bottom: 0;
            transition:left .3s;
            // transition:top .3s cubic-bezier(0.35, 0, 0.25, 1),left .3s cubic-bezier(0.35, 0, 0.25, 1),color .3s cubic-bezier(0.35, 0, 0.25, 1),width .3s cubic-bezier(0.35, 0, 0.25, 1);
            // -webkit-transition: top .3s cubic-bezier(0.35, 0, 0.25, 1),left .3s cubic-bezier(0.35, 0, 0.25, 1),color .3s cubic-bezier(0.35, 0, 0.25, 1),width .3s cubic-bezier(0.35, 0, 0.25, 1);
            &:hover {
                left: 50px;
            }
        }
        
            
        .card-enter,.card-appear{
            opacity: 0;
            transform:scale(.3);
        }
        .card-enter-active,.card-appear-active{
            opacity: 1;
            transform: scale(1);
            transition: opacity 300ms,transform 300ms;
        }
        .card-exit{
            opacity: 1;
            transform: scale(1);
        }
        .card-exit-active{
            opacity: 0;
            transform: scale(.3);
            transition: opacity 300ms,transform 300ms;
        }
        .card-exit-done{
            opacity: 0;
        }
        `
        return (
            <Root>
                {
                    tabs.map((item,index)=>(
                        <div key={item.key}
                             onClick={()=>{this.changeTab(index + 1)}} className={`tab_bar ${ (index + 1) === active && 'tab_bar_active'}`}>
                            {item.title}
                        </div>
                    ))
                }
                <CSSTransition
                    in={ this.state.animationIn }
                    timeout={ 1000 }
                    classNames='card'
                    appear
                >
                    <div className={'tab_bar_underline'} />
                </CSSTransition>
            </Root>
        )
    }

}

TabBar.prototypes = {
    tabs:PropTypes.array.isRequired
}

TabBar.defaultProps ={
    tabs:[
        {
            title:'标题1',
            key:1
        },
        {
            title:'标题2',
            key:2
        },
        {
            title:'标题3',
            key:3
        },
    ]
}

ReactDOM.render(<TabBar></TabBar>, document.getElementById('root'));