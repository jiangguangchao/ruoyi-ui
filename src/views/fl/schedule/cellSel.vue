<template>
  <div>
    <el-select v-model="machineId" placeholder="请选择" :clearable="true" @change="changeMachine"
      filterable allow-create>
      <el-option v-for="item in machineArr" :key="item.id" :label="item.name" :value="item.id">
      </el-option>
    </el-select>
  </div>
</template>


<script>

export default {
  props: {
    machineId: String,
    machineArr: Array,
    textInput: String,
    index: Number,
    row: Object
  },
  data() {
    return {
      // machineArr: [
      //   { id: 1, name: '1号机器' },
      //   { id: 2, name: '2号机器' },
      //   { id: 3, name: '3号机器' },
      // ],
      machineId2: '4'
    }
  },
  created() {
  },
  methods: {
    changeMachine(val) {
      console.log("this.index", this.index)
      console.log("this.row", this.row)
    },
    
  }
};
</script>