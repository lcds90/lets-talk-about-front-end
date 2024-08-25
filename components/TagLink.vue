<template>
	<a
		:href="link"
		rel="noopener noreferrer"
		class="badge-link"
	>
		<span class="badge">{{ text }}</span>
	</a>
</template>

<script setup lang="ts">
	defineProps({
		text: {
			type: String,
			required: true,
		},
		link: {
			type: String,
			required: true,
		},
	});
</script>

<style scoped>
	.badge-link {
		text-decoration: none;
	}

	.badge {
		display: inline-block;
		padding: 0.5rem 1rem;
		font-size: 0.875rem;
		color: white;
		background-color: #9142b9;
		border-radius: 0.25rem;
		transition: background-color 0.3s ease, color 0.1s ease, box-shadow 0.5s ease-in-out;
		box-shadow: 0.5rem 0.5rem 0.25rem rgba(0,0,0,0.15)
	}

	.badge-link:hover .badge {
		background-color: #d2d2d2;
		color: #9142b9;
		box-shadow: 0rem 0 1rem rgba(110,110,110,0.5)
	}
</style>
