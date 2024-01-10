import { api } from '@/services/api.js';
import { useSession } from "@/stores/session";

export default {
  // search(title, page, nbItem) {
  //   return api(`/actors/search?page=${page}&title=${title}`, {
  //     method: 'GET'
  //   })

  // },
  // getAll(page) {
  //   return api(`/actors/?page=${page}`, {
  //     method: 'GET'
  //   })

  // },
  getLastActor() {
    const query = `
    query actors{
      actors(itemsPerPage: 4, order: {id: "DESC"}) {
        paginationInfo {
          itemsPerPage
          lastPage
          totalCount
        }
        collection{
          id
          lastname
          firstname
          dob
          movies{
            collection{
              id
              title
            }
          }
          reward
          nationality
          mediaObject{
            collection{
              contentUrl
            }
          }
          createdAt
        }
      }
    }
    `;
    return api('/graphql', { // Replace '/graphql' with your actual GraphQL endpoint
      method: 'POST',
      body: JSON.stringify({
        query,
      })
    })
  }
};
