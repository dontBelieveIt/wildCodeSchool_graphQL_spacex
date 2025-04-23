import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import "reflect-metadata"; 
import {Arg, buildSchema, Field, InputType, Mutation, ObjectType, Query, Resolver} from 'type-graphql'

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
  @ObjectType()
class Book {
    @Field()
    id: string
    @Field()
    title: string
    @Field()
    author: string
}

const books :Book[] = [
  {
    id: "0",
    title: 'The Awakening',
    author: 'Kate Chopin',
  },
  {
    id: "1",
    title: 'City of Glass',
    author: 'Paul Auster',
  },
];

@InputType()
class BookInput {
  @Field()
  title: string;

  @Field()
  author:string;
}
// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
@Resolver(Book)
class BookResolver  {

  @Query(() => [Book])
  books() {
    return books; 
  }

  @Query(() => Book)
  getBookById(@Arg("id") id: string) {
    return books.find((book) => book.id == id);
  }
  
  @Mutation(() => Book)
  addBook(@Arg("data") {title, author}: BookInput) {
    const lastId = parseInt(books.at(-1).id, 10);
    const id = (lastId + 1).toString();
    books.push({
      title,
      author,
      id,
    });
    return books.at(-1);
  };
}
  
// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const schema = await buildSchema({
  resolvers: [BookResolver],
});

const server = new ApolloServer({ schema });

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);