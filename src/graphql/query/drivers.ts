import { gql } from "@apollo/client";

export const DRIVERS = gql`
  query Drivers {
    drivers {
      addresses {
        city
        country
        id
        neighborhood
        postalCode
        street
        state
        streetNumber
        title
      }
      id
      profile {
        id
        firstName
        lastName
        email
        CPF
        identificationNumber
        cellPhone
        landline
        dateOfBirth
        gender
        civilStatus
        twoFactorEnabled
        cellPhoneValidated
      }
      orders {
        capturedValue
        subtotal
        totalCost
        status
        orderId
        netValue
        currencyType
        createdAt
        capturedAt
        cpo
      }
    }
  }
`;