import { api } from '@/services/api.js';
import { useSession } from "@/stores/session";

export default {
  // search(title, page, nbItem) {
  //   return api(`/movies/search?page=${page}&title=${title}`, {
  //     method: 'GET'
  //   })

  // },
  // getAll(page) {
  //   return api(`/movies/?page=${page}`, {
  //     method: 'GET'
  //   })

  // },

  getLastMovie() {
    const query = `
    query movies{
      movies(itemsPerPage: 4, order: {id: "DESC"}){
        paginationInfo {
          itemsPerPage
          totalCount
        }
        collection{
          id
          title
          releaseDate
          description
          duration
          note
          entries
          budget
          director
          website
          categories{
            collection{
              name
            }
          }
          mediaObject{
            collection{
                contentUrl
            }
          }
          actor{
            collection{
              id
              lastname
              firstname
            }
          }
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
  },

  getMovies(variables) {
    const query = `
    query movies($title: String){
      movies(page:1, itemsPerPage: 10, title: $title){
        paginationInfo {
          itemsPerPage
          lastPage
          totalCount
        }
        collection{
          id
          title
          releaseDate
          description
          duration
          note
          entries
          budget
          director
          website
          categories{
            collection{
              name
            }
          }
          mediaObject{
            collection{
                contentUrl
            }
          }
          actor{
            collection{
              id
              lastname
              firstname
            }
          }
        }
      }
    }`;

    return api('/graphql', { // Replace '/graphql' with your actual GraphQL endpoint
      method: 'POST',
      body: JSON.stringify({
        query,
        variables
      })
    })
  },
}