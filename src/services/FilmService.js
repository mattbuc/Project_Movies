import { api } from '@/services/api.js';
import { useSession } from "@/stores/session";

export default {
  search(title, page, nbItem) {
    return api(`/movies/search?page=${page}&title=${title}`, {
      method: 'GET'
    })

  },
  getAll(page) {
    return api(`/movies/?page=${page}`, {
      method: 'GET'
    })

  },
};
