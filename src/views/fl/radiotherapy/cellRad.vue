<template>
  <div id="tableCell">
    <p v-for="e in radList" @click="cli(e)" style="text-align: center;">
      <el-link :underline="false">{{ e.hzXm }}</el-link>
    </p>
    <p @click="showAddDialog" style="text-align: center;">
      <i class="el-icon-circle-plus"></i>
    </p>
    <!-- <el-popover placement="right" width="700" trigger="click" @show="getFlds">
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
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
      <p style="text-align: center;" slot="reference">
        <i class="el-icon-circle-plus"></i>
      </p>
    </el-popover> -->

    <el-dialog :title="infoTitle" :visible.sync="infoOpen" width="500px" append-to-body>
      <el-tabs type="border-card">
        <el-tab-pane label="本次放疗信息">本次放疗信息</el-tab-pane>
        <el-tab-pane label="疗程信息">疗程信息</el-tab-pane>
        <el-tab-pane label="放疗单">放疗单</el-tab-pane>
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
  export default {

    props: {
      radList: Array,
      machineId: Number,
      dictType: Object,
      schTime: String,

    },
    data() {
      return {
        infoTitle: '患者治疗信息',
        infoOpen: false,
        addTitle: '新增患者治疗信息',
        addOpen: false,
        flds: [],
        selectFlds: [],
      }
    },
    created() {},
    computed: {},
    methods: {
      cli(e) {
        console.log(e)
        this.infoOpen = true;
      },

      showAddDialog() {
        this.getFlds();
        this.addOpen = true;
      },

      //查询治疗状态为“未开始”的放疗单
      getFlds() {
        var query = {
          treatStatus: 'wks',
          machineId: this.machineId
        }
        console.log("查询条件", query)
        getFlds(query).then(response => {
          this.flds = response.data
          console.log("查询结果", response.data)
        });
      },

      // 多选框选中数据
      handleSelectionChange(selection) {
        this.selectFlds = selection
        console.log("选中的 fld ", this.selectFlds)
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
          console.log("新增结果", response)
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


<style type="text/css"></style>
