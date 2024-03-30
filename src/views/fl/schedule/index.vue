<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="用户id" prop="userId">
        <el-input v-model="queryParams.userId" placeholder="请输入用户id" clearable size="small"
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="值班日期">
        <el-date-picker v-model="selectWeek" type="week" format="第WW周 MMdd" placeholder="选择周"
          @change="createWeekArr" >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button type="success" plain icon="el-icon-edit" size="mini" @click="handleUpdate"
          v-hasPermi="['fl:schedule:edit']">修改</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>


    <el-table :data="tableData" style="width: 100%" border>
      <!--        <el-table-column prop="date" label="日期" width="180"></el-table-column>-->
      <!--        <el-table-column prop="name" label="姓名" width="180"></el-table-column>-->
      <!--        <el-table-column prop="address" label="地址"></el-table-column>-->

      <el-table-column label="名称" width="130">
        <template slot-scope="scope">
          <el-select v-model="scope.row.userId" placeholder="技师选择">
            <el-option v-for="item in userArr" :key="item.userId" :label="item.userName" :value="item.userId">
            </el-option>
          </el-select>
        </template>
      </el-table-column>

      <!-- <el-table-column :label="item.name" width="180" v-for="(item, index) in week">
            <template slot-scope="scope">
                <el-select v-model="scope.row.arr[index].machineId">
                    <el-option v-for="item in machineArr" :key="item.id" :label="item.name" :value="item.id">
                    </el-option>
                </el-select>
                <el-select v-model="scope.row.arr[index].time">
                    <el-option v-for="item in timeArr" :key="item.id" :label="item.name" :value="item.id">
                    </el-option>
                </el-select>
            </template>
        </el-table-column> -->

      <el-table-column :label="item.name" width="230" v-for="(item, index) in week">
        <template slot-scope="scope">
          <div class="select-container" v-show="!(scope.row.tb == '1' && index > 0 && index < 5)">
            <el-select class="select-left" v-model="scope.row.arr[index].machineId" placeholder="机器选择">
              <el-option v-for="item in machineArr" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
            <!-- <el-select class="select-right" v-model="scope.row.arr[index].time" placeholder="时间选择">
              <el-option v-for="item in timeArr" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select> -->
            <el-select class="select-right" v-model="scope.row.arr[index].schTime" placeholder="时间选择">
              <el-option v-for="item in dict.type.zhibansj" :key="item.value" :label="item.label"
                :value="item.value"></el-option>
            </el-select>
          </div>
          <div class="select-container" v-show="!(scope.row.tb == '1' && index > 0 && index < 5) && scope.row.db == '1'">
            <el-select class="select-left" v-model="scope.row.arr[index].dbr" placeholder="代班技师选择">
              <el-option v-for="item in userArr" :key="item.userId" :label="item.userName" :value="item.userId"
                :disabled="scope.row.userId == item.userId"></el-option>
            </el-select>
            <!-- <el-select class="select-right" v-model="scope.row.arr[index].db.time" v-if="scope.row.arr[index].time == 3"
              placeholder="代班时间选择">
              <el-option v-for="item in timeArr" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select> -->
            <el-select class="select-right" v-model="scope.row.arr[index].dbsj" v-if="scope.row.arr[index].dbsj == 'qt'"
              placeholder="代班时间选择">
              <el-option v-for="item in dict.type.zhibansj" :key="item.value" :label="item.label"
                :value="item.value"></el-option>
            </el-select>
          </div>
          <div class="select-container" v-show="scope.row.tb == '1' && index > 0 && index < 5">
            <!--                    <span>{{scope.row.arr[index].machineId}}</span>-->
            <span>{{ getNameById(scope.row.arr[index].machineId, scope.row.arr[index].schTime) }}</span>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="160">
        <template slot-scope="scope">
          <div class="select-container">
            <span>同步：</span>
            <el-radio class="select-left" v-model="scope.row.tb" label="1">是</el-radio>
            <el-radio class="select-right" v-model="scope.row.tb" label="0">否</el-radio>
          </div>
          <div class="select-container" v-if="scope.row.tb == '0'">
            <span>代班：</span>
            <el-radio class="select-left" v-model="scope.row.db" label="1">是</el-radio>
            <el-radio class="select-right" v-model="scope.row.db" label="0">否</el-radio>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-button type="primary" @click="submitForm()">提交</el-button>



  </div>
</template>

<script>
import {
  listSchedule,
  getSchedule,
  delSchedule,
  addSchedule,
  updateSchedule,
  save
} from "@/api/fl/schedule";

import {
  getUserByPostCode,
} from "@/api/system/user";

import { listMachine} from "@/api/fl/machine";

export default {
  name: "Schedule",
  dicts: ['zhibansj'],
  data() {
    return {

      startData: '2023-03-25',
      tableData: [],
      userArr: [],
      selectWeek:'',

      machineArr: [],
      week: [{
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
      ],
      timeArr: [{
        id: 1,
        name: '上午'
      },
      {
        id: 2,
        name: '下午'
      },
      {
        id: 3,
        name: '全天'
      },
      ],


      // 显示搜索条件
      showSearch: true,
      // 排班表格数据
      scheduleList: [],
      //时间范围
      daterangeSchDate: [],
      // 查询参数
      queryParams: {
        userId: null,
        schDate: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        schDate: [{
          required: true,
          message: "值班日期不能为空",
          trigger: "blur"
        }],
      }
    };
  },
  beforeMount() {

    Promise.all([getUserByPostCode('jishi'), listMachine({ pageNum: 1, pageSize: 100, })]).then(([response1, response2]) => {
      this.userArr = response1.data
      this.machineArr = response2.rows
      var dataArr = [];
      for (let i = 0; i < this.userArr.length; i++) {
        let arr = [];
        for (let j = 0; j < this.week.length; j++) {
          arr.push({
            machineId: null,
            schTime: null,
          });
        }
        let obj = {
          tb: '1',
          db: '0',
          arr: arr
        }
        dataArr.push(obj)
      }
      this.tableData = dataArr
    });


  },
  watch: {
    tableData: {
      handler(newVal, oldVal) {

        console.log("handler----------")
        newVal.forEach((e, index) => {

          if (e.tb == '1') {
            console.log("第", index, "行同步,同步前", e)
            e.arr.forEach((t, index2) => {
              if (index2 > 0 && index2 < 5) {
                t.machineId = e.arr[0].machineId
                t.schTime = e.arr[0].schTime
              }

            })
          } else {
            console.log("第", index, "行不同步 ", e)
          }
        })

        // console.log(newVal[0].arr[0].machineId)
        // console.log(oldVal[0].arr[0].machineId)

        // for (let i = 0; i < this.tableData.length; i++) {
        //     let oldMid = oldVal[i].arr[0].machineId;
        //     let newMid = newVal[i].arr[0].machineId;
        //     console.log("值 ", oldMid, newMid);
        //     if (oldMid != newMid) {
        //         console.log("第", i, "行机器发生变化")
        //     } else {
        //         console.log("第", i, "行机器没有发生变化")
        //     }
        // }
      },
      deep: true
    }
  },


  created() {
    this.getList();
    //this.getUser();
  },
  methods: {


    getNameById(machineId, timeid) {
      return this.getMachineNameById(machineId) + " " + this.getTimeById(timeid)
    },

    getMachineNameById(id) {
      if (id == null || id == undefined) {
        return '';
      }
      var m = this.machineArr.find(e => e.id == id)
      if (m == null) {
        return '';
      }
      return m.name;
    },

    getTimeById(id) {
      if (id == null || id == undefined) {
        return '';
      }
      var m = this.dict.type.zhibansj.find(e => e.value == id)
      if (m == null) {
        return '';
      }
      return m.label;
    },
    /** 查询排班列表 */
    getList() {
      this.queryParams.params = {};
      if (null != this.daterangeSchDate && '' != this.daterangeSchDate) {
        this.queryParams.params["beginSchDate"] = this.daterangeSchDate[0];
        this.queryParams.params["endSchDate"] = this.daterangeSchDate[1];
      }
      listSchedule(this.queryParams).then(response => {
        this.scheduleList = response.rows;
        this.total = response.total;
      });
    },


    /** 搜索按钮操作 */
    handleQuery() {
      console.log("开始时间类型", typeof this.selectWeek)
      console.log("开始时间", this.selectWeek)

      this.createWeekArr();
    },

    getUser() {
      getUserByPostCode('dw').then(response => {
        console.log("查询到用户", response.data)
        this.userArr = response.data
      });
    },

    /** 修改按钮操作 */
    handleUpdate(row) { },
    /** 提交按钮 */
    submitForm() {
      var dataList = [];

      for (let i = 0; i < this.tableData.length; i++) {
        let e = this.tableData[i];
        if (e.userId == null) {
          continue;
        }
        for (let j = 0; j < e.arr.length; j++) {
          let t = e.arr[j];
          if (t.machineId == null && t.schTime == null) {
            continue;
          }
          if (t.dbr != null && t.dbsj == null) {
            t.dbsj = t.schTime;
          }
          dataList.push({
            userId: e.userId,
            machineId: t.machineId,
            schTime: t.schTime,
            schDate: this.week[j].date,
            dbr: t.dbr,
            dbsj: t.dbsj
          })
        }

      }
      console.log("提交数据", dataList)
      save(dataList).then(response => {
        this.$modal.msgSuccess("提交成功");
      });
    },

    createWeekArr() {
      for (let i = 0; i < 7; i++) {
        let date = new Date(this.selectWeek.getTime() + 24 * 60 * 60 * 1000 * i);
        this.week[i].date = date;
      }
      console.log("日期", this.week)
    },

  }
}
</script>

<style type="text/css">
.select-container {
  display: flex;
  align-items: center;
  /* 如果需要垂直居中 */
}

.select-left,
.select-right {
  margin-right: 2px;
  /* 可选，为了在两个下拉框之间添加一些间距 */
}

.select-right {
  margin-right: 0;
  /* 最后一个下拉框不需要右边距 */
}
</style>
