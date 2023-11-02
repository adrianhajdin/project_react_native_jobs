import React from 'react'
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import { Heading, Image} from "@gluestack-ui/themed"
import { COLORS } from '../../../constants';

const BookIcon = ({imgUri}) => {
  return (
    <TouchableOpacity>
      <Image
        size="lg"
        borderRadius="$xl"
        source={{uri: imgUri}}
        alt="Image of Book Logo"
      />
    </TouchableOpacity>
  )
}

export default BookIcon;

