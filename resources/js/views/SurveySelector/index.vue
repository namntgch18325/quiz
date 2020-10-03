<template>
  <div class="dashboard-editor-container">
    <div v-if="true == false">
      <el-row :gutter="10">
        <el-col :span="12">
          <el-input v-model="searchKey" style="width:100%" size="small" :placeholder="$t('respondent.selectSurvey.placeholder.title')" />
        </el-col>
        <el-col :span="12">
          <el-select v-model="searchDepartment" style="width:100%" size="small" :clearable="true" :placeholder="$t('respondent.selectSurvey.placeholder.department')">
            <el-option
              v-for="(item,index) in allDepartment"
              :key="index"
              :label="item.department_name"
              :value="item.department_id"
            />
          </el-select>
        </el-col>
      </el-row>
      <el-row style="">
        <el-select
          v-model="searchTags"
          style="width:100%"
          size="small"
          multiple
          :placeholder="$t('respondent.selectSurvey.placeholder.tag')"
        >
          <el-option
            v-for="(item, index) in allTag"
            :key="index"
            :label="item.tag_name"
            :value="item.tag_id"
          />
        </el-select>
      </el-row>
      <el-row>
        <el-button size="small" style="width:100%" @click="onHandleSearch()">
          {{ $t('respondent.selectSurvey.button.search') }}
        </el-button>
      </el-row>
      <el-row style="margin-top:10px;padding-top:5px;border-top:1px solid #909399; text-align:center">
        <el-col :span="8">
          <el-button size="small" icon="el-icon-sort" @click="sortSurveyList('title')">{{ $t('respondent.selectSurvey.button.title') }}</el-button>
        </el-col>
        <el-col :span="8">
          <el-button size="small" icon="el-icon-sort" @click="sortSurveyList('survey_id')">{{ $t('respondent.selectSurvey.button.time') }}</el-button>
        </el-col>
        <el-col :span="8">
          <el-button size="small" icon="el-icon-sort" @click="sortSurveyList('result')">{{ $t('respondent.selectSurvey.button.finished') }}</el-button>
        </el-col>
      </el-row>
    </div>

    <el-row style="margin-top:5px">
      <el-table
        :data="SurveyList"
        style="width: 100%"
        size="small"
        height="65vh"
      >
        <el-table-column
          :label="$t('respondent.selectSurvey.table.col_title')"
          width="150"
        >
          <template slot-scope="scope">
            <span style="margin-left: 5px;overflow: hidden;">{{ scope.row.survey_title }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('respondent.selectSurvey.table.col_done')"
        >
          <template slot-scope="scope">
            <el-tag v-if="scope.row.survey_result === -1" style="margin-left:0px;margin-top:8px;background-color: #a100ff;color: #fff; outline:none; border:none" size="medium">Yes</el-tag>
            <el-tag v-else style="margin-left:0px;margin-top:8px; background-color: #bebebe; color: #fff; outline:none; border:none" type="warning" size="medium">No</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('respondent.selectSurvey.table.col_start')"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              style="margin-left:0px; background-color: #008eff; color: #fff;"
              @click="handleStart(scope.row.survey_id)"
            >
              {{ $t('respondent.selectSurvey.button.start') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
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
    <!-- Dialog warning not exist Class -->
    <el-dialog
      type="danger"
      :title="$t('respondent.selectSurvey.dialog.title')"
      width="250px"
      :visible.sync="dialogWarningClass"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      center
    >
      <center>
        <span v-if="isError === false">{{ $t('respondent.selectSurvey.dialog.content') }}</span>
        <span v-else>{{ $t('respondent.selectSurvey.dialog.wrong') }}</span>
      </center>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="closeWarningClass()">{{ $t('respondent.selectSurvey.dialog.back') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { CLASS, DEPARTMENT, LANG, SEARCH, SURVEY, TAG } from '../../constant_keys';
import { SURVEY_STATUS, LANG_SELECT } from '../../constant_values';
import { getListSurvey } from '../../api/respondent';
export default {
  data(){
    return {
      dialogWarningClass: false,
      dialogWarningLang: false,
      SurveyList: [],
      isError: false,
      searchDepartment: '',
      allTag: [],
      allDepartment: [],
      searchKey: '',
      SurveyListActive: [],
      SurveyListBackNumber: [],
      searchTags: [],
      inputVisible: false,
      inputValue: '',
      optionsTag: [],
      listIDSurvey: [],
    };
  },
  created(){
    if (this.IsExistLang()) {
      if (this.IsExistClass()){
        this.getList();
      }
    }
    this.allTag = this.$store.state.respondent.ALL_TAGS;
    this.allDepartment = this.$store.state.respondent.ALL_DEPARTMENTS;
  },
  methods: {
    cleanListSurvey(){ // clear list survey
      this.SurveyList = [];
      this.SurveyListActive = [];
      this.SurveyListBackNumber = [];
      this.listIDSurvey = [];
    },
    onHandleSearch(){ // handle search
      this.$store.dispatch('respondent/changeSelection',
        {
          key: [SEARCH.KEY_VALUE],
          value: this.searchKey,
        },
        {
          key: [DEPARTMENT.KEY_ID],
          value: this.searchDepartment,
        },
        {
          key: [TAG.KEY_LIST],
          value: this.searchTags,
        }
      );
      this.getList();
    },
    async getList(){ // get list surveys
      this.SurveyList = this.SurveyListActive.concat(this.SurveyListBackNumber);
      var lang = this.$store.state.respondent.LANG_SELECT;
      var class_id = this.$store.state.respondent[CLASS.KEY_ID];
      var params = {
        [LANG.KEY_LANGUAGE]: lang,
        [CLASS.KEY_ID]: class_id,
      };
      if (this.searchDepartment !== ''){
        params[DEPARTMENT.KEY_ID] = this.searchDepartment;
      }
      if (this.searchTags.length !== 0){
        params[TAG.KEY_LIST] = this.searchTags;
      }
      if (this.searchKey !== ''){
        params[SEARCH.KEY_VALUE] = this.searchKey;
      }
      const response = await getListSurvey(params);
      const data = response;
      this.cleanListSurvey();
      for (let i = 0; i < data.length; i++) {
        if (parseInt(data[i][SURVEY.KEY_STATUS]) === parseInt([SURVEY_STATUS.ACTIVE])){
          this.SurveyListActive.push(data[i]);
        } else if (parseInt(data[i][SURVEY.KEY_STATUS]) === parseInt([SURVEY_STATUS.BACK_NUMBER])) {
          this.SurveyListBackNumber.push(data[i]);
        } else {
          this.isError = true;
          this.dialogWarningClass = true;
          break;
        }
      }
      if (data.length > 0){
        data.forEach(index => this.listIDSurvey.push(index.survey_id));
      }
      this.$store.dispatch('respondent/storeSelections',
        [
          {
            key: 'ALL_ID_SURVEY',
            value: this.listIDSurvey,
          },
        ]
      );
      if (this.isError === false) {
        this.SurveyList = this.SurveyListActive.concat(this.SurveyListBackNumber);
      }
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
    IsExistClass(){ // check validate
      const AllClass = this.$store.state.respondent.ALL_ID_CLASS;
      const IdClass = this.$store.state.respondent.CLASS_SELECT;
      if (AllClass.includes(IdClass) === false) {
        this.dialogWarningClass = true;
        return false;
      } else {
        return true;
      }
    },
    closeWarningClass(){ // if unvalidate
      this.dialogWarningClass = false;
      this.$router.push({ path: '/', query: this.otherQuery }, onAbort => {});
    },
    sortSurveyList(prop){ // sort
      this.SurveyListActive = this.SurveyListActive.sort((a, b) => (a[prop] > b[prop]) ? 1 : -1);
      this.SurveyListBackNumber = this.SurveyListBackNumber.sort((a, b) => (a[prop] > b[prop]) ? 1 : -1);
      this.SurveyList = this.SurveyListActive.concat(this.SurveyListBackNumber);
    },
    handleStart(id){ // start quiz
      const AllIdSurvey = this.$store.state.respondent.ALL_ID_SURVEY;
      if (AllIdSurvey.includes(id) === true) {
        this.setSurvey(id);
        this.$router.push({ path: '/quizing', query: this.otherQuery }, onAbort => {});
      } else {
        this.$message({
          message: this.$t('respondent.selectSurvey.dialog.wrongSurvey'),
          type: 'warning',
        });
      }
    },
    setSurvey(id) { // Set id Survey Selected
      this.$store.state.respondent.SURVEY_SELECT = id;
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .tagDiv{
    text-align:left;
    min-height:40px;
    padding:3px 1px 0px;
  }
  .dashboard-editor-container {
    text-align: center;
    background-color: #e3e3e3;
    height: 100vh;
    padding: 15px 15px 0px;
    flex:1;
  }
  .el-tag {
    margin-left: 10px;
    margin-bottom: 10px;
  }
  .button-new-tag {
    margin-left: 0px;
    height: 30px;
    line-height: 30px;
    font-size: 12px;
    padding-top: 0px;
    padding-bottom: 2px;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>
