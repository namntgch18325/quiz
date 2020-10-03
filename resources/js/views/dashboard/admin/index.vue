<template>
  <div class="app-container">
    <div class="filter-container">
      <el-row>
        <el-col :span="3">
          <el-button type="primary" style="width: 100%" :disabled="disBtnClear" @click="GetResult()">{{ $t('dashboard.button.clear') }}</el-button>
        </el-col>
        <el-col :span="1"><div class="space" /></el-col>
        <el-col :span="4">
          <el-select
            v-model="selectedRespondents"
            filterable
            default-first-option
            style="width: 100%;"
            :placeholder="$t('dashboard.placeholder.chooseRespondent')"
            :disabled="disRespondent"
            @change="handleSearch()"
          >
            <el-option
              v-for="(item,index1) in ListRespondent"
              :key="index1"
              :label="item.user_name"
              :value="item.user_id"
            />
          </el-select>
        </el-col>
        <el-col :span="1"><div class="space" /></el-col>
        <el-col :span="4">
          <el-select
            v-model="selectedSurveys"
            filterable
            default-first-option
            style="width: 100%;"
            :placeholder="$t('dashboard.placeholder.chooseSurvey')"
            :disabled="disSurvey"
            @change="handleSearch()"
          >
            <el-option
              v-for="(item,index2) in ListSurvey"
              :key="index2"
              :label="item.survey_title"
              :value="item.survey_id"
            />
          </el-select>
        </el-col>
        <el-col :span="1"><div class="space" /></el-col>
        <el-col :span="6">
          <el-date-picker
            v-model="selectedDate"
            type="daterange"
            range-separator="To"
            :start-placeholder="$t('dashboard.placeholder.startDate')"
            :end-placeholder="$t('dashboard.placeholder.endDate')"
            style="width: 100%;"
            format="dd-MM-yyyy"
            value-format="yyyy-MM-dd"
            :disabled="disDay"
            @change="handleSearch()"
          />
        </el-col>
        <el-col :span="1"><div class="space" /></el-col>
        <el-col :span="3">
          <el-button type="primary" style="width: 100%" :disabled="disExport" @click="handleDownload">{{ $t('dashboard.button.export') }}</el-button>
        </el-col>
      </el-row>
    </div>

    <el-table
      :data="ListResult"
      border
      fit
      stripe
      highlight-current-row
      height="700"
      style="width: 100%;"
    >
      <el-table-column
        align="center"
        :label="$t('dashboard.table.colRespondent')"
        min-width="300"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.user_name }}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        :label="$t('dashboard.table.colSurvey')"
        min-width="300"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.survey_title }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        :label="$t('dashboard.table.colFirstTime')"
        min-width="300"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.answered_survey_first_submit }}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        :label="$t('dashboard.table.colLastTime')"
        min-width="300"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.answered_survey_last_update }}</span>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
import { getResult } from '@/api/dashboard';
import { LANG, SURVEY, USER } from '../../../constant_keys';

export default {
  name: 'DashboardAdmin',
  components: {
  },
  data() {
    return {
      keyword: '',
      ListRespondent: [],
      ListSurvey: [],
      selectedSurveys: [],
      selectedRespondents: [],
      ListResult: [],
      selectedDate: null,
      disBtnClear: true,
      disRespondent: false,
      disSurvey: false,
      disDay: false,
      disExport: false,
    };
  },
  computed: {
    changeLang() {
      return this.$store.getters.language;
    },
  },
  watch: {
    changeLang() {
      this.GetResult();
    },
  },
  created() {
    this.GetResult();
  },
  methods: {
    async GetResult() {
      var lang = this.$store.getters.language;
      var params = {
        [LANG.KEY_LANGUAGE]: lang,
      };
      var data = await getResult(params);
      this.ListResult = data.data;
      this.selectedRespondents = '';
      this.selectedSurveys = '';
      this.selectedDate = '';
      this.disRespondent = false;
      this.disSurvey = false;
      this.disDay = false;
      this.disBtnClear = true;
      this.disExport = false;
      this.GetListFilter();
    },
    GetListFilter() {
      var rawRespondents = this.ListResult.map(a => {
        return { [USER.ID]: a[USER.ID], [USER.NAME]: a[USER.NAME] };
      });
      var rawSurveys = this.ListResult.map(a => {
        return { [SURVEY.KEY_ID]: a[SURVEY.KEY_ID], [SURVEY.KEY_TITLE]: a[SURVEY.KEY_TITLE] };
      });
      var dups = [];
      this.ListSurvey = rawSurveys.filter(function(el) {
        if (dups.indexOf(el[SURVEY.KEY_ID]) === -1) {
          dups.push(el[SURVEY.KEY_ID]);
          return true;
        }
        return false;
      });
      dups = [];
      this.ListRespondent = rawRespondents.filter(function(el) {
        if (dups.indexOf(el[USER.ID]) === -1) {
          dups.push(el[USER.ID]);
          return true;
        }
        return false;
      });
    },
    handleDownload() {
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['Respondent', 'Survey', 'First Time', 'Last Time'];
        const filterVal = ['user_name', 'survey_title', 'answered_survey_first_submit', 'answered_survey_last_update'];
        var ListData = [];
        this.ListResult.forEach(index => ListData.push(index));
        const data = this.formatJson(filterVal, ListData);
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'ListResult',
          autoWidth: true,
          bookType: 'xlsx',
        });
      });
    },
    filterObj(obj, key, compare){
      var data = obj.filter(function(el) {
        if (el[key] === compare) {
          return true;
        }
        return false;
      });
      return data;
    },
    filterDay(obj) {
      var filterDate = obj;
      var startDate = new Date(this.selectedDate[0]);
      var endDate = new Date(this.selectedDate[1]);

      filterDate = filterDate.filter(function(obj) {
        var reverseStr = obj.answered_survey_first_submit.split('-').reverse().join('-');
        var date = new Date(reverseStr);
        return date >= startDate && date <= endDate;
      });

      return filterDate;
    },
    handleSearch(){
      var filteredRespondent = this.ListResult;
      if (this.selectedRespondents !== '') {
        this.disRespondent = true;
        filteredRespondent = this.filterObj(this.ListResult, [USER.ID], this.selectedRespondents);
      }

      var filteredSurvey = filteredRespondent;
      if (this.selectedSurveys !== '') {
        this.disSurvey = true;
        filteredSurvey = this.filterObj(filteredRespondent, [SURVEY.KEY_ID], this.selectedSurveys);
      }
      this.ListResult = filteredSurvey;

      var filterDate = filteredSurvey;
      if (this.selectedDate !== '') {
        this.disDay = true;
        filterDate = this.filterDay(filteredSurvey);
      }
      this.disBtnClear = false;
      this.ListResult = filterDate;
      if (this.ListResult.length === 0) {
        this.disRespondent = true;
        this.disSurvey = true;
        this.disDay = true;
        this.disExport = true;
      }
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        return v[j];
      }));
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .space {
    padding: 5px;
  }
</style>
