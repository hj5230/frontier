# .env 文件
- CDN_BASE_URL：主资源域名
- FALLBACK_BASE_URL：失败时备用域名
- GITHUB_USERNAME：GitHub 用户名
- GITHUB_REPO_NAME：仓库名
- GITHUB_BRANCH：分支
- GITHUB_FILE_PATH：仓库里具体目录


-CDN_BASE_URL：主资源域名
- rsbuild.config.ts这个文件的作用是把代码按照规定“翻译”成最终状态，而具体关于CDN_BASE_URL的部分就是读取所有的CDN_BASE_URL并转换为在env文件里定义的具体路径。
- 'process.env.CDN_BASE_URL': JSON.stringify(
        process.env.CDN_BASE_URL,
        ),
        将所有代码中的字符process.env.CDN_BASE_URL转换成真实值

-constant.ts文件作用为“代码里的集中常量拼装处”
这是业务源码的一部分。
打包后仍然（以转换后的形式）存在，被其它代码 import 使用。
在这里用那些被替换好的字符串继续拼完整 URL，并导出给别人用。

至少在这个部分里，rsbuild文件是为constant文件服务的，他把constant文件里的字符读出来并换成真正的地址，然后constant在用变量读取到真正的地址并且进行进一步拼接，然后其他文件通过import constant文件就可以正确读取到拼出来的完整地址了


FALLBACK_BASE_URL：失败时备用域名 根据 constant.ts 顶部注释 NOTE - fallback system is not implemented yet.，看起来备用系统还没实现。


 index.ts 是什么： 它是一个"统一出口文件"（barrel export），把 typings 目录下所有的类型定义、常量等集中导出。

 这个统一导出目前没在用！

 .env 文件定义
    ↓
rsbuild.config.ts 构建时替换
    ↓
constant.ts 拼接完整URL
    ↓
useDefinitions Hook 下载数据
    ↓
work 页面组件使用数据


# useDefinitions
导入验证工具,不同模块的数据格式验证规则各种 Schema,还有拼接好的definitionsUrl

type DefinitionSchemas = {
  [DefinitionModule.INDEX]: typeof DefinitionSchema
创建对照表,告诉TypeScript 每种模块应该用哪个验证器，以及对应什么数据类型。
这是"类型说明书"，给 TypeScript 编译器看的
编译后这部分会消失，但为开发提供了类型安全

const definitionCache: Partial<DefinitionTypes> = {}
创建一个"数据仓库"用来缓存已下载的配置

提供一个"查找器"函数getSchemaForModule，根据模块名找到对应的验证规则

witch (moduleName) {
    case DefinitionModule.INDEX:
      return DefinitionSchema
    // ...
    给浏览器执行的，真正的运行时代码


const url = `${definitionsUrl}/${moduleName}.json` 拼接地址
const response = await fetch(url) 获取文件
return schema.parse(data) 照规定验证格式

const [definitions, setDefinitions] = useState<
    Partial<Definitions>
  >({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  准备三个状态
definitions：存放下载的数据（初始为空对象）
loading：是否正在加载（初始为 true）
error：错误信息（初始为 null）

if (!definitionCache[moduleName]) { 检查缓存
const schema = getSchemaForModule(moduleName) 调取验证器
definitionCache[moduleName] = await fetchDefinitionModule(moduleName, schema) 调用获取器并将内容写入缓存
return {
  moduleName,
  data: definitionCache[moduleName] as DefinitionTypes[T[number]],
}
从缓存中读取
const results = await Promise.all(modulePromises)等待完成

const newDefinitions: Partial<Definitions> = {}

for (const { moduleName, data } of results) {
  newDefinitions[moduleName] = data
}
组装最终对象等待更新
原始数据格式：{ work: [...] } ✅ 符合标准
为了并行处理，人为包装：{ moduleName: 'work', data: { work: [...] } } ❌ 不符合标准
处理完后，拆包装恢复：{ work: { work: [...] } } ✅ 重新符合标准

if (isMounted) {
  setDefinitions(newDefinitions)
  setLoading(false)
}
更新组件状态

let isMounted = true
return () => {
  isMounted = false
}
isMounted 是一个"组件是否还存在"的标记
当组件被销毁时，return 的函数会执行，把 isMounted 设为 false
后面所有的状态更新都会检查这个标记


}, [moduleNames.join(',')])
module是传进来的参数,当参数完全不变,比如我一直访问work界面,只在参数是work的时候调用hook,就不会重新执行,但当我访问别的页面或者某个页面需要同时访问超过一个module名导致hook接收到了传入的超过一个参数,就会导致useeffect起效果整个重新执行?


return [definitions, loading, error] as const
把 Hook 的三个状态打包成数组返回给组件使用。
有了 as const：
TypeScript 知道返回：[DefinitionData, boolean, Error | null]
精确的三元组，位置和类型都确定

// 1. 用户访问 work 页面
// 2. 调用 useDefinitions('work')
// 3. moduleNames = ['work']
// 4. 检查 definitionCache['work'] → undefined（缓存为空）
// 5. 调用 getSchemaForModule('work') → 返回 WorkDefinitionSchema
// 6. 调用 fetchDefinitionModule('work', WorkDefinitionSchema) → 下载 work.json
// 7. definitionCache['work'] = 下载的工作数据
// 8. 组装成 { work: 工作数据 }
// 9. setDefinitions({ work: 工作数据 })
// 10. setLoading(false)
// 11. 组件重新渲染，显示数据