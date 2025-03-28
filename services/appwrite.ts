import { Client, Databases, ID, Query } from "react-native-appwrite"
import { TMDB_CONFIG } from "./api";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(`${process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID}`)

const database = new Databases(client);

// track the searches made by the users
export const updateSearchCount = async (query: string, movie: Movie) => {

    try {

        const results = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.equal('searchTerm', query),
        ])

        if (results.documents.length > 0) {
            const existingMovie = results.documents[0];

            await database.updateDocument(DATABASE_ID, COLLECTION_ID, existingMovie.$id, {
                count: existingMovie.count + 1,
            })
        } else {
            await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
                searchTerm: query,
                movie_id: movie.id,
                count: 1,
                poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                title: movie.title,
            })
        }

    } catch (error) {
        console.error('Error updating search count:', error);
        throw error;
    }

}

// get the most searched movies
export const getTrendingMovies = async (): Promise<TrendingMovie[] | undefined> => {
    try {
        const results = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.limit(5),
            Query.orderDesc('count'),
        ])

        return results.documents as unknown as TrendingMovie[];
    } catch (error) {
        console.error('Error getting trending movies:', error);
        return undefined;
    }
}

// get the movie details
export const fetchMovieDetails = async (movieId: string): Promise<MovieDetails> => {
    try {
        const response = await fetch(`${TMDB_CONFIG.BASE_URL}/movie/${movieId}?api_key=${TMDB_CONFIG.API_KEY}`, {
            method: 'GET',
            headers: TMDB_CONFIG.headers,
        });
        if (!response.ok) throw new Error('Failed to fetch movie details');
        const data = await response.json();
        return data as MovieDetails;
    } catch (error) {
        console.error('Error fetching movie details:', error);
        throw error;
    }
}

