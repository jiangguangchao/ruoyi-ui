<template>
  <!-- 岗位任务分配序列 -->
  <el-dialog :title="assignWorkTitle" :visible.sync="open" width="500px" @close="closeDia">
    <el-table :data="assignWorkUserList">
      <el-table-column label="序号" type="index" align="center" />
      <el-table-column label="人员名称" align="center" prop="userName" />
    </el-table>
    <button @click="refushList">刷新</button>
  </el-dialog>
</template>

<script>

import { listUser, refreshListUser } from "@/api/fl/assignwork";

export default {

  data() {
    return {
      open: false,
      postCode: null,
      assignWorkUserList:[],
      assignWorkTitle:"岗位任务分配顺序",
    }
  },

  methods: {
    openDia(postCode) {
      this.getUsers(postCode);
    },
    closeDia() {
      this.postCode = null;
      this.open = false;
    },

    getUsers(postCode) {
      console.log("开始查询岗位用户", postCode)
      if (postCode == undefined || postCode == null || postCode == '') {
        console.log("获取到postCode为空，无法查询")
        return;
      }
      this.postCode = postCode
      listUser({"postCode": postCode}).then(response => {
        this.assignWorkUserList = response;
        this.open = true;
      });
    },

    refushList() {
      const postCode = this.postCode
      console.log("开始查询岗位用户", postCode)
      if (postCode == undefined || postCode == null || postCode == '') {
        console.log("获取到postCode为空，无法查询")
        return;
      }
      refreshListUser({"postCode": postCode}).then(response => {
        this.assignWorkUserList = response;
      });
    },
  }
}

</script>

<style>
</style>
