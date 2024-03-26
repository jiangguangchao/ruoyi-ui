<template>  
  <div>  
    <el-table :data="tableData" style="width: 100%">  
      <el-table-column>  
        <template slot-scope="scope">  
          <el-select v-model="scope.row.employee" placeholder="请选择员工" @change="handleEmployeeChange(scope.$index, scope.row)">  
            <el-option  
              v-for="employee in employees"  
              :key="employee.value"  
              :label="employee.label"  
              :value="employee.value">  
            </el-option>  
          </el-select>  
        </template>  
      </el-table-column>  
      <el-table-column  
        v-for="(day, index) in daysOfWeek"  
        :key="day"  
        :label="day"  
        :width="120"  
      >  
        <template slot-scope="scope">  
          <el-select  
            v-model="scope.row.schedule[day]"  
            placeholder="请选择机器"  
            :disabled="isMachineLocked(scope.row, day)"  
            @change="handleMachineChange(scope.row, day)">  
            <el-option  
              v-for="machine in machines"  
              :key="machine"  
              :label="machine"  
              :value="machine">  
            </el-option>  
          </el-select>  
        </template>  
      </el-table-column>  
    </el-table>  
  </div>  
</template>  
  
<script>  
import { Table, TableColumn, Select, Option } from 'element-ui';  
  
export default {  
  name: 'EditableScheduleTable',  
  components: {  
    ElTable: Table,  
    ElTableColumn: TableColumn,  
    ElSelect: Select,  
    ElOption: Option  
  },  
  data() {  
    return {  
      daysOfWeek: ['周一', '周二', '周三', '周四', '周五'],  
      machines: ['机器1', '机器2', '机器3', '机器4', '机器5'],  
      employees: [  
        { value: 'employee1', label: '员工A' },  
        { value: 'employee2', label: '员工B' },  
        { value: 'employee3', label: '员工C' },  
        { value: 'employee4', label: '员工D' },  
        { value: 'employee5', label: '员工E' }  
      ],  
      tableData: Array(5).fill({ employee: '', schedule: {} }) // 创建5个空对象，并在mounted中初始化schedule  
    };  
  },  
  mounted() {  
    this.tableData.forEach(row => {  
      this.daysOfWeek.forEach(day => {  
        row.schedule[day] = ''; // 初始化每一行的schedule对象  
      });  
    });  
  },  
  methods: {  
    handleEmployeeChange(rowIndex, row) {  
      // 当员工选择改变时，可以重置该员工的机器安排  
      this.resetSchedule(row);  
    },  
    handleMachineChange(row, day) {  
      // 这里可以添加逻辑来处理机器选择的变化，比如检查冲突等  
    },  
    resetSchedule(row) {  
      this.daysOfWeek.forEach(day => {  
        row.schedule[day] = ''; // 重置所有机器选择  
      });  
    },  
    isMachineLocked(row, day) {  
      // 检查是否应该锁定机器选择  
      // 这里可以根据实际情况添加逻辑，比如如果其他相同员工已经选择了机器，则锁定  
      return false; // 暂时不锁定，你可以根据实际需求实现锁定逻辑  
    }  
  }  
};  
</script>