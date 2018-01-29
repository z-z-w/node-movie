# 基于NodeJs+MongoDB+Bootstrap搭建的电影网站

简介:
---------------
本项目电影页面是由Bootstrap完成，注册登录评论由ajax完成，后台数据node完成。

**1. 项目后端搭建:**
  * 使用`NodeJs的express`框架完成电影网站后端搭建;
  * 使用`mongodb`完成数据存储,通过`mongoose`模块完成对`mongodb`数据的构建;
  * 使用`jade`模板引擎完成页面创建渲染;
  * 使用`Moment`格式化电影存储时间;

**2. 项目前端搭建:**
  * 使用`jQuery`和`Bootsrap`完成网站前端JS脚本和样式处理;
  * 使用`index.js`完成对账号注册登录退出的判断,后台电影的删除；
  * 使用`comment.js`实现电影详情页面无需刷新页面而更新的评论;
  * 使用`page.js`实现分页功能，有需要用到的列表只需传参调用方法即可；
  * 前后端的数据请求交互通过`Ajax`完成;
  
**3. 网站整体功能:**
  * 电影首页的展示页面;
  * 具有用户注册登录，在没登录的情况下注册的为普通用户；
  * 无需登录状态下也可查看分类电影和搜索相关电影，登录过后才能给电影评论；
  * 需要在db文件夹下连接数据库端口，在还没有管理员用户时需在数据库添加一个并且
    role需大于10，若登陆后的账户为管理员，底部导航条会出现管理员导航，并且此时
    注册的用户将会是新的管理员用户。↙↙↙↙↙↙↙↙
  * 电影分类列表，点击查看会看到该分类下的电影列表，可添加分类；
  * 电影列表，可对电影查看，修改，删除。
  * 电影信息录入；
  * 电影用户列表，管理员列表；
  * 凡是列表都有分页处理;
  * 访客统计;
  * 搜索功能，普通用户搜索将以电影展示，管理员搜索将以电影列表展示，并且可以对其进行查看修改删除操作；
  
运行环境:
-------
目前在Window下的node 8.9.0版本运行正常

**安装:**
  ----
  - 安装mongodb(https://www.mongodb.org/downloads#production)完成相关配置;
  - 在当前项目目录中使用npm install命令安装相关模块；
  
**运行与使用:**
  ----
  1. 启动数据库`mongod`， 可在db文件夹下启动，将数据库信息存在该文件夹
  2. 使用命令行工具在该项目目录下使用grunt运行程序,默认是使用3000端口，若端口已占用可在主目录app.js文件中
    将3000端口换成未占用的端口，当命令行工具看到'数据库连接成功'时在游览器中输入localhost:3000即可看到项
    目电影主页;
  3. 首次使用需自己存入管理员账户并且设置权限role，只有当权限大于10才可以访问后台控制页面，当登录为管理员账户
      后在页面注册就会是管理员，并且role为88，可通过修改数据库中users中role值完成用户权限控制。

项目页面:
  -------

**电影页:** 
- 首页：localhost:3000/  
- 用户注册登陆页面均在首页以模态框形式弹出: localhost:3000
- 电影分类页和搜索页: localhost:3000/results
- 电影详情页: localhost:3000/movie/:id

**后台管理页:**
- 详情页:localhost:3000/movie/:id
- 分类列表页: localhost:3000/admin/categoryList
- 分类录入页: localhost:3000/admin/category
- 分类电影页: localhost:3000/admin/list?id
- 电影列表页: localhost:3000/admin/list
- 电影录入页:localhost:3000/admin/movie
- 电影修改页:localhost:3000/admin/update/:id
- 用户列表页:localhost:3000/admin/userList
- 管理员列表页:localhost:3000/admin/adminList
- 搜索列表页:localhost:3000/results
- 管理员注册以模态框弹出

项目整体效果
-------

![页面加载失败](https://github.com/z-z-w/node-movie/blob/master/public/images/1.png)
![页面加载失败](https://github.com/z-z-w/node-movie/blob/master/public/images/2.png)
![页面加载失败](https://github.com/z-z-w/node-movie/blob/master/public/images/3.png)
![页面加载失败](https://github.com/z-z-w/node-movie/blob/master/public/images/4.png)
![页面加载失败](https://github.com/z-z-w/node-movie/blob/master/public/images/5.png)
![页面加载失败](https://github.com/z-z-w/node-movie/blob/master/public/images/6.png)
![页面加载失败](https://github.com/z-z-w/node-movie/blob/master/public/images/7.png)
![页面加载失败](https://github.com/z-z-w/node-movie/blob/master/public/images/8.png)
    

  
