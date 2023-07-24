import { and, or, query, where } from 'firebase/firestore';
import { usersCollection } from 'firebase.config';

/** функция запросов в коллекцию USERS, с фильтрацией по значению поиска */
export const getFilterUsersQuery = (search: string) => {
  return query(
    usersCollection,
    or(
      // query as-is:
      and(where('name', '>=', search), where('name', '<=', search + '\uf8ff')),
      // capitalize first letter:
      and(
        where('name', '>=', search.charAt(0).toUpperCase() + search.slice(1)),
        where(
          'name',
          '<=',
          search.charAt(0).toUpperCase() + search.slice(1) + '\uf8ff'
        )
      ),
      // lowercase:
      and(
        where('name', '>=', search.toLowerCase()),
        where('name', '<=', search.toLowerCase() + '\uf8ff')
      )
    )
  );
};
