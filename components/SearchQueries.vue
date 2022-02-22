<template>
	<div>
		<div class="mb-2 d-flex">
			<input
				class="p-2 flex-fill border-3"
				:value="search"
				type="search"
				placeholder="Search the most wanted"
				aria-label="Search the most wanted"
				@input="handleSearch"
			/>
		</div>
		<div class="mb-4 w-full">
			<div class="">
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
		<div class="flex justify-start">
			<div class="relative mb-3">
				<p
					class="text-gray-700 cursor-pointer flex items-center"
					@click="orderOpen = !orderOpen"
				>
					<span>&#8597;</span>
					<span class="mr-1">Order By</span>
					<span v-show="orderChanged" class="font-semibold">
						{{ orderText }}</span
					>
				</p>
				<ul v-show="orderOpen" class="px-3 py-2">
					<li
						:class="{ pressed: order === 'createdAt' }"
						@click="handleFilterOrder('createdAt')"
					>
						Date Published
					</li>
					<li
						:class="{
							pressed: order === 'rewardSize',
						}"
						@click="handleFilterOrder('rewardSize')"
					>
						Reward Value
					</li>
				</ul>
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
			orderOpen: false,
			orderChanged: false,
		}
	},
	computed: {
		subjectList() {
			return this.$store.state.subjectList
		},
		search() {
			return this.$store.state.filter.search
		},
		status() {
			return this.$store.state.filter.status[0]
		},
		order() {
			return this.$store.state.filter.order
		},
		orderText() {
			switch (this.order) {
				case 'jobTitle':
					return 'Job Title'
				case 'status':
					return 'Status'
				default:
					return 'Created Date'
			}
		},
	},
	mounted() {
		if (this.$route.query.filter !== 'All') {
			const subjects = getStatusCategories(
				this.subjectList,
				this.$route.query.filter
			)
			this.handleStatusFilter(subjects)
		}
	},
	methods: {
		handleStatusFilter(status) {
			this.$store.dispatch('filterStatus', status)

			// find the object which matches the filters in the store
			this.$router.push({
				path: '/',
				query: {
					page: this.$store.state.filter.page,
					filter: getStatusTitle(
						this.$store.state.subjectList,
						this.$store.state.filter.status
					),
					search: this.$store.state.filter.search,
				},
			})
		},
		handleSearch: debounce(function (e) {
			this.$store.dispatch('filterSearch', e.target.value)
			this.$store.commit('updatePage', 1)

			this.$router.push({
				path: '/',
				query: {
					page: this.$store.state.filter.page,
					filter: getStatusTitle(
						this.$store.state.subjectList,
						this.$store.state.filter.status
					),
					search: e.target.value,
				},
			})
		}, 500),
		handleFilterOrder(orderBy) {
			this.orderOpen = false
			this.orderChanged = true
			this.$store.dispatch('filterOrder', orderBy)
		},
		closeOrderDropDown(e) {
			this.orderOpen = false
		},
	},
}
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

.pressed {
	/* background: var(--bs-blue); */
	background: blue;
	color: white;
}
</style>