<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">


      <el-form-item label="放疗师" prop="dqlcjdmc">
        <el-select v-model="queryParams.dqlcjdmc" placeholder="请选择放疗师" clearable size="small">
          <el-option
            v-for="dict in dict.type.fl_lc"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="时间">
        <el-date-picker
          v-model="dateRange"
          type="datetimerange"
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

    <el-table v-loading="loading" :data="workloadList" >
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="放疗师" align="center" prop="czrmc" />
      <el-table-column label="工作内容/岗位" align="center" prop="lcjdmc">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.fl_lc" :value="scope.row.lcjdmc"/>
        </template>
      </el-table-column>
      <el-table-column label="签字时间" align="center" prop="czsj" />
      <el-table-column label="放疗单编号" align="center" prop="flid" />
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />


    <!--流程详情-->
    <el-dialog :visible.sync="lcDetailOpen" title="选择操作人员" width="900px">
      <div class="flowchart">
        <div v-for="(step, index) in steps" :key="index" class="step">
          <div class="stepDoing">
            <p> {{ step.lcname }} -- {{ step.operator }} - {{ step.date }} </p>
          </div>
        </div>
      </div>
    </el-dialog>

  </div>
</template>


<style scoped>
  .flowchart {
    display: flex;
    align-items: center;
  }

  .step {
    width: 200px;
    margin-right: 20px;
    background-color: #f5f5f5;
    padding: 10px;
    border-radius: 4px;
  }

  .stepDone {
    background-color: #45e520;
  }

  .stepDoing {
    color: ##e14012;
  }


</style>

<script>
import { listFlsqd, getFlsqd, delFlsqd, addFlsqd, updateFlsqd, startFlsqd, signFlsqd } from "@/api/fl/flsqd";
import { listFllcjl, getFllcjl } from "@/api/fl/fllcjl";
import { listWorkload } from "@/api/fl/workload";
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
      },
      // 表单参数
      form: {},
      dateRange: '',
      workloadList: [],
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
  },
  methods: {
    /** 查询工作量列表 */
    getList() {
      this.loading = true;

      listWorkload(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
        this.workloadList = response.rows;
        this.total = response.total;
        this.loading = false;
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

    //openLCDig
    openLCDig(row) {
      this.lcDetailOpen = true;
      this.getFllcDetail(row);
    },

    getFllcDetail(row) {
      var query = {
        flid: row.id
      };
      listFllcjl(query).then(response=> {
        var stepList = response.rows;
        if (stepList == undefined || stepList == null) {
          console.log("当前放疗单流程详情为空")
          return;
        } else {
          // console.log("当前放疗单流程详情", stepList)
          for(var i = 0; i < stepList.length; i++) {

            this.steps[i].operator = stepList[i].czrmc;
            this.steps[i].date = stepList[i].czsj;
          }
        }

      });
    },
  }
};
</script>
