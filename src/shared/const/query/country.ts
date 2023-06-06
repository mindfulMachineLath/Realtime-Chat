import { gql } from '@apollo/client';

export const GET_COUNTRY = gql`
  query Country {
    countries {
      name
      emoji
      phone
    }
  }
`;
