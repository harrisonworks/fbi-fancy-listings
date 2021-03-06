<template>
	<div>
		<div class="d-flex flex-wrap align-items-center top-line-status">
			<h5 v-show="isFiltered" class="mb-0 me-2">Filter</h5>
			<crime-chip v-show="isFiltered" style="white-space: normal" color="blue">
				{{ filterApplied }}
			</crime-chip>
			<crime-chip v-show="isFiltered" style="white-space: normal" color="red">
				{{ groupText }}
			</crime-chip>
			<div v-show="isFiltered" class="m-2 ms-auto">
				<button class="p-2" @click="filterReset">Clear Filters</button>
			</div>
		</div>

		<div
			class="
				d-flex
				my-3
				align-items-center align-content-center
				justify-content-between
				box
			"
		>
			<div class="d-flex flex-wrap align-items-center">
				<h3 class="mb-0 me-3">{{ resultNumber }}</h3>
				<p class="m-0">Files Found</p>
			</div>

			<div>
				<div class="d-flex flex-wrap">
					<div class="dropdown ms-auto m-2">
						<button v-click-outside="closeGroup" class="p-3" @click="openGroup">
							File Type: {{ groupText }}
							<span
								style="padding-left: 0.2rem; font-size: 0.8rem"
								v-html="groupArrow"
							></span>
						</button>
						<div ref="dropdownGroup" class="dropdown-content box">
							<button
								v-for="(groupItem, index) in groupList"
								:key="index"
								class="px-2 m-1"
								:class="{
									pressed: group === `${groupItem}`,
								}"
								@click="handleGroupFilter(groupItem)"
							>
								{{ groupItem }}
							</button>
						</div>
					</div>

					<div class="dropdown ms-auto m-2">
						<button v-click-outside="closeOrder" class="p-3" @click="openOrder">
							Order By: {{ orderText }}
							<span
								style="padding-left: 0.2rem; font-size: 0.8rem"
								v-html="orderArrow"
							></span>
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
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { getStatusTitle } from '~/assets/js/utils.js'
export default {
	data() {
		return {
			groupArrow: '&#9660;',
			orderArrow: '&#9660;',
		}
	},
	computed: {
		resultNumber() {
			return this.$store.state.filterList.length
		},
		filterApplied() {
			const statusList = this.$store.state.filter.status
			const subjects = this.$store.state.subjectList

			return getStatusTitle(subjects, statusList)
		},
		isFiltered() {
			if (this.filterApplied !== 'All') {
				return true
			}
			return false
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
				case 'recently_updated':
					return 'Recently Updated'
				case 'oldest_published':
					return 'Oldest Published'
				default:
					return 'Recently Published'
			}
		},
		groupList() {
			return this.$store.state.groupList
		},
		group() {
			return this.$store.state.filter.group
		},
		groupText() {
			switch (this.group) {
				case 'fugitives_only':
					return 'Fugitives Only'
				case 'victims_only':
					return 'Victims only'
				default:
					return 'All'
			}
		},
	},
	methods: {
		async filterReset() {
			await this.$store.dispatch('resetFilter')

			await this.$router.push({
				query: {
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
		openOrder() {
			if (this.orderArrow === '&#9650;') this.orderArrow = '&#9660;'
			else this.orderArrow = '&#9650;'

			this.$refs.dropdownOrder.classList.toggle('show')
		},
		closeOrder(e) {
			this.orderArrow = '&#9660;'
			this.$refs.dropdownOrder.classList.remove('show')
		},
		handleFilterOrder(orderBy) {
			this.$store.dispatch('filterOrder', orderBy)

			this.$router.push({
				query: {
					filter: getStatusTitle(
						this.$store.state.subjectList,
						this.$store.state.filter.status
					),
					orderBy,
					groupBy: this.$store.state.filter.group,
					search: this.$store.state.filter.search,
				},
			})
		},
		openGroup() {
			if (this.groupArrow === '&#9650;') this.groupArrow = '&#9660;'
			else this.groupArrow = '&#9650;'

			this.$refs.dropdownGroup.classList.toggle('show')
		},
		closeGroup(e) {
			this.groupArrow = '&#9660;'
			this.$refs.dropdownGroup.classList.remove('show')
		},
		handleGroupFilter(groupBy) {
			this.$store.dispatch('filterGroup', groupBy)

			this.$router.push({
				query: {
					filter: getStatusTitle(
						this.$store.state.subjectList,
						this.$store.state.filter.status
					),
					orderBy: this.$store.state.filter.order,
					groupBy,
					search: this.$store.state.filter.search,
				},
			})
		},
	},
}
</script>

<style scoped>
.dropdown {
	position: relative;
	display: inline-block;
	/* z-index: 1; */
}

.dropdown-content {
	display: none;
	position: absolute;
	background-color: var(--color-bg);
	/* min-width: 25rem; */
	overflow: auto;
	z-index: 1;
}

.top-line-status {
	height: 50px;
}

@media only screen and (max-width: 768px) {
	.top-line-status {
		height: auto;
	}
	/* .dropdown-content {
		min-width: 23rem;
	} */
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
</style>