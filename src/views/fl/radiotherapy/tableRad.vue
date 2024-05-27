<template>
  <div>
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column label="机器名称" >
        <template slot-scope="scope">
          <span>{{ getMachineNameById(scope.row.machineId) }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="item" v-for="(item, index) in hours">
        <template slot-scope="scope">
          <CellRad :radList="scope.row[item]" :machineId="scope.row.machineId" :dictType="dictType"
            :schTime="schDate + ' ' + item + ':00:00' " :getMachineNameById="getMachineNameById" @addRad="getList">
          </CellRad>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
import { listRadiotherapy, getRadiotherapy, delRadiotherapy, addRadiotherapy, updateRadiotherapy, removeSchTime } from "@/api/fl/radiotherapy";
import { listMachine } from "@/api/fl/machine";
import CellRad from "./cellRad.vue"
export default {
  components: {
    CellRad
  },
  props: {
    schDate: String,
    machineArr: Array,
    hours: Array,
    dictType: Object,
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
        schTime: null,
        cureFlag: null,
        cureStatus: null,
        params: {
            startTime: null,
            endTime: null
        }
      },
      tableData: []
    };
  },
  created() {
    console.log("dictType--", this.dictType)

    this.getList();
    // this.buildTableData();
  },
  watch: {
    schDate(newVal, oldVal) {
      console.log("schDate--", newVal)
      this.getList();
    }
  },
  methods: {
    /** 查询放射治疗列表 */
    getList() {
      this.loading = true;
      this.queryParams.params["beginTime"] = this.schDate + " 00:00:00";
      this.queryParams.params["endTime"] = this.schDate + " 23:59:59";
      listRadiotherapy(this.queryParams).then(response => {
        // this.tableData = response.rows;
        this.buildTableData(response.rows);
        console.log("查询结果", response.rows)
      });
    },

    // 取消按钮
    cancel() {
      this.open = false;
    },

    buildTableData(tableData) {


      var objArr = [];
      this.machineArr.forEach(m => {
        var obj = { machineId: m.id }
        objArr.push(obj)
        this.hours.forEach(h => {
          obj[h] = [];
        })
      })

      if ( tableData != null && tableData.length > 0) {
        tableData.forEach(e => {
          let obj = objArr.find(o => o.machineId == e.machineId);
          let hour = e.schTime.slice(11, 13).startsWith('0') ? e.schTime.slice(12, 13) : e.schTime.slice(11, 13)
          obj[hour].push(e)
        })
      }

      this.tableData = objArr;
      console.log("构建后的tableData", this.tableData)
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
