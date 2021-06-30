import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View} from 'react-native';

export default function ResultScreen() {
    return (
        <View style={styles.container}>
            <Text>This is the result</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#87CEFA',
      alignItems: 'center',
      justifyContent: 'center',
    },   
    navButton:{
      marginTop: '5%',
      borderRadius: 20,
      borderWidth: 5,
      borderColor:'#6495ED',
      padding:'5%',
      backgroundColor: '#87CEFA',
      width: '35%',
    },
  });