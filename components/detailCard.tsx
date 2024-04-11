/* eslint-disable react-native/no-inline-styles */
import {View, Text} from 'react-native';
import React from 'react';
import {textStyle} from '../assets/styles';
interface Props {
  title: string;
  value: string;
}
const DetailCard: React.FC<Props> = ({title, value}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 42,
      }}>
      <Text
        style={[
          textStyle,
          {color: '#1C1C25', fontWeight: '600', fontSize: 18},
        ]}>
        {title}:
      </Text>
      <Text style={[textStyle, {color: '#1C1C25', fontSize: 18}]}>{value}</Text>
    </View>
  );
};

export default DetailCard;
