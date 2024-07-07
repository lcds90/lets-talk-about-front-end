<script setup lang="ts">
	import gsap from 'gsap';
	import { computed, onMounted, ref } from 'vue';

	const info = {
		alt: 'Foto de Leonardo Santos',
		img: 'https://pt.gravatar.com/userimage/173633821/5be3e17da80d643624d6da6dd59d521b?size=400',
	};

	const container = ref<HTMLElement>();

	const getGreeting = computed(() => {
		type Times = 'default' | 'morning' | 'afternoon' | 'night';
		const messages: Record<Times, string> = {
			afternoon: 'Boa tarde',
			morning: 'Bom dia',
			night: 'Boa noite',
			default: 'Seja bem vindo',
		};

		const d = new Date();
		const hour = d.getHours();

		let time: Times = 'default';
		if (hour < 12 && hour >= 6) time = 'morning';
		if (hour > 12 && hour < 18) time = 'afternoon';
		if (hour > 18 && hour < 24) time = 'night';

		return messages[time];
	});

	const animateLine = () => {
		if (!container.value) return;
		gsap
			.timeline({
				yoyo: true,
				repeat: -1,
				defaults: { duration: 2, stagger: 0.5, ease: 'bounce' },
			})
			.to(container.value.querySelector('hr'), {
				width: '25%',
			})
			.to(container.value.querySelector('hr'), {
				width: '75%',
			});
	};

	const fadeoutCard = () => {
		if (!container.value) return;
		const targets = {
			img: container.value.querySelector('.media-center'),
			card: container.value.querySelector('#card-text'),
			content: container.value.querySelector('.content'),
			title: container.value.querySelector('#greeting'),
		};

		gsap
			.timeline({
				defaults: { duration: 2 },
				onComplete: () => {
					animateLine();
					gsap.set(Object.values(targets), { clearProps: true });
				},
			})
			.from(targets.title, { y: -200, rotate: -50, ease: 'expo' })
			.from(
				targets.img,
				{
					width: 0,
					x: -200,
				},
				'-=1.75'
			)
			.from(
				targets.card,
				{
					scale: 0.5,
					opacity: 0,
				},
				'-=1'
			);
		// .from(targets.content, { opacity: 0 });
	};

	onMounted(async () => {
		fadeoutCard();
	});
</script>
<template>
	<main
		class="welcome-container"
		ref="container"
	>
		<article
			id="greeting"
			class="card article"
		>
			<span class="title article-title">
				{{ getGreeting }}
			</span>
		</article>
		<article class="card article">
			<section class="card-content">
				<section class="media-container">
					<div class="media-center">
						<img
							:alt="info.alt"
							:src="info.img"
						/>
					</div>
				</section>
				<section
					id="card-text"
					class="content article-body"
				>
					<p class="has-text-primary">
						<span>Eu sou <b>Leonardo Santos</b></span>
					</p>
					<br /><br />
					<hr />
					<br /><br />
					Engenheiro de software<br />Especialista em front-end.
				</section>
			</section>
		</article>
		<article class="article card">
			<p class="has-text-secondary article-body">
				Profissionalmente, estou atuando na empresa Zenvia. <br />
			</p>
		</article>
		<div></div>
		<div></div>

		<article class="article card">
			<div class="article-body">
				Tendo trilhado esse caminho desde 2018, pretendo compartilhar meu
				conhecimento a respeito das tecnologias que venho utilizando no mercado
				de trabalho e pessoalmente.
			</div>
		</article>
		<article class="article card">
			<p class="has-text-secondary article-body">
				Compartilhando conhecimento como reflexão da paixão que tenho por esse
				mundo da tecnologia. 💖
			</p>
		</article>
	</main>
</template>

<style scoped>
	.welcome-container {
		max-width: 75%;
		margin: 0 auto;
		position: relative;
		/* height: calc(100vh - var(--vp-nav-height)); */
		display: grid;
		grid-template-columns: 1fr 1fr;
		place-items: center;
		margin-top: 5rem;
		gap: 5rem;
	}

	.has-text-primary,
	.has-text-centered {
		text-align: center;
	}

	.has-text-secondary {
		padding: 1rem 4rem;
	}

	.card {
		background-color: var(--accent-color);
		position: relative;
	}

	.content p {
		line-height: 1.5;
	}
	.article-title {
		font-size: 2rem;
		font-weight: lighter;
		line-height: 2;
		color: var(--text-primary-color);
		margin-right: 0.5rem;
	}
	.article-subtitle {
		color: var(--text-primary-color);
	}
	.article-body {
		line-height: 1.4;
		color: var(--text-primary-color);
		background: rgba(255, 255, 255, 0.15);
		box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2);
		padding: 1rem;
		border-radius: 1rem;
		display: flex;
		min-height: 25rem;
		flex-direction: column;
		justify-content: center;
		z-index: 5;
	}

	.article-body hr {
		width: 50%;
	}

	.media-container {
		display: flex;
		gap: 0.5rem;
		align-items: center;
		position: absolute;
		top: 0.5rem;
		left: 2rem;
	}

	.media-center {
		width: 100px;
		z-index: 10;
	}

	.media-center img {
		border: 3px solid #ccc;
		border-radius: 2rem;
		left: -5rem;
		position: relative;
	}
</style>
