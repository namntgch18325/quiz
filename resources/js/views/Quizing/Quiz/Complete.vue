<template>
  <div class="app-container">
    <center>
      <h4>{{ textcomplete }}</h4>
      <el-row>
        <el-col :span="24">
          <el-button class="btn" @click="toAgain">{{ $t('respondent.quizing.button.doAgain') }}</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-button class="btn" @click="toSurvey">{{ $t('respondent.quizing.button.toSurvey') }}</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-button class="btn" @click="toClass">{{ $t('respondent.quizing.button.toClass') }}</el-button>
        </el-col>
      </el-row>
    </center>
  </div>
</template>

<script>
export default {
  name: 'Complete',
  props: {
    textcomplete: {
      type: String,
      default: '',
    },
  },
  methods: {
    toAgain() {
      this.$emit('toAgain');
    },
    toSurvey() {
      this.$router.push({ path: '/surveyselector', query: this.otherQuery }, onAbort => {});
    },
    toClass() {
      this.$router.push({ path: '/classselector', query: this.otherQuery }, onAbort => {});
    },
  },
};
</script>

<style lang="scss" scoped>
.btn {
    margin-top: 20px;
    margin-bottom: 20px;
    width: 320px;
    height: 50px;
    background: #008eff;
    color: white;
}
</style>
