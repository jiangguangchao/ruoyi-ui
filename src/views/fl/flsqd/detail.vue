<template>
  <!-- <el-dialog :title="detailTitle" :visible.sync="open" :before-close="closeDia">
    <el-tabs type="border-card">
      <el-tab-pane label="基本信息" lazy>
        <flsqdDetail :fldId="fldId" ></flsqdDetail>
      </el-tab-pane>
      <el-tab-pane label="疗程信息" lazy>
        <treatment :fldId="fldId"></treatment>
      </el-tab-pane>
      <el-tab-pane label="计划信息" lazy>
        <lcDetail :fldId="fldId" ></lcDetail>
      </el-tab-pane>
    </el-tabs>
  </el-dialog> -->
  <div>
    <el-tabs type="border-card" @tab-click="ckickTab" v-model="activeName">
      <el-tab-pane label="基本信息" lazy>
        <flsqdDetail :fldId="fldId" ></flsqdDetail>
      </el-tab-pane>
      <el-tab-pane label="靶区" lazy>
        <target :fldid="fldId"></target>
      </el-tab-pane>
      <el-tab-pane label="危害器官" lazy>
        <organ :fldid="fldId"></organ>
      </el-tab-pane>
      <el-tab-pane label="疗程信息" lazy>
        <treatment :fldId="fldId"></treatment>
      </el-tab-pane>
      <el-tab-pane label="计划信息" lazy name="计划信息">
        <lcDetail :fldId="fldId" :activeName="activeName"  ></lcDetail>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import {
    getFlsqd,
  } from "@/api/fl/flsqd";
  import flsqdDetail from "@/views/fl/flsqd/flsqdDetail.vue";
  import lcDetail from "@/views/fl/flsqd/lcDetail.vue";
  import treatment from "@/views/fl/flsqd/treatment.vue";
  import organ from "@/views/fl/flsqd/organ.vue";
  import target from "@/views/fl/flsqd/target.vue";
  export default {
    dicts: ['fl_zljq', 'fl_fldzt', 'fl_zljs', 'fl_gdfs', 'fl_txrhlx', 'fl_igrtpllx', 'sys_yes_no', 'sys_user_sex',
      'fl_smlx1', 'fl_IGRT', 'fl_smlx2', 'fl_lc'
    ],
    props:{
      fldId: String
    },
    data() {
      return {
        form: null,
        detailTitle: "详情",
        open: false,
        activeName: null
      }
    },
    components: {
      flsqdDetail,
      lcDetail,
      treatment,
      organ,
      target
    },
    methods: {
      openDia(fldId) {
        this.fldId = fldId
        this.open = true;
      },
      closeDia() {
        this.open = false;
      },

      ckickTab(tab){
        console.log("点击table", tab)
        console.log("点击table", this.activeName)
      },

    }
  }
</script>

<style></style>
