# Team-AA
方便计算团队出行账单AA计算的在线工具。[前往使用](http://blog.liuxinyumo.cn/teamaa/index.html)

## 使用说明

### 步骤一
创建一个在线的Excel文档（例如腾讯文档）并如下设计表格：

| 付款人 | 张三 | 李四 | 王五 | 金额 | 说明 | 付款凭证、截图 |
| --- | --- | --- | --- | --- | --- | --- |
| 张三 | 1 | 1 | 1 | 99.88 | 酒店 | <image\> |
| 王五 | 1 | 0 | 1 | 88.66 | 景区门票 | <image\> |

**表格创建规则：** 
- 第1行为表头；
- 第1列是游玩期间产生的付款人名称；
- 第 2 ～ n+1 列是本次n个队员的名称；
- 第1列必须是 2 ～ n+1 列表头的元素，推荐创建表格时设置 数据-数据验证-下拉选项-引用2～n+1列表头；

**分享话术：**
@所有人 大家将游玩期间的自己产生的开销填写到表格中，第一列选自己名字，紧接着几列是这笔支出每个人的系数，如果是均摊，就都填1，若部分均摊则不参与的人不填或填0，后面填写金额、支出说明、付款凭证。我们将在 x 天后截止填写，共同检查，若无异议会自动算出互相之间需要的补差金额。即使是一个人的消费也可以填到表格中，可以算出本次游玩每个人的总支出、团队总支出。

### 步骤二
到约定的截止日期后， @所有人 开始检查自己所在列存在系数的每一笔款项是否认可。若不认可沟通协调，若认可则开始计算。

### 步骤三
将确认无异议的表格导出 .csv 文件，浏览器访问： http://blog.liuxinyumo.cn/teamaa/index.html 进行上传，设置好人数即可完成计算。

## 开发

~~~
├─html                  在线页面
│  └─ ...           
│
├─team-aa               算法包，自动构建到html中
│  └─ ...
│
└─README.md             README
~~~

```sh
npm i

cd html
npm i
```

算法包调试:

```sh
npm run dev
```

页面调试:

```sh
cd html
npm run serve
```