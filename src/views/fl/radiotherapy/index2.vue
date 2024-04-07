<template>
  <div>
    <el-table :data="tableData" :span-method="handleSpanMethod" border style="width: 100%">
      <el-table-column prop="machine" label="放疗机器"></el-table-column>
      <el-table-column prop="name" label="患者姓名"></el-table-column>
      <el-table-column prop="time" label="治疗时间"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      countMap:null,
      tableData: [
        { machine: '机器A', name: '张三', time: '2024-04-07' },
        { machine: '机器A', name: '李四', time: '2024-04-08' },
        { machine: '机器A', name: '赵六', time: '2024-04-09' },
        { machine: '机器B', name: '王五', time: '2024-04-07' },
        { machine: '机器B', name: '王五2', time: '2024-04-07' },
        { machine: '机器C', name: '钱七', time: '2024-04-10' }
      ]
    };
  },
  methods: {
    handleSpanMethod({ row, column, rowIndex, columnIndex }) {

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

    machineCount() {
      //统计tableData中各种machine的数量以及第一次出现的index,将统计数据存入map中，其中map的key为index
      let machineCount = {};
      this.tableData.forEach((item, index) => {
        if (machineCount[item.machine]) {
          machineCount[item.machine].count++;
        } else {
          machineCount[item.machine] = {
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
    }
  }
};
</script>