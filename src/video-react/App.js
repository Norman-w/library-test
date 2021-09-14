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
  state =
    {
      buttons: [
        {
          id: 'play',
          name: '开始播放',
          hover: false,
          clicked: false,
          hide:false
        },
        {
          id: 'pause',
          name: '暂停播放',
          hover: false,
          clicked: false,
          hide:false
        },
        {
          id: 'pre5s',
          name: '返回5s',
          hover: false,
          clicked: false,
          hide:false
        },
        {
          id: 'next5s',
          name: '前进5s',
          hover: false,
          clicked: false,
          hide:false
        },
        {
          id: 'replay',
          name: '重播',
          hover: false,
          clicked: false,
          hide:false
        },
        {
          id: 'jumpTo8',
          name: '跳到8秒处',
          hover: false,
          clicked: false,
          hide:false
        },
        {
          id: 'changeMovie',
          name: '换视频',
          hover: false,
          clicked: false,
          hide:false
        }
      ],
      triggers:[
        {
          id:'movie',
          text:'这是个电影',
          //图片的展示路径
          picPath:null,
          //点击后打开哪个网页
          href:null,
          //点击后把视频跳转到哪个url
          redirectMovieUrl:null,
          //该触发器是否被触发了 比如是否被点击了 点击以后就算是触发了.
          beTriggered:false,
          //是否为有效的trigger
          valid:true,
        }
      ],
      hasHoverBtn: false,
      needAction:false,
      currentMovieUrl:'http://www.w3schools.com/html/mov_bbb.mp4',
      currentPosterUrl:'https://www.enni.group/file/test2.png',
      stopPoints:[
        {
          time:3.3,
          pause:false,
          pass:false,
          triggers:[
            'movie','game'
          ]
        },
        {
          time:9,
          pause:false,
          pass:false,
          triggers: [
            'review','finish'
          ]
        }
      ],
      currentPointIndex:0,
    }

    constructor() {
      super();
    }
  componentDidMount() {
      this.player.subscribeToStateChange(this.handleStateChange.bind(this));
  }

  handleStateChange(state, prevState) {
    // console.log('状态已经更新;');
    // console.log(state)
    // let currentPlayTime = state.currentTime;
    // for (let i = 0; i < this.state.currentMovieStopPoints.length; i++) {
    //   let points = this.state.currentMovieStopPoints;
    //   let point = points[i];
    //   //如果遇到了没有过去的点,而且当前播放到了的时间要比这个卡点要远,那么停下来 等着用户的操作
    //   if(currentPlayTime>point.time && point.pass === false && point.pause === false)
    //   {
    //     point.pause = true;
    //     console.log('当前卡在了:',point);
    //     this.player.pause();
    //     this.showTriggers(point.triggers);
    //     this.state.currentPointIndex = i;
    //     this.setState({currentMovieStopPoints:points});
    //     break;
    //   }
    // }
  }
  hideButtons()
  {
    let o = this.state.buttons;
    for (let i = 0; i < o.length; i++) {
      o[i].hide = true;
    }
    this.setState({buttons:o});
  }
  showTriggers(btnArray)
  {
    console.log('显示按钮集合:', btnArray);
    if (!btnArray)
    {
      return;
    }
  }
  //region 点不同的按钮跳转到不同的秒数继续播放
  onClickedTriggerBtn(clickedBtnId)
  {
  }
  //endregion

  onClickStartBtn() {
    console.log('触发播放');
    this.player.play();
  }

  onClickStopBtn() {
    console.log('点了暂停了');
    this.player.pause();
  }

  onClickPre5SecBtn() {
    this.player.replay(5);
  }

  onClickNext5SecBtn() {
    this.player.forward(5);
  }

  onClickReplayBtn() {
    this.player.seek(0);
    this.player.play();
  }

  onClickJumpTo8SecBtn() {
    this.player.seek(8);
  }

  onClickChangeMovieBtn()
  {
    this.setState({
      currentPosterUrl:null,
      currentMovieUrl:"https://www.enni.group/file/testmovie/2.MP4"});
  }

  onMouseEnter(btnId) {
    let newButtonsState = this.state.buttons;
    let hasHoverBtn = false;
    for (let i = 0; i < newButtonsState.length; i++) {
      let current = newButtonsState[i];
      if (current.id === btnId) {
        current.hover = true;
        hasHoverBtn = true;
        break;
      }
    }
    this.setState({buttons: newButtonsState, hasHoverBtn: hasHoverBtn});
  }

  onMouseLeave(btnId) {
    let newButtonsState = this.state.buttons;
    for (let i = 0; i < newButtonsState.length; i++) {
      let current = newButtonsState[i];
      if (current.id === btnId) {
        current.hover = false;
        break;
      }
    }
    this.setState({buttons: newButtonsState, hasHoverBtn: false});
  }

  render() {
    let onClickStartBtn = this.onClickStartBtn.bind(this);
    let onClickStopBtn = this.onClickStopBtn.bind(this);
    let onClickPre5SecBtn = this.onClickPre5SecBtn.bind(this);
    let onClickNext5SecBtn = this.onClickNext5SecBtn.bind(this);
    let onClickReplayBtn = this.onClickReplayBtn.bind(this);
    let onClickJumpTo8SecBtn = this.onClickJumpTo8SecBtn.bind(this);
    let onClickChangeMovieBtn = this.onClickChangeMovieBtn.bind(this);
    let onClickedTriggerBtn = this.onClickedTriggerBtn.bind(this);
    let onMouseEnter = this.onMouseEnter.bind(this);
    let buttonsState = this.state.buttons;
    let masked = this.state.hasHoverBtn;
    let url = this.state.currentMovieUrl;
    let poster = this.state.currentPosterUrl;
    return (
      <div className={'main'}>
        <div className={masked ? 'playerMasked' : 'player'}>
          <Player
            ref={c => {
              this.player = c;
            }}
            poster={poster}
            autoPlay
            src={url}
          >
            {/*<ControlBar autoHide={true} disableDefaultControls={true} disableCompletely={true}>*/}
            {/*    <ReplayControl seconds={10} order={1.1} />*/}
            {/*    <ForwardControl seconds={30} order={1.2} />*/}
            {/*    <PlayToggle />*/}
            {/*    <CurrentTimeDisplay order={4.1} />*/}
            {/*    <TimeDivider order={4.2} />*/}
            {/*    <PlaybackRateMenuButton rates={[5, 2, 1.5, 1, 0.5]} order={7.1} />*/}
            {/*    <VolumeMenuButton />*/}
            {/*</ControlBar>*/}
            <ControlBar autoHide={false} disableDefaultControls={true} disableCompletely={true}>
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
              {/*<ProgressControl/>*/}
              {/*视频的总时间,如果加上这个,小点点不会走到屏幕的最右边 就没事儿了*/}
              {/*<DurationDisplay/>*/}
            </ControlBar>
            <BigPlayButton position={'hide'}/>
          </Player>
        </div>
        <div className={'controlPanel'}
             onClick={onClickStartBtn}
             // onMouseUp={onClickStartBtn}
        >
          {buttonsState.map(
            (btn, index) => {
              let className = btn.hover ? 'btnHover' : 'btn';
              if (btn.hide)
              {
                className = "btnHide";
              }
              let onClickFunc = null;
              //region 不同的按钮用不同的函数
              switch (index) {
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
                case 6:
                  onClickFunc = onClickChangeMovieBtn;
                  break;
              }
              //endregion
              // onClickFunc = onClickedTriggerBtn;
              return <div key={index}
                          className={className}
                          // onClick={onClickFunc}
                onClick={(event)=>{
                  event.stopPropagation();
                  onClickFunc(event,btn.id);
                }}
                          onMouseEnter={() => {
                            onMouseEnter(btn.id)
                          }}
                          onMouseLeave={() => {
                            this.onMouseLeave(btn.id)
                          }}
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
