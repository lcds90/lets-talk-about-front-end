import axios from 'axios'
import { computed, onMounted, ref } from 'vue'

export interface Profile {
  alt: string
  img: string
  hash: string
  display_name: string
  profile_url: string
  avatar_url: string
  avatar_alt_text: string
  location: string
  description: string
  job_title: string
  company: string
  verified_accounts: {
    service_label: string
    service_icon: string
    url: string
  }[]
  pronunciation: string
  pronouns: string
  background_color: string
}

export const useGravatarProfile = () => {
  const profile = ref<Profile>({
    alt: 'Foto de Leonardo Santos',
    img: 'https://1.gravatar.com/avatar/5124d1a8dc6b90c0001689ede9f4e4b56ddf0236c0fd2737dd4d3248d955edc8?s=400',
    hash: '',
    display_name: '',
    profile_url: '',
    avatar_url: '',
    avatar_alt_text: '',
    location: '',
    description: '',
    job_title: '',
    company: '',
    verified_accounts: [],
    pronunciation: '',
    pronouns: '',
    background_color: '',
  })

  const getGravatarAPI = async () => {
    const apiURL = 'https://api.gravatar.com/v3'

    try {
      const response = await axios.get(`${apiURL}/profiles/lcds90`, {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_APP_GRAVATAR_TOKEN}`,
        },
      })
      profile.value = {
        alt: 'Foto de Leonardo Santos',
        img: `${response.data.avatar_url}?s=400`,
        ...response.data,
      }
    } catch (error) {
      console.error(error)
    }
  }

  const descriptions = computed(() => {
    const descriptions = profile.value.description.split('\n\n')
    const descriptionWithTitle = descriptions.map((description) => {
      const title = description.split('\n')[0]
      const text = description.split('\n').slice(1).join('\n')
      return { title, text }
    })
    return descriptionWithTitle
  })

  onMounted(async () => {
    await getGravatarAPI()
  })

  return {
    descriptions,
    profile,
  }
}
