import { listMachine} from '@/api/fl/machine'

const state = {
  machineArr: [] // 初始为空数组
};

const mutations = {
  SET_MACHINE_LIST(state, machineList) {
    state.machineArr = machineList;
  }
};

const actions = {
  // fetchMachineList({ commit }, query) {
  //   return listMachine(query).then(response => {
  //     // 假设 API 返回的响应数据在 response.data 中
  //     commit('SET_MACHINE_LIST', response.data);
  //   });
  // },
  // 可以在这里添加一个初始化 action
  initMachineList({ commit }) {
    // 假设你不需要任何查询参数，直接获取所有机器列表
    console.log("开始执行 initMachineList 初始化机器列表")
    return listMachine({}).then(response => {
      commit('SET_MACHINE_LIST', response.rows);
    });
  }
};

const getters = {
  // 根据 ID 获取机器名称
  getMachineNameById: (state) => (machineId) => {
    const machine = state.machineArr.find(machine => machine.id === machineId);
    return machine ? machine.name : null; // 如果找不到机器，返回 null
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
