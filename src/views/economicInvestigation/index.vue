<template>
    <div class="economicInvestigation">
      <el-row class="mb-4">
        <el-button @click="openDialog" type="primary">新增案件</el-button>
      </el-row>
  
      <el-table :data="tableData" stripe style="width: 100%" height="100%">
        <el-table-column fixed prop="caseId" label="案件编号" width="120" />
        <el-table-column prop="caseName" label="案件名称" width="200" />
        <el-table-column prop="caseDescribe" label="案件描述" />
        <el-table-column prop="caseDate" label="案件日期" width="200" />
        <el-table-column fixed="right" label="操作" width="150">
          <template #default="scope">
            <el-button
              link
              type="primary"
              size="small"
              @click="handleClick(scope)"
              >添加交易流水</el-button
            >
            <!-- <el-button link type="primary" size="small">Edit</el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog v-model="dialogFormVisible" title="新增案件">
      <el-form ref="ruleFormRef" :model="addCaseform">
        <el-form-item label="选择日期" :label-width="120" required>
          <el-date-picker
            v-model="addCaseform.caseDate"
            type="date"
            placeholder="选择开始日期"
          />
        </el-form-item>
        <el-form-item label="案件名称" :label-width="120" required>
          <el-input
            v-model="addCaseform.caseName"
            placeholder="请输入案件名"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="案件详情" :label-width="120" required>
          <el-input
            v-model="addCaseform.caseDescribe"
            :rows="2"
            type="textarea"
            placeholder="请描述案件"
            autocomplete="off"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="addCaseformCanael(ruleFormRef)">取消提交</el-button>
          <el-button type="primary" @click="addCaseformConfirm"> 提交 </el-button>
        </span>
      </template>
    </el-dialog>
  
    <el-dialog v-model="dialogStreamFormVisible" title="新增调单数据">
      <el-form ref="ruleStreamRef" :model="addStreamform">
        <el-form-item label="选择流水类型" :label-width="150"  required>
          <el-select
            v-model="addStreamform.flowType"
            placeholder="请选择流水类型"
          >
            <el-option
              v-for="item in optionsType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="案件名称" :label-width="120" required>
          <el-input
            v-model="addCaseform.caseName"
            placeholder="请输入案件名"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="案件详情" :label-width="120" required>
          <el-input
            v-model="addCaseform.caseDescribe"
            :rows="2"
            type="textarea"
            placeholder="请描述案件"
            autocomplete="off"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="addCaseformCanael(ruleFormRef)">取消提交</el-button>
          <el-button type="primary" @click="addCaseformConfirm"> 提交 </el-button>
        </span>
      </template>
    </el-dialog>
  </template>
  <script setup lang="js">
  // vue3写法
  import { reactive, ref, getCurrentInstance, onMounted } from "vue";
  import { getCasesList, casesOperate } from "../../api/case";
  import moment from 'moment'
  //   获取Composition API 上下文对象
  const { ctx } = getCurrentInstance();
  
  
  // 添加案件节点
  const  ruleFormRef  = ref(null)
  
  // 案件列表
  const tableData = reactive([]);
  
  /**
   * 查询所有案件列表
   */
  const getDeptList = async () => {
    const list = await getCasesList();
    tableData.value = tableData.push(...list);
  };
  
  // 控制案件添加弹窗显示隐藏
  const dialogFormVisible = ref(false);
  const openDialog = () => {
    dialogFormVisible.value = true;
  };
  
  // 定义案件字段
  const addCaseform = reactive({
    caseDate: "",
    caseName: "",
    caseDescribe: "",
  });
  
  // 选择时间不能小于今天
  const disabledDate = (time) => {
    return time.getTime() < Date.now();
  };
  
  
  
  // 取消提交
  const addCaseformCanael = (ruleFormRef) => {
    if (!addCaseform) return
    // ctx.$refs[form].resetFields();
    ruleFormRef.resetFields();
    addCaseform.value = {}
    dialogFormVisible.value = false;
  };
  
  // 提交表单案件
  const addCaseformConfirm = async () => {
    if (!addCaseform) return;
    if (addCaseform) {
      let data = { ...addCaseform, action: "create" };
      let caseDate = moment(data.caseDate).format('YYYY-MM-DD')
      delete data.caseDate;
      let params = { caseDate, ...data};
     const res = await casesOperate(params);
      getDeptList();
      dialogFormVisible.value = false;
    } else {
    }
  };
  
  
  
  // 控制添加流水弹窗
  const  dialogStreamFormVisible = ref(false)
  
  // 定义表的选择类型
  const optionsType = ref([
    {
      value: '1',
      label: '交易流水信息',
    },
    {
      value: '2',
      label: '人员账号信息',
    },
    {
      value: '3',
      label: '人员信息',
    },
  ])
  // 定义流水数据结构
  const addStreamform = ref({
     flowType:'1'
  })
  
  
  const handleClick = () => {
    dialogStreamFormVisible.value =true
  };
  
  
  onMounted(() => {
    getDeptList();
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