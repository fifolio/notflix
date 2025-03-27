import { icons } from '@/constants/icons'
import { Link } from 'expo-router'
import { View, Text, TouchableOpacity, Image } from 'react-native'

export default function MovieCard({ id, poster_path, vote_average, release_date, title }: Movie) {
    return (
        <Link href={`/movies/${id}`} asChild>
            <TouchableOpacity className="w-[30%]">
                <Image
                    source={{
                        uri: poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : 'https://via.placeholder.com/600x400/1a1a1a/ffffff.png'
                    }}
                    className='w-full h-52 rounded-lg'
                    resizeMode='cover'
                />

                <Text className='text-sm font-bold text-white mt-2' numberOfLines={1}>{title}</Text>

                <View className='flex flex-row items-center justify-start gap-x-1'>
                    <Image source={icons.star} className="size-4" />
                    <Text className='text-sm text-white font-bold uppercase'>{Math.round(vote_average / 2)}</Text>
                    <View className='flex-row items-center justify-between'>
                        <Text className='text-xs text-light-300 font-medium'>{release_date?.split('-')[0]}</Text>
                        {/* <Text className='text-xs text-light-300 uppercase font-medium'>
                            Movie
                        </Text> */}
                    </View>
                </View>
            </TouchableOpacity>
        </Link>
    )
}