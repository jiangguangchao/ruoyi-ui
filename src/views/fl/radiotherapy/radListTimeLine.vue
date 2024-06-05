<template>
  <div>
    <el-button @click="showRad">展开</el-button>
    <el-button @click="hideRad">合并</el-button>
    <el-timeline>
      <el-timeline-item v-for="(r, index) in radList" :timestamp="r.timestamp" placement="top"
        :color="r.color">
        <el-card v-show="showFlag" body-style="{background-color:red}">
          <RadDetail :rad="r" :dictType="dictType" :getMachineNameById="getMachineNameById"></RadDetail>
        </el-card>

      </el-timeline-item>
    </el-timeline>
  </div>
</template>


<script>
  import {
    getFlds,
    addRadiotherapy,
    listRadiotherapy
  } from "@/api/fl/radiotherapy";
  import RadDetail from './radDetail.vue'
  export default {

    props: {
      machineId: Number,
      dictType: Object,
      schTime: String,
      rad: Object,
      getMachineNameById: Function,

    },
    components: {
      RadDetail
    },
    data() {
      return {
        infoTitle: '患者治疗信息',
        infoOpen: false,
        addTitle: '新增患者治疗信息',
        addOpen: false,
        flds: [],
        selectFlds: [],
        radList: [],
        showFlag: false,
      }
    },
    created() {
      this.getList()
    },
    computed: {},
    methods: {

      getList() {
        this.loading = true;
        if (this.rad && this.rad.fldId) {
          const queryParams = {
            fldId: this.rad.fldId
          }
          listRadiotherapy(queryParams).then(response => {

            if (response.rows.length > 0) {
              response.rows.forEach((e, index) => {
                if (e.cureStatus == '5') {
                  e.color='#0bbd87';
                } else if (e.cureStatus == '1') {
                  e.color = '#ef9e1b';
                }

                e.timestamp = e.schTime + ' 第' + (index + 1) + '次';
                if (e.id == this.rad.id) {
                  e.timestamp = e.timestamp + '（当前治疗）'
                }

              })
            }
            console.log("查询疗程列表结果", response.rows)
            this.radList = response.rows;
          });
        } else {
          console.log("放疗单编号为空，无法查询")
        }

      },

      getShowFlag(){
        return false;
      },

      showRad() {
        this.showFlag = true;
      },

      hideRad() {
        this.showFlag = false;
      },

      getColor() {
        return '#0bbd87';
      },

      clickRad(r) {
        console.log("点击-----------------")
        // this.showFlagMap.set(r.id, !this.showFlagMap.get(r.id))
      },

      // showAddDialog() {
      //   this.getFlds();
      //   this.addOpen = true;
      // },

      // //查询治疗状态为“未开始”的放疗单
      // getFlds() {
      //   var query = {
      //     treatStatus: 'wks',
      //     machineId: this.machineId
      //   }
      //   console.log("查询条件", query)
      //   getFlds(query).then(response => {
      //     this.flds = response.data
      //     console.log("查询结果", response.data)
      //   });
      // },

      // // 多选框选中数据
      // handleSelectionChange(selection) {
      //   this.selectFlds = selection
      //   console.log("选中的 fld ", this.selectFlds)
      // },

      // //新增
      // addRad() {
      //   if (this.selectFlds.length < 1) {
      //     console.log("请先选择放疗单")
      //     return;
      //   }
      //   const radArr = [];
      //   this.selectFlds.forEach(e => {
      //     let rad = {};
      //     rad.fldId = e.id
      //     rad.machineId = this.machineId
      //     rad.schFlag = 'Y' //是否已安排治疗时间 N-否 Y-是
      //     rad.schTime = this.schTime
      //     rad.cureFlag = 'N' //是否已治疗 N-否 Y-是
      //     rad.cureStatus = '0' //治疗状态 0--未开始 1--治疗中 5--已结束  指的是疗程中单次治疗的状态
      //     rad.treatStatus = e.treatStatus //疗程状态 指整个疗程的治疗状态
      //     rad.cureCount = e.cureCount //疗程包含的总治疗次数
      //     radArr.push(rad)
      //   })
      //   addRadiotherapy(radArr).then(response => {
      //     console.log("新增结果", response)
      //     this.$emit('addRad');
      //   });
      //   this.addOpen = false;
      // },

      // addSubmit() {
      //   this.addRad()
      // },
      // closeAddDia() {
      //   this.addOpen = false;
      // },



    }
  };
</script>


<style type="text/css"></style>
