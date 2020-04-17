<template>
  <div id="app">
    <router-view v-if="isDisplay" />
    <el-container v-else style="height:100vh;border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu router :default-active="route.name">
          <el-menu-item index="Home" route="/">
            <template slot="title">
              <i class="el-icon-s-home"></i>主页
            </template>
          </el-menu-item>
          <el-menu-item index="About" route="/about">
            <template slot="title">
              <i class="el-icon-s-custom"></i>个人信息
            </template>
          </el-menu-item>
          <el-menu-item index="ArticleList" route="/articlelist">
            <template slot="title">
              <i class="el-icon-menu"></i>文章列表
            </template>
          </el-menu-item>

          <!-- <el-submenu index="3">
            <template slot="title"
              ><i class="el-icon-setting"></i>导航三</template
            >
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="3-1">选项1</el-menu-item>
              <el-menu-item index="3-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="3-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="3-4">
              <template slot="title">选项4</template>
              <el-menu-item index="3-4-1">选项4-1</el-menu-item>
            </el-submenu>
          </el-submenu> -->
        </el-menu>
      </el-aside>
      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <!-- <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>查看</el-dropdown-item>
              <el-dropdown-item>新增</el-dropdown-item>
              <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown> -->
          <div class="empty"></div>
          <img class="header-avatar" src="@/assets/images/avatar.jpg" alt="" />
          <span>彭于晏</span>
        </el-header>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import {
  Container,
  Header,
  // Dropdown,
  // DropdownMenu,
  // DropdownItem,
  Main,
  Aside,
  //   Submenu,
  Menu,
  //   MenuItemGroup,
  MenuItem,
} from "element-ui";
export default {
  components: {
    elContainer: Container,
    elHeader: Header,
    // elDropdown: Dropdown,
    // elDropdownMenu: DropdownMenu,
    // elDropdownItem: DropdownItem,
    elMain: Main,
    elAside: Aside,
    // elSubmenu: Submenu,
    elMenu: Menu,
    // elMenuItemGroup: MenuItemGroup,
    elMenuItem: MenuItem,
  },
  data() {
    return {
      route: this.$route,
      noWarpperRoute: ["Login"],
    };
  },
  computed: {
    isDisplay() {
      return this.noWarpperRoute.find(
        (item) =>
          this.route && this.route.name && this.route.name.indexOf(item) != -1
      );
    },
  },
  mounted() {
    //   console.log(this.route)
  },
  methods: {
    toHome() {
      this.$router.push({
        path: "home",
      });
    },
  },
  watch: {
    $route(n) {
      this.route = n;
    },
  },
};
</script>
<style lang="less">
body,
html {
  padding: 0;
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  //   display: flex;
  //   flex-direction: column;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
  display: flex;
  align-items: center;
  .empty {
    flex: 1;
  }
  .header-avatar {
    width: 40px;
    height: 40px;
    margin-right: 8px;
  }
}

.el-aside {
  color: #333;
}
.el-submenu [class^="el-icon-"] {
  vertical-align: text-bottom;
}
.box-shadow {
  box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 12px 0px;
}
</style>
