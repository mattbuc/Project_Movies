import { api } from '@/services/api.js';
import { useSession } from "@/stores/session";

export default {

    getCategories(variables) {
        const query = `
        query Categories($name: String, $page: Int, $itemsPerPage: Int){
            categories(name: $name, page: $page, itemsPerPage: $itemsPerPage){
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