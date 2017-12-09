<template>
	<div class="navbar-fixed">
		<nav>
			<div class="nav-wrapper">
				<a href="#!" class="brand-logo center"><img src="/static/home_comfort.png"> Comfort</a>
				<ul class="left">
					<li><a href="#" data-target="slide-out" class="sidenav-trigger"><i class="material-icons">menu</i></a></li>
				</ul>
				<ul class="right">
					<li><a href="#" @click="toggleFullScreen"><i class="material-icons">{{ icon }}</i></a></li>
				</ul>
			</div>
		</nav>
	</div>
</template>


<script>
	export default {
	    data() {
	        return {
	            icon: 'fullscreen',
                full_screen: false
			}
		},

		methods: {
            toggleFullScreen() {
                if (this.full_screen === false) {
                    this.enterFullScreen();
                    this.icon = 'fullscreen_exit';
                    this.full_screen = true;
				} else {
                    this.exitFullscreen();
                    this.icon = 'fullscreen';
                    this.full_screen = false;
				}
			},

			enterFullScreen() {
                let elem = document.documentElement;

                if (elem.requestFullscreen) {
                    elem.requestFullscreen();
                } else if (elem.msRequestFullscreen) {
                    elem.msRequestFullscreen();
                } else if (elem.mozRequestFullScreen) {
                    elem.mozRequestFullScreen();
                } else if (elem.webkitRequestFullscreen) {
                    elem.webkitRequestFullscreen();
                }
			},

			exitFullscreen() {
                let elem = document;

                if (elem.cancelFullScreen) {
                    elem.cancelFullScreen();
                } else if (elem.msExitFullscreen) {
                    elem.msExitFullscreen();
                } else if (elem.mozCancelFullScreen) {
                    elem.mozCancelFullScreen();
                } else if (elem.webkitCancelFullScreen) {
                    elem.webkitCancelFullScreen();
                }
            }
		}
	}
</script>
