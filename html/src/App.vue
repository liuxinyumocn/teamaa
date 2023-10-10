<template>
  <div id="app">
    <img style="width: 200px; height: 200px;" src="./assets/AApay.png">
    <el-container class="container">
      <el-main>
        <div class="block">
          <span class="demonstration">请选择本次Team总人数 n = {{ num }} 这决定了你的表格权重列数</span>
          <el-slider v-model="num" :min="1" :max="50"></el-slider>
          <el-button type="primary" @click="loadCsv">选择本地 CSV 文件</el-button>
          <el-button type="success" @click="help">查看帮助</el-button>
          <el-button type="warning" plain @click="demo">下载并导入测试用例</el-button>
        </div>
      </el-main>
      <el-footer>Powered By Nebula</el-footer>
    </el-container>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    
  },
  data() {
    return {
      num: 1,
    }
  },
  methods: {
    help() {
      window.open("https://github.com/liuxinyumocn/teamaa/tree/feat/teamaa#team-aa");
    },
    loadCsv() {
      var input = document.createElement('input');
      input.type = 'file';
      input.accept = '.csv';
      input.addEventListener('change', function() {
        var file = input.files[0];
        var reader = new FileReader();
        reader.onload = function(event) {
          var content = event.target.result;
          console.log(content);
        };
        reader.readAsText(file);
      });
      input.click();
    },
    demo() {

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
