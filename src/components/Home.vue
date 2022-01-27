<template>
  <el-container class="home-container">
    <!-- 头部区 -->
    <el-header>
      <div>
        <img alt src="../assets/logo.png" />
      </div>
      <div>
        <el-dropdown @command="handleCommand">
          <!-- <el-button size="small"> -->
          <!-- 个人 -->
          <el-avatar icon="el-icon-user-solid"></el-avatar>
          <i class="el-icon-arrow-down el-icon--right"></i>
          <!-- </el-button> -->
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="a">个人中心</el-dropdown-item>
            <el-dropdown-item command="b">退出登陆</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <!-- <el-button @click="logout" type="info" round>退出登录</el-button> -->
    </el-header>
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏 动态绑定某个值 需要: -->
      <el-aside :width="isCollapse ? '64px' : '255px'">
        <div @click="toggleCollpase" class="toggle-button">|||</div>
        <!-- 侧边栏菜单区域 router开启Vue路由 active-text-color激活颜色 unique-opened唯一打开 collapse-transition折叠效果动画  default-active高亮 本次使用的高亮刷新也依然可以存放 因为将路径存放在sessio中 每次打开就读取这个值-->
        <el-menu
          :collapse="isCollapse"
          :collapse-transition="false"
          :default-active="activePath"
          active-text-color="#409BFF"
          background-color="#333744"
          router
          text-color="#fff"
          unique-opened
        >
          <!-- 一级菜单 双层FOR循环渲染左侧导航栏 不指定唯一的Index 就会都展开 index只接收字符串-->
          <el-submenu
            :index="item.id + ''"
            :key="item.id"
            v-for="item in menulist"
          >
            <!-- 一级菜单的模板区域 -->
            <template slot="title">
              <!-- 图标 动态绑定图标iconsObj[item.id]这种写法和iconsObj.属性一样-->
              <i :class="iconsObj[item.id]"></i>
              <!-- 文本 -->
              <span>{{ item.authName }}</span>
            </template>
            <!-- 二级菜单 使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转 路径手动加/-->
            <el-menu-item
              :index="'/' + subItem.path"
              :key="subItem.id"
              @click="saveNavState('/' + subItem.path)"
              v-for="subItem in item.children"
            >
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-menu"></i>
                <!-- 文本 -->
                <span>{{ subItem.authName }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧内容主体 -->
      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>


<script>
export default {
  data() {
    return {
      menulist: [],
      // 图标对象
      iconsObj: {
        '100': 'el-icon-user-solid',
        '101': 'el-icon-s-cooperation',
        '102': 'el-icon-s-goods  ',
        '103': 'el-icon-s-order',
        '104': 'el-icon-s-data',
        '105': 'el-icon-s-data'
      },
      isCollapse: false,
      //被激活的链接地址
      activePath: '',
    }
  },
  // 创建时调用
  created() {
    this.getMenuList()
    this.activePath = window.sessionStorage.getItem('activepath')
    console.log(this.activePath)
    //不为null 就跳转
    if (this.activePath !== 'null') {
      this.$router.push(this.activePath)
    } else {
      this.$router.push('/Welcome')
    }

  },
  methods: {
    handleCommand(command) {
      switch (command) {
        case 'a':
          this.$router.push('/PersonSetting')
          break;
        case 'b':
          this.logout()
          break;
        default:
          break;
      }
    },

    logout() {
      //登出清空token就好了
      window.sessionStorage.setItem('activepath', null)
      window.localStorage.clear();
      this.$router.push('/login')
    },
    //获取所有的菜单
    async getMenuList() {
      const { data: res } = await this.$http.post('Login/Menus')
      if (res.status !== 200) return this.$message.error(res.meta.msg)
      this.menulist = res.response
    },
    //折叠和展开
    toggleCollpase() {
      this.isCollapse = !this.isCollapse
    },
    //保存链接的激活状态 
    saveNavState(activePath) {
      window.sessionStorage.setItem('activepath', activePath)
      this.activePath = activePath
    }
  }
}
</script>


<style lang="less" scoped>
.el-header {
  //饿了么组件就是一个类对象 可以直接用类选择器加样式
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #ffff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
    img {
      margin-left: 10px;
      width: 15%;
      height: 10%;
    }
  }
}
.el-aside {
  background-color: #333744;
  .el-menu {
    border-right: none; //没有边框线
  }
}
.el-main {
  background-color: #eaedf1;
}
.home-container {
  height: 100%;
}

.iconfont {
  margin-right: 10px;
}
.toggle-button {
  background-color: #4a5064;
  font-size: 15px;
  line-height: 28px; //行高
  color: #fff;
  text-align: center; //文本居中
  letter-spacing: 0.2em; //字母间距
  cursor: pointer; //鼠标放上去变成小手
}
</style>