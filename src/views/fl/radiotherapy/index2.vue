<template>
  <div>
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <!-- <el-form-item label="用户id" prop="userId">
        <el-input v-model="queryParams.userId" placeholder="请输入用户id" clearable size="small" />
      </el-form-item> -->
      <el-form-item label="日期">
        <el-date-picker v-model="selectWeek" type="week" format="第WW周 MMdd" placeholder="选择周" @change="weekChange">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini">搜索</el-button>
      </el-form-item>
    </el-form>

    <el-tabs type="border-card" @tab-click="clickTab">
      <el-tab-pane v-for="(w, index) in week" :label="w.name">
        <TableRad :ref="'tab' + index" :schDate="w.date" :machineArr="machineArr" :hours="hours"></TableRad>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
import { listMachine } from "@/api/fl/machine";
import TableRad from "./tableRad.vue"
export default {
  dicts: ['sys_yes_no', 'fszl_zt'],
  components: {
    TableRad
  },
  data() {
    return {
      // 遮罩层
      loading: true,
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 表单参数
      form: {},
      showSearch: true,
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
      hours: ['7'],
      machineArr: [],
      selectWeek: null,
      week: [],
      tableData: [
      ]
    };
  },
  created() {

    this.buildHourArr();
    this.getMachine();
    this.buildWeekArr();
  },
  methods: {

    weekChange() {
      this.buildWeekArr();

      // if (this.selectWeek.getTime() < this.getMonday().getTime()) {
      //   this.showEditBut = false;
      // } else {
      //   this.showEditBut = true;
      // }

    },

    clickTab(tab, event){
      this.$refs["tab" + tab.index][0].getList();
    },

    buildWeekArr() {
      this.resetWeekArr();
      if (this.selectWeek == null) {
        this.selectWeek = this.getThisWeekFirstDay();
      }
      console.log("周", this.selectWeek)
      for (let i = 0; i < this.week.length; i++) {
        let date = new Date(this.selectWeek.getTime() + 24 * 60 * 60 * 1000 * i);
        //date转字符串
        date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
        this.week[i].date = date;
        this.week[i].name = this.week[i].name + " " + date;
      }
    },

    getThisWeekFirstDay() {
      const now = new Date();
      const dayOfWeek = now.getDay(); // 获取今天是一周中的第几天，0表示周日，1表示周一，以此类推

      // 如果今天是周一，则本周的第一天就是今天
      if (dayOfWeek === 1) {
        return now;
      } else {
        // 如果不是周一，我们需要回溯到本周的周一
        let firstDay = new Date(now);
        firstDay.setDate(now.getDate() - dayOfWeek + 1); // 回溯到周一
        return firstDay;
      }
    },

    resetWeekArr() {
      this.week = [{
        id: 1,
        name: '周一'
      },
      {
        id: 2,
        name: '周二'
      },
      {
        id: 3,
        name: '周三'
      },
      {
        id: 4,
        name: '周四'
      },
      {
        id: 5,
        name: '周五'
      },
      {
        id: 6,
        name: '周六'
      },
      {
        id: 7,
        name: '周日'
      },
      ]
    },

    getMachine() {
      listMachine({ pageNum: 1, pageSize: 100, }).then(response => {
        this.machineArr = response.rows
      });
    },

    buildHourArr() {
      var startTime = 7;
      var endTime = 19;
      this.hours = Array.from({ length: endTime - startTime + 1 }, (_, i) => i + startTime + "");
    },
  }
};
</script>


<style>
  .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
  color: #1890ff;
  background-color: #5edd95bf;
  border-right-color: #DCDFE6;
  border-left-color: #DCDFE6;
}
</style>