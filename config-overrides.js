const path = require('path')
const { override, babelInclude} = require('customize-cra')

const val = babelInclude([
  path.resolve("src"), // 确保要包含自己的项目
  path.resolve("node_modules/simple-component-library") //引入报错的项目
])
function d(){
  console.log(val);
}
d();
module.exports = override(
  val
)
