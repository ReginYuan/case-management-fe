
<template>
  <div class="economicInvestigation">
    <el-row class="mb-4">
      <el-button @click="goback" type="primary">返回案件管理</el-button>
    </el-row>
    <el-table :data="tableData" stripe style="width: 100%" height="100%">
      <el-table-column fixed prop="caseId" label="案件编号" width="120" />
      <el-table-column prop="caseName" label="案件名称" width="200" />
      <el-table-column prop="caseDescribe" label="案件描述" />
      <el-table-column prop="caseDate" label="案件日期" width="200" />
    </el-table>
  </div>
</template>
  
  <script setup>
// vue3写法
import { reactive, ref, onMounted } from "vue";
import { getCasesList } from "../../../api/case";

import { useRouter } from 'vue-router'
const router = useRouter()


// 案件列表
const tableData = reactive([]);

const  goback =()=>{
    router.push('/system/cases')
}
/**
 * 查询所有案件列表
 */
const getCasesListDeatils = async () => {
  const list = await getCasesList();
  tableData.value = tableData.push(...list);
};

onMounted(() => {
  getCasesListDeatils();
});
</script>
    <style  lang="scss" scoped>
.economicInvestigation {
  display: flex;
  flex-direction: column;
  height: 90vh;
  // overflow: hidden;
  background-color: #fff;
  padding: 20px;
}
</style>