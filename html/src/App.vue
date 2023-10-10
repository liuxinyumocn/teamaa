<template>
  <div id="app">
    <img style="width: 200px; height: 200px;" src="./assets/AApay.png">
    <el-container class="container">
      <el-main>
        <div class="block" style="margin-bottom: 30px;">
          <span class="demonstration">请选择本次Team总人数 n = <b>{{ num }}</b> 这决定了你的表格权重列数</span>
          <el-slider v-model="num" :min="0" :max="50"></el-slider>
          <el-button type="primary" @click="loadCsv">选择本地 CSV 文件</el-button>
          <el-button type="success" @click="help">查看帮助</el-button>
          <el-button type="warning" plain @click="demo">下载并导入测试用例</el-button>
        </div>
        
        <el-card v-if="result !== null" class="box-card" style="margin-bottom: 30px;">
          <el-descriptions title="Team AA - 小计">
            <el-descriptions-item label="总人数：">{{ num }}</el-descriptions-item>
            <el-descriptions-item label="总支出：">{{ result.totalFee / 100 }}元</el-descriptions-item>
            <el-descriptions-item label="人均支出：">{{ result.avgFee / 100 }}元</el-descriptions-item>
            <el-descriptions-item label="总消费次数：">{{ result.recordNum }}</el-descriptions-item>
          </el-descriptions>
        </el-card>

        <template v-if="result !== null">
          <el-card v-for="(item, key) in result.datas" :key="key" class="box-card" style="margin-bottom: 30px;">
            <el-descriptions :title="`${key}`">
              <el-descriptions-item label="个人总支出：">{{ item.totalFee / 100 }}元</el-descriptions-item>
              <el-descriptions-item label="个人付款次数：">{{ item.recordNum }}</el-descriptions-item>
              <el-descriptions-item label="与你相关的消费次数：">{{ item.relatedNum }}</el-descriptions-item>
            </el-descriptions>
            <template v-if="item.transfer.length == 0">
              <el-empty description="没有需要补差的金额哦～"></el-empty>
            </template>
            <el-descriptions v-else class="margin-top" title="补差明细" :column="1" size="medium" border>
              <el-descriptions-item v-for="(t, k) in item.transfer" :key="k">
                <template slot="label">
                  {{ k }}
                </template>
                <template v-if="t > 0">
                  你向 Ta 补差 {{ t/100 }}元 
                </template>
                <template v-else>
                  你收款 {{ -1 * t/100 }}元
                </template>
              </el-descriptions-item>
            </el-descriptions>

          </el-card>
        </template>

      </el-main>
      <el-footer>Powered By Nebula</el-footer>
    </el-container>
  </div>
</template>

<script>
import { TeamAA } from './team-aa';

export default {
  name: 'App',
  components: {
    
  },
  data() {
    return {
      num: 0,
      result: null,
    }
  },
  methods: {
    help() {
      window.open("https://github.com/liuxinyumocn/teamaa/tree/feat/teamaa#team-aa");
    },
    loadCsv() {
      if(this.num == 0) {
        this.$message.warning('请先确定本次出行的队伍人数。');
        return;
      }

      var input = document.createElement('input');
      input.type = 'file';
      input.accept = '.csv';
      input.addEventListener('change', function() {
        var file = input.files[0];
        var reader = new FileReader();
        reader.onload = function(event) {
          var content = event.target.result;
          this.cal(content);
        }.bind(this);
        reader.readAsText(file);
      }.bind(this));
      input.click();
    },
    demo() {

    },
    cal(csvContext = '') {
      const teamaa= new TeamAA(this.num);
      try{
        const res = teamaa.calData(csvContext);
        this.result = res;
      }catch(e) {
        this.$message.error(e);
      }
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  /* background-color: #2c3e50; */
}

.container {
  width: 100%;
  max-width: 800px;
  margin: 10px auto;
}
</style>
