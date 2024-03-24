<template>
    <div class="process-flow">
      <div class="process-node-container" v-for="(node, index) in internalProcessNodes" :key="index" :class="getNodeClass(index)">
        <div class="process-node">
          <!-- 使用Element UI标签显示节点内容，并增加字体大小 -->
          <el-tag size="medium" :type="nodeStatus[index] === 'current' ? 'danger' : (nodeStatus[index] === 'past' ? 'success' : 'warning')">{{ node.title }}</el-tag>
        </div>
  
        <!-- 箭头部分 -->
        <transition-group name="fade" tag="div" v-if="index !== 0">
          <div class="arrow-line left-arrow" key="leftArrow"></div>
          <div class="arrow-point left-arrow" key="leftArrowPoint"></div>
        </transition-group>
        
        <transition-group name="fade" tag="div" v-if="index !== internalProcessNodes.length - 1">
          <div class="arrow-line right-arrow" key="rightArrow"></div>
          <div class="arrow-point right-arrow" key="rightArrowPoint"></div>
        </transition-group>
      </div>
    </div>
  </template>
  
  <style scoped>
  .process-flow {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .process-node-container {
    position: relative;
    min-height: 50px;
  }
  
  .process-node {
    position: relative;
    text-align: center;
    margin-bottom: 1rem;
  }
  
  .el-tag {
    font-size: 16px;
  }
  
  .arrow-line {
    position: absolute;
    background-color: #ccc;
    height: 2px;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
  
  .arrow-point {
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #ccc;
    top: 50%;
    transform: translateY(-50%) translateX(-5px);
  }
  
  .left-arrow-line {
    left: calc(100% + 10px);
  }
  
  .left-arrow-point {
    left: calc(100% + 5px);
  }
  
  .right-arrow-line {
    right: calc(-100% - 10px);
  }
  
  .right-arrow-point {
    right: calc(-100% - 5px);
  }
  
  /* 根据节点状态设定颜色 */
  .current .el-tag {
    color: #fff;
    background-color: red;
  }
  
  .past .el-tag {
    color: #fff;
    background-color: green;
  }
  
  .future .el-tag {
    color: #333;
    background-color: grey;
  }
  
  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.3s;
  }
  
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
  </style>
  <script>
  export default {
    data() {
      return {
        internalProcessNodes: [
          { title: '开始' },
          { title: '步骤1' },
          { title: '步骤2' },
          { title: '结束' },
        ],
        nodeStatus: ['future', 'future', 'future', 'future'], // 初始化所有节点状态为未来
      };
    },
    methods: {
      getNodeClass(index) {
        // 根据业务逻辑设置当前、过去和未来节点的类名
        if (index === 0) {
          this.nodeStatus[0] = 'current'; // 假设第一个总是当前节点
          this.nodeStatus.slice(1).fill('past'); // 其他节点为过去
        } else if (index === this.internalProcessNodes.length - 1) {
          // 如果是最后一个节点，前面的变为过去，当前节点不变
          this.nodeStatus.fill('past');
          this.nodeStatus[this.internalProcessNodes.length - 1] = 'current';
        }
        return this.nodeStatus[index];
      },
    },
  };
  </script>