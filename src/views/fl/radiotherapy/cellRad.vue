<template>
  <div id="tableCell">
    <p v-for="e in radList" @click="cli(e)" style="text-align: center;">
      <el-link :underline="false">{{e.hzXm}}</el-link>
    </p>
    <p @click="add" style="text-align: center;">
      <i class="el-icon-circle-plus"></i>
    </p>
    
    <el-dialog :title="infoTitle" :visible.sync="infoOpen" width="500px" append-to-body>
      <el-tabs type="border-card">
        <el-tab-pane label="本次放疗信息">本次放疗信息</el-tab-pane>
        <el-tab-pane label="疗程信息">疗程信息</el-tab-pane>
        <el-tab-pane label="放疗单">放疗单</el-tab-pane>
      </el-tabs>
    </el-dialog>

    <el-dialog :title="addTitle" :visible.sync="addOpen" width="500px" append-to-body>
      
    </el-dialog>

  </div>
</template>


<script>

export default {
  dicts: ['zhibansj'],
  props: {
    radList: Array,
  },
  data() {
    return {
      infoTitle: '患者治疗信息',
      infoOpen: false,
      addTitle: '新增患者治疗信息',
      addOpen: false,
      name:null
    }
  },
  created() {
  },


  computed: {
  },
  methods: {
    cli(e) {
      console.log(e)
      this.infoOpen = true;
    },

    add() {
      this.addOpen = true;
    },


  }
};
</script>


<style type="text/css">

</style>
