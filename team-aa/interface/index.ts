// 所有的金额都是 分钱

interface Results {
  num: number,          // 提交的总人数
  recordNum: number,    // 提交的记录数量
  totalFee: number,     // 团队总支出金额
  avgFee: number,       // 团队人均支出金额

  datas: EvbodyData[],  // 每个人的详细账单信息
}

interface EvbodyData {
  recordNum: number,    // 支出笔数
  totalFee: number,     // 实际支出金额
  relatedNum: number,   // 相关支出条数

  transfer: TransferInfo[], // 转账补差数据
}

interface TransferInfo {
  to: string,     // 相关人
  cash: number,   // 金额 金额如果为正数则代表向对方转钱，否则是对方向你付款
}