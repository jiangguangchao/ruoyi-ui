<template>
  <div id="tableCell" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave"
    :class="{ active: isClassActive }" :style="computedStyle">
    <div>
      <p v-for="e in copyRadList" @click="clickRad(e)" style="text-align: center;">
        <el-tag :type="getTagType(e)" effect="dark">{{ e.hzXm }}</el-tag>
      </p>
      <p @click="showAddDialog" style="text-align: center;" v-show="showAddButton">
        <i class="el-icon-circle-plus"></i>
      </p>
    </div>

    <el-dialog :title="infoTitle" :visible.sync="infoOpen" width="800px" append-to-body>
      <el-tabs type="border-card">
        <el-tab-pane label="本次放疗信息" lazy>
          <RadDetail :rad="rad" :dictType="dictType" :showEdit="true" :getMachineNameById="getMachineNameById" @endCure="endCure(rad)">
          </RadDetail>
        </el-tab-pane>
        <!-- <el-tab-pane label="疗程信息" lazy>
          <RadListTimeLine :rad="rad" :dictType="dictType" :getMachineNameById="getMachineNameById"></RadListTimeLine>
        </el-tab-pane> -->
        <el-tab-pane label="放疗单" lazy>
          <detail :fldId="rad.fldId"></detail>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>

    <el-dialog :title="addTitle" :visible.sync="addOpen" width="700px" append-to-body>
      <el-table :data="flds" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="ID" align="center" prop="id" />
        <el-table-column label="患者姓名" align="center" prop="hzXm" />
        <el-table-column label="患者性别" align="center" prop="hzXb">
          <template slot-scope="scope">
            <dict-tag :options="dictType.sys_user_sex" :value="scope.row.hzXb" />
          </template>
        </el-table-column>
        <el-table-column label="患者出生年月" align="center" prop="hzSr" width="180">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.hzSr, '{y}-{m}-{d}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="疗程状态" align="center" prop="treatStatus">
          <template slot-scope="scope">
            <dict-tag :options="dictType.fl_cureStatus" :value="scope.row.treatStatus" />
          </template>
        </el-table-column>
        <el-table-column label="总治疗次数" align="center" prop="cureCount">
          <template slot-scope="scope">
            <span>{{ scope.row.cureCount }}</span>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addSubmit">确 定</el-button>
        <el-button @click="closeAddDia">取 消</el-button>
      </div>
    </el-dialog>



  </div>
</template>


<script>
import {
  getFlds,
  addRadiotherapy
} from "@/api/fl/radiotherapy";
import RadDetail from './radDetail.vue'
import RadListTimeLine from './radListTimeLine.vue'
import detail from "@/views/fl/flsqd/detail.vue"
export default {

  props: {
    radList: Array,
    machineId: Number,
    dictType: Object,
    schTime: String,
    getMachineNameById: Function,

  },
  components: {
    RadDetail,
    RadListTimeLine,
    detail
  },
  data() {
    return {
      infoTitle: '患者治疗信息',
      infoOpen: false,
      addTitle: '新增患者治疗信息',
      addOpen: false,
      flds: [],
      selectFlds: [],
      rad: {
        fldId: null
      },
      showAddButton: false,
      copyRadList: [],
    }
  },
  created() {
    this.copyRadList = this.radList.slice();
  },
  computed: {
    isClassActive() {
      // 当 a 和 b 都为 true 时，isClassActive 为 true
      return !this.showAddButton && (this.radList == null || this.radList.length == 0);
    },
    computedStyle() {
      // 根据 isClassActive 的值决定是否添加宽度和高度的样式
      return this.isClassActive ? {
        width: '90px',
        height: '50px',
      } : {};
    },
  },
  methods: {
    clickRad(e) {
      console.log(e)
      this.rad = e;
      this.infoOpen = true;
    },

    getSimpleInfo(rad) {
      if(rad.cureStatus == '5') {
        return rad.hzXm + " " + rad.cureIndex + "/" + rad.cureCount + " " + rad.cureOperator
      } else {
        return rad.hzXm
      }
    },

    getTagType(e) {
      if (e.cureStatus == '0') {
        return 'info';
      } else if (e.cureStatus == '1') {
        return 'danger';
      } else {
        return "success"
      }

    },

    endCure(rad){
      const list = this.copyRadList.slice();
      list.forEach(e=>{
        if (e.id == rad.id) {
          e.cureStatus = '5';
        }
      });
      this.copyRadList = list;

    },

    showAddDialog() {
      this.getFlds();
      this.addOpen = true;
    },

    //查询治疗状态为“未开始”的放疗单
    getFlds() {
      var query = {
        treatStatus: 'wks',//放疗单的疗程状态是未开始
        fldzt: 'jxz',//放疗单的状态是进行中
        machineId: this.machineId
      }
      // console.log("查询条件", query)
      getFlds(query).then(response => {
        this.flds = response.data
        // console.log("查询结果", response.data)
      });
    },

    // 多选框选中数据
    handleSelectionChange(selection) {
      this.selectFlds = selection
      // console.log("选中的 fld ", this.selectFlds)
    },

    handleMouseEnter(){
      this.showAddButton = true;
    },

    handleMouseLeave(){
      this.showAddButton = false;
    },

    //新增
    addRad() {
      if (this.selectFlds.length < 1) {
        console.log("请先选择放疗单")
        return;
      }
      const radArr = [];
      this.selectFlds.forEach(e => {
        let rad = {};
        rad.fldId = e.id
        rad.machineId = this.machineId
        rad.schFlag = 'Y' //是否已安排治疗时间 N-否 Y-是
        rad.schTime = this.schTime
        rad.cureFlag = 'N' //是否已治疗 N-否 Y-是
        rad.cureStatus = '0' //治疗状态 0--未开始 1--治疗中 5--已结束  指的是疗程中单次治疗的状态
        rad.treatStatus = e.treatStatus //疗程状态 指整个疗程的治疗状态
        rad.cureCount = e.cureCount //疗程包含的总治疗次数
        radArr.push(rad)
      })
      addRadiotherapy(radArr).then(response => {
        // console.log("新增结果", response)
        this.$emit('addRad');
      });
      this.addOpen = false;
    },

    addSubmit() {
      this.addRad()
    },
    closeAddDia() {
      this.addOpen = false;
    },



  }
};
</script>


<style type="text/css">
/* #tableCell {
  width: 90px;
  height: 50px;
} */

.custom-tag {
  display: inline-block;
  padding: 0 5px;
  height: 20px;
  line-height: 20px;
  background-color: #409EFF; /* Element UI 默认的标签颜色 */
  color: #fff;
  border-radius: 4px;
  /* 允许内容换行 */
  white-space: normal;
  word-break: break-all; /* 如果需要的话，允许在任意位置换行 */
  /* 你可以添加更多的样式来适应你的需求 */
}
</style>
