import { gql, useQuery } from "@apollo/client";

const GET_DOG_PHOTO = gql`
	query Dog($breed: String!) {
		dog(breed: $breed) {
			id
			displayImage
		}
	}
`;

function DogPhoto({ breed }) {
	const { loading, error, data } = useQuery(GET_DOG_PHOTO, {
		variables: { breed },
		pollInterval: 500,
	});

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error : `${error.message}`</p>;

	return (
		<>
			<img src={data.dog.displayImage} style={{ height: 100, width: 100 }} />
			<button onClick={() => refresh()}>Refetch new breed !</button>
		</>
	);
}
export default DogPhoto;
