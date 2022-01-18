import { Ref, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

export const watchTitle = (): Ref<String> => {
  const title = ref()
  const route = useRoute()
  title.value = route.name
  watch(route, (to) => {
    title.value = to.name
  })
  return title
}

const routerHook = {
  watchTitle
}
export default routerHook
