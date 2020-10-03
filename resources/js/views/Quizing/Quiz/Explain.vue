<template>
  <div class="app-container">
    <center>
      <div class="imageExplain">
        <el-image
          :src="imageexplain"
          fill
        />
      </div>
      <div class="textExplain">
        <p>{{ textexplain }}</p>
      </div>
      <div v-if="check == true">
        <el-button class="btnCorrect" @click="backToQuiz">{{ $t('respondent.quizing.button.goToNext') }}</el-button>
      </div>
      <div v-if="check != true">
        <el-button class="btnIncorrect" @click="backToQuiz">{{ $t('respondent.quizing.button.tryAgain') }}</el-button>
      </div>
    </center>
  </div>
</template>

<script>
export default {
  name: 'Explain',
  props: {
    imageexplain: {
      type: String,
      default: '',
    },
    textexplain: {
      type: String,
      default: '',
    },
    check: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    backToQuiz() {
      this.$emit('backToQuizComp');
    },
  },
};
</script>

<style lang="scss" scoped>
.imgExplain {
    margin-top: 10px;
    margin-bottom: 10px;
}
.textExplain {
    margin-top: 10px;
    margin-bottom: 10px;
}
.btnCorrect {
    height: 50px;
    width: 200px;
    background-color: #008eff;
    color: white;
    font-weight: bold;
}
.btnIncorrect {
    height: 50px;
    width: 200px;
    background-color: #00baff;
    color: white;
    font-weight: bold;
}
</style>
