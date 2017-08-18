### 开发环境OSX(10.12.2)  Sublime Text(Build 3124)  Chrome(56.0)  NodeJS(v6.2.0)  MongoDB(3.4)### 工具与技术标准Webpack(1.14.0)、  
NPM(3.8.9)、  NodeJS(6.10.1)  MongoDB(3.4)  Echarts(2.2.7)、### 运行
1.	安装NodeJS2.	安装MongoDB：  
1）去官网下载压缩包、解压缩  2)	把它放到你随便想放的位置  在目录下新建二个目录：  
data/db——和于存放数据文件，  
etc——用于存放mongod.conf。  3)	创建mongod.conf文件，内容如下：   ``` #mongodb config file dbpath=/Users/bali/Documents/develop/data/db/ logpath=/Users/bali/Documents/develop/mongodb/mongod.log4 logappend = true port = 27017 fork = true auth = true ```记得给data目录设权限：
```shellsudo mkdir -p  /Users/bali/Documents/develop/data/db sudo chown -R bali  /Users/bali/Documents/develop/data
```  4)	修改系统环境变量PATH，把```/Users/xx/Documents/develop/mongodb/bin ```目录加到PATH中。  修改环境变量的方法比较多，这里采用如下方式：  首先添加PATH：```echo 'export PATH=/Users/xx/Documents/develop/mongodb/bin:$PATH'>>~/.bash_profile```  添加完成后为使环境变量生效，可重启shell终端，或输入命令 ```source .bash_profile```。  
查看环境变量是否添加成功：  ```echo $PATH```  5)	启动MongoDB  ```cmd+T``` 新建命令窗口，进入MongoDB 的 "bin"目录，使用命令"```./mongod```"或"```mongod```"启动MongoDB server，启动成功后最后一行应该是端口号，新建窗口，输入 ```./mongo``` 或 ```mongo``` , 尝试操作数据库至此，Mongodb就已经安装和配置完成了。   如果sudo启动不了 就杀死mongod进程重新sudo  3.	安装npm包：```$ npm install```