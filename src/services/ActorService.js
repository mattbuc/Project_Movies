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
    query actors($lastname: String, $firstname: String){
      actors(page:1, itemsPerPage: 10, lastname: $lastname, firstname: $firstname) {
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

  getActorById() {
    const query = `
    query actor(id: number){
      actor(id: $id) {
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
        variables: { id }
      })
    })
  },
};
