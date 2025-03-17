import { View, Text } from 'react-native'
import React from 'react'

const MovieInfo = ( { label , content } :MovieInfoProps ) => (

    <View className='flex-col mt-5'>

        <Text className='text-light-200 font-normal text-sm '>

            {label}

        </Text>

        <Text className='text-light-100 font-bold text-sm mt-2'>

            {content || "N/A"}

        </Text>

    </View>

)

export default MovieInfo