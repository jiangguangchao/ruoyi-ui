<template>
  <div>
    <el-descriptions title="用户信息" :column="2" border>
      <el-descriptions-item label="ID">{{ patientRecord.id }}</el-descriptions-item>
      <el-descriptions-item label="放疗单编号">{{ patientRecord.fldId }}</el-descriptions-item>
      <el-descriptions-item label="机器编号">{{ patientRecord.machineId }}</el-descriptions-item>
      <el-descriptions-item label="是否已安排治疗时间">
        {{ patientRecord.schFlag === 'Y' ? '是' : '否' }}
      </el-descriptions-item>
      <el-descriptions-item label="预计治疗时间">
        {{ patientRecord.schTime | formatDate }}
      </el-descriptions-item>
      <el-descriptions-item label="是否已治疗">
        {{ patientRecord.cureFlag === 'Y' ? '是' : '否' }}
      </el-descriptions-item>
      <el-descriptions-item label="治疗操作技师ID">{{ patientRecord.cureOperator }}</el-descriptions-item>
      <el-descriptions-item label="治疗结束时间">
        {{ patientRecord.cureEndTime | formatDate }}
      </el-descriptions-item>
      <el-descriptions-item label="治疗状态">
        {{ patientRecord.cureStatus === '0' ? '未开始' : 
          (patientRecord.cureStatus === '1' ? '治疗中' : '已结束') }}
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 假设这是从后端获取的数据并赋值给patientRecord
      patientRecord: {
        id: null,
        fldId: '',
        machineId: null,
        schFlag: 'N',
        schTime: new Date(),
        cureFlag: 'N',
        cureOperator: '',
        cureEndTime: null,
        cureStatus: '0'
      }
    };
  },
  filters: {
    // 自定义过滤器，用于格式化日期
    formatDate(date) {
      if (date) {
        return date.toLocaleString(); // 或者使用更复杂的日期格式化逻辑
      } else {
        return '-';
      }
    }
  }
};
</script>