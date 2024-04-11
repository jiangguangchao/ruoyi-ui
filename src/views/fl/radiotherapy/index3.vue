<template>
  <div>
    <!-- <vue-mermaid
    :nodes="data"
    type="graph LR"
    ></vue-mermaid> -->
    <pre class="mermaid">
          {{ code }}
    </pre>
  </div>
</template>

<script>
import mermaid from "mermaid"
export default {
  data() {
    return {
      data: [
        {
          id: "1",
          text: "A",
          link: "---",
          next: ["2"],
          style: "fill:#f9f,stroke:#333,stroke-width:4px"
        },
        { id: "2", text: "B", edgeType: "circle", next: ["3"] },
        { id: "3", text: "C", next: ["4", "6"] },
        { id: "4", text: "D", link: "-- This is the text ---", next: ["5"] },
        { id: "5", text: "E" },
        { id: "6", text: "F" }
      ],
      code: `graph TD
    A[Enter Chart Definition] --> B([用户1 2023])
    B --> C{decide}
    C --> D[Keep]
    C --> E[Edit Definition]
    E --> B
    D --> F[Save Image and Code]
    F --> B
`
    };
  },

  created() {
    this.showNodes();
  },
  
  methods: {

    getCode() {
      this.code;
    },

    showNodes(){
      // var container = document.getElementById("mermaid");
      mermaid.initialize({ startOnLoad: true });
      // mermaid.init(this.code, container);
    },
  }
};
</script>
