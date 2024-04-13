<template>
  <div>
    <el-dialog :visible.sync="open" title="流程图" width="80%" :before-close="handleClose">
      <vue-mermaid :nodes="nodes" type="graph TD"></vue-mermaid>
    </el-dialog>
  </div>
</template>


<script>
  import {
    getFllcjl
  } from "@/api/fl/fllcjl";
  export default {
    dicts: ['fl_lc'],
    data() {
      return {
        open: false,
        nodes:[],
      };
    },
    methods: {

      openDia(fld){
        this.getNodes(fld.id);
        
      },
      handleClose(){
        this.nodes = [];
        this.open = false;
      },

      getNodes(fldId) {
        getFllcjl(fldId).then(response => {
          this.dict.type.fl_lc.forEach((e, index)=>{

            let obj = response.data.find(t=>t.lcjdmc == e.value)
            let node = {
              id: index,
              text: e.label,
              next:[index + 1],
              style: "fill:#7FFFAA"
            }

            if (response.data.length > index) {
              node.text = e.label + "-" + obj.czrmc + "-" + obj.czsj;
            }

            if (response.data.length === index) {
              console.log("流程当前节点为:", e.value)
              node.text = e.label + "-";
              node.style = "fill:#FF7F00"
            }

            if (response.data.length < index) {
              node.style = "fill:#DCDCDC"
            }

            if (index === this.dict.type.fl_lc.length - 1) {
              node.next = null;
            }
            this.nodes.push(node);
          })

          this.open = true;
        })
      },
    },
  };
</script>
