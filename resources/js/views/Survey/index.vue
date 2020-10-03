<template>
  <div class="app-container">
    <!-- Button Create, Delete, Search, Select Filter -->
    <div class="filter-container">
      <el-row :gutter="20">
        <!-- Button Create -->
        <el-col :span="2">
          <center>
            <el-button type="success" @click="clickCreate()">{{ $t('button.create') }}</el-button>
          </center>
        </el-col>
        <!-- Button Delete -->
        <el-col :span="2">
          <center>
            <el-button type="danger" @click="clickDeleteMany()">{{ $t('button.delete') }}</el-button>
          </center>
        </el-col>
        <!-- Input Search -->
        <el-col :span="8">
          <center>
            <el-input v-model="listQuery.title" :placeholder="$t('placeholder.search')" @keyup.enter.native="handleFilter" />
          </center>
        </el-col>
        <!-- Select Display/Hide -->
        <el-col :span="4">
          <center>
            <template>
              <el-select v-model="listQuery.display" clearable :placeholder="$t('placeholder.display')">
                <el-option
                  v-for="(item, index) in filter.display"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </template>
          </center>
        </el-col>
        <!-- Select Department -->
        <el-col :span="4">
          <center>
            <template>
              <el-select v-model="listQuery.department" clearable :placeholder="$t('placeholder.department')">
                <el-option
                  v-for="(item, index) in filter.department"
                  :key="index"
                  :label="item.department_name"
                  :value="item.department_id"
                />
              </el-select>
            </template>
          </center>
        </el-col>
        <!-- Select Class -->
        <el-col :span="4">
          <center>
            <template>
              <el-select v-model="listQuery.class" clearable :placeholder="$t('placeholder.class')">
                <el-option
                  v-for="(item, index) in filter.class"
                  :key="index"
                  :label="item.class_name"
                  :value="item.class_id"
                />
              </el-select>
            </template>
          </center>
        </el-col>

      </el-row>
    </div>
    <!-- Table display Survey -->
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="listSurvey"
      border
      fit
      stripe
      highlight-current-row
      style="width: 100%;"
      class="tableList"
      @selection-change="handleSelectionChange"
    >
      <!-- Column Select for delete many -->
      <el-table-column
        type="selection"
        width="55"
        align="center"
      />
      <!-- Column for display Title Survey -->
      <el-table-column
        :label="$t('table.col_title')"
        align="center"
        min-width="200"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.survey_title }}</span>
        </template>
      </el-table-column>
      <!-- Column for display status Survey (Display or Hide) -->
      <el-table-column
        :label="$t('table.col_hide')"
        align="center"
        min-width="100"
      >
        <template slot-scope="{row}">
          <el-tag :type="row.survey_display | displayFilter">
            {{ row.survey_display }}
          </el-tag>
        </template>
      </el-table-column>
      <!-- Column for display Department -->
      <el-table-column
        :label="$t('table.col_department')"
        align="center"
        min-width="150"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.survey_department_name }}</span>
        </template>
      </el-table-column>
      <!-- Column for display Class -->
      <el-table-column
        :label="$t('table.col_class')"
        align="center"
        min-width="150"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.survey_class_name }}</span>
        </template>
      </el-table-column>
      <!-- Column for display List Quiz -->
      <el-table-column
        :label="$t('table.col_listquiz')"
        align="center"
        min-width="150"
      >
        <template slot-scope="scope">
          <el-popover
            placement="left"
            width="400"
            trigger="hover"
          >
            <el-table :data="scope.row.survey_quizzes">
              <el-table-column
                :label="$t('table.col_listquiz')"
                max-width="400"
                property="quiz_title"
              />
            </el-table>
            <el-button slot="reference">{{ $t('button.quizzes') }}</el-button>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column
        :label="$t('table.col_operations')"
        align="center"
        min-width="150"
      >
        <template slot-scope="{row}">
          <el-button type="primary" icon="el-icon-edit" circle @click="clickEdit(row)" />
          <el-button type="danger" icon="el-icon-delete" circle @click="clickDeleteOne(row)" />
        </template>
      </el-table-column>

    </el-table>

    <!-- Pagination in here -->
    <el-pagination
      :current-page.sync="listQuery.page"
      :page-size="10"
      :total="total"
      background
      layout="total, prev, pager, next, jumper"
      class="pagination"
      @current-change="getTableSurvey"
    />

    <!-- Popup for Create and Edit Survey -->
    <el-dialog
      :visible.sync="dialogVisible"
      :fullscreen="fullscreen"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      width="950px"
      top="30px"
      class="width-dialog"
      @close="closeDialog('ruleform')"
    >
      <div slot="title">
        <el-row>
          <el-col :span="12"><div class="left"><h1>{{ title }}</h1></div></el-col>
          <el-col :span="12"><div class="right"><svg-icon :icon-class="iconfullscreen" @click="showfull()" /></div></el-col>
        </el-row>
      </div>
      <el-form
        ref="ruleform"
        :model="ruleForm"
        :rules="rules"
        class="ruleForm"
      >
        <p>{{ $t('popup.survey.tTitle') }}</p>
        <el-row>
          <el-col :span="8">
            <el-form-item prop="title_ja">
              <el-input
                v-model="ruleForm.title_ja"
                :placeholder="$t('popup.survey.pEnterJapanese')"
              />
            </el-form-item>
          </el-col>
          <el-col :span="1"><div class="space" /></el-col>
          <el-col :span="8">
            <el-form-item prop="title_en">
              <el-input
                v-model="ruleForm.title_en"
                :placeholder="$t('popup.survey.pEnterEnglish')"
              />
            </el-form-item>
          </el-col>
          <el-col :span="1"><div class="space" /></el-col>
          <el-col :span="6">
            <el-form-item prop="display">
              <el-select v-model="ruleForm.display" :disabled="hidden">
                <el-option
                  v-for="(item, index) in filter.display"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="11">
            <el-form-item prop="class">
              <p>{{ $t('popup.survey.tClass') }}</p>
              <el-select v-model="ruleForm.class" :placeholder="$t('popup.survey.tClass')" style="width: 100%;">
                <el-option
                  v-for="(item, index) in filter.class"
                  :key="index"
                  :label="item.class_name"
                  :value="item.class_id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="2"><div class="space" /></el-col>
          <el-col :span="11">
            <el-form-item prop="department">
              <p>{{ $t('popup.survey.tDepartment') }}</p>
              <el-select v-model="ruleForm.department" :placeholder="$t('popup.survey.tDepartment')" style="width: 100%;">
                <el-option
                  v-for="(item, index) in filter.department"
                  :key="index"
                  :label="item.department_name"
                  :value="item.department_id"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="11">
            <el-form-item prop="status">
              <p>{{ $t('popup.survey.tStatus') }}</p>
              <el-select v-model="ruleForm.status" :placeholder="$t('popup.survey.pStatus')" style="width: 100%;">
                <el-option
                  v-for="(item, index) in filter.status"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="2"><div class="space" /></el-col>
          <el-col :span="11">
            <el-form-item>
              <p>{{ $t('popup.survey.tTag') }}</p>
              <el-select
                v-model="ruleForm.tag"
                multiple
                filterable
                default-first-option
                style="width: 100%;"
                :placeholder="$t('popup.survey.pchooseTag')"
              >
                <el-option
                  v-for="(item, index) in filter.tag"
                  :key="index"
                  :label="item.tag_name"
                  :value="item.tag_id"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <p>{{ $t('popup.survey.tchoosequiz') }}</p>
          <div style="width: 100%; text-align: center;">
            <el-transfer
              v-model="listQuizSelected"
              filterable
              :titles="[$t('popup.survey.tLeftTransfer'), $t('popup.survey.tRightTransfer')]"
              :format="{
                noChecked: '${total}',
                hasChecked: '${checked}/${total}'
              }"
              :data="listQuiz"
            />
            <el-row>
              <el-col :span="11">
                <div class="footer-left">
                  <el-row>
                    <el-col :span="11">
                      <el-button size="small" style="width: 100%" @click="sortTimeListQuiz">{{ $t('popup.quiz.button.time') }}</el-button>
                    </el-col>

                    <el-col :span="2">
                      <div class="space" />
                    </el-col>

                    <el-col :span="11">
                      <el-button size="small" style="width: 100%" @click="sortAlphabetListQuiz">{{ $t('popup.quiz.button.alphabet') }}</el-button>
                    </el-col>
                  </el-row>
                </div>
              </el-col>

              <el-col :span="2">
                <div class="space" />
              </el-col>

              <el-col :span="11">
                <div class="space" />
              </el-col>
            </el-row>
          </div>
        </el-row>

        <p>{{ $t('popup.survey.tComplete') }}</p>
        <el-row>
          <el-col :span="11">
            <el-form-item prop="complete_ja">
              <el-input
                v-model="ruleForm.complete_ja"
                type="textarea"
                :rows="2"
                :placeholder="$t('popup.survey.pEnterJapanese')"
              />
            </el-form-item>
          </el-col>
          <el-col :span="2"><div class="space" /></el-col>
          <el-col :span="11">
            <el-form-item prop="complete_en">
              <el-input
                v-model="ruleForm.complete_en"
                type="textarea"
                :rows="2"
                :placeholder="$t('popup.survey.pEnterEnglish')"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="11">
            <p>{{ $t('popup.survey.tCorrectPic') }}</p>
            <el-form-item>
              <input id="correct_pic" type="file" accept="image/*" @change="preView_correct">
              <div id="preview">
                <center>
                  <el-image
                    style="width: 200px; height: 200px; margin-top: 10px; margin-botton: 10px;"
                    :src="img_correct"
                    fit
                  />
                </center>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="2"><div class="space" /></el-col>
          <el-col :span="11">
            <p>{{ $t('popup.survey.tIncorrectPic') }}</p>
            <el-form-item>
              <input id="incorrect_pic" type="file" accept="image/*" @change="preView_incorrect">
              <div id="preview">
                <center>
                  <el-image
                    style="width: 200px; height: 200px; margin-top: 10px; margin-botton: 10px;"
                    :src="img_incorrect"
                    fit
                  />
                </center>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">
          {{ $t('button.close') }}
        </el-button>
        <el-button type="primary" :disabled="isProcess" @click="submitForm()">
          {{ $t('button.save') }}
        </el-button>
      </div>

    </el-dialog>

    <el-dialog
      :title="$t('popup.survey.delete.title')"
      :visible.sync="dialogVisibleDelete"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      center
      width="350px"
    >
      <center>{{ $t('popup.survey.delete.content') }}</center>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleDelete = false">
          {{ $t('popup.survey.delete.close') }}
        </el-button>
        <el-button type="danger" @click="submitDelete()">
          {{ $t('popup.survey.delete.Delete') }}
        </el-button>
      </div>

    </el-dialog>
  </div>
</template>

<script>
import { fetchList, getInformation, fetchData, addSurvey, editSurvey, deleteSurvey } from '@/api/survey';

export default {
  filters: {
    displayFilter(display) {
      const displayMap = {
        Display: 'success',
        Hide: 'danger',
      };
      return displayMap[display];
    },
  },
  data() {
    return {
      filter: {
        display: [
          {
            value: 1,
            label: this.$t('popup.survey.display.sDisplay'),
          },
          {
            value: 0,
            label: this.$t('popup.survey.display.sHide'),
          },
        ],
        status: [
          {
            value: 1,
            label: this.$t('popup.survey.status.sActions'),
          },
          {
            value: 0,
            label: this.$t('popup.survey.status.sBack'),
          },
        ],
        department: [],
        class: [],
        tag: [],
      },
      value: '',
      tableKey: 0,
      listSurvey: [],
      dialogVisible: false,
      dialogVisibleDelete: false,
      action: '',
      hidden: false,
      isProcess: false,
      title: '',
      fullscreen: false,
      iconfullscreen: 'fullscreen',
      ruleForm: {
        title_ja: '',
        title_en: '',
        display: undefined,
        class: undefined,
        department: undefined,
        status: undefined,
        tag: [],
        complete_ja: '',
        complete_en: '',
        correctPic: '',
        incorrectPic: '',
      },
      rules: {
        title_ja: [
          { required: true, message: this.$t('popup.survey.validate.rTitle'), trigger: 'blur' },
          { max: 255, message: this.$t('popup.survey.validate.rTitle'), trigger: 'blur' },
        ],
        title_en: [
          { required: true, message: this.$t('popup.survey.validate.rTitle'), trigger: 'blur' },
          { max: 255, message: this.$t('popup.survey.validate.lTitle'), trigger: 'blur' },
        ],
        display: [
          { required: true, message: this.$t('popup.survey.validate.rDisplay'), trigger: ['blur', 'change'] },
        ],
        class: [
          { required: true, message: this.$t('popup.survey.validate.rClass'), trigger: ['blur', 'change'] },
        ],
        department: [
          { required: true, message: this.$t('popup.survey.validate.rDepartment'), trigger: ['blur', 'change'] },
        ],
        status: [
          { required: true, message: this.$t('popup.survey.validate.rStauts'), trigger: ['blur', 'change'] },
        ],
        complete_ja: [
          { required: true, message: this.$t('popup.survey.validate.rComplete'), trigger: 'blur' },
          { max: 255, message: this.$t('popup.survey.validate.lComplete'), trigger: 'blur' },
        ],
        complete_en: [
          { required: true, message: this.$t('popup.survey.validate.rComplete'), trigger: 'blur' },
          { max: 255, message: this.$t('popup.survey.validate.lComplete'), trigger: 'blur' },
        ],
      },
      listLoading: true,
      listQuery: {
        page: 1,
        la: this.$root.$i18n.locale,
        title: '',
        display: undefined,
        department: undefined,
        class: undefined,
      },
      multipleSelection: [],
      total: 0,
      last_page: 0,
      listQuiz: [],
      listQuizBackUp: [],
      listQuizSelected: [],
      selectVisible: false,
      tempID: undefined,
      tempSelectTag: undefined,
      img_correct: '',
      img_incorrect: '',
      dataLength: undefined,
      domain: process.env.MIX_STORE_IMAGE_URL,
    };
  },
  computed: {
    filterTableDisplay() {
      return this.listQuery.display;
    },
    filterTableDepartment() {
      return this.listQuery.department;
    },
    filterTableClass() {
      return this.listQuery.class;
    },
    changeLanguages() {
      return this.$root.$i18n.locale;
    },
  },
  watch: {
    filterTableDisplay() {
      this.listQuery.page = 1;
      this.getTableSurvey();
    },
    filterTableDepartment() {
      this.listQuery.page = 1;
      this.getTableSurvey();
    },
    filterTableClass() {
      this.listQuery.page = 1;
      this.getTableSurvey();
    },
    changeLanguages() {
      this.listQuery.la = this.$root.$i18n.locale;
      this.getTableSurvey();
      this.getDataInformation();
    },
  },
  created() {
    this.getTableSurvey(); // Get data in table display survey (page)
    this.getDataInformation(); // Get data in filter class, department, display and data quiz (id, title)
  },
  methods: {
    // Action show popup fullscreen
    showfull() {
      if (this.fullscreen === false) {
        this.fullscreen = true;
        this.iconfullscreen = 'exit-fullscreen';
      } else {
        this.fullscreen = false;
        this.iconfullscreen = 'fullscreen';
      }
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = [];
      for (var i = 0; i < val.length; i++) {
        this.multipleSelection.push(val[i].survey_id);
      }
    },
    handleFilter() { // Get date when search
      this.listQuery.page = 1;
      this.getTableSurvey();
    },
    // Action click button create
    clickCreate() {
      this.action = 'Create';
      this.hidden = true;
      this.isProcess = false;
      this.ruleForm.display = 1;
      this.img_correct = '';
      this.img_incorrect = '';
      this.dialogVisible = true;
      this.title = this.$t('popup.survey.titleCreate');
    },
    // Action click button edit
    clickEdit(row) {
      this.action = 'Edit';
      this.hidden = false;
      this.isProcess = false;
      var resEdit = fetchData({
        survey_id: row.survey_id,
        la: this.listQuery.la,
      });
      resEdit.then((data) => {
        this.ruleForm.title_ja = data.data.title_ja;
        this.ruleForm.title_en = data.data.title_en;
        this.ruleForm.display = data.data.display;
        this.ruleForm.class = data.data.class_id;
        this.ruleForm.department = data.data.department_id;
        this.ruleForm.status = data.data.status;
        for (var i = 0; i < data.data.tags.length; i++) {
          this.ruleForm.tag.push(data.data.tags[i].id);
        }
        this.listQuizSelected = data.data.survey_quizzes;
        this.ruleForm.complete_ja = data.data.completemessage_ja;
        this.ruleForm.complete_en = data.data.completemessage_en;
        this.tempID = row.survey_id;
        this.img_correct = this.domain + data.data.correct_pic;
        this.img_incorrect = this.domain + data.data.incorrect_pic;
      });
      this.dialogVisible = true;
      this.title = this.$t('popup.survey.titleEdit');
    },
    // Action when close form in popup
    closeDialog(formName) {
      this.dialogVisible = false;
      this.ruleForm.tag = [];
      this.img_correct = '';
      this.img_incorrect = '';
      this.listQuizSelected = [];
      document.getElementById('correct_pic').value = '';
      document.getElementById('incorrect_pic').value = '';
      this.$refs[formName].resetFields();
    },
    // Action when click delete one survey
    clickDeleteOne(row) {
      this.dialogVisibleDelete = true;
      this.action = 'DeleteOne';
      this.tempID = row.survey_id;
    },
    // Action when click delete many survey
    clickDeleteMany() {
      this.dialogVisibleDelete = true;
      this.action = 'DeleteMany';
    },
    preView_correct(e) {
      const file_correct = event.target.files[0];
      this.img_correct = URL.createObjectURL(file_correct);
    },
    preView_incorrect(e) {
      const file_incorrect = event.target.files[0];
      this.img_incorrect = URL.createObjectURL(file_incorrect);
    },
    // Call api to get data for table display survey
    async getTableSurvey() {
      this.listLoading = true;
      const AllSurvey = await fetchList(this.listQuery);
      // Display 0, 1 => Display and Hide
      for (var i = 0; i < AllSurvey.data.length; i++) {
        if (AllSurvey.data[i].survey_display === 1) {
          AllSurvey.data[i].survey_display = 'Display';
        } else if (AllSurvey.data[i].survey_display === 0) {
          AllSurvey.data[i].survey_display = 'Hide';
        }
      }
      // Fetch data and stop lazy loading table
      this.listSurvey = AllSurvey.data;
      this.listQuery.page = AllSurvey.meta.current_page;
      this.total = AllSurvey.meta.total;
      this.last_page = AllSurvey.meta.last_page;
      this.dataLength = AllSurvey.data.length;
      this.listLoading = false;
    },
    // Action get data filter and data quiz (id, title) follow languages
    async getDataInformation() {
      const AllInformation = await getInformation({
        la: this.listQuery.la,
      });
      this.filter.department = AllInformation.Informations.departments;
      this.filter.class = AllInformation.Informations.classes;
      this.filter.tag = AllInformation.Informations.tags;
      for (var i = 0; i < AllInformation.quizzes_list.length; i++) {
        AllInformation.quizzes_list[i].key = AllInformation.quizzes_list[i].quiz_id;
        AllInformation.quizzes_list[i].label = AllInformation.quizzes_list[i].quiz_title;
        delete AllInformation.quizzes_list[i].quiz_id;
        delete AllInformation.quizzes_list[i].quiz_title;
      }
      this.listQuiz = AllInformation.quizzes_list;
      this.listQuizBackUp = AllInformation.quizzes_list;
      console.log(this.listQuiz);
    },
    // Action when remove one tag in create survey
    handleClose(index) {
      this.ruleForm.tag.splice(index, 1);
    },
    // Action when click button + add new tag in create survey
    showSelect() {
      this.selectVisible = true;
    },
    // Action handle show tag selected
    handleSelectConfirm() {
      const selectValue = this.tempSelectTag;
      if (selectValue) {
        for (var i = 0; i < this.filter.tag.length; i++) {
          if (selectValue === this.filter.tag[i].tag_id) {
            this.ruleForm.tag.push({
              tag_id: this.filter.tag[i].tag_id,
              tag_name: this.filter.tag[i].tag_name,
            });
          }
        }
      }
      this.selectVisible = false;
      this.tempSelectTag = undefined;
    },
    // Action handle when click button Save in popup
    submitForm() {
      // Validate before create ( - tag, quiz, img)
      this.$refs['ruleform'].validate((valid) => {
        if (valid) {
          // If user create survey
          if (this.action === 'Create') {
            // Validate number quiz selected equals 5 (quiz = 5)
            if (this.listQuizSelected.length > 0) {
              // Get file img in input file
              this.correctPic = document.getElementById('correct_pic').files[0];
              this.incorrectPic = document.getElementById('incorrect_pic').files[0];
              // Validata img
              if (this.correctPic !== undefined && this.incorrectPic !== undefined) {
                // Create new FormData to store data create
                var fileCreate = new FormData();
                fileCreate.append('title_ja', this.ruleForm.title_ja);
                fileCreate.append('title_en', this.ruleForm.title_en);
                fileCreate.append('classs_id', this.ruleForm.class);
                fileCreate.append('department_id', this.ruleForm.department);
                fileCreate.append('status', this.ruleForm.status);
                for (var p = 0; p < this.ruleForm.tag.length; p++) {
                  fileCreate.append('tag_list' + '[' + p + ']', this.ruleForm.tag[p]);
                }
                var k = 0;
                for (k; k < this.listQuizSelected.length; k++) {
                  fileCreate.append('quizz_id_list' + '[' + k + ']', this.listQuizSelected[k]);
                }
                fileCreate.append('completemessage_ja', this.ruleForm.complete_ja);
                fileCreate.append('completemessage_en', this.ruleForm.complete_en);
                fileCreate.append('correct_pic', this.correctPic);
                fileCreate.append('incorrect_pic', this.incorrectPic);
                fileCreate.append('languages', this.$root.$i18n.locale);
                // Call api to create
                this.isProcess = true;
                var resCreate = addSurvey(
                  fileCreate
                );
                resCreate.then((data) => {
                  for (var j = 0; j < data.data.length; j++) {
                    if (data.data[j].survey_display === 1) {
                      data.data[j].survey_display = 'Display';
                    } else if (data.data[j].survey_display === 0) {
                      data.data[j].survey_display = 'Hide';
                    }
                  }
                  this.listLoading = true;
                  this.listSurvey = data.data;
                  this.dataLength = data.data.length;
                  this.listQuery.page = data.meta.current_page;
                  this.last_page = data.meta.last_page;
                  this.total = data.meta.total;
                  this.listLoading = false;
                  this.dialogVisible = false;
                  this.listQuery.title = '';
                  this.listQuery.display = undefined;
                  this.listQuery.department = undefined;
                  this.listQuery.class = undefined;
                  this.isProcess = false;
                  this.$message({
                    message: this.$t('popup.survey.notify.addSuccess'),
                    type: 'success',
                  });
                });
              } else {
                // Message when not input img
                this.$message({
                  message: this.$t('popup.survey.validate.notInputIMG'),
                  type: 'warning',
                });
              }
            }
          } else if (this.action === 'Edit') {
            if (this.listQuizSelected.length > 0) {
              var fileEdit = new FormData();
              fileEdit.append('title_ja', this.ruleForm.title_ja);
              fileEdit.append('title_en', this.ruleForm.title_en);
              fileEdit.append('display', this.ruleForm.display);
              fileEdit.append('classs_id', this.ruleForm.class);
              fileEdit.append('department_id', this.ruleForm.department);
              fileEdit.append('status', this.ruleForm.status);
              for (var u = 0; u < this.ruleForm.tag.length; u++) {
                fileEdit.append('tag_list' + '[' + u + ']', this.ruleForm.tag[u]);
              }

              var l = 0;
              for (l; l < this.listQuizSelected.length; l++) {
                fileEdit.append('quizz_id_list' + '[' + l + ']', this.listQuizSelected[l]);
              }
              // Get file img in input file
              this.correctPic = document.getElementById('correct_pic').files[0];
              this.incorrectPic = document.getElementById('incorrect_pic').files[0];
              if (this.correctPic !== undefined) {
                fileEdit.append('correct_pic', this.correctPic);
              }
              if (this.incorrectPic !== undefined) {
                fileEdit.append('incorrect_pic', this.incorrectPic);
              }
              fileEdit.append('completemessage_ja', this.ruleForm.complete_ja);
              fileEdit.append('completemessage_en', this.ruleForm.complete_en);
              fileEdit.append('languages', this.$root.$i18n.locale);
              fileEdit.append('id', this.tempID);
              fileEdit.append('current_page', this.listQuery.page);
              fileEdit.append('la', this.listQuery.la);
              // Call api to create
              this.isProcess = true;
              var resEditSave = editSurvey(
                fileEdit
              );
              resEditSave.then((data) => {
                this.dialogVisible = false;
                this.listLoading = true;
                for (var k = 0; k < data.data.length; k++) {
                  if (data.data[k].survey_display === 1) {
                    data.data[k].survey_display = 'Display';
                  } else if (data.data[k].survey_display === 0) {
                    data.data[k].survey_display = 'Hide';
                  }
                }
                this.listSurvey = data.data;
                this.dataLength = data.data.length;
                this.listQuery.page = data.meta.current_page;
                this.total = data.meta.total;
                this.listQuery.last_page = data.meta.last_page;
                this.isProcess = false;
                this.listLoading = false;
                this.listQuery.title = '';
                this.listQuery.display = undefined;
                this.listQuery.department = undefined;
                this.listQuery.class = undefined;
                this.$message({
                  message: this.$t('popup.survey.notify.editSucees'),
                  type: 'success',
                });
              });
            }
          }
        } else {
          // Message when validate failed
          this.$message({
            message: this.$t('popup.survey.validate.notInfor'),
            type: 'warning',
          });
        }
      });
    },
    submitDelete() {
      if (this.action === 'DeleteOne') {
        var current_pageDeleteOne = this.listQuery.page;
        if (this.dataLength > 1) {
          current_pageDeleteOne = this.listQuery.page;
        } else if (this.dataLength === 1) {
          current_pageDeleteOne = this.listQuery.page - 1;
        }
        this.isProcess = true;
        var resDeleteOne = deleteSurvey({
          id_list: [this.tempID],
          current_page: current_pageDeleteOne,
          languages: this.listQuery.la,
        });
        if (resDeleteOne) {
          resDeleteOne.then((data) => {
            this.listLoading = true;
            for (var i = 0; i < data.data.length; i++) {
              if (data.data[i].survey_display === 1) {
                data.data[i].survey_display = 'Display';
              } else {
                data.data[i].survey_display = 'Hide';
              }
            }
            this.listSurvey = data.data;
            this.total = data.meta.total;
            this.last_page = data.meta.last_page;
            this.dataLength = data.data.length;
            this.listLoading = false;
            this.dialogVisibleDelete = false;
            this.isProcess = false;
            this.listQuery.title = '';
            this.listQuery.display = undefined;
            this.listQuery.department = undefined;
            this.listQuery.class = undefined;
            this.$message({
              message: this.$t('popup.survey.notify.deleteSuccess'),
              type: 'success',
            });
          });
        } else {
          this.dialogVisibleDelete = false;
          this.isProcess = false;
          this.$message({
            message: this.$t('popup.survey.notify.deleteFailed'),
            type: 'warning',
          });
        }
      } else if (this.action === 'DeleteMany') {
        if (this.multipleSelection.length === 0) {
          this.dialogVisibleDelete = false;
          this.$message({
            message: this.$t('popup.survey.notify.notchoseDelete'),
            type: 'warning',
          });
        } else if (this.multipleSelection.length > 0) {
          var current_pageDeleteMany = this.listQuery.page;
          this.dataLength -= this.multipleSelection.length;
          if (this.dataLength > 1) {
            current_pageDeleteMany = this.listQuery.page;
          }
          if (this.dataLength === 1 || this.dataLength === 0) {
            if (this.listQuery.page === this.last_page) {
              current_pageDeleteMany = this.listQuery.page - 1;
              this.listQuery.page -= 1;
            }
          }
          this.isProcess = true;
          var resDeleteMany = deleteSurvey({
            id_list: this.multipleSelection,
            current_page: current_pageDeleteMany,
            languages: this.listQuery.la,
          });
          if (resDeleteMany) {
            this.isProcess = false;
            this.$message({
              message: this.$t('popup.survey.notify.deleteSuccess'),
              type: 'success',
            });
            resDeleteMany.then((data) => {
              this.listLoading = true;
              for (var j = 0; j < data.data.length; j++) {
                if (data.data[j].survey_display === 1) {
                  data.data[j].survey_display = 'Display';
                } else {
                  data.data[j].survey_display = 'Hide';
                }
              }
              this.listSurvey = data.data;
              this.total = data.meta.total;
              this.last_page = data.meta.last_page;
              this.listQuery.page = data.meta.current_page;
              this.dataLength = data.data.length;
              this.multipleSelection = [];
              this.listLoading = false;
              this.dialogVisibleDelete = false;
              this.listQuery.title = '';
              this.listQuery.display = undefined;
              this.listQuery.department = undefined;
              this.listQuery.class = undefined;
            });
          } else {
            this.isProcess = false;
            this.$message({
              message: this.$t('popup.survey.notify.deleteFailed'),
              type: 'warning',
            });
          }
        }
      }
    },
    sortTimeListQuiz() {
      if (JSON.stringify(this.listQuiz) === JSON.stringify(this.listQuizBackUp)) {
        this.listQuiz.reverse();
      } else {
        this.listQuiz = [...this.listQuizBackUp];
      }
      console.log(this.listQuizBackUp);
    },
    sortAlphabetListQuiz() {
      this.listQuiz = [...this.listQuizBackUp];
      this.listQuiz.sort((a, b) => (a.label > b.label) ? 1 : ((b.label > a.label) ? -1 : 0));
    },
  },
};
</script>

<style>

</style>

<style scoped lang="scss">
.dialog-title {
  display: inline;
}

.left {
  float: left;
  height: 30px;
}

.right {
  float: right;
  height: 30px;
  margin-right: 50px;
  margin-top: 19px;
}

::v-deep h1 {
  margin: 10px !important;
}

::v-deep .el-form-item {
  margin: 0px !important;
}

::v-deep .el-dialog__close {
  margin-top: 16px;
  font-size: 23px;
  color: #000;
  font-weight: 700;
}

.space {
  padding: 1px;
}

::v-deep .el-transfer-panel {
  min-width: 300px !important;
  text-align: left;
  display: inline-block;
}

.pagination {
  margin-top: 10px;
  text-align: right;
}

.el-tag {
  margin-left: 10px;
  margin-bottom: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
.width-dialog{
  min-width: 950px;
}
.footer-left {
  padding-top: 5px;
}
.footer-right {
  padding-top: 5px;
}
</style>
