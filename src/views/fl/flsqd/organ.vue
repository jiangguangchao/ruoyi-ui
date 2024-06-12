<template>
  <div class="app-container">

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['fl:organdamage:add']"
        >新增</el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="organdamageList" @selection-change="handleSelectionChange">
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="放疗单编号" align="center" prop="fldid" />
      <el-table-column label="器官" align="center" prop="organ" />
      <el-table-column label="限制剂量" align="center" prop="doselimit" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['fl:organdamage:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['fl:organdamage:remove']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>


    <!-- 添加或修改器官危害对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="放疗单编号" prop="fldid">
          <el-input v-model="form.fldid" placeholder="请输入放疗单编号" disabled/>
        </el-form-item>
        <el-form-item label="器官" prop="organ">
          <el-input v-model="form.organ" placeholder="请输入器官" />
        </el-form-item>
        <el-form-item label="限制剂量" prop="doselimit">
          <el-input v-model="form.doselimit" placeholder="请输入限制剂量" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listOrgandamage, getOrgandamage, delOrgandamage, addOrgandamage, updateOrgandamage } from "@/api/fl/organdamage";

export default {
  props: {
    fldid: String
  },
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 器官危害表格数据
      organdamageList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        fldid: null,
        organ: null,
        doselimit: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        fldid: [
          { required: true, message: "放疗单编号不能为空", trigger: "blur" }
        ],
        organ: [
          { required: true, message: "器官不能为空", trigger: "blur" }
        ],
        doselimit: [
          { required: true, message: "限制剂量不能为空", trigger: "blur" }
        ]
      }
    };

  },
  watch: {
    fldid(newVal, oldVal) {
      this.getList();
    }
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询器官危害列表 */
    getList() {
      if (!this.fldid) {
        return;
      }
      this.loading = true;
      this.queryParams.fldid = this.fldid;
      listOrgandamage(this.queryParams).then(response => {
        this.organdamageList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        fldid: this.fldid,
        organ: null,
        doselimit: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加器官危害";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getOrgandamage(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改器官危害";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.form.fldid = this.fldid
          if (this.form.id != null) {
            updateOrgandamage(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addOrgandamage(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$modal.confirm('是否确认删除器官危害编号为"' + ids + '"的数据项？').then(function() {
        return delOrgandamage(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('fl/organdamage/export', {
        ...this.queryParams
      }, `organdamage_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
