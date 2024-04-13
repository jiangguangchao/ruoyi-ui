<template>
  <!-- 岗位任务分配序列 -->
  <el-dialog :title="assignWorkTitle" :visible.sync="open" width="500px" @close="closeDia">
    <el-table :data="assignWorkUserList">
      <el-table-column label="序号" type="index" align="center" />
      <el-table-column label="人员名称" align="center" prop="userName" />
    </el-table>
  </el-dialog>
</template>

<script>

import { listUser } from "@/api/fl/assignwork";

export default {
  
  data() {
    return {
      open: false,
      assignWorkUserList:[],
      assignWorkTitle:"岗位任务分配顺序",
    }
  },
  
  methods: {
    openDia(postCode) {
      this.getUsers(postCode);
    },
    closeDia() {
      this.open = false;
    },

    getUsers(postCode) {
      console.log("全局用户信息", this.$store.state.user.postCode)
      console.log("开始查询岗位用户", postCode)
      if (postCode == undefined || postCode == null || postCode == '') {
        console.log("获取到postCode为空，无法查询")
        return;
      }
      listUser({"postCode": postCode}).then(response => {
        this.assignWorkUserList = response;
        this.open = true;
      });
    },
  }
}

</script>

<style>
</style>
