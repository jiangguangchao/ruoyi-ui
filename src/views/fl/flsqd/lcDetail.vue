<template>
  <div>
    <vue-mermaid :nodes="nodes" type="graph TD"></vue-mermaid>
  </div>
</template>


<script>
  import {
    listFllcjl,
    getFllcjl
  } from "@/api/fl/fllcjl";
  export default {
    dicts: ['fl_lc'],
    props: ['selectId'],
    data() {
      return {
        nodes:[],
      };
    },
    created() {
      this.getNodes(this.selectId);
    },
    methods: {
      getNodes(fldId) {
        getFllcjl(fldId).then(response => {
          console.log("查看到放疗单流程记录", response.data)

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
            // console.log("nodes:", this.nodes)

          })

          // response.data.forEach((e, index)=>{
          //   let node = {
          //     id: index,
          //     text: e.lcjdmc + "-" + e.czrmc + "-" + e.czsj,
          //     next:[index + 1],
          //     style: "fill:#7FFFAA"
          //   }
          //   if (index === response.data.length - 1) {
          //     node.next = null;
          //   }
          //   this.nodes.push(node);
          // })
        })
      },
    },
  };
</script>
