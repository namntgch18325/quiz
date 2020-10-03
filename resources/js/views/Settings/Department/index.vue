<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button type="success" @click="Create()">{{ $t('button.create') }}</el-button>
      <el-button type="danger" @click="handlePopDeleteMany()">{{ $t('button.delete') }}</el-button>
      <el-input v-model="listQuery.keyword" :placeholder="$t('placeholder.search')" class="inputSearch" @keyup.enter.native="handleFilter" />
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="DepartmentList"
      :default-sort="{ prop: 'name' }"
      border
      fit
      stripe
      highlight-current-row
      style="width: 100%;"
      class="tableClassList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55"
        align="center"
      />

      <el-table-column
        :label="$t('table.col_department_en')"
        align="center"
        sortable
        prop="name"
        min-width="200"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.name_en }}</span>
        </template>
      </el-table-column>

      <el-table-column
        :label="$t('table.col_department_ja')"
        align="center"
        sortable
        prop="name"
        min-width="200"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.name_ja }}</span>
        </template>
      </el-table-column>

      <el-table-column
        v-if="hidden != true"
        :label="$t('table.col_operations')"
        align="center"
        min-width="150"
      >
        <template slot-scope="{ row }">
          <el-button type="primary" icon="el-icon-edit" circle @click="handleEdit(row)" />
          <el-button type="danger" icon="el-icon-delete" circle @click="handlePopDeleteOne(row)" />
        </template>
      </el-table-column>

    </el-table>

    <el-pagination
      :current-page.sync="listQuery.page"
      :page-size="10"
      :total="total"
      background
      layout="total, prev, pager, next, jumper"
      class="pagination"
      @current-change="getList"
    />

    <el-dialog
      :title="titleCnE"
      :visible.sync="dialogVisible"
      @close="closeDialog('ruleForm')"
    >
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        class="ruleForm"
        label-width="150px"
      >
        <el-form-item :label="$t('popup.department.tDepartment_en')" prop="name_en" class="inputClassname">
          <el-input v-model="ruleForm.name_en" :placeholder="$t('popup.department.pDepartment_en')" />
        </el-form-item>

        <el-form-item :label="$t('popup.department.tDepartment_ja')" prop="name_ja" class="inputClassname">
          <el-input v-model="ruleForm.name_ja" :placeholder="$t('popup.department.pDepartment_ja')" />
        </el-form-item>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">
          {{ $t('button.close') }}
        </el-button>
        <el-button :disabled="isproces" type="primary" @click="submit()">
          {{ $t('button.save') }}
        </el-button>
      </div>

    </el-dialog>

    <el-dialog
      :title="$t('popup.department.delete.title')"
      :visible.sync="dialogVisibleDelete"
      center
      width="30%"
    >
      <center>{{ $t('popup.department.delete.content') }}</center>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleDelete = false">
          {{ $t('button.close') }}
        </el-button>
        <el-button type="danger" @click="submitConfrimDelete()">
          {{ $t('button.delete') }}
        </el-button>
      </div>

    </el-dialog>

  </div>
</template>

<script>
import { fetchList, deleteDepartment, addDepartment, editDepartment } from '@/api/department';

export default {
  data() {
    return {
      currentNumberRow: 10, // Number of departments per page
      DepartmentList: [], // The array to contain all the departments on a page
      multipleSelection: [], // Array containing ids selected for deletion
      dialogVisible: false, // Toggle popup
      ruleForm: { // The object contains the department data when editing
        id: undefined,
        name_en: '',
        name_ja: '',
      },
      tempActions: '', // Check the event whether the user wants to Add or Edit
      rules: { // Rule validate
        name_en: [
          { required: true, message: this.$t('popup.department.rule.rname'), trigger: ['blur', 'change'] },
          { max: 255, message: this.$t('popup.department.rule.lname'), trigger: ['blur', 'change'] },
        ],
        name_ja: [
          { required: true, message: this.$t('popup.department.rule.rname'), trigger: ['blur', 'change'] },
          { max: 255, message: this.$t('popup.department.rule.lname'), trigger: ['blur', 'change'] },
        ],
      },
      tableKey: 0,
      total: 0, // Total of department
      last_page: undefined, // Last page
      lengthData: undefined, // Check the remaining data on the page
      listQuery: { // Query to call api
        page: 1,
        keyword: undefined,
      },
      listLoading: true, // Event loading table
      hidden: false,
      dialogVisibleDelete: false,
      temp: undefined,
      isproces: false,
      titleCnE: undefined,
    };
  },
  created() {
    this.getList(); // Call page 1 when loaded page
  },
  methods: {
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
        this.multipleSelection.push(val[i].id);
      }
    },
    submitConfrimDelete(){
      if (this.tempActionsDelete === 'DeleteOne'){
        this.handleDelete(this.temp);
      }
      if (this.tempActionsDelete === 'DeleteMany'){
        this.DeleteMany();
      }
    },
    submit(){
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.isproces = true;
          if (this.tempActions === 'Create') {
            const resCreate = addDepartment({
              name_en: this.ruleForm.name_en,
              name_ja: this.ruleForm.name_ja,
            });

            resCreate.then((data) => {
              if (data.message === 'Record successfully') {
                this.isproces = false;
                this.dialogVisible = false;
                this.$message({
                  message: this.$t('popup.department.notify.createSuccess'),
                  type: 'success',
                });
                this.listLoading = true;
                this.DepartmentList = data.page_infor.data;
                this.last_page = data.page_infor.last_page;
                this.listQuery.page = data.page_infor.last_page;
                this.total = data.page_infor.total;
                this.listLoading = false;
              } else {
                this.isproces = false;
                this.dialogVisible = false;
                this.$message({
                  message: this.$t('popup.department.notify.createFailed'),
                  type: 'error',
                });
              }
            });
          }

          if (this.tempActions === 'Edit') {
            const resEdit = editDepartment({
              id: this.ruleForm.id,
              name_en: this.ruleForm.name_en,
              name_ja: this.ruleForm.name_ja,
              current_page: this.listQuery.page,
            });
            resEdit.then((data) => {
              if (data.message === 'Edit successfully') {
                this.isproces = false;
                this.dialogVisible = false;
                this.$message({
                  message: this.$t('popup.department.notify.editSuccess'),
                  type: 'success',
                });
                this.listLoading = true;
                this.DepartmentList = data.page_infor.data;
                this.last_page = data.page_infor.last_page;
                this.listQuery.page = data.page_infor.current_page;
                this.total = data.page_infor.total;
                this.listQuery.keyword = '';
                this.listLoading = false;
              } else {
                this.isproces = false;
                this.dialogVisible = false;
                this.$message({
                  message: this.$t('popup.department.notify.editFailed'),
                  type: 'error',
                });
              }
            });
          }
        }
      });
    },
    async DeleteMany() {
      var dataDelete = Object.values(this.multipleSelection);
      if (this.multipleSelection.length === 0){
        this.$message({
          message: this.$t('popup.department.notify.notchoseDelete'),
          type: 'warning',
        });
        this.dialogVisibleDelete = false;
      } else if (this.multipleSelection.length > 0) {
        var current_page = this.listQuery.page;
        this.lengthData -= this.multipleSelection.length;
        if (this.lengthData > 1){
          current_page = this.listQuery.page;
        }
        if (this.lengthData === 1 || this.lengthData === 0){
          if (this.listQuery.page === this.last_page){
            current_page = this.listQuery.page - 1;
            this.listQuery.page -= 1;
          }
        }
        const resDeleteOne = await deleteDepartment({
          id_list: dataDelete,
          current_page: current_page,
        });

        if (resDeleteOne.message === 'Delete successfully'){ // Show messages and fetch data res
          this.$message({
            message: this.$t('popup.department.notify.deleteSuccess'),
            type: 'success',
          });
          this.listLoading = true;
          this.DepartmentList = resDeleteOne.page_infor.data;
          this.total = resDeleteOne.page_infor.total;
          this.last_page = resDeleteOne.page_infor.last_page;
          this.listQuery.page = resDeleteOne.page_infor.current_page;
          this.lengthData = resDeleteOne.page_infor.data.length;
          this.listQuery.keyword = '';
          this.listLoading = false;
          this.dialogVisibleDelete = false;
        } else {
          this.$message({
            message: this.$t('popup.department.notify.deleteFailed'),
            type: 'warning',
          });
        }
      }
    },
    Create() { // Event click buttom create
      this.dialogVisible = true;
      this.tempActions = 'Create';
      this.titleCnE = this.$t('popup.department.tCreate');
    },
    handleEdit(row) { // Event click buttom edit
      this.dialogVisible = true;
      this.tempActions = 'Edit';
      this.titleCnE = this.$t('popup.department.tEdit');
      this.ruleForm = Object.assign({}, row);
    },
    handlePopDeleteMany(){
      this.dialogVisibleDelete = true;
      this.tempActionsDelete = 'DeleteMany';
    },
    handlePopDeleteOne(row){
      this.dialogVisibleDelete = true;
      this.tempActionsDelete = 'DeleteOne';
      this.temp = row;
    },
    async handleDelete(row) { // Function Delete one
      const department = Object.assign({}, row);
      var current_page = this.listQuery.page;
      if (this.lengthData > 1){
        current_page = this.listQuery.page;
      } else if (this.lengthData === 1){
        current_page = this.listQuery.page - 1;
      }
      const res = await deleteDepartment({
        id_list: [department.id],
        current_page: current_page,
      });

      if (res.message === 'Delete successfully'){
        this.$message({
          message: this.$t('popup.department.notify.deleteSuccess'),
          type: 'success',
        });
        this.listLoading = true;
        this.DepartmentList = res.page_infor.data;
        this.total = res.page_infor.total;
        this.listQuery.last_page = res.page_infor.last_page;
        this.listQuery.page = res.page_infor.current_page;
        this.lengthData = res.page_infor.data.length;
        this.listLoading = false;
        this.dialogVisibleDelete = false;
      } else {
        this.$message({
          message: this.$t('popup.department.notify.deleteFailed'),
          type: 'warning',
        });
      }
    },
    submitForm(formName) { // Validate form
      this.$refs[formName].validate((valid) => {
        if (valid) {
          return true;
        } else {
          return false;
        }
      });
    },
    closeDialog(formName) { // Event popup close
      this.$refs[formName].resetFields();
      this.ruleForm.name_en = '';
      this.ruleForm.name_ja = '';
    },
    async getList() { // Get data in page
      this.listLoading = true;
      const data = await fetchList(this.listQuery);
      this.DepartmentList = data.data;
      this.total = data.meta.total;
      this.last_page = data.meta.last_page;
      this.lengthData = data.data.length;
      this.listLoading = false;
    },
    handleFilter() { // Get date when search
      this.listQuery.page = 1;
      this.getList();
    },
  },
};
</script>

<style>

</style>

<style scoped>
.inputSearch {
  margin-left: 10px;
  width: 200px;
}

.inputClassname {
    margin-top: 30px;
}

.btnForm {
    text-align: right;
}

.pagination {
  margin-top: 10px;
  text-align: right;
}
::v-deep .el-dialog__title{
  font-size: 24px;
  font-weight: bold !important;
}
</style>
