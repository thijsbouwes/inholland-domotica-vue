<template>
	<div>
		<div class="card">
		    <div class="card-content">
				<span class="card-title">Heater</span>
				This is an inline input field:
				<form action="#">
					<p class="range-field">
						<input type="range" id="test5" min="0" max="100" />
					</p>
				</form>
			</div>
		</div> 
	</div>
</template>

<script>
	export default {
		mounted() {
            //let elem = document.querySelector('.');
            this.sidebar = new M.Sidenav(elem, options);
		}
	}
</script>