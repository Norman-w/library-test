`let n = treeData.sort(function (a, b) {
       // console.log(a[x])
       var x = 'key'//要排序字段
       if (a[x] < b[x]) {
         return -1
       }
       if (a[x] > b[x]) {
         return 1
       }
       return 0;
     });`
     以上代码用于将treeData数据进行排序,保证北京在最前面那种形式.
     
####目前treeData数据已经是排序过的了.

要使用treeSelect控件,合适的treeData数据是必须的
里面应该包含key,value,name,以及children字段.
这些字段都是必须的.因为key是用来遍历,value是代表值,name表示要显示的内容
而children是用来继续向下遍历的.


####关于递归
使用递归来找出数据中value重复的节点
由于treeSelected需要有效的value数据,具体干啥我目前也不知道,反正写了一个递归

`let sameKeyNodes = [];
     let list = [];
     const dgFunc = (node) => {
 
 
       //如果有子孙,遍历子孙
       let oldNode = list.find((item)=>{return item === node.key});
       if (oldNode)
       {
         // console.log('查到一样的了,',oldNode);
         sameKeyNodes.push(node);
       }
 
       //添加自身
       node["value"]=''+node.key;
       list.push(node.key);
 
       if (node.children) {
         for (let i = 0; i < node.children.length; i++) {
           dgFunc(node.children[i]);
         }
       }
     }
     for (let i=0;i<treeData.length;i++)
     {
       dgFunc(treeData[i]);
     }`
递归中,深度优先的话,就是用node作为入参,这个入参可以是root也可以是children
然后函数进来以后,先处理逻辑,记录树根
比如有数据是这样的
`const treeData = [
   {
     title: 'Node1',
     value: '0-0',
     key: '0-0',
     children: [
       {
         title: 'Child Node1',
         value: '0-0-0',
         key: '0-0-0',
       },
     ],
   },
   {
     title: 'Node2',
     value: '0-1',
     key: '0-1',
     children: [
       {
         title: 'Child Node3',
         value: '0-1-0',
         key: '0-1-0',
       },
       {
         title: 'Child Node4',
         value: '0-1-1',
         key: '0-1-1',
       },
       {
         title: 'Child Node5',
         value: '0-1-2',
         key: '0-1-2',
       },
     ],
   },
 ];`
 用一个for遍历这个treeData.给入的参数就是 treeData[i]这个元素
 
 然后进入函数以后,先执行上面的部分,把当前的node的key记录下来.
 然后基本的逻辑处理完以后,在代码的最后再加上检查children,如果有儿子
 那么继续用儿子节点调用一次这个函数,给入的参数就是当前儿子.
 
 由于有多个儿子,所以要用for循环,每一个儿子都调用一次这个函数,给定的都是这个儿子.
 
 这样一来  递归函数就会每次进入函数先执行上面的基本业务逻辑,然后再执行下面的儿子检查.
 所以这样的递归方式是,先爸爸再找儿子,再找孙子,记录的数据也是从父辈开始的.
 
 我记得之前学过好像有的方式是 先从孙子开始返回,就是一个树叶在上方的树,而我目前写这个应纳该是树叶在下面的倒着的
 
 还有什么深度优先广度优先啥的 都不记得了.
 目前来说基本够用.
