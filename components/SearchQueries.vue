<template>
	<div class="d-flex flex-wrap">
		<div class="box">
			<form class="d-flex justify-content-between" action="/action_page.php">
				<div>
					<label for="subject">Subject:</label>
					<select class="p-2" type="text" id="select-categories">
						<option value="">Categories</option>
						<option value="Crimes Against Children">
							Crimes Against Children
						</option>
						<option value="Cyber's Most Wanted">Cyber's Most Wanted</option>
						<option value="White-Collar Crime">White-Collar Crime</option>
						<option value="Counterintelligence">Counterintelligence</option>
						<option value="Human Trafficking">Human Trafficking</option>
						<option value="Criminal Enterprise Investigations">
							Criminal Enterprise Investigations
						</option>
						<option value="Violent Crime - Murders">
							Violent Crime - Murders
						</option>
						<option value="Additional Violent Crimes">
							Additional Violent Crimes
						</option>
					</select>
				</div>
				<div>
					<input type="checkbox" id="reward" name="reward" />
					<label for="reward">Reward</label>
				</div>
				<button class="p-2">Filter</button>
			</form>
		</div>
	</div>
</template>

<script>
export default {}
</script>

<style scoped>
label {
	font-weight: 500;
}
.box {
	flex-grow: 1;

	padding: 1rem;
	border: 2px solid black;
	min-width: 33%;
	background: var(--color-bg);
}
</style>