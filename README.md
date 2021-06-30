##### 该项目为测试一些新的库而生
When I find a more useful library that I need to test how to use, 
or when I need to develop a scene, but I have not used the controls needed to build this scene, 
I will test it here.


#####2021年06月30日20:27:42
测试使用本地的没有发布到npm的包的引用.
在package.json中添加引用的方式是  在package.json的root/根目录
直接插入
"devDependencies": {
    "simple-component-library": "file:../simple-component-library"
  }
  或者使用 
  
  "devDependencies": {
      "simple-component-library": "git+https://github.com/aakashns/simple-component-library.git#master"
    }
  的方式来引用.然后执行 yarn 或者 yarn install
  
  这样的话就会把这个包下载到本地.如果需要移除的时候也是直接在package.json中修改一下 然后再执行yarn 即可.

但是这样引用的包不能像C#那样你修改了被引用的项目以后,被引用的项目会重新编辑那样的.
所以这样的方式不行的.还是要每次把组件更新了以后重新编译一次.作废使用这种方式.改用yarn link 试试
