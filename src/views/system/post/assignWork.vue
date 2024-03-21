<template>
  <!-- 岗位任务分配序列 -->
  <el-dialog :title="assignWorkTitle" :visible.sync="ziOpen" width="500px" @close="closeDia">
    <el-table :data="assignWorkUserList">
      <el-table-column label="序号" type="index" align="center" />
      <el-table-column label="人员名称" align="center" prop="userName" />
    </el-table>
  </el-dialog>


  <!-- <p>1112</p> -->
</template>

<script>

import { listUser } from "@/api/fl/assignwork";

export default {
  props: {
    ziOpen: {
      type: Boolean,
      default: false
    },
    ziPostCode: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      loading: true,
      assignWorkUserList:[],
      assignWorkTitle:"aaaa",
    }
  },
  watch: {
      ziOpen(newVal) {
        if (newVal) {
          
          this.getUsers(this.ziPostCode);
        }
      }
    },
  mounted() {
    console.log("从父组件获取到值00--", this.assignWorkPostCode, this.assignWorkOpen)
  },
  methods: {
    closeDia() {
      this.$emit('update:ziOpen', false);
      // this.ziOpen = false
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
