<template>
	<section class="card">
		<slot />
	</section>
</template>

<style scoped>
	.card {
		color: var(--text-primary-color);
		box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2);
		padding: 1rem;
		border-radius: 1rem;
		display: flex;
		min-height: 25rem;
		flex-direction: column;
		justify-content: center;
		z-index: 5;
		background-color: rgba(255, 255, 255, 0.05);
		position: relative;
		width: clamp(2rem, 50vw, 75%);
	}

	.card hr {
		width: 50%;
	}
</style>
