<template>
  <div class="dashboard-editor-container">
    <el-row>
      <h3>{{ $t('respondent.selectClass.title') }}</h3>
    </el-row>
    <el-row v-for="(aClass,index) in listClass" :key="index">
      <el-button class="classButton" type="primary" @click="chooseClass(aClass.class_id)"> {{ aClass.class_name }} </el-button>
    </el-row>
    <!-- Dialog Waring not select Lang -->
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
  </div>
</template>

<script>
import { getFullInfo } from '../../api/respondent';
import { CLASS, DEPARTMENT, TAG, LANG } from '../../constant_keys';
import { LANG_SELECT } from '../../constant_values';
export default {
  name: 'SelectClass',
  components: {},
  data() {
    return {
      listClass: [],
      listIdClass: [],
      dialogWarningLang: false,
    };
  },
  created(){
    if (this.IsExistLang()) {
      this.getInfo();
    }
  },
  methods: {
    async getInfo(){
      this.listClass = [];
      this.listIdClass = [];
      try {
        var lang = this.$store.state.respondent.LANG_SELECT;
        var params = {
          [LANG.KEY_LANGUAGE]: lang,
        };
        const response = await getFullInfo(params);
        this.listClass = this.listClass.concat(response[CLASS.KEY_LIST]);
        this.listClass.forEach(index => this.listIdClass.push(index.class_id));
        var deparments = response[DEPARTMENT.KEY_LIST];
        var tags = response[TAG.KEY_LIST];
        this.$store.dispatch('respondent/storeSelections',
          [
            {
              key: 'ALL_CLASSES',
              value: this.listClass,
            },
            {
              key: 'ALL_ID_CLASS',
              value: this.listIdClass,
            },
            {
              key: 'ALL_DEPARTMENTS',
              value: deparments,
            },
            {
              key: 'ALL_TAGS',
              value: tags,
            },
          ]
        );
      } catch (error) {
        console.log(error);
      }
    },
    IsExistLang() {
      const Lang = this.$store.state.respondent.LANG_SELECT;
      if (Lang === [LANG_SELECT.JA].toString() || Lang === [LANG_SELECT.EN].toString()) {
        return true;
      } else {
        this.dialogWarningLang = true;
        return false;
      }
    },
    closeWarningLang() {
      this.dialogWarningLang = false;
      this.$router.push({ path: '/', query: this.otherQuery }, onAbort => {});
    },
    chooseClass(val) {
      if (this.listIdClass.includes(val) === true) {
        this.setClass(val);
        this.$router.push({ path: '/surveyselector', query: this.otherQuery }, onAbort => {});
      } else {
        this.$message({
          message: this.$t('respondent.selectClass.mesage'),
          type: 'warning',
        });
      }
    },
    setClass(val) {
      this.$store.state.respondent.CLASS_SELECT = val;
      this.$store.dispatch('respondent/changeSelection', {
        key: [CLASS.KEY_ID],
        value: val,
      });
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .classButton{
    width: 50vw;
    max-width: 450px;
    margin: auto;
  }
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .dashboard-editor-container {
    text-align: center;
    background-color: #e3e3e3;
    min-height: 100vh;
    padding: 100px 60px 0px;
  }
</style>
