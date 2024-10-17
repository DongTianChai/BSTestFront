<template>
  <div class="index-container">
    <el-container>
      <el-aside width="200px">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#345c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          router>
          <el-submenu index="/room">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>通讯管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/PermList">通讯列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header>
          <div class="header-content">
            <h2>个人通讯录系统</h2>
          </div>
        </el-header>
        <el-main class="ui">
          <!-- 路由视图组件，用于动态渲染对应的路由组件 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<style scoped>
.el-header {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
}

.header-content {
  flex: 1; /* 使内容占据整个可用空间 */
  text-align: center; /* 文字居中 */
}

.el-aside {
  background-color: #345c64;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-container {
  height: 100vh;
}

.el-menu {
  border-right: 0px;
}

.ui {
  background-size: 100% 100%;
}
</style>
