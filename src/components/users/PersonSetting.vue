<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card>
          <span>个人信息</span>
          <el-divider></el-divider>
          <span>基础数据</span>
        </el-card>
      </el-col>
      <el-col :span="18">
        <el-card>修改密码</el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {


    }
  },
  created(){

  },
  methods: {
    //获取单个用户的信息
    async GetSingleUserInfo() {

      const { data: res } = await this.$http.get("User/GetSingleUserInfo");
      console.log(res.r)

    },
    //更改密码
    ChangePassword() {

    }

  }
}
</script>