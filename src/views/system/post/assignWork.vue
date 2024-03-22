<template>
  <!-- 岗位任务分配序列 -->
  <el-dialog :title="assignWorkTitle" :visible.sync="assignWorkOpen" width="500px" @close="closeDia">
    <el-table :data="assignWorkUserList">
      <el-table-column label="序号" type="index" align="center" />
      <el-table-column label="人员名称" align="center" prop="userName" />
    </el-table>
  </el-dialog>
</template>

<script>

import { listUser } from "@/api/fl/assignwork";

export default {
  props: {
    assignWorkOpen: {
      type: Boolean,
      default: false
    },
    assignWorkPostCode: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      assignWorkUserList:[],
      assignWorkTitle:"岗位任务分配顺序",
    }
  },
  watch: {
      assignWorkOpen(newVal) {
        if (newVal) {
          this.getUsers(this.assignWorkPostCode);
        }
      }
    },
  mounted() {
  },
  methods: {
    closeDia() {
      this.$emit('update:assignWorkOpen', false);
    },

    getUsers(postCode) {
      console.log("开始查询岗位用户", postCode)
      if (postCode == undefined || postCode == null || postCode == '') {
        console.log("获取到postCode为空，无法查询")
        return;
      }
      listUser({"postCode": postCode}).then(response => {
        this.assignWorkUserList = response;
      });
    },
  }
}

</script>

<style>
</style>
