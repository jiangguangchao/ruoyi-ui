<template>
  <div>
    <el-descriptions :column="2" border>
      <el-descriptions-item label="ID">{{ rad.id }}</el-descriptions-item>
      <el-descriptions-item label="放疗单编号">{{ rad.fldId }}</el-descriptions-item>
      <el-descriptions-item label="机器编号">{{ rad.machineId }}</el-descriptions-item>
      <el-descriptions-item label="是否已安排治疗时间">
        {{ getSysYesNoLabel(rad.schFlag) }}

      </el-descriptions-item>
      <el-descriptions-item label="预计治疗时间">
        {{ rad.schTime | formatDate }}
      </el-descriptions-item>
      <el-descriptions-item label="是否已治疗">
        {{ getSysYesNoLabel(rad.cureFlag) }}
      </el-descriptions-item>
      <el-descriptions-item label="治疗操作技师ID">{{ rad.cureOperator }}</el-descriptions-item>
      <el-descriptions-item label="治疗结束时间">
        {{ rad.cureEndTime | formatDate }}
      </el-descriptions-item>
      <el-descriptions-item label="治疗状态">
        {{ rad.cureStatus === '0' ? '未开始' :
          (rad.cureStatus === '1' ? '治疗中' : '已结束') }}
      </el-descriptions-item>
    </el-descriptions>
    <div slot="footer" class="dialog-footer" v-if="rad.cureStatus == '0'">
      <el-button type="primary" @click="openUpdateSchTimeDia">修改治疗时间</el-button>
      <el-button type="primary" @click="endCure">治疗结束</el-button>
    </div>
    <el-dialog :visible.sync="updateTimeOpen" append-to-body>
      <el-date-picker v-model="radCopy.schTime" format="yyyy-MM-dd HH:00:00" type="datetime" placeholder="选择日期时间">
      </el-date-picker>
      <div slot="footer" class="dialog-footer">
        <el-checkbox v-model="updateAll">将当前时间应用到所有治疗</el-checkbox>
        <el-button type="primary" @click="updateSchTime">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    updateSchTime
  } from "@/api/fl/radiotherapy";
  export default {
    props: {
      dictType: Object,
      rad: Object,

    },
    data() {
      return {
        updateTimeOpen: false,
        radCopy: null,
        updateAll: true,
      };
    },
    filters: {
      // 自定义过滤器，用于格式化日期
      formatDate(date) {
        console.log("filters 执行了-----------------------")
        if (date) {
          return date.toLocaleString(); // 或者使用更复杂的日期格式化逻辑
        } else {
          return '-';
        }
      },
    },
    created() {
      this.radCopy = {...this.rad};
    },
    methods: {
      getSysYesNoLabel(e) {
        return this.selectDictLabel(this.dictType.sys_yes_no, e);
      },

      openUpdateSchTimeDia() {
        this.updateTimeOpen = true;
      },
      updateSchTime(){
        var obj = {
          id: this.radCopy.id,
          fldId: this.radCopy.fldId,
          schTime: this.radCopy.schTime.getTime(),
          updateAll: this.updateAll ? '1' : '0'
        }
        updateSchTime(obj).then(res => {
          if(res && res.code && res.code === 200) {
            this.$modal.msgSuccess("修改成功");
          } else {
            this.$modal.msgError("修改失败")
          }

        })
      },
      endCure() {},
    },
  };
</script>
