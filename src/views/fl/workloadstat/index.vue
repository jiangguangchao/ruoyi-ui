<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">


      <el-form-item label="放疗师" prop="czr">
        <el-select v-model="queryParams.czr" placeholder="请选择放疗师" clearable size="small">
          <el-option
            v-for="fls in flsList"
            :key="fls.userId"
            :label="fls.userName"
            :value="fls.userId"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="时间">
        <el-date-picker
          v-model="dateRange"
          type="datetimerange"
          value-format="yyyy-MM-dd HH:mm:ss"
          :picker-options="pickerOptions"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          align="right">
        </el-date-picker>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table v-loading="loading" :data="workloadStatList" >
      <el-table-column type="index" align="center" />
      <el-table-column label="放疗师" align="center" prop="userName" />
      <el-table-column label="工作总量" align="center" prop="workloadCount" />
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

  </div>
</template>


<style scoped>

</style>

<script>
import { listFlsqd, getFlsqd, delFlsqd, addFlsqd, updateFlsqd, startFlsqd, signFlsqd } from "@/api/fl/flsqd";
import { listFllcjl, getFllcjl } from "@/api/fl/fllcjl";
import { listWorkload, statWorkload, fls } from "@/api/fl/workload";
import { allUser } from "@/api/system/user";
// import mermaid from 'mermaid';
// import 'mermaid/dist/mermaid.css'; // 引入Mermaid样式文件
// import mermaidConfig from '@/mermaid.config'; // 引入Mermaid配置文件

export default {
  name: "Flsqd",
  dicts: ['fl_zljq', 'fl_fldzt', 'fl_zljs', 'fl_gdfs', 'fl_txrhlx', 'fl_igrtpllx', 'sys_yes_no', 'sys_user_sex', 'fl_smlx1', 'fl_IGRT', 'fl_smlx2', 'fl_lc'],
  data() {
    return {
      // 遮罩层
      loading: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 放疗申请单表格数据
      flsqdList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        czr: null
      },
      // 表单参数
      form: {},
      dateRange: [],
      workloadList: [],
      flsList: [],
      lcDetailOpen: false,
      steps: [
        { operator: '', date: '' , lc: 'dw' , lcname: '定位' },
        { operator: '', date: '' , lc: 'bqgh' , lcname: '靶区勾画'},
        { operator: '', date: '' , lc: 'bqhz' , lcname: '靶区核准'},
        { operator: '', date: '' , lc: 'bqtj' , lcname: '靶区提交'},
        { operator: '', date: '' , lc: 'jhsj' , lcname: '计划设计'},
        { operator: '', date: '' , lc: 'jhhz' , lcname: '计划核准'},
        { operator: '', date: '' , lc: 'fwyz' , lcname: '复位验证'},
      ],
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
    };
  },
  created() {
    this.getList();
    this.getFls();
  },
  methods: {
    /** 查询工作量统计 */
    getList() {
      this.loading = true;
      statWorkload(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
        this.workloadStatList = response;
        this.loading = false;
      });
    },
    getFls() {
      fls().then(response => {
        this.flsList = response;
      });
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
  }
};
</script>
