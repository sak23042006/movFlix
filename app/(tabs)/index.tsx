import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import TrendingCard from "@/components/TrendingCard";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import { getTrendingMovies } from "@/services/appWrite";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";

export default function Index() {
  const router = useRouter();
  const query = "";
  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() => fetchMovies({ query }));

  const {
    data: trendingMovies,
    loading: trendingLoading,
    error: trendingError,
  } = useFetch(getTrendingMovies);

  const renderHeader = () => (
    <View className="pb-4">
      <Image source={images.bg} className="absolute w-full z-0 h-60" />
      <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
      {trendingMovies && (
        <View className="mt-10">
          <Text className="text-lg text-white font-bold mb-3">
            Trending Movies
          </Text>
        </View>
      )}

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={ () =>
          <View className="w-4" />
        }
        className="mb-4 mt-3"
        data={trendingMovies}
        renderItem={({ item, index }) => (
            <TrendingCard movie={item} index={index} />
        )}
        keyExtractor={(item) => item.movie_id.toString()}
      />

      <Text className="text-lg font-bold mt-5 mb-3 text-white">
        Latest Movies
      </Text>
    </View>
  );

  return (
    <View className="flex-1 bg-primary">
      <FlatList
        ListHeaderComponent={renderHeader()}
        data={movies}
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "flex-start",
          gap: 20,
          paddingRight: 5,
          marginBottom: 25,
        }}
        contentContainerStyle={{ paddingBottom: 32, paddingHorizontal: 10 }}
        ListEmptyComponent={
          moviesLoading || trendingLoading ? (
            <ActivityIndicator size="large" color="#0000ff" className="mt-10" />
          ) : moviesError || trendingError ? (
            <Text className="text-red-500 text-center">
              {moviesError ? moviesError.message : trendingError?.message}
            </Text>
          ) : null
        }
      />
    </View>
  );
}
