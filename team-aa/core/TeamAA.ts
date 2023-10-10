import { csvToJson } from "../utils/tools";

export default class TeamAA {

  private num: number = 1;

  /**
   *  @param num Team 人数
  */
  constructor(num: number) {
    this.num = num;
  }

  /**
   *  接收一个二维账单数组，完成计算
   *  @param data 二维账单数组
   *  @returns 计算结果
  */
  calData(data: any): Results {
    const arr2d = csvToJson(data);
    if (arr2d.length === 0) {
      throw '数据解析失败，请检查 csv 文件格式是否正确，参考 Demo。';
    }
    const team: { [key: string]: EvbodyData } = {};
    const names = [];
    for (let i = 1; i <= this.num; i++) {
      const name = arr2d[0][i];
      names.push(name);
      if (!name)
        throw `请检查表头中 2～${this.num + 1} 列人名是否完整`;
      team[name] = {
        totalFee: 0,
        recordNum: 0,
        relatedNum: 0,
        transfer: {},
      }
    }
    let totalFee = 0;
    for (let i = 1; i < arr2d.length; i++) {
      const row = arr2d[i];
      const name = row[0];
      if (!team[name]) {
        throw `请检查第 ${i + 1} 行中付款人「${name}」是否是表头中 2～${this.num + 1} 其中之一。`;
      }
      team[name].recordNum++;
      let weight = 0;
      for (let j = 1; j <= this.num; j++) {
        if (row[j]) {
          weight += Number(row[j]);
        }
      }
      const fee = Number(row[this.num + 1]) * 100;
      totalFee += fee;
      if (fee > 0)
        for (let j = 1; j <= this.num; j++) {
          const myName: string = names[j - 1];
          const myWeight = row[j] ? Number(row[j]) : 0;
          const myfee = Math.floor(fee * (myWeight / weight));
          if (myWeight !== 0) {
            team[myName].relatedNum++;
            team[myName].totalFee += myfee;
            if (myName !== name) { // transfer
              if (team[myName].transfer[name] === undefined) {
                team[myName].transfer[name] = 0;
              }
              if (team[name].transfer[myName] === undefined) {
                team[name].transfer[myName] = 0;
              }
              team[myName].transfer[name] += myfee;
              team[name].transfer[myName] -= myfee;
            }
          }
        }
    }
    // 整合收款
    // Object.keys(team).forEach(item => {
    //   // 如果一个人既存在收款也存在付款，可以对冲金额将收付款转嫁给同一个收款方 太麻烦先不做以后迭代

    // });
    return {
      num: this.num,
      recordNum: arr2d.length - 1,
      totalFee,
      avgFee: Math.floor(totalFee / this.num),
      datas: team
    };
  }

}