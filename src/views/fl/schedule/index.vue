<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="用户id" prop="userId">
        <el-input v-model="queryParams.userId" placeholder="请输入用户id" clearable size="small"
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="值班日期">
        <el-date-picker v-model="daterangeSchDate" size="small" style="width: 240px" value-format="yyyy-MM-dd"
          type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button type="success" plain icon="el-icon-edit" size="mini" :disabled="single" @click="handleUpdate"
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
            <el-option v-for="item in userArr" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </template>
      </el-table-column>

      <!-- <el-table-column :label="item.name" width="180" v-for="(item, index) in week">
            <template slot-scope="scope">
                <el-select v-model="scope.row.arr[index].mid">
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
          <div class="select-container" v-show="!(scope.row.tb == '1' && index>0 && index<5)">
            <el-select class="select-left" v-model="scope.row.arr[index].mid" placeholder="机器选择">
              <el-option v-for="item in machineArr" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
            <el-select class="select-right" v-model="scope.row.arr[index].time" placeholder="时间选择">
              <el-option v-for="item in timeArr" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </div>
          <div class="select-container" v-show="!(scope.row.tb == '1' && index>0 && index<5) && scope.row.db == '1'">
            <el-select class="select-left" v-model="scope.row.arr[index].db.userId" placeholder="代班技师选择">
              <el-option v-for="item in userArr" :key="item.id" :label="item.name" :value="item.id"
                :disabled="scope.row.userId == item.id"></el-option>
            </el-select>
            <el-select class="select-right" v-model="scope.row.arr[index].db.time" v-if="scope.row.arr[index].time == 3"
              placeholder="代班时间选择">
              <el-option v-for="item in timeArr" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </div>
          <div class="select-container" v-show="scope.row.tb == '1' && index>0 && index<5">
            <!--                    <span>{{scope.row.arr[index].mid}}</span>-->
            <span>{{getNameById(scope.row.arr[index].mid, scope.row.arr[index].time)}}</span>
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



  </div>
</template>

<script>
  import {
    listSchedule,
    getSchedule,
    delSchedule,
    addSchedule,
    updateSchedule
  } from "@/api/fl/schedule";

  export default {
    name: "Schedule",
    dicts: ['zhibansj'],
    data() {
      return {

        tableData: [],
        userArr: [{
            id: 1,
            name: '用户1'
          },
          {
            id: 2,
            name: '用户2'
          },
          {
            id: 3,
            name: '用户3'
          },
          {
            id: 4,
            name: '用户4'
          },
          {
            id: 5,
            name: '用户5'
          },
        ],

        machineArr: [{
            id: 1,
            name: '机器1'
          },
          {
            id: 2,
            name: '机器2'
          },
          {
            id: 3,
            name: '机器3'
          },
          {
            id: 4,
            name: '机器4'
          },
        ],
        week: [{
            id: 1,
            name: 'z1'
          },
          {
            id: 2,
            name: 'z2'
          },
          {
            id: 3,
            name: 'z3'
          },
          {
            id: 4,
            name: 'z4'
          },
          {
            id: 5,
            name: 'z5'
          },
          {
            id: 6,
            name: 'z6'
          },
          {
            id: 7,
            name: 'z日'
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
        showSearch: false,
        // 排班表格数据
        scheduleList: [],
        // 顶班时间时间范围
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
      var dataArr = [];
      for (let i = 0; i < this.userArr.length; i++) {
        let arr = [];
        for (let j = 0; j < this.week.length; j++) {
          arr.push({
            mid: null,
            time: null,
            db: {
              userId: null,
              time: null,
            },


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
                  t.mid = e.arr[0].mid
                  t.time = e.arr[0].time
                }

              })
            } else {
              console.log("第", index, "行不同步 ", e)
            }
          })

          // console.log(newVal[0].arr[0].mid)
          // console.log(oldVal[0].arr[0].mid)

          // for (let i = 0; i < this.tableData.length; i++) {
          //     let oldMid = oldVal[i].arr[0].mid;
          //     let newMid = newVal[i].arr[0].mid;
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
    },
    methods: {


      getNameById(mid, timeid) {
        return this.getMachineNameById(mid) + " " + this.getTimeById(timeid)
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
        var m = this.timeArr.find(e => e.id == id)
        if (m == null) {
          return '';
        }
        return m.name;
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

      // 表单重置
      reset() {
        this.form = {
          id: null,
          userId: null,
          schDate: null,
          schTime: null,
          machineId: null,
          dbr: null,
          dbsj: null
        };
        this.resetForm("form");
      },
      /** 搜索按钮操作 */
      handleQuery() {
        this.getList();
      },
      /** 重置按钮操作 */
      resetQuery() {
        this.daterangeSchDate = [];
        this.resetForm("queryForm");
        this.handleQuery();
      },

      /** 修改按钮操作 */
      handleUpdate(row) {},
      /** 提交按钮 */
      submitForm() {
        this.$refs["form"].validate(valid => {
          if (valid) {
            if (this.form.id != null) {
              updateSchedule(this.form).then(response => {
                this.$modal.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              });
            } else {
              addSchedule(this.form).then(response => {
                this.$modal.msgSuccess("新增成功");
                this.open = false;
                this.getList();
              });
            }
          }
        });
      },
    }
  };
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