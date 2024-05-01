<template>
  <div>
  <div class="select-container" v-show="!(row.tb == '1' && index > 0 && index < 5)">
    <el-select v-model="machineId" placeholder="机器选择" :clearable="true" @change="changeMachine"
      filterable allow-create>
      <el-option v-for="item in machineArr" :key="item.id" :label="item.name" :value="item.id">
      </el-option>
    </el-select>
    <el-select class="select-right" v-model="schTime" :clearable="true" placeholder="时间选择" @change="changeTime">
      <el-option v-for="item in dict.type.zhibansj" :key="item.value" :label="item.label"
        :value="item.value"></el-option>
    </el-select>
  </div>
  <div class="select-container" v-show="row.tb == '1' && index > 0 && index < 5">
    <span>{{ getMTNameById(row.arr[index].machineId, row.arr[index].schTime) }}</span>
  </div>
  <div class="select-container" v-show="row.db == '1'">
    {{row.db}}
    <el-select class="select-left" v-model="row.arr[index].dbr" placeholder="代班技师选择">
      <el-option v-for="item in userArr" :key="item.userId" :label="item.userName" :value="item.userId"></el-option>
    </el-select>
    <!-- <el-select class="select-right" v-model="scope.row.arr[index].db.time" v-if="scope.row.arr[index].time == 3"
      placeholder="代班时间选择">
      <el-option v-for="item in timeArr" :key="item.id" :label="item.name" :value="item.id"></el-option>
    </el-select> -->
    <el-select class="select-right" v-model="row.arr[index].dbsj" v-if="row.arr[index].schTime == 'qt'"
      placeholder="代班时间选择">
      <el-option v-for="item in dict.type.zhibansj" :key="item.value" :label="item.label"
        :value="item.value"></el-option>
    </el-select>
  </div>
  </div>
</template>


<script>

export default {
  dicts: ['zhibansj'],
  props: {
    machineId: String,
    schTime: String,
    machineArr: Array,
    userArr: Array,
    textInput: String,
    index: Number,
    row: Object,
  },
  data() {
    return {
    }
  },
  created() {
  },

  methods: {
    changeMachine(val) {
      console.log("this.index", this.index)
      console.log("this.row", this.row)
      this.row.arr[this.index].machineId = val;
    },

    changeTime(val) {
      this.row.arr[this.index].schTime = val;
      if (this.row.arr[this.index].dbr != null && this.row.arr[this.index].dbr != undefined) {
        this.row.arr[this.index].dbsj = val;
      }
    },

    getMTNameById(machineId, timeid) {
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
