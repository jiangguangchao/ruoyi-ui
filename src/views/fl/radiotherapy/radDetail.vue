<template>
  <div>
    <el-descriptions :column="2" border>
      <el-descriptions-item label="ID">{{ radCopy.id }}</el-descriptions-item>
      <el-descriptions-item label="放疗单编号">{{ radCopy.fldId }}</el-descriptions-item>
      <el-descriptions-item label="放疗机器">{{ getMachineNameById(radCopy.machineId) }}</el-descriptions-item>
      <!-- <el-descriptions-item label="是否已安排治疗时间">
        {{ getSysYesNoLabel(radCopy.schFlag) }}
      </el-descriptions-item> -->
      <el-descriptions-item label="预计治疗时间">
        {{ radCopy.schTime | formatDate }}
      </el-descriptions-item>
      <!-- <el-descriptions-item label="是否已治疗">
        {{ getSysYesNoLabel(radCopy.cureFlag) }}
      </el-descriptions-item> -->
      <el-descriptions-item label="治疗操作技师ID">{{ radCopy.cureOperator }}</el-descriptions-item>
      <el-descriptions-item label="治疗结束时间">
        {{ radCopy.cureEndTime | formatDate }}
      </el-descriptions-item>
      <el-descriptions-item label="治疗状态">
        {{ radCopy.cureStatus === '0' ? '未开始' :
          (radCopy.cureStatus === '1' ? '治疗中' : '已结束') }}
      </el-descriptions-item>
    </el-descriptions>
    <div slot="footer" class="dialog-footer" v-if="radCopy.cureStatus == '0' && showEdit">
      <el-button type="primary" @click="openUpdateSchTimeDia">修改治疗时间</el-button>
      <el-button type="primary" @click="openEndCureDia" v-if="mytest">治疗结束</el-button>
    </div>
    <el-dialog :visible.sync="updateTimeOpen" append-to-body width="600">
      <el-date-picker v-model="newSchTime" format="yyyy-MM-dd HH:00:00" type="datetime" 
          @change="timeChange" placeholder="选择日期时间">
      </el-date-picker>
      <div slot="footer" class="dialog-footer">
        <el-checkbox v-model="updateAll">将当前时间应用到所有治疗</el-checkbox>
        <el-button type="primary" @click="updateSchTime">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="endCureOpen" append-to-body width="600">
      <el-input v-for="e in workUserArr" :value="e.userName"></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitEndCure">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    getRadiotherapy,
    listRadiotherapy,
    updateSchTime,
    endCure
  } from "@/api/fl/radiotherapy";
  import {
    listSchedule
  } from "@/api/fl/schedule";
  export default {
    props: {
      dictType: Object,
      rad: Object,
      showEdit: Boolean,
      getMachineNameById: Function,

    },
    data() {
      return {
        updateTimeOpen: false,
        radCopy: null,
        updateAll: true,
        endCureOpen: false,
        workUserArr: [],
        newSchTime: null,
        radList:[],
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
      },
    },
    created() {
      this.radCopy = {...this.rad};
    },
    computed: {
      
    },
    methods: {
      mytest(){
        console.log("是否执行了mytest")
      },
      getSysYesNoLabel(e) {
        return this.selectDictLabel(this.dictType.sys_yes_no, e);
      },

      getRadDetail() {
        getRadiotherapy(this.radCopy.id).then(res => {
          console.log("查询详情结果", res)
          this.radCopy = res.data;
        })
      },

      //查询放疗单下的所有治疗，以便修改日期时判定同一天是否有多次治疗
      getRadListByFldId(){
        var para = {
          fldId: this.radCopy.fldId
        }
        listRadiotherapy(para).then(res => {
          this.radList = res.rows
        })
      },

      timeChange(){
        let date = this.newSchTime;
        var newSchTimeStr = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;

        //判断this.newSchTime是否和this.radList数组中每个对象的schTime是否为同一天
        const exist = this.radList.find(e => e.schTime.substring(0, 10) === newSchTimeStr.substring(0, 10))
        if (exist) {
          this.$modal.msgError("同一天[" + newSchTimeStr.substring(0, 10) + "]不能有两次治疗")
          this.newSchTime = this.radCopy.schTime
        } 

      },



      openUpdateSchTimeDia() {
        this.newSchTime = this.radCopy.schTime
        this.getRadListByFldId();
        this.updateTimeOpen = true;
      },
      updateSchTime(){
        var obj = {
          id: this.radCopy.id,
          fldId: this.radCopy.fldId,
          schTime: this.newSchTime.getTime() + '',
          updateAll: this.updateAll ? '1' : '0'
        }
        updateSchTime(obj).then(res => {
          if(res && res.code && res.code === 200) {
            this.$modal.msgSuccess("修改成功");
            this.getRadDetail();
            this.updateTimeOpen = false;
          } else {
            this.$modal.msgError("修改失败")
          }

        })
      },

      canEndCure(){
        
      },
      

      //查询当前时间机器技师
      getJS(){
        const schDate = this.radCopy.schTime.substring(0, 10) + " 00:00:00";
        const HH = parseInt(this.radCopy.schTime.substring(11, 13), 10)
        const ampmFlag = 'am';
        if (HH >12) {
          ampmFlag = 'pm';
        }
        const queryParam = {
          machineId: this.rad.machineId,
          params: {
            beginTime: schDate,
            endTime: schDate,
          }

        }

        return new Promise((resolve, reject) => {
          const workUserArr = [];
          listSchedule(queryParam).then(res => {
            console.log("技师查询结果", res)
            if (res.rows && res.rows.length > 0) {
              res.rows.forEach(e => {
                if (ampmFlag == 'am' && (e.schTime == 'qt' || e.schTime == 'sw')) {
                  workUserArr.push(e)
                }
                if (ampmFlag == 'pm' && (e.schTime == 'qt' || e.schTime == 'xw')) {
                  workUserArr.push(e)
                }
              })
            }
            resolve(workUserArr);
          })
        })

      },
      openEndCureDia(){
        console.log("开始结束治疗")

        const schDate = this.radCopy.schTime.substring(0, 10)
        let date = new Date()
        var today = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
        console.log("schDate today", schDate, today)
        if (schDate > today) {
          
          this.$modal.msgWarning("只能结束今天或今天之前的治疗")
          return;
        }

        this.getJS().then(workUserArr => {
          if (workUserArr && workUserArr.length > 0) {
            console.log("查询到有效技师", workUserArr)
            this.workUserArr = workUserArr;
            this.endCureOpen = true;
          } else {
            this.$modal.msgWarning("没有查询到技师")
          }
        })
      },
      submitEndCure() {
        var param = {
          fldId: this.radCopy.fldId,
          id: this.radCopy.id,
          remark: this.radCopy.remark,
          operatorNames: this.workUserArr.map(e=>e.userName).join(","),
          opertaorIds: this.workUserArr.map(e => e.userId)
        }

        endCure(param).then(res => {
          if (res.code === 200) {
            this.$modal.msgSuccess("成功结束本次治疗")
            this.getRadDetail()
            this.endCureOpen = false;
          } else {
            this.$modal.msgError("结束本次治疗出现异常")
          }
        })

      },
    },
  };
</script>
