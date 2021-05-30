####2021年05月30日10:36:36
使用sweetalert2和sweetalert我感受到的区别是
1.2引入以后,需要用swal.fire来展示
2.使用react的jsx元素的话,2对jsx的支持比较好,1不支持react17版本.
3.使用react的jsx元素,需要用到 `const MySwal = withReactContent(Swal)`,然后再MySwal.fire()
4.1的swal()入参是一个{}, 2的swal.fire的入参可以是{}也可以直接是一个<div></div>之类的标签对象.

####说明文档:
https://sweetalert2.github.io/
说明文档里面的每一个弹窗都有广告,但是实际使用中没有.