<template>
	<div class="row align-items-center">
		<div class="col-lg-1">
			<div class="mx-2">
				<h3>{{ resultNumber }}</h3>
				<h5>Results</h5>
			</div>
		</div>
		<div class="col-lg-11">
			<div class="mb-2 d-flex">
				<input
					class="mx-2 p-2 flex-fill"
					:value="search"
					type="search"
					placeholder="Search the most wanted"
					aria-label="Search the most wanted"
					@input="handleSearch"
				/>
			</div>
			<div class="d-flex flex-wrap">
				<div class="dropdown m-2">
					<button v-click-outside="closeCat" class="p-3" @click="openCat">
						Category: {{ catergoryText }}
					</button>
					<div ref="dropdownCat" class="dropdown-content box">
						<div class="d-flex flex-wrap">
							<button
								v-for="(category, index) in subjectList"
								:key="index"
								class="px-2 m-1"
								:class="{
									pressed: status === `${category.subjects[0]}`,
								}"
								@click="handleStatusFilter(category.subjects)"
							>
								{{ category.title }}
							</button>
						</div>
					</div>
				</div>

				<div class="dropdown m-2">
					<button v-click-outside="closeOrder" class="p-3" @click="openOrder">
						Order By: {{ orderText }}
					</button>
					<div ref="dropdownOrder" class="dropdown-content box">
						<button
							v-for="(orderItem, index) in orderList"
							:key="index"
							class="px-2 m-1"
							:class="{
								pressed: order === `${orderItem}`,
							}"
							@click="handleFilterOrder(orderItem)"
						>
							{{ orderItem }}
						</button>
					</div>
				</div>
				<div class="toggle">
					<input ref="toggle" v-model="isChecked" type="checkbox" />
				</div>
				<div class="m-2 ms-auto">
					<button id="resetFilter" class="px-2" @click="filterReset">
						Clear Filters
					</button>
				</div>
			</div>
		</div>
	</div>
</template>


<script>
import {
	debounce,
	getStatusTitle,
	getStatusCategories,
} from '~/assets/js/utils.js'

export default {
	data() {
		return {
			isChecked: false,
			orderOpen: false,
			orderChanged: false,
		}
	},
	computed: {
		subjectList() {
			return this.$store.state.subjectList
		},
		resultNumber() {
			return this.$store.state.filterList.length
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
		orderList() {
			return this.$store.state.orderList
		},
		order() {
			return this.$store.state.filter.order
		},
		orderText() {
			switch (this.order) {
				case 'largest_reward':
					return 'Reward Size'
				case 'recently_published':
					return 'Recently Published'
				case 'recently_updated':
					return 'Recently Updated'
				case 'oldest_published':
					return 'Oldest Published'
				default:
					return 'Recently Published'
			}
		},
	},
	mounted() {
		if (this.$route.query.filter) {
			if (this.$route.query.filter !== 'All') {
				this.handleStatusFilter(
					getStatusCategories(this.subjectList, this.$route.query.filter)
				)
			}
		}
	},
	methods: {
		openCat() {
			this.$refs.dropdownCat.classList.toggle('show')
		},
		closeCat(e) {
			if (e.target !== this.$refs.dropdownCat) {
				this.$refs.dropdownCat.classList.remove('show')
			}
		},
		openOrder() {
			this.$refs.dropdownOrder.classList.toggle('show')
		},
		closeOrder(e) {
			// const value = 'dropdownOrder'
			if (e.target !== this.$refs.dropdownOrder) {
				this.$refs.dropdownOrder.classList.remove('show')
			}
		},
		handleStatusFilter(status) {
			this.$store.dispatch('filterStatus', status)
			this.$store.commit('setPage', 1)
			// find the object which matches the filters in the store
			this.$router.push({
				query: {
					page: this.$store.state.filter.page,
					filter: getStatusTitle(
						this.$store.state.subjectList,
						this.$store.state.filter.status
					),
					orderBy: this.$store.state.filter.order,

					search: this.$store.state.filter.search,
				},
			})
		},
		handleSearch: debounce(function (e) {
			this.$store.dispatch('filterSearch', e.target.value)
			this.$store.commit('setPage', 1)

			this.$router.push({
				path: '/',
				query: {
					page: this.$store.state.filter.page,
					filter: getStatusTitle(
						this.$store.state.subjectList,
						this.$store.state.filter.status
					),
					orderBy: this.$store.state.filter.order,

					search: e.target.value,
				},
			})
		}, 500),
		handleFilterOrder(orderBy) {
			this.orderOpen = false
			this.orderChanged = true
			this.$store.dispatch('filterOrder', orderBy)

			this.$router.push({
				path: '/',
				query: {
					page: this.$store.state.filter.page,
					filter: getStatusTitle(
						this.$store.state.subjectList,
						this.$store.state.filter.status
					),
					orderBy,
					search: this.$store.state.filter.search,
				},
			})
		},
		filterReset() {
			this.$store.dispatch('resetFilter')
		},
	},
}
</script>

<style scoped>
input[type='search'] {
	border: solid 2px black;
}

#resetFilter {
	display: block;
	width: 100%;
	height: 100%;
}

.box {
	flex-grow: 1;
	padding: 1rem;
	border: 2px solid black;
	min-width: 33%;
	background: var(--color-bg);
}

.pressed {
	/* background: var(--bs-blue); */
	background: blue;
	color: white;
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
		min-width: 20rem;
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
	padding-right: calc(57px + 0.5em);
	display: block;
}

.toggle:focus-within {
	/* outline: 1px dotted; */
}

.toggle input {
	margin: 0; /* reset */
	font-size: inherit; /* reset */
	color: currentColor; /* so :before, :after color works */
	position: absolute;
	width: 57px;
	height: 57px;
	right: 0;

	/* optional vertical centering */
	top: 50%;
	transform: translateY(-50%);

	outline: 0; /* add the outline 1 level up instead */
	appearance: none; /* hide default checkbox */

	/* hide the checkbox in iOS (and others?) */
	background: transparent;
	border-radius: 0;
	border: 0;
}

.toggle input:before {
	box-sizing: border-box;
	content: 'All';
	padding: 1rem;
	text-align: center;
	width: 57px;
	height: 57px;
	background-color: rgb(239, 239, 239);
	border: 2px solid rgb(118, 118, 118);

	border-bottom-style: outset;
	border-image-outset: 0;
	border-image-repeat: stretch;

	position: absolute;
	border-radius: 0em;
	transition-duration: 200ms;
	transition-property: background;
}

.toggle input:after {
	box-sizing: border-box;
	content: '';
	width: calc(57px - 20px);
	height: calc(57px - 20px);
	top: 10px;
	left: 10px;
	transform: scale(0);
	background: currentColor;
	position: absolute;
	border-radius: 0em;
	transition: all 0.2s ease;
}

.toggle input:checked:before {
	background-color: rgb(189, 189, 189);
}

.toggle input:checked:after {
	transform: scale(1);
}
</style>