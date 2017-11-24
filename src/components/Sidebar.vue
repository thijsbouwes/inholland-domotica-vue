<template>
  <ul id="slide-out" class="side-nav">
    <li>
      <div class="user-view">
        <div class="background">
          <img src="http://materializecss.com/images/office.jpg">
        </div>
        <a href="#!user"><img class="circle" src="http://materializecss.com/images/yuna.jpg"></a>
        <a href="#!name"><span class="white-text name">John Doe</span></a>
        <a href="#!email"><span class="white-text email">jdandturk@gmail.com</span></a>
      </div>
    </li>

    <router-link tag="li" to="/" exact><a><i class="material-icons">dashboard</i>Dashboard</a></router-link>
    <router-link tag="li" to="/admin" exact><a><i class="material-icons">edit</i>Admin</a></router-link>
    <li><div class="divider"></div></li>
    <li><a class="waves-effect" href="#!"><i class="material-icons">exit_to_app</i>Logout</a></li>
  </ul>
</template>