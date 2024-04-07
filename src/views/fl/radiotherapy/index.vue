<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="放疗单编号" prop="fldId">
        <el-input
          v-model="queryParams.fldId"
          placeholder="请输入放疗单编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="机器编号" prop="machineId">
        <el-input
          v-model="queryParams.machineId"
          placeholder="请输入机器编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="已安排治疗时间" prop="schFlag">
        <el-select v-model="queryParams.schFlag" placeholder="请选择已安排治疗时间" clearable size="small">
          <el-option
            v-for="dict in dict.type.sys_yes_no"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="已治疗" prop="cureFlag">
        <el-select v-model="queryParams.cureFlag" placeholder="请选择已治疗" clearable size="small">
          <el-option
            v-for="dict in dict.type.sys_yes_no"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="治疗状态" prop="cureStatus">
        <el-select v-model="queryParams.cureStatus" placeholder="请选择治疗状态" clearable size="small">
          <el-option
            v-for="dict in dict.type.fszl_zt"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['fl:radiotherapy:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['fl:radiotherapy:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['fl:radiotherapy:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['fl:radiotherapy:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="radiotherapyList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="id" align="center" prop="id" />
      <el-table-column label="放疗单编号" align="center" prop="fldId" />
      <el-table-column label="机器编号" align="center" prop="machineId" />
      <el-table-column label="已安排治疗时间" align="center" prop="schFlag">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_yes_no" :value="scope.row.schFlag"/>
        </template>
      </el-table-column>
      <el-table-column label="预计治疗时间" align="center" prop="schTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.schTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="已治疗" align="center" prop="cureFlag">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_yes_no" :value="scope.row.cureFlag"/>
        </template>
      </el-table-column>
      <el-table-column label="治疗技师" align="center" prop="cureOperator" />
      <el-table-column label="治疗结束时间" align="center" prop="cureEndTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.cureEndTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="治疗状态" align="center" prop="cureStatus">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.fszl_zt" :value="scope.row.cureStatus"/>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['fl:radiotherapy:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['fl:radiotherapy:remove']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改放射治疗对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="放疗单编号" prop="fldId">
          <el-input v-model="form.fldId" placeholder="请输入放疗单编号" />
        </el-form-item>
        <el-form-item label="机器编号" prop="machineId">
          <el-input v-model="form.machineId" placeholder="请输入机器编号" />
        </el-form-item>
        <el-form-item label="已安排治疗时间">
          <el-radio-group v-model="form.schFlag">
            <el-radio
              v-for="dict in dict.type.sys_yes_no"
              :key="dict.value"
:label="dict.value"
            >{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="预计治疗时间" prop="schTime">
          <el-date-picker clearable size="small"
            v-model="form.schTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择预计治疗时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="已治疗">
          <el-radio-group v-model="form.cureFlag">
            <el-radio
              v-for="dict in dict.type.sys_yes_no"
              :key="dict.value"
:label="dict.value"
            >{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="治疗技师" prop="cureOperator">
          <el-input v-model="form.cureOperator" placeholder="请输入治疗技师" />
        </el-form-item>
        <el-form-item label="治疗状态" prop="cureStatus">
          <el-select v-model="form.cureStatus" placeholder="请选择治疗状态">
            <el-option
              v-for="dict in dict.type.fszl_zt"
              :key="dict.value"
              :label="dict.label"
:value="dict.value"
            ></el-option>
          </el-select>
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
import { listRadiotherapy, getRadiotherapy, delRadiotherapy, addRadiotherapy, updateRadiotherapy } from "@/api/fl/radiotherapy";

export default {
  name: "Radiotherapy",
  dicts: ['sys_yes_no', 'fszl_zt'],
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
      // 放射治疗表格数据
      radiotherapyList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        fldId: null,
        machineId: null,
        schFlag: null,
        cureFlag: null,
        cureStatus: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询放射治疗列表 */
    getList() {
      this.loading = true;
      listRadiotherapy(this.queryParams).then(response => {
        this.radiotherapyList = response.rows;
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
        fldId: null,
        machineId: null,
        schFlag: "0",
        schTime: null,
        cureFlag: "0",
        cureOperator: null,
        cureEndTime: null,
        cureStatus: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null
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
      this.title = "添加放射治疗";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getRadiotherapy(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改放射治疗";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateRadiotherapy(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addRadiotherapy(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除放射治疗编号为"' + ids + '"的数据项？').then(function() {
        return delRadiotherapy(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('fl/radiotherapy/export', {
        ...this.queryParams
      }, `radiotherapy_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
