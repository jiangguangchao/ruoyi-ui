<template>
  <!-- 岗位任务分配序列 -->
  <el-table v-loading="loading" :data="assignWorkUserList">
    <el-table-column label="序号" type="index" align="center" />
    <el-table-column label="人员名称" align="center" prop="userName" />
  </el-table>


  <!-- <p>1112</p> -->
</template>

<script>

import { listUser } from "@/api/fl/assignwork";

export default {
  props: ['assignWorkUserList'],
  data() {
    return {
      loading: false
    }
  },
  mounted() {
    console.log("从父组件获取到值1", this.assignWorkUserList)
  },
  methods: {
  }
}

</script>

<style>
</style>
