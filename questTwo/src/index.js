import { gql, useQuery } from "@apollo/client"; 


type Book {
    id: ID 
    title : String
    author : String 
}

type Query {
    books : [Book]
    getBookById 

}

const books = [
    {
        id: "0", 
        title: "The Awakening", 
        author: "Kate Chopin", 
    }, 
    {
        id: "1", 
        title: "City of Glass", 
        author: "Paul Auster",
    },
]; 
