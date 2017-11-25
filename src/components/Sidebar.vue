<template>
  <ul id="slide-out" class="sidenav">
    <li>
      <div class="user-view">
        <div class="background">
          <img src="https://images.unsplash.com/photo-1458682625221-3a45f8a844c7?auto=format&fit=crop&w=1267&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D">
        </div>

        <!--User info-->
        <a href="#!user"><img class="circle" src="http://materializecss.com/images/yuna.jpg"></a>
        <a href="#!name"><span class="white-text name">John Doe</span></a>
        <a href="#!email"><span class="white-text email">jdandturk@gmail.com</span></a>
      </div>
    </li>

    <!--Page links-->
    <router-link tag="li" to="/" exact><a><i class="material-icons">dashboard</i>Dashboard</a></router-link>

    <!--Settings-->
    <li><div class="divider"></div></li>
    <li><a class="subheader"><i class="material-icons">settings</i>Settings</a></li>

      <li v-for="(module, index) in settings.enabled_modules">
          <div class="switch icon-before">

              <span>{{ index }}</span>
              <label class="right">
                  <input type="checkbox" :value="settings.enabled_modules.index">
                  <span class="lever"></span>
              </label>
          </div>
      </li>

    <li>
        <div class="center-align">
            <a class="btn waves-effect waves-light"><i class="material-icons right">save</i>Update</a>
        </div>
    </li>

    <!--Logout-->
    <li><div class="divider"></div></li>
    <li><a class="waves-effect" href="#!"><i class="material-icons">exit_to_app</i>Logout</a></li>
  </ul>
</template>

<script>
  export default {
      data() {
          return {
              settings: {
                  enabled_modules: {
                      lamps: true,
                      windows: true,
                      heater: true,
                      news_feed: true,
                      time_date: true,
                      weather: true
                  }
              }
          }
      }
  }
</script>