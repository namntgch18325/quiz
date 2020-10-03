<template>
  <div class="dashboard-editor-container">
    <el-row>
      <h3>{{ $t('respondent.dashboard.tSelectLang') }}</h3>
    </el-row>
    <el-row>
      <el-col :span="11">
        <el-button class="btn" @click="chooseLange(JA)">{{ $t('respondent.dashboard.btnJA') }}</el-button>
      </el-col>

      <el-col :span="2">
        <div class="space" />
      </el-col>

      <el-col :span="11">
        <el-button class="btn" @click="chooseLange(EN)">{{ $t('respondent.dashboard.btnEN') }}</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { LANG_SELECT } from '../../../constant_values';
export default {
  name: 'DashboardEditor',
  data() {
    return {
      JA: [LANG_SELECT.JA].toString(),
      EN: [LANG_SELECT.EN].toString(),
    };
  },
  methods: {
    chooseLange(lang) {
      if (lang === [LANG_SELECT.JA].toString() || lang === [LANG_SELECT.EN].toString()) {
        this.setLang(lang);
        this.$router.push({ path: '/classselector', query: this.otherQuery }, onAbort => {});
      } else {
        this.$message({
          message: this.$t('respondent.dashboard.popup.message'),
          type: 'warning',
        });
      }
    },
    setLang(lang) {
      if (lang === 'en') {
        document.documentElement.style.setProperty('--fontWeb', 'Graphik Web Regular');
      } else if (lang === 'ja') {
        document.documentElement.style.setProperty('--fontWeb', 'Meiryo UI');
      }
      this.$store.state.respondent.LANG_SELECT = lang;
      this.$root.$i18n.locale = this.$store.state.respondent.LANG_SELECT;
      this.$store.dispatch('app/setLanguage', lang);
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .dashboard-editor-container {
    text-align: center;
    background-color: #e3e3e3;
    min-height: 100vh;
    padding: 100px 30px 0px;
  }
  .space {
    padding: 10px;
  }
  .btn {
    width: 100%;
    background-color: #008eff;
    color: white;
  }
</style>
