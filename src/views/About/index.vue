<script setup lang="ts">
import SectionMe from './components/SectionMe.vue'
import SectionSummary from './components/SectionSummary.vue'
import SectionExperience from './components/SectionExperience.vue'
import SectionEducation from './components/SectionEducation.vue'
import SectionContact from './components/SectionContact.vue'
import SectionIntro from './components/SectionIntro.vue'
import SectionCertifications from './components/SectionCertifications.vue'
import FloatingPlayer from './components/FloatingPlayer.vue'
</script>

<template>
  <div ref="mainContainer" class="portfolio-wrapper" style="">
    <SectionMe />

    <div class="main-content-flow relative">
      <div class="connection-line-container">
        <div class="connection-line"></div>
      </div>
      <FloatingPlayer />
      <SectionIntro />
      <SectionExperience />
      <SectionEducation />
      <SectionCertifications />
      <SectionSummary />
      <SectionContact />

      <div class="spacer py-8"></div>
    </div>
  </div>
</template>

<style scoped>
.portfolio-wrapper {
  background: linear-gradient(300deg, var(--primary-color), #252525);
  transition: 0.3s; /* ease is the default, no need to specify it */
  transition-property: --primary-color;
  color: #f8fafc;
}

.main-content-flow {
  position: relative;
  width: 100%;
}

.connection-line-container {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 0;
  bottom: 0;
  width: 2px;
  z-index: 1;
}

.connection-line {
  width: 100%;
  height: 0; /* Controlado pelo GSAP ScrollTrigger [cite: 65, 91] */
  background: linear-gradient(to bottom, #6366f1, #ec4899, #10b981);
  box-shadow: 0 0 15px rgba(99, 102, 241, 0.4);
}

.spacer {
  height: 20vh;
}
</style>
