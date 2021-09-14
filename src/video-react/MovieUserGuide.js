import React, {Component} from 'react';
import classNames from './MovieUserGuide.module.css';
//region  video-react的引用
import {
  Player,
  ControlBar,
  BigPlayButton,
} from 'video-react';
import "video-react/dist/video-react.css"; // import css
//endregion

//region 为了让他能有自动的代码提示和为以后结构设计有方向,直接定义了默认结构信息在这里.
const emptyTrigger={
  //触发器的编号
  id:'',
  //触发器的名称 比如  这是个游戏
  text:'',
  //触发器的明细  比如  如果你觉得这是一个游戏,请点击这里,我们会为您继续播放下一个提示视频或下一个提示片段
  desc:'',
  //图片的展示路径
  picPath:'',
  //点击后打开哪个网页
  href:'',
  //点击后把视频跳转到哪个url
  redirectMovieUrl:'',
  //该触发器是否被触发了 比如是否被点击了 点击以后就算是触发了.
  beTriggered:false,
  //是否为有效的trigger
  valid:true,
  //应在多少毫秒处触发事件
  triggerAtMS:0,
  //应该在播放结束后触发该事件
  triggerAtEnd:false,
  //应该在当前视频播放开始时触发事件
  triggerAtStart:false,
}
const emptyStopPoint={
  time: 3.3,
  pause: false,
  pass: false,
  triggers: [
    'movie', 'game'
  ]
}
const emptyMovieInfo =
  {
    //视频的id
    id: '',
    //视频文件的地址
    movieUrl: '',
    //视频封面的地址
    posterUrl: '',
    //视频的卡点信息
    stopPoints: [],
    triggers:[],
  }
  //endregion
class MovieUserGuide extends Component {

  //region 页面数据  state
  state =
    {
      buttons: [
        {
          id: 'play',
          name: '开始播放',
          hover: false,
          clicked: false,
          hide: false
        },
        {
          id: 'pause',
          name: '暂停播放',
          hover: false,
          clicked: false,
          hide: false
        },
        {
          id: 'pre5s',
          name: '返回5s',
          hover: false,
          clicked: false,
          hide: false
        },
        {
          id: 'next5s',
          name: '前进5s',
          hover: false,
          clicked: false,
          hide: false
        },
        {
          id: 'replay',
          name: '重播',
          hover: false,
          clicked: false,
          hide: false
        },
        {
          id: 'jumpTo8',
          name: '跳到8秒处',
          hover: false,
          clicked: false,
          hide: false
        },
        {
          id: 'changeMovie',
          name: '换视频',
          hover: false,
          clicked: false,
          hide: false
        }
      ],
      hasHoverBtn: false,
      needAction: false,
      movies: [],
      currentMovie: {},
      currentPointIndex: 0,
    }
  //endregion

  //region  构造函数
  constructor() {
    super();
    let defaultMovie = {
      ...emptyMovieInfo,
      id: 'default_test_movie',
      movieUrl: 'http://www.w3schools.com/html/mov_bbb.mp4',
      posterUrl: 'https://www.enni.group/file/test2.png'
    };
    let defaultPoint = {...emptyStopPoint, triggers: ['movie', 'game']};
    let defaultTrigger = {
      ...emptyTrigger,
      id: 'game',
      text: '这是个游戏',
      redirectMovieUrl: 'https://www.enni.group/file/testmovie/2.MP4'
    }
    defaultMovie.triggers.push(defaultTrigger);
    defaultMovie.stopPoints.push(defaultPoint);
    this.state.movies.push(defaultMovie);
    this.state.currentMovie = defaultMovie;
  }

  componentDidMount() {
    this.player.subscribeToStateChange(this.handleStateChange.bind(this));
  }

  //endregion

  //region 视频状态有变更 包裹人的操作和视频主动发出来的时间变化之类的
  handleStateChange(state, prevState) {
    console.log('状态已经更新;');
    console.log(state)
    let currentPlayTime = state.currentTime;
    let stopPoints = this.state.currentMovie.stopPoints;
    for (let i = 0; i < stopPoints.length; i++) {
      let points = stopPoints;
      let point = points[i];
      //如果遇到了没有过去的点,而且当前播放到了的时间要比这个卡点要远,那么停下来 等着用户的操作
      if (currentPlayTime > point.time && point.pass === false && point.pause === false) {
        point.pause = true;
        console.log('当前卡在了:', point);
        this.player.pause();
        this.showTriggers(point.triggers);
        this.state.currentPointIndex = i;
        this.setState({stopPoints: points});
        break;
      }
    }
  }

  //endregion

  //region 隐藏或者显示页面上的控制视频的按钮
  hideButtons() {
    let o = this.state.buttons;
    for (let i = 0; i < o.length; i++) {
      o[i].hide = true;
    }
    this.setState({buttons: o});
  }

  showTriggers(btnArray) {
    console.log('显示按钮集合:', btnArray);
    if (!btnArray) {
      return;
    }
  }

  //endregion

  //region 点不同的按钮跳转到不同的秒数继续播放
  onClickedTriggerBtn(clickedBtnId) {
  }

  //endregion

  //region 页面上的浮屏按钮的事件
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

  onClickChangeMovieBtn() {
    //正常应该从服务器获取一个movie的json信息 而不是直接修改url
    let c = this.state.currentMovie;
    c.movieUrl = 'https://www.enni.group/file/testmovie/2.MP4';
    c.posterUrl = '';
    this.setState({currentMovie:c});
  }

  //endregion

  //region 鼠标进入和离开浮屏幕按钮
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

  //endregion

  //region 渲染
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
    //region 获取当前的视频
    let currentMovie = this.state.currentMovie;
    //endregion
    let url = currentMovie.movieUrl;
    let poster = currentMovie.posterUrl;
    return (
      <div className={classNames.main}>
        <div className={masked ? classNames.playerMasked : classNames.player}>
          <Player
            ref={c => {
              this.player = c;
            }}
            poster={poster}
            autoPlay
            src={url}
          >
            <ControlBar autoHide={false} disableDefaultControls={true} disableCompletely={true}>
            </ControlBar>
            <BigPlayButton position={classNames.hide}/>
          </Player>
        </div>
        <div className={classNames.controlPanel}
             onClick={onClickStartBtn}
          // onMouseUp={onClickStartBtn}
        >
          {buttonsState.map(
            (btn, index) => {
              let className = btn.hover ? classNames.btnHover : classNames.btn;
              if (btn.hide) {
                className = className.btnHide;
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
                          onClick={(event) => {
                            event.stopPropagation();
                            onClickFunc(event, btn.id);
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
          <div className={classNames.closeBtn}>X</div>
        </div>
      </div>
    )
  }

  //endregion
}

export default MovieUserGuide;
