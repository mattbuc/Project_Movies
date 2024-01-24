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
          _id
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
    query movies($title: String, $page: Int, $itemsPerPage: Int){
      movies(page: $page, itemsPerPage: $itemsPerPage, title: $title){
        paginationInfo {
          itemsPerPage
          lastPage
          totalCount
        }
        collection{
          id
          _id
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

  getMovieById(id) {
    const query = `
    query movie($id: ID!){
      movie(id: $id){
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
      }`;

    return api('/graphql', { // Replace '/graphql' with your actual GraphQL endpoint
      method: 'POST',
      body: JSON.stringify({
        query,
        variables: { id }
      })
    })
  },

  createMovie(variables) {
    const { title, releaseDate, description, duration, note, entries, budget, director, website, actor, categories } = variables;  // Destructuration des variables
    const mutation = `
  mutation createMovie($title: String!, $releaseDate: String,
    $description: String!, $duration: Int, $note: Float, $entries: Int,
    $budget: Int, $director: String!, $website: String, $actor: [String], $categories: [String]) {
    createMovie(input : {
      title: $title,
      releaseDate: $releaseDate,
      description: $description,
      duration: $duration,
      note: $note,
      entries: $entries,
      budget: $budget,
      director: $director,
      website: $website,
      actor: $actor,
      categories: $categories,
    }){
        movie{
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
          actor{
            collection{
            lastname
            firstname
          }
        }
          categories{
            collection{
            name
          }
        }
      }
    }
  }
}`;

    return api('/graphql', { // Replace '/graphql' with your actual GraphQL endpoint
      method: 'POST',
      body: JSON.stringify({
        mutation,
        variables: { title, releaseDate, description, duration, note, entries, budget, director, website, actor, categories }
      })
    })
  },
}