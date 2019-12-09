var http = require('http') // 创建服务器
var path = require('path') // 根据系统内部自动识别url类型
var fs = require('fs') // 用于读写文件
var url = require('url') // 自动解析用户的url得到一些有用信息

// 静态路径
function staticRoot (staticPath, req, res) {
  // 解析url路径，包括文件名
  var pathObj = url.parse(req.url, true)

  // 设置默认读取文件
  if (pathObj.pathname === '/') {
    pathObj.pathname += 'index.html'
  }

  // 获取资源文件的具体路径
  var filePath = path.join(staticPath, pathObj.pathname)

  // 判断是否读取到
  fs.readFile(filePath, 'binary', function (err, fileContent) {
    if (err) { // 文件名不存在
      console.log('404')
      res.writeHead(404, 'Not Found')
      res.end('<h1>Not Found!</h1>')
    } else { // 文件名存在
      console.log('ok')
      res.writeHead(200, 'ok')
      res.write(fileContent, 'binary')
      res.end()
    }
  })
}

// 自动生成发文件绝对路径，根据绝对路径读取文件
// 创建服务器
console.log(path.join(__dirname, ''))
// __diename代表当前文件所在的文件目录

var server = http.createServer(function (req, res) {
  staticRoot(path.join(__dirname, ''), req, res)
})
server.listen(9000)
