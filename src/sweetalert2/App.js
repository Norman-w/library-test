import './App.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'
import {Button} from 'antd';
import 'antd/dist/antd.css';


const MySwal = withReactContent(Swal)

function SweetAlert2Test() {
    // let isTestBtnHover = false;
    const onClickInnerBtn = (e)=>
    {
        console.log('you are clicked button in html', e.target.innerText)
        MySwal.clickConfirm();
    }
    const onClickTestBtn=async ()=>
    {

        MySwal.fire({
            title: <p>Hello World</p>,
            html:
                <>
                    <Button onClick={onClickInnerBtn} type={'primary'}>按钮1文字</Button>
                    <Button onClick={onClickInnerBtn} type={'primary'}>按钮3文字</Button>
                </>
            ,
            // footer: 'Copyright 2018',
            showConfirmButton : false,

            didOpen: () => {
                // `MySwal` is a subclass of `Swal`
                //   with all the same instance & static methods
                // MySwal.clickConfirm()
            }
        }).then(() => {
            return MySwal.fire(<p>Shorthand works too</p>)
        })

        // const inputOptions = new Promise((resolve) => {
        //     setTimeout(() => {
        //         resolve({
        //             '#ff0000': '根据地区偏好',
        //             '#00ff00': '卖家留言',
        //             '#0000ff': '买家备注'
        //         })
        //     }, 100)
        // })
        //
        // const { value: color } = await Swal.fire({
        //     title: '请选择将要使用的偏好方式',
        //     input: 'radio',
        //     showCloseButton: true,
        //     inputOptions: inputOptions,
        //     inputValidator: (value) => {
        //         if (!value) {
        //             return '请选择一个您要添加的方式,如取消,请点击空白处!'
        //         }
        //     }
        // })
        //
        // if (color) {
        //     Swal.fire({ html: `You selected: ${color}` })
        // }
    }
  return (
    <div className={'main'}>
      <div className={'memos'}>
      <div>This is my first git test program witch create by webstorm</div>
        <div>And now, I'm trying to add some text here in order to test the update</div>
        <div>现在,我已经掌握了webstorm+github的基本使用.2021年05月29日12:12:57</div>
      </div>
      <div className={'divButton'} onClick={onClickTestBtn}>点我测试</div>
    </div>
  );
}

export default SweetAlert2Test;
