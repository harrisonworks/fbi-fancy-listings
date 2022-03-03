<template>
	<div class="box">
		<div class="row align-items-center">
			<div class="col-lg-12">
				<h4 class="my-3">Catergories</h4>

				<div class="d-flex flex-column">
					<button
						v-for="(category, index) in subjectList"
						:key="index"
						class="py-2 m-1"
						:class="{
							pressed: status === `${category.subjects[0]}`,
						}"
						@click="handleStatusFilter(category.subjects)"
					>
						{{ category.title }}
					</button>
				</div>
				<!-- <div class="d-flex flex-wrap">
					<div class="m-2 toggle">
						<input
							ref="toggle"
							type="checkbox"
							:checked="victim"
							@change="checked"
						/>
					</div>
				</div> -->
			</div>
		</div>
	</div>
</template>


<script>
import {
	getStatusTitle,
	// getStatusCategories,
} from '~/assets/js/utils.js'

export default {
	computed: {
		subjectList() {
			return this.$store.state.subjectList
		},

		search() {
			return this.$store.state.filter.search
		},
		status() {
			if (this.$store.state.filter.status[0])
				return this.$store.state.filter.status[0]
			else return ['all']
		},
		catergoryText() {
			return getStatusTitle(this.subjectList, this.$store.state.filter.status)
		},
	},
	mounted() {},
	methods: {
		handleStatusFilter(status) {
			this.$store.dispatch('filterStatus', status)
			// this.$store.commit('setPage', 1)
			// find the object which matches the filters in the store
			this.$router.push({
				query: {
					page: this.$store.state.filter.page,
					filter: getStatusTitle(
						this.$store.state.subjectList,
						this.$store.state.filter.status
					),
					orderBy: this.$store.state.filter.order,
					groupBy: this.$store.state.filter.group,
					search: this.$store.state.filter.search,
				},
			})
		},
	},
}
</script>

<style scoped>
.box {
	flex-grow: 1;
	padding: 1rem;
	border: 2px solid black;
	min-width: 33%;
	background: var(--color-bg);
}

.dropdown {
	position: relative;
	display: inline-block;
	/* z-index: 1; */
}

.dropdown-content {
	display: none;
	position: absolute;
	background-color: var(--color-bg);
	min-width: 25rem;
	overflow: auto;
	z-index: 1;
}

@media only screen and (max-width: 768px) {
	.dropdown-content {
		min-width: 23rem;
	}
}

.dropdown-content a {
	color: black;
	padding: 12px 16px;
	text-decoration: none;
	display: block;
}

.dropdown a:hover {
	background-color: #ddd;
}

.show {
	display: block;
}

.toggle {
	box-sizing: border-box;
	position: relative;
	display: block;
	min-width: 8rem;
}

/* .toggle:focus-within {
	outline: 1px dotted;
} */

.toggle input {
	color: currentColor;
	position: absolute;
	width: auto;
	height: 100%;

	cursor: pointer;

	/* optional vertical centering */
	/* top: 50%; */
	/* transform: translateY(10%); */

	outline: 0; /* add the outline 1 level up instead */
	appearance: none; /* hide default checkbox */

	/* hide the checkbox in iOS (and others?) */
	background: transparent;
	border-radius: 0;
	border: 0;
}

.toggle input:before {
	box-sizing: border-box;
	content: 'No Victims';
	padding: 1rem;
	white-space: nowrap;
	text-align: center;
	width: auto;
	height: auto;
	background-color: rgb(239, 239, 239);
	border: 2px solid rgb(118, 118, 118);
	border-bottom-style: outset;
	border-image-outset: 0;
	border-image-repeat: stretch;
	border-radius: 0em;
	position: absolute;

	transition-property: background;
}

.toggle input:after {
	box-sizing: border-box;
	content: 'All';
	width: auto;
	height: auto;
	padding: 1rem;
	white-space: nowrap;

	opacity: 0;

	background-color: rgb(239, 239, 239);
	border: 2px solid rgb(118, 118, 118);
	border-bottom-style: outset;
	border-image-outset: 0;
	border-image-repeat: stretch;
	border-radius: 0em;
	position: absolute;

	/* transition: all 0.2s ease; */
}

.toggle input:checked:before {
	/* background-color: rgb(189, 189, 189); */
	opacity: 0;
}

.toggle input:checked:after {
	opacity: 1;
}
</style>