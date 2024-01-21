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
          _id
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
  },

  getActors(variables) {
    const query = `
    query actors($lastname: String, $firstname: String, $page: Int, $itemsPerPage: Int){
      actors(page: $page, itemsPerPage: $itemsPerPage, lastname: $lastname, firstname: $firstname) {
        paginationInfo {
          itemsPerPage
          lastPage
          totalCount
        }
        collection{
          id
          _id
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
        variables
      })
    })
  },

  getActorById(id) {
    const query = `
    query actor($id: ID!){
      actor(id: $id){
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
    `;
    return api('/graphql', { // Replace '/graphql' with your actual GraphQL endpoint
      method: 'POST',
      body: JSON.stringify({
        query,
        variables: { id }
      })
    })
  },

  createActor(variables) {
    const mutation = `
    mutation createActor($lastname: String!, $firstname: String, $dob: String!,
      $movies: [String], $reward: String, $nationality: String!, $mediaObject: [String]) {
        createActor(input : {
          lastname : $lastname,
          firstname : $firstname,
          dob : $dob,
          movies : $movies,
          reward : $reward,
          nationality : $nationality,
          mediaObject : $mediaObject
        }){
          actor{
            id
            lastname
            firstname
            dob
            movies{
              collection{
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
          }
        }
      }`;
    return api('/graphql', { // Replace '/graphql' with your actual GraphQL endpoint
      method: 'POST',
      body: JSON.stringify({
        mutation,
        variables
      })
    })
  }
}