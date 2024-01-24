import { api } from '@/services/api.js';
import { useSession } from "@/stores/session";

export default {

    getCategories(variables) {
        const query = `
        query Categories{
            categories(page: 1){
              paginationInfo {
                    itemsPerPage
                    lastPage
                    totalCount
                }
              collection{
                    id
                    name
                movies{
                  collection{
                            id
                            title

                        }
                    }
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
    }

}