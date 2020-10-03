<template>
  <div>
    <el-row class="process">
      <el-col :span="2" class="text-process">Start</el-col>
      <el-col :span="1"><div class="space" /></el-col>
      <el-col :span="18">
        <el-progress :percentage="QuizCurrent.percent" color="#7500c0" :format="format" />
      </el-col>
      <el-col :span="1"><div class="space" /></el-col>
      <el-col :span="2" class="text-process">End</el-col>
    </el-row>
    <!-- Component show Quiz -->
    <QuizForQuizing
      v-if="ShowQuiz"
      :title="QuizCurrent.title"
      :image="QuizCurrent.image"
      :sentence="QuizCurrent.sentence"
      :options="QuizCurrent.options"
      :disable-check-btn="disableComChild"
      :select-answer-get="selectAnswerTransfer"
      @transferOptionSelect="getOptionSelect"
    />
    <Explain
      v-if="ShowExpalin"
      :imageexplain="imgExplain"
      :textexplain="Explain"
      :check="checkCorrect"
      @backToQuizComp="getBackToQuiz"
    />
    <Complete
      v-if="ShowComplete"
      :textcomplete="QuizCurrent.complete_message"
      @toAgain="DoAgain"
    />
    <!-- Dialog Popup check select Lang -->
    <el-dialog
      type="danger"
      :title="$t('respondent.selectClass.popup.title')"
      width="250px"
      :visible.sync="dialogWarningLang"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      center
    >
      <center>
        <span>{{ $t('respondent.selectClass.popup.message') }}</span>
      </center>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="closeWarningLang()">{{ $t('respondent.selectClass.popup.back') }}</el-button>
      </span>
    </el-dialog>
    <!-- Dialog Popup check select Class and Survey -->
    <el-dialog
      type="danger"
      :title="$t('respondent.quizing.dialog.titlecheck')"
      width="250px"
      :visible.sync="dialogWarningClass"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      center
    >
      <center>
        <span v-if="isError === false">{{ messPopup }}</span>
        <span v-else>{{ this.$t('respondent.quizing.dialog.wrong') }}</span>
      </center>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="danger"
          @click="closeWarningClass()"
        >{{ $t('respondent.quizing.button.backPage') }}</el-button>
      </span>
    </el-dialog>
    <!-- Button submit quiz -->
    <el-row v-if="ShowQuiz">
      <el-col :span="24" style="margin-top: 10px; padding: 35px; padding-top: 0px;">
        <el-button
          type="primary"
          style="width: 100%;"
          :disabled="disableComChild"
          @click="submit"
        >{{ $t('respondent.quizing.button.submit') }}</el-button>
      </el-col>
    </el-row>

  </div>
</template>

<script>
// Import component
import QuizForQuizing from '@/views/Quizing/Quiz/index.vue';
import Explain from '@/views/Quizing/Quiz/Explain.vue';
import Complete from '@/views/Quizing/Quiz/Complete.vue';
// Imprt Constant
import { STATUS_SURVEY, LANG_SELECT } from '../../constant_values';
// Import Api
import { getOneSurvey, updateStatusDoneSurvey } from '@/api/respondent';
export default {
  components: {
    QuizForQuizing,
    Explain,
    Complete,
  },
  data() {
    return {
      // Store all Survey data there after calling the API
      dataSurvey: [],
      // Status Dialog check
      dialogWarningClass: false,
      dialogWarningLang: false,
      isError: false,
      // Path Redirect when respondent not choose class or survey
      pathRedirect: '',
      // Message when respondent not choose class or survey
      messPopup: '',
      // Data of QUIZ DOING
      QuizCurrent: {
        // Index of quiz doing
        index: 0,
        // Percent survey
        percent: 0,
        title: '',
        image: '',
        sentence: '',
        // Option of quiz current
        options: [],
        // Option selected
        optionSelect: [],
        // Option correct
        correct: [],
        img_correct: '',
        img_incorrect: '',
        ex_correct: '',
        ex_incorrect: '',
        complete_message: '',
      },
      // Title of Submit: Explain correct or incorrect
      titleSubmit: '',
      // Explain of quiz current
      Explain: '',
      // IMG Explain of quiz current
      imgExplain: '',
      checkCorrect: false,
      // Array store quiz complete
      QuizDone: [],
      // Status of btn Back quiz
      disableBtnBack: false,
      // Status of btn Next quiz
      disableBtnNext: false,
      // index Quiz conplete - using for respondent view quiz complete
      indexSaveQuiz: null,
      // check action when indexSaveQuiz change (indexSaveQuiz change when complete quiz or next, back quiz complete)
      actionChangeIndex: '',
      // disable checkbox and btn submit when respondent view quiz complete
      disableComChild: false,
      // Array store option of quiz complete when respondent view quiz complete. if respondent doing quiz it transfer empty
      selectAnswerTransfer: [],
      point: 0,
      numberQuiz: 0,
      ShowQuiz: true,
      ShowExpalin: false,
      ShowComplete: false,
      domain: process.env.MIX_STORE_IMAGE_URL,
    };
  },
  computed: {
    changeQuiz() {
      return this.QuizCurrent.index;
    },
    changeIndexSave() {
      return this.indexSaveQuiz;
    },
  },
  watch: {
    // check quiz complete and change data
    changeQuiz() {
      if (this.QuizCurrent.index < this.numberQuiz) {
        this.fetchDataChangeQuiz();
      } else if (this.QuizCurrent.index === this.numberQuiz) {
        this.updateStatus();
        this.ShowQuiz = false;
        this.ShowExpalin = false;
        this.ShowComplete = true;
      }
    },
  },
  created() {
    // Check respondent choose class and survey: if true -> continue; if false -> redirect
    if (this.IsExistLang()) {
      if (this.IsExitClass()) {
        // Get data of Survey selected
        this.getSurvey();
        // Not complete quiz -> btn back and next is disable
        this.disableBtnBack = true;
        this.disableBtnNext = true;
      }
    }
  },
  methods: {
    format(percentage) {
      return '';
    },
    // Transfer list Option selected and fetch data
    getOptionSelect(listOption) {
      this.QuizCurrent.optionSelect = listOption;
    },
    getBackToQuiz() {
      this.ShowQuiz = true;
      this.ShowExpalin = false;
    },
    IsExistLang() {
      const Lang = this.$store.state.respondent.LANG_SELECT;
      if (Lang === [LANG_SELECT.JA].toString() || Lang === [LANG_SELECT.EN].toString()) {
        return true;
      } else {
        this.dialogWarningLang = true;
        this.$root.$i18n.locale = this.$store.getters.language;
        return false;
      }
    },
    closeWarningLang() {
      this.dialogWarningLang = false;
      this.$router.push({ path: '/', query: this.otherQuery }, onAbort => {});
    },
    // Check respondent choose class and survey
    IsExitClass() {
      const IdClass = this.$store.state.respondent.CLASS_SELECT;
      const AllIdClass = this.$store.state.respondent.ALL_ID_CLASS;
      const IdSurvey = this.$store.state.respondent.SURVEY_SELECT;
      const AllIdSurvey = this.$store.state.respondent.ALL_ID_SURVEY;

      if (AllIdClass.includes(IdClass) === false) {
        this.messPopup = this.$t('respondent.quizing.dialog.notClass');
        this.dialogWarningClass = true;
        this.pathRedirect = '/classselector';
        return false;
      } else {
        if (AllIdSurvey.includes(IdSurvey) === false) {
          this.messPopup = this.$t('respondent.quizing.dialog.notSurvey');
          this.dialogWarningClass = true;
          this.pathRedirect = '/surveyselector';
          return false;
        } else {
          return true;
        }
      }
    },
    // When respondent close dialog warning (not choose class or survey) -> redirect
    closeWarningClass() {
      this.dialogWarningClass = false;
      this.$router.push({ path: this.pathRedirect, query: this.otherQuery }, onAbort => {});
    },
    // Get data of Survey Current
    async getSurvey() {
      const IDSurvey = this.$store.state.respondent.SURVEY_SELECT;
      // Params get Survey
      var params = {
        id: IDSurvey,
        la: this.$root.$i18n.locale,
      };
      // Call api
      var resGetSurvey = await getOneSurvey(params);
      // Fetch data
      this.dataSurvey = resGetSurvey;
      // Show quiz current (Quiz 1)
      this.fetchDataChangeQuiz();
      // Data of dialog submit quiz
      this.QuizCurrent.img_correct = this.domain + this.dataSurvey.survey_correct_picture;
      this.QuizCurrent.img_incorrect = this.domain + this.dataSurvey.survey_incorrect_picture;
      this.QuizCurrent.complete_message = this.dataSurvey.survey_complete_message;
      this.numberQuiz = this.dataSurvey.quizzes.length;
      this.point = 100 / this.numberQuiz;
    },
    RandomQuiz(ArrayQuiz) {
      for (var i = ArrayQuiz.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [ArrayQuiz[i], ArrayQuiz[j]] = [ArrayQuiz[j], ArrayQuiz[i]];
      }
      return ArrayQuiz;
    },
    // When respondent click btn submit
    submit() {
      if (this.QuizCurrent.optionSelect.length === 0) {
        this.$message({
          message: this.$t('respondent.quizing.dialog.notAnswer'),
          type: 'warning',
        });
      } else if (this.QuizCurrent.correct.length !== this.QuizCurrent.optionSelect.length){
        this.ShowQuiz = false;
        this.ShowExpalin = true;
        this.Explain = this.QuizCurrent.ex_incorrect;
        this.imgExplain = this.QuizCurrent.img_incorrect;
        this.checkCorrect = false;
        this.QuizCurrent.options = this.RandomQuiz(this.QuizCurrent.options);
      } else {
        this.checkSubmit = true;
        var countCorrect = 0;
        for (var i = 0; i < this.QuizCurrent.optionSelect.length; i++) {
          for (var j = 0; j < this.QuizCurrent.correct.length; j++) {
            if (this.QuizCurrent.optionSelect[i] === this.QuizCurrent.correct[j]) {
              countCorrect += 1;
            }
          }
        }

        if (countCorrect === this.QuizCurrent.correct.length) {
          if (this.QuizCurrent.index < this.numberQuiz) {
            this.Explain = this.QuizCurrent.ex_correct;
            this.imgExplain = this.QuizCurrent.img_correct;
            this.checkCorrect = true;
            this.ShowQuiz = false;
            this.ShowExpalin = true;
            this.QuizCurrent.index += 1;
            if (this.QuizCurrent.index === this.numberQuiz) {
              this.QuizCurrent.percent = 100;
            }
            this.QuizCurrent.options = this.RandomQuiz(this.QuizCurrent.options);
            if (this.QuizCurrent.percent < 100) {
              this.QuizCurrent.percent += this.point;
            }
          }
        } else {
          this.QuizCurrent.options = this.RandomQuiz(this.QuizCurrent.options);
          this.ShowQuiz = false;
          this.ShowExpalin = true;
          this.Explain = this.QuizCurrent.ex_incorrect;
          this.imgExplain = this.QuizCurrent.img_incorrect;
          this.checkCorrect = false;
        }
      }
    },
    DoAgain() {
      this.ShowExpalin = false;
      this.ShowComplete = false;
      this.QuizCurrent.percent = 0;
      this.QuizCurrent.index = 0;
      this.ShowQuiz = true;
    },
    // Call api for update status survey: not done -> done
    updateStatus() {
      var dataUpdateStatus = {
        respondent_id: this.$store.getters.userId,
        survey_id: this.$store.state.respondent.SURVEY_SELECT,
        result: parseInt([STATUS_SURVEY.FINISH]),
      };
      updateStatusDoneSurvey(dataUpdateStatus);
    },
    // Change data when complete quiz and next or back quiz (indexSaveQuiz equals index quiz doing)
    fetchDataChangeQuiz() {
      this.QuizCurrent.title = this.dataSurvey.quizzes[this.QuizCurrent.index].quiz_title;
      this.QuizCurrent.image = this.domain + this.dataSurvey.quizzes[this.QuizCurrent.index].quiz_picture;
      this.QuizCurrent.sentence = this.dataSurvey.quizzes[this.QuizCurrent.index].quiz_sentence;
      this.QuizCurrent.options = this.dataSurvey.quizzes[this.QuizCurrent.index].quiz_options;
      this.QuizCurrent.options = this.RandomQuiz(this.QuizCurrent.options);
      this.QuizCurrent.correct = [];
      for (var i = 0; i < this.dataSurvey.quizzes[this.QuizCurrent.index].quiz_options.length; i++) {
        if (this.dataSurvey.quizzes[this.QuizCurrent.index].quiz_options[i].option_correct === 1) {
          this.QuizCurrent.correct.push(this.dataSurvey.quizzes[this.QuizCurrent.index].quiz_options[i].option_position);
        }
      }
      this.QuizCurrent.ex_correct = this.dataSurvey.quizzes[this.QuizCurrent.index].quiz_explain_correct;
      this.QuizCurrent.ex_incorrect = this.dataSurvey.quizzes[this.QuizCurrent.index].quiz_explain_incorrect;
      this.selectAnswerTransfer = [];
    },
  },
};
</script>

<style>

</style>

<style scoped lang="scss">
.break-text {
  width: 100%;
  line-break: auto;
  margin-top: 20px;
}

.btn-back {
  float: right;
  width: 150px;
  margin-right: 10px;
}

.btn-next {
  float: left;
  width: 150px;
  margin-left: 10px;
}
.process {
  text-align: center;
  padding-top: 13px;
  padding-bottom: 13px;
  background-color: #bebebe;
  margin: 0 auto;
  margin-bottom: 15px;
}
.text-process {
  font-size: 15px;
  margin-left: 9px;
  color: #000;
}
</style>
