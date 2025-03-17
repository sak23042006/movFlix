import { View, Text, Image, FlatList, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { images } from "@/constants/images";
import MovieCard from "@/components/MovieCard";
import { useRouter } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";
import { icons } from "@/constants/icons";
import SearchBar from "@/components/SearchBar";
import { updateSearchCount } from "@/services/appWrite";

const search = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
    refetch: loadMovies,
    reset,
  } = useFetch(() => fetchMovies({ query: searchQuery }), false);

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        await loadMovies();
      } else {
        reset();
      }
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  useEffect(() =>{
    if(movies?.length > 0 && movies?.[0]){
      updateSearchCount(searchQuery , movies[0])
    }
  },[movies])

  const renderHeader = () => (
    <View className="pb-4">
      <Image source={images.bg} className="absolute w-full z-0 h-60" />
      <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
      <SearchBar
        value={searchQuery}
        onChangeText={(text: string) => setSearchQuery(text)}
        placeholder="Search for a movie"
      />
      {moviesLoading && (
        <ActivityIndicator size="large" color="#0000ff" className="mt-10" />
      )}
      {moviesError && (
        <Text className="text-red-500 text-center">{moviesError?.message}</Text>
      )}

      {!moviesLoading &&
        !moviesError &&
        searchQuery.trim() &&
        movies?.length > 0 && (
          <Text className="text-xl text-white font-bold mt-4">
            Results for <Text className="text-accent">{searchQuery}</Text>
          </Text>
        )}
    </View>
  );

  return (
    <View className="flex-1 bg-primary">
      <FlatList
        ListHeaderComponent={renderHeader()}
        data={movies}
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        className=""
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "center",
          gap: 16,
          marginVertical: 16,
        }}
        contentContainerStyle={{
          paddingBottom: 100,
          paddingHorizontal: 10,
        }}
        ListEmptyComponent={
          <View>
            {!moviesLoading && !moviesError ? (
              <Text className="text-center mt-10 text-gray-500">
                {searchQuery.trim() ? "No movies found" : "Search for a movie"}
              </Text>
            ) : null}
          </View>
        }
      />
    </View>
  );
};

export default search;
function fetchData() {
  throw new Error("Function not implemented.");
}
