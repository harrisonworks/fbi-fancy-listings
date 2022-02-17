<template>
	<div>
		<div class="mb-2 d-flex">
			<input
				class="flex-fill"
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
					:class="{ pressed: status === 'all' }"
					@click="handleStatusFilter('all')"
				>
					All Leads
				</button>
				<button
					:class="{
						pressed: status === 'prospect',
					}"
					@click="handleStatusFilter('prospect')"
				>
					Prospects
				</button>
				<button
					:class="{
						pressed: status === 'application-sent',
					}"
					@click="handleStatusFilter('application-sent')"
				>
					Application Sent
				</button>
				<button
					:class="{
						pressed: status === 'interview-set',
					}"
					@click="handleStatusFilter('interview-set')"
				>
					Interview Set
				</button>
				<button
					:class="{
						pressed: status === 'rejected',
					}"
					@click="handleStatusFilter('rejected')"
				>
					Rejected
				</button>
			</div>
		</div>
		<div class="flex justify-start">
			<div class="relative mb-3 pr-8">
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
						Created Date
					</li>
					<li
						:class="{
							pressed: order === 'companyName',
						}"
						@click="handleFilterOrder('companyName')"
					>
						Company Name
					</li>
					<li
						:class="{ pressed: order === 'jobTitle' }"
						@click="handleFilterOrder('jobTitle')"
					>
						Job Title
					</li>
					<li
						:class="{ pressed: order === 'status' }"
						@click="handleFilterOrder('status')"
					>
						Status
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>


<script>
import { debounce } from '~/assets/js/utils.js'

export default {
	data() {
		return {
			orderOpen: false,
			orderChanged: false,
		}
	},
	computed: {
		search() {
			return this.$store.state.filter.search
		},
		status() {
			return this.$store.state.filter.status
		},
		order() {
			return this.$store.state.filter.order
		},
		orderText() {
			switch (this.order) {
				case 'companyName':
					return 'Company Name'
				case 'jobTitle':
					return 'Job Title'
				case 'status':
					return 'Status'
				default:
					return 'Created Date'
			}
		},
	},
	methods: {
		handleStatusFilter(status) {
			this.$store.dispatch('filterStatus', status)
		},
		handleSearch: debounce(function (e) {
			this.$store.dispatch('filterSearch', e.target.value)
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
	background: var(--bs-blue);
	color: white;
}
</style>