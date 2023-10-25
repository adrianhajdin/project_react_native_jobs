import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { COLORS, FONT } from '../../../constants';

const data = [
  { label: 'Personal Growth', value: 'Personal Growth' },
  { label: 'Leadership/Management', value: 'Leadership Management' },
  { label: 'Creativity', value: 'Creativity' },
  { label: 'Finance/Wealth', value: 'Finance Wealth' },
  { label: 'Communication/Relationships', value: 'Communication Relationships' },
  { label: 'Health/Wellness', value: 'Health Wellness' },
  { label: 'Mindfulness', value: 'Mindfulness' },
  { label: 'Spirituality', value: 'Spirituality' },
];

const DropdownComponent = ({handleGenreChange}) => {
  
  const renderItem = item => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
      </View>
    );
  };

  return (
    <Dropdown
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      data={data}
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder="Select item"
      value="Personal Growth"
      onChange={item => {
        handleGenreChange(item.value);
        console.log(item);
      }}
      renderItem={renderItem}
    />
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  dropdown: {
    flex: 1,
    margin: 16,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: 16,
    fontFamily: FONT.regular,
    color: COLORS.primary
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
    fontFamily: FONT.bold,
    color: COLORS.secondary
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});