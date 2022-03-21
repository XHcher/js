# import execjs  # 导入
#
# # 生成JavaScript运行环境，环境名可以指定
# node = execjs.get()  # 安装nodejs后，会得到运行环境名为：Node.js (V8)
#
# with open('js_code.js', encoding='utf-8') as f:
#     js_code = f.read()
#
# # 编译js代码
# ctx = node.compile(js_code, cwd=r'E:\Nodejs\node_modules\npm\node_modules')  # compile方法去加载js代码，参数cwd指定本地安装模块所在目录
#
# # 两种方式执行js函数
# data1 = ctx.eval('getParam({"city":"北京"})')  # eval方法中，整个函数调用包含在字符串内
# data2 = ctx.call('getParam', {'city': '北京'})  # call方法中，第一个参数是函数名（str）,后面接参数
import execjs

with open("./wyxw.js", "r") as f:
    js_code = f.read()
ctx = execjs.compile(js_code)
adp = ctx.call("base", '123456')
print(adp)
