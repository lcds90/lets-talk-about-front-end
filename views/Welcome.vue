<script setup lang="ts">
	import gsap from 'gsap';
	import { computed, onMounted, ref } from 'vue';
	import { Card, TagLink, Text } from '../components';

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
				defaults: { duration: 1, stagger: 0.5, ease: 'bounce' },
			})
			.to(container.value.querySelectorAll('hr'), {
				width: '75%',
			})
			.to(container.value.querySelectorAll('hr'), {
				width: '90%',
			});
	};

	const fadeoutCard = () => {
		if (!container.value) return;
		const targets = {
			img: container.value.querySelector('.media-center'),
			cardContent: container.value.querySelector('#card-text'),
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
				targets.cardContent,
				{
					scale: 0.5,
					opacity: 0,
				},
				'-=1'
			);
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
		<div class="align-column">
			<Card
				id="card"
				class="sticky"
			>
				<article class="media-container">
					<div class="media-center">
						<img
							:alt="info.alt"
							:src="info.img"
						/>
					</div>
				</article>
				<article id="card-text">
					<Text is-primary>
						<section
							id="greeting"
							class=""
						>
							<span class="title">
								{{ getGreeting }}
							</span>
						</section>
						<span>Eu sou <b>Leonardo Santos</b></span>
					</Text>
					<br />
					<hr />
					<br />
					Engenheiro de software<br />Especialista em front-end. <br /><br />
					<hr />
					<br />
					Conheça meus conteúdos sobre
					<br /><br />
					<div class="align-buttons">
						<TagLink
							link="/css"
							text="CSS"
						/>
						<TagLink
							link="/tests"
							text="Testes"
						/>
						<TagLink
							link="/vue"
							text="Vue"
						/>
					</div>
				</article>
			</Card>
		</div>
		<div class="align-column">
			<Card>
				<Text is-secondary>
					Profissionalmente, estou atuando na empresa Zenvia. <br />
				</Text>
			</Card>
			<Card>
				<div>
					Tendo trilhado esse caminho desde 2018, pretendo compartilhar meu
					conhecimento a respeito das tecnologias que venho utilizando no
					mercado de trabalho e pessoalmente.
				</div>
			</Card>
			<Card>
				<Text is-secondary>
					Compartilhando conhecimento como reflexão da paixão que tenho por esse
					mundo da tecnologia. 💖
				</Text>
			</Card>
		</div>
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
		margin-top: 5rem;

		gap: 5rem;
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

	.sticky {
		position: sticky;
		top: 5rem;
		background-color: rgb(58, 58, 58);
	}

	.align-column {
		display: flex;
		flex-direction: column;
		gap: 5rem;
		align-items: center;
	}

	.align-buttons {
		display: flex;
		justify-content: center;
		width: 100%;
		gap: 1rem;
	}

	#card-text {
		text-align: center;
	}
</style>
