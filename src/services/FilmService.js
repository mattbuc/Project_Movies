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
  async getMovies(variables) {
    const query = `
    query movies($page: Int, $itemsPerPage: Int, $title: String){
        movies(page: $page, itemsPerPage: $itemsPerPage, title: $title){
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
      }
    `;

    return api('/graphql', {
      method: 'POST',
      body: JSON.stringify({
        query,
        variables,
      })
    })
  },

  async getLastMovie(variables) {
    const query = `
    query movies($page: Int, $itemsPerPage: Int) {
          movies(page: $page, itemsPerPage: $itemsPerPage, order: {release_date: "DESC"}) {
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
              media_object{
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
    `;

    return api('/graphql', { // Replace '/graphql' with your actual GraphQL endpoint
      method: 'POST',
      body: JSON.stringify({
        query,
        variables,
      })
    })
  },

  async getMovieAndActorsById(id) {
    const query = `
    query movies($id: Int) {
        movies(id: $id) {
            collection{
                id,
                _id,
                title,
                release_date,
                synopsis,
                duration,
                score,
                entry,
                budget,
                director,
                website,
                actors{
                    collection{
                        id,
                        _id,
                        firstname,
                        lastname,
                        dob,
                        nationality,
                        reward
                    }
                },
            }
        }
    }
    `;

    return api('/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query,
        variables: { id }
      })
    })
  },

  async getMoviesByCategories(variables) {
    const query = `
    query categories($page: Int, $itemsPerPage: Int, $id: Int) {
        categories(page: $page, itemsPerPage: $itemsPerPage, id: $id){
            collection{
                id,
                _id,
                name,
                movies{
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
                    }
                }
            }
        }
    }
    `;

    return api('/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query,
        variables
      })
    })
  }
};
