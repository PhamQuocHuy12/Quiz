import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';

const question = [{question: 'This is a very long question ................................................................................',
                    answers:[{option:'A',correct: true},
                              {option:'B',correct: false},
                              {option:'C',correct: true},
                              {option:'D',correct: false}]},
                  {question: 'This second long question ................................................................................',
                    answers:[{option:'A',correct: true},
                              {option:'B',correct: false},
                              {option:'C',correct: false},
                              {option:'D',correct: false}]}];

var savedAnswer = new Array(question.length).fill({option: null, correct: null});

export default function App() {
  const [selectedId, setSelectedId] = useState(null);
  const [currentQuiz, setCurrentQuiz] = useState(0);
  console.log(savedAnswer);

  const nextQuestion = () => {
    if(currentQuiz < question.length -1){
      setCurrentQuiz(currentQuiz + 1);
      if (savedAnswer[currentQuiz+1].option == null){
        setSelectedId(null);
      } else {
        setSelectedId(savedAnswer[currentQuiz+1].option);
      }
    }
  };

  const previousQuestion = () => {
    if(currentQuiz > 0){
      setCurrentQuiz(currentQuiz - 1);
      if (savedAnswer[currentQuiz-1].option == null){
        setSelectedId(null);
      } else {
        setSelectedId(savedAnswer[currentQuiz-1].option);
      }
    }
  };
  
  const onOptionPress = (option) => {
      setSelectedId(option.option);
      savedAnswer[currentQuiz] = option;
  }

  return (
    <View style={styles.container}>
      <Text style = {styles.question}>{question[currentQuiz].question}</Text>
      <View  style={styles.optionsContainer}>
        <FlatList 
          data ={question[currentQuiz].answers}
          renderItem = {({item}) => (
            <Option 
                item={item}
                onPress={() => onOptionPress(item)}
                backgroundColor={item.option == selectedId? '#6495ED':'#fff'}
                >
            </Option>
          )}
          keyExtractor={(item) => item.option}
          extraData={selectedId}>
        </FlatList>
      </View>
      <View style = {styles.navigatorView}>

        <TouchableOpacity style={styles.navButton} onPress={previousQuestion}>
          <Text style={{textAlign:'center'}}> Prev Quiz </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton} onPress={nextQuestion}>
          <Text style={{textAlign:'center'}}> Next Quiz </Text>
        </TouchableOpacity>

      </View>
      <StatusBar style="auto"/>
    </View>
  );
}

const Option = ({item, onPress, backgroundColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.option, backgroundColor={backgroundColor}]} >
    <Text>{item.option}: {item.correct?'true': 'false'}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#87CEFA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  question: {
    alignSelf: 'baseline',
    backgroundColor: '#fff',
    borderWidth: 5,
    borderColor:'#6495ED',
    width: '90%',
    borderRadius: 20,
    padding: '5%',
    margin:'5%',
  },
  optionsContainer:{
    width: '90%',
  },
  option:{
    alignSelf: 'baseline',
    width: '90%',
    marginLeft: '5%',
    marginEnd: '5%',
    marginTop: '2%' ,
    borderRadius: 20,
    padding: '5%',
  },
  navButton:{
    marginTop: '5%',
    borderRadius: 20,
    padding:'5%',
    backgroundColor: 'lightblue',
    width: '35%',
  },
  navigatorView:{
    width: '96%',
    flexDirection:'row',
    justifyContent:'space-around',
  },
});
