import React, {Component} from 'react';
import './App.css'
import {
    Player,
    ControlBar,
    BigPlayButton,
    PlayToggle, // PlayToggle 播放/暂停按钮 若需禁止加 disabled
    ReplayControl, // 后退按钮
    ForwardControl,  // 前进按钮
    CurrentTimeDisplay,
    RemainingTimeDisplay,
    PlayProgressBar,
    TimeDivider,
    PlaybackRateMenuButton,  // 倍速播放选项
    VolumeMenuButton,
    Slider,
    SeekBar,
    DurationDisplay,
    ProgressControl,
} from 'video-react';
import "video-react/dist/video-react.css"; // import css

class VideoReact extends Component {
    state=
        {
          buttons:[
              {
                  id:'play',
                  name:'开始播放',
                  hover:false,
                  clicked:false,
              },
              {
                  id:'pause',
                  name:'暂停播放',
                  hover:false,
                  clicked:false,
              },
              {
                  id:'pre5s',
                  name:'返回5s',
                  hover:false,
                  clicked:false,
              },
              {
                  id:'next5s',
                  name:'前进5s',
                  hover:false,
                  clicked:false,
              },
              {
                  id:'replay',
                  name:'重播',
                  hover:false,
                  clicked:false,
              },
              {
                  id:'jumpTo8',
                  name:'跳到8秒处',
                  hover:false,
                  clicked:false,
              }
          ],
            hasHoverBtn:false,
        }
    handleStateChange(state, prevState) {
        console.log(state)
    }
    onClickStartBtn()
    {
        this.player.play();
    }
    onClickStopBtn()
    {
        this.player.pause();
    }
    onClickPre5SecBtn()
    {
        this.player.replay(5);
    }
    onClickNext5SecBtn()
    {
        this.player.forward(5);
    }
    onClickReplayBtn()
    {
        this.player.seek(0);
        this.player.play();
    }
    onClickJumpTo8SecBtn()
    {
        this.player.seek(8);
    }
    onMouseEnter(btnId)
    {
        let newButtonsState = this.state.buttons;
        let hasHoverBtn = false;
        for (let i = 0; i < newButtonsState.length; i++) {
            let current = newButtonsState[i];
            if (current.id===btnId)
            {
                current.hover = true;
                hasHoverBtn=true;
                break;
            }
        }
        this.setState({buttons:newButtonsState,hasHoverBtn:hasHoverBtn});
    }
    onMouseLeave(btnId)
    {
        let newButtonsState = this.state.buttons;
        for (let i = 0; i < newButtonsState.length; i++) {
            let current = newButtonsState[i];
            if (current.id===btnId)
            {
                current.hover=false;
                break;
            }
        }
        this.setState({buttons:newButtonsState,hasHoverBtn:false});
    }

    render() {
        let onClickStartBtn = this.onClickStartBtn.bind(this);
        let onClickStopBtn = this.onClickStopBtn.bind(this);
        let onClickPre5SecBtn = this.onClickPre5SecBtn.bind(this);
        let onClickNext5SecBtn = this.onClickNext5SecBtn.bind(this);
        let onClickReplayBtn = this.onClickReplayBtn.bind(this);
        let onClickJumpTo8SecBtn = this.onClickJumpTo8SecBtn.bind(this);
        let onMouseEnter = this.onMouseEnter.bind(this);
        let buttonsState = this.state.buttons;
        let masked = this.state.hasHoverBtn;
        return (
                <div className={'main'}>
                    <div className={masked? 'playerMasked':'player'}>
                        <Player
                            ref={c => {
                                this.player = c;
                            }}
                            poster="https://video-react.js.org/assets/poster.png"
                            autoPlay='true'
                        >
                            <source
                                src={"https://www.enni.group/file/test.mp4"}
                                type="video/mp4"
                            />
                            {/*<ControlBar autoHide={true} disableDefaultControls={true} disableCompletely={true}>*/}
                            {/*    <ReplayControl seconds={10} order={1.1} />*/}
                            {/*    <ForwardControl seconds={30} order={1.2} />*/}
                            {/*    <PlayToggle />*/}
                            {/*    <CurrentTimeDisplay order={4.1} />*/}
                            {/*    <TimeDivider order={4.2} />*/}
                            {/*    <PlaybackRateMenuButton rates={[5, 2, 1.5, 1, 0.5]} order={7.1} />*/}
                            {/*    <VolumeMenuButton />*/}
                            {/*</ControlBar>*/}
                            <ControlBar autoHide={false} disableDefaultControls={true} disableCompletely={false}>
                                {/*<ReplayControl seconds={10} order={1.1} />*/}
                                {/*<ForwardControl seconds={30} order={1.2} />*/}
                                {/*<PlayToggle />*/}
                                {/*<CurrentTimeDisplay order={4.1} />*/}
                                {/*<PlayProgressBar/>*/}
                                {/*<RemainingTimeDisplay></RemainingTimeDisplay>*/}
                                {/*<TimeDivider order={4.2} />*/}
                                {/*<PlaybackRateMenuButton rates={[5, 2, 1.5, 1, 0.5]} order={7.1} />*/}
                                {/*<VolumeMenuButton />*/}
                                {/*↓ 进度条,到头的时候会出来一个小点点 导致屏幕出现滚动条*/}
                                <ProgressControl/>
                                {/*视频的总时间,如果加上这个,小点点不会走到屏幕的最右边 就没事儿了*/}
                                <DurationDisplay/>
                            </ControlBar>
                            <BigPlayButton/>
                        </Player>
                    </div>
                    <div className={'controlPanel'}>
                        {buttonsState.map(
                            (btn,index)=>
                            {
                                let className = btn.hover? 'btnHover':'btn';
                                let onClickFunc = null;
                                //region 不同的按钮用不同的函数
                                switch (index)
                                {
                                    case 0:
                                        onClickFunc = onClickStartBtn;
                                        break;
                                    case 1:
                                        onClickFunc = onClickStopBtn;
                                        break;
                                    case 2:
                                        onClickFunc = onClickPre5SecBtn;
                                        break;
                                    case 3:
                                        onClickFunc = onClickNext5SecBtn;
                                        break;
                                    case 4:
                                        onClickFunc = onClickReplayBtn;
                                        break;
                                    case 5:
                                        onClickFunc = onClickJumpTo8SecBtn;
                                        break;
                                }
                                //endregion
                                return <div key={index}
                                            className={className}
                                            onClick={onClickFunc}
                                            onMouseEnter={()=>{onMouseEnter(btn.id)}}
                                            onMouseLeave={()=>{this.onMouseLeave(btn.id)}}
                                >{btn.name}</div>
                            }
                        )}
                        <div className={'closeBtn'}>X</div>
                    </div>
                    {/*<button className={'button'} onClick={onClickStartBtn}>开始播放</button>*/}
                    {/*<button className={'stopBtn'} onClick={onClickStopBtn}>停止播放</button>*/}
                </div>
        )
    }
}

export default VideoReact;