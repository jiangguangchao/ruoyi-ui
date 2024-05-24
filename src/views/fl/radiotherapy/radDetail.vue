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
  </div>
</template>

<script>
export default {
  props: {
    dictType: Object,
    rad: Object,

  },
  data() {
    return {
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
  methods: {
    getSysYesNoLabel(e) {
      // const obj = this.dictType.sys_yes_no.find(m => m.value == e);
      // if (obj) {
      //   return obj.label;
      // }
      // return "-";
      return this.selectDictLabel(this.dictType.sys_yes_no, e);
      // return '是-';
    },
  },
};
</script>
