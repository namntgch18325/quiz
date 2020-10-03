<template>
  <div class="show-quiz-center">
    <!-- Display IMG Quiz -->
    <div class="show-quiz">
      <el-row v-if="image !== domain + 'null'">
        <el-col :span="24">
          <el-image
            :src="image"
            fit
          />
        </el-col>
      </el-row>
      <!-- Display sentence -->
      <el-row>
        <el-col :span="24">
          <p>{{ sentence }}</p>
        </el-col>
      </el-row>
      <!-- Display Answer -->
      <el-checkbox-group
        v-for="(item, index) in options"
        :key="index"
        v-model="checkList"
        @change="optionChange"
      >
        <el-row>
          <el-col :span="24" class="left">
            <el-checkbox
              :label="item.option_position"
              border
              style="width: 100%; height: 100%; align-items: center; display: flex;"
              :disabled="disableCheckBtn"
            >
              <span class="break">{{ item.option_name }}</span>
            </el-checkbox>
          </el-col>
        </el-row>
      </el-checkbox-group>
    </div>

  </div>
</template>

<script>
export default {
  name: 'QuizForQuizing',
  // Props to transfer data from father to child
  props: {
    // Title Quiz
    title: {
      type: String,
      default: '',
    },
    // Img Quiz
    image: {
      type: String,
      default: '',
    },
    // Sentence Quiz
    sentence: {
      type: String,
      default: '',
    },
    // Options Quiz
    options: {
      type: Array,
      required: true,
    },
    // Percent Complete Survey
    percent: {
      type: Number,
      default: 0,
    },
    // Disable checkbox and btn submit when respondent view quiz complete
    disableCheckBtn: {
      type: Boolean,
      default: false,
    },
    // Options select in quiz complete
    selectAnswerGet: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      // Array store options selected
      checkList: [],
      domain: process.env.MIX_STORE_IMAGE_URL,
    };
  },
  computed: {
    clearSelect() {
      return this.options;
    },
  },
  watch: {
    clearSelect() {
      // If respondent view quiz complete -> select options correct
      // If respondent doing quiz -> select options clean
      this.checkList = this.selectAnswerGet;
    },
  },
  methods: {
    // Method for tranfer options selected when checkbox change
    optionChange() {
      this.$emit('transferOptionSelect', this.checkList);
    },
  },
};
</script>

<style scoped lang="scss">
.show-quiz-center {
  text-align: center;
  height: 100%;
  flex: 1;
}
.space {
  padding: 5px;
}

.left {
  text-align: left;
  margin-top: 5px;
  margin-bottom: 5px;
}

.break {
  white-space: pre-line;
}
.process {
  text-align: center;
  padding-top: 13px;
  padding-bottom: 13px;
  background-color: #bebebe;
}
.show-quiz {
  margin-left: 40px;
  margin-right: 40px;
}
</style>
