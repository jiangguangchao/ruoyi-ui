<template>
  <div>
    <!-- <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="machineName" label="放疗机器"></el-table-column>
      <el-table-column prop="hzXm" label="患者姓名"></el-table-column>
      <el-table-column prop="schTime" label="治疗时间"></el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="text" icon="el-icon-edit" @click="handleSchedule(scope.row)"
            v-hasPermi="['fl:radiotherapy:edit']">时间安排</el-button>
          <el-button size="mini" type="text" icon="el-icon-edit" @click="handleRemoveSchTime(scope.row)"
            v-hasPermi="['fl:radiotherapy:edit']">移除时间</el-button>
          <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)"
            v-hasPermi="['fl:radiotherapy:remove']">删除</el-button>
        </template>
      </el-table-column>
    </el-table> -->

    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column label="机器名称" width="130">
        <template slot-scope="scope">
          <span>{{ getMachineNameById(scope.row.machineId) }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="item" width="230" v-for="(item, index) in hours">
        <template slot-scope="scope">
          abc
        </template>
      </el-table-column>
      </el-table>

    <!-- 添加或修改放射治疗对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="放疗单编号" prop="fldId">
          <el-input v-model="form.fldId" placeholder="请输入放疗单编号" />
        </el-form-item>
        <el-form-item label="机器" prop="machineId" disabled>
          <el-input v-model="form.machineName" placeholder="请输入机器编号" disabled />
        </el-form-item>

        <el-form-item label="预计治疗时间" prop="schTime">
          <el-date-picker clearable size="small" v-model="form.schTime" type="datetime" value-format="yyyy-MM-dd HH:00"
            placeholder="选择预计治疗时间">
          </el-date-picker>
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
import { listRadiotherapy, getRadiotherapy, delRadiotherapy, addRadiotherapy, updateRadiotherapy, removeSchTime } from "@/api/fl/radiotherapy";
import { listMachine } from "@/api/fl/machine";
export default {
  dicts: ['sys_yes_no', 'fszl_zt'],
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
      countMap: new Map(),
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
      hours:['7'],
      machineArr:[],
      tableData: [
        // { machine: '机器A', name: '张三', time: '2024-04-07' },
        // { machine: '机器A', name: '李四', time: '2024-04-08' },
        // { machine: '机器A', name: '赵六', time: '2024-04-09' },
        // { machine: '机器B', name: '王五', time: '2024-04-07' },
        // { machine: '机器B', name: '王五2', time: '2024-04-07' },
        // { machine: '机器C', name: '钱七', time: '2024-04-10' }
      ]
    };
  },
  created() {
    
    this.buildHourArr();
    this.getMachine();
    this.getList();
    // this.buildTableData();
  },
  methods: {
    /** 查询放射治疗列表 */
    getList() {
      this.loading = true;
      listRadiotherapy(this.queryParams).then(response => {
        this.tableData = response.rows;
        this.buildTableData(this.tableData);
        console.log("查询结果", this.tableData)
      });
    },

    // 取消按钮
    cancel() {
      this.open = false;
    },

    handleSchedule(row) {
      console.log("当前row", row)
      this.form = row;
      this.open = true;
      this.title = "修改放射治疗";
    },

    handleRemoveSchTime(row) {
      removeSchTime(row).then(response => {
        this.$modal.msgSuccess("移除时间成功");
        this.getList();
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
      this.$modal.confirm('是否确认删除放射治疗编号为"' + ids + '"的数据项？').then(function () {
        return delRadiotherapy(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => { });
    },

    handleSpanMethod({ row, column, rowIndex, columnIndex }) {

      if (this.open) {
        return;
      }
      if (columnIndex === 0) {
        if (rowIndex === 0) {
          this.countMap = this.machineCount();

        }
        if (this.countMap.has(rowIndex)) {
          return [this.countMap.get(rowIndex), 1];
        } else {
          return [0, 0];
        }
      }

    },

    getMachine() {
      listMachine({ pageNum: 1, pageSize: 100, }).then(response => {
        this.machineArr = response.rows
      });
    },

    buildHourArr() {
      var startTime = 7;
      var endTime = 19;
      this.hours = Array.from({ length: endTime - startTime +1 }, (_, i) => i + startTime + "");
    },

    buildTableData(tableData){
      if (tableData == undefined || tableData == null || tableData.length < 1) {
        return;
      }



      // 假设有以下学生对象数组
      const students = [
        { name: 'Alice', class: '1A' },
        { name: 'Bob', class: '1B' },
        { name: 'Charlie', class: '1A' },
        { name: 'David', class: '1C' },
        { name: 'Eve', class: '1B' }
      ];


      // 使用reduce方法进行分组
      const groupedByClass = students.reduce((groups, student) => {
        // 如果该班级的数组不存在，则创建一个新的数组
        if (!groups[student.class]) {
          groups[student.class] = [];
        }
        // 将学生对象添加到对应的班级数组中
        groups[student.class].push(student);
        return groups;
      }, {});

      console.log(groupedByClass);


      var objArr = [];
      this.machineArr.forEach(m => {
        var obj = {machineId: m.id}
        objArr.push(obj)
        this.hours.forEach(h => {
          obj[h] = [];
        })
      })




      tableData.forEach(e => {
        let obj = objArr.find(o => o.machineId == e.machineId);
        let hour = e.schTime.slice(11, 13).startsWith('0') ? e.schTime.slice(12, 13) : e.schTime.slice(11, 13)
        console.log("当前时间", hour)
        obj[hour].push(e)
      })

      console.log("objArr", objArr)


      // tableData.reduce((groups, e) => {
      //   if (!groups[e.machineId]) {
      //     groups[e.machineId + ""] = []
      //   }
      //   groups[e.machineId + ""].push(e);
      // }, {})

      var obj = [
        {
          machineId:1,
          '7': [
            {name:'n1'},
            {name:'n2'}
          ]
        }
      ]
      this.tableData = obj;

      // const tb;
      // tableData.forEach(e => {

      //   var obj = {machineId:e.machineId}

      //   this.hours.forEach(h => {




      //   })

      // })

    },

    machineCount() {
      //统计tableData中各种machine的数量以及第一次出现的index,将统计数据存入map中，其中map的key为index
      let machineCount = {};
      this.tableData.forEach((item, index) => {
        if (machineCount[item.machineId]) {
          machineCount[item.machineId].count++;
        } else {
          machineCount[item.machineId] = {
            count: 1,
            index: index
          };
        }
      });
      console.log(machineCount);

      //将machineCount数据存入map中，其中index作为key, count作为value
      let countMap = new Map();
      for (let key in machineCount) {
        countMap.set(machineCount[key].index, machineCount[key].count);
      }
      console.log(countMap);

      return countMap;
    },


    getMachineNameById(id) {
      if (id == null || id == undefined) {
        return '';
      }
      var m = this.machineArr.find(e => e.id == id)
      if (m == null) {
        return id;
      }
      return m.name;
    },

  }
};
</script>
