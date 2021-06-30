import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';

const question = [{question: 'This is a very long question ................................................................................',
                    answers:[{id:'A',text:'something',correct: true},
                              {id:'B',text:'something',correct: false},
                              {id:'C',text:'something',correct: false},
                              {id:'D',text:'something',correct: false}]},
                  {question: 'This is second long question ................................................................................',
                    answers:[{id:'A',text:'something',correct: true},
                              {id:'B',text:'something',correct: false},
                              {id:'C',text:'something',correct: false},
                              {id:'D',text:'something',correct: false}]},
                  {question: 'This is third long question ................................................................................',
                    answers:[{id:'A',text:'something',correct: false},
                              {id:'B',text:'something',correct: false},
                              {id:'C',text:'something',correct: false},
                              {id:'D',text:'something',correct: true}]}];

var savedAnswer = new Array(question.length).fill({id: null, correct: null});

export default function App() {
  const [selectedId, setSelectedId] = useState(null);
  const [currentQuiz, setCurrentQuiz] = useState(0);
  console.log(savedAnswer);

  const nextQuestion = () => {
    if(currentQuiz < question.length -1){
      setCurrentQuiz(currentQuiz + 1);
      if (savedAnswer[currentQuiz+1].id == null){
        setSelectedId(null);
      } else {
        setSelectedId(savedAnswer[currentQuiz+1].id);
      }
    }
  };

  const previousQuestion = () => {
    if(currentQuiz > 0){
      setCurrentQuiz(currentQuiz - 1);
      if (savedAnswer[currentQuiz-1].id == null){
        setSelectedId(null);
      } else {
        setSelectedId(savedAnswer[currentQuiz-1].id);
      }
    }
  };
  
  const onOptionPress = (option) => {
      setSelectedId(option.id);
      savedAnswer[currentQuiz] = {id: option.id, correct: option.correct};
  }

  return (
    <View style={styles.container}>
      <Text style = {styles.question}>Question {currentQuiz+1}: {question[currentQuiz].question}</Text>
      <View  style={styles.optionsContainer}>
        <FlatList 
          data ={question[currentQuiz].answers}
          renderItem = {({item}) => (
            <Option 
                item={item}
                onPress={() => onOptionPress(item)}
                backgroundColor={item.id == selectedId? '#6495ED':'#fff'}
                >
            </Option>
          )}
          keyExtractor={(item) => item.id}
          extraData={selectedId}>
        </FlatList>
      </View>
      <View style = {styles.navigatorView}>
        {currentQuiz > 0 &&
          <TouchableOpacity style={styles.navButton} onPress={previousQuestion}>
            <Text style={{textAlign:'center'}}> Prev Quiz </Text>
          </TouchableOpacity>
        }
        {currentQuiz < question.length -1 &&
          <TouchableOpacity style={styles.navButton} onPress={nextQuestion}>
            <Text style={{textAlign:'center'}}> Next Quiz </Text>
          </TouchableOpacity>
        }
        
      </View>
      <StatusBar style="auto"/>
    </View>
  );
}

const Option = ({item, onPress, backgroundColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.option, backgroundColor={backgroundColor}]} >
    <Text>{item.id}: {item.text} {item.correct?'true': 'false'}</Text>
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
    borderWidth: 5,
    borderColor:'#6495ED',
    padding:'5%',
    backgroundColor: '#87CEFA',
    width: '35%',
  },
  navigatorView:{
    width: '96%',
    flexDirection:'row',
    justifyContent:'space-around',
  },
});
