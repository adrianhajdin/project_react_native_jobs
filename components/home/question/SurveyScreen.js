import React, { Component } from 'react';
import { StyleSheet, Button, ScrollView, Text, TextInput, View, ActivityIndicator } from 'react-native';
import { SimpleSurvey } from 'react-native-simple-survey';
import { QCOLORS } from '../question/res/validColors';
import {ButtonOutline, ButtonSolid} from 'react-native-ui-buttons';
import { Icon } from 'react-native-vector-icons/MaterialIcons';
import useFetch from '../../../hook/useFetch';
import * as SecureStore from 'expo-secure-store';
import { COLORS, FONT, SIZES } from '../../../constants';
import Header from './Header';

const GREEN = 'rgba(141,196,63,1)';
const PURPLE = 'rgba(108,48,237,1)';
const ORANGE = 'rgba(246,190,66,1)';

const tertiary = 'rgb(255, 119, 84)';
const secondary = 'rgb(62, 75, 148)'

const topics = ["Welcome", "Intro", "Name",
    'Personal Growth', 'Personal Growth', 'Personal Growth', 'Personal Growth', 
    'Leadership/Management', 'Leadership/Management', 'Leadership/Management', 'Leadership/Management', 
    'Creativity', 'Creativity', 'Creativity', 'Creativity', 
    'Finance/Wealth', 'Finance/Wealth', 'Finance/Wealth', 'Finance/Wealth', 
    'Communication/Relationships', 'Communication/Relationships','Communication/Relationships','Communication/Relationships',
    'Health/Wellness', 'Health/Wellness', 'Health/Wellness', 'Health/Wellness', 
    'Mindfulness', 'Mindfulness', 'Mindfulness', 'Mindfulness', 
    'Spirituality', 'Spirituality', 'Spirituality', 'Spirituality',
    'General', 'General', 'General', 'General', 
    'Thank You'
 ]




async function save(key, value) {
    await SecureStore.setItemAsync(key, value);
}


export default class SurveyScreen extends Component {
    static navigationOptions = () => {
        return {
            headerStyle: {
                backgroundColor: GREEN,
                height: 40,
                elevation: 5,
            },
            headerTintColor: '#fff',
            headerTitle: 'Sample Survey',
            headerTitleStyle: {
                flex: 1,
            }
        };
    }

    constructor(props) {
        super(props);
        this.state = { backgroundColor: PURPLE, answersSoFar: '', topicIndex: 0};

    }

    onSurveyFinished(answers) {
        /** 
         *  By using the spread operator, array entries with no values, such as info questions, are removed.
         *  This is also where a final cleanup of values, making them ready to insert into your DB or pass along
         *  to the rest of your code, can be done.
         * 
         *  Answers are returned in an array, of the form 
         *  [
         *  {questionId: string, value: any},
         *  {questionId: string, value: any},
         *  ...
         *  ]
         *  Questions of type selection group are more flexible, the entirity of the 'options' object is returned
         *  to you.
         *  
         *  As an example
         *  { 
         *      questionId: "favoritePet", 
         *      value: { 
         *          optionText: "Dogs",
         *          value: "dog"
         *      }
         *  }
         *  This flexibility makes SelectionGroup an incredibly powerful component on its own. If needed it is a 
         *  separate NPM package, react-native-selection-group, which has additional features such as multi-selection.
         */
        const name = answers[0].value
        let data = "";
        for (const elem of answers.slice(1)) { data = data.concat(elem.value.value); }
        save("data", `${name}*${data.substring(0, 24)}${data.substring(24)}`);
        this.props.router.push("(drawer)/home");

        // const infoQuestionsRemoved = [...answers];

        // // Convert from an array to a proper object. This won't work if you have duplicate questionIds
        // const answersAsObj = {};
        // for (const elem of infoQuestionsRemoved) { answersAsObj[elem.questionId] = elem.value; }
        // console.log(answersAsObj);
        // const data = answersAsObj.join("");

        
    }

    /**
     *  After each answer is submitted this function is called. Here you can take additional steps in response to the 
     *  user's answers. From updating a 'correct answers' counter to exiting out of an onboarding flow if the user is 
     *  is restricted (age, geo-fencing) from your app.
     */
    onAnswerSubmitted(answer) {
        this.topicIndex++;
        this.setState({ answersSoFar: JSON.stringify(this.surveyRef.getAnswers(), 2) });
        switch (answer.questionId) {
            case 'favoriteColor': {
                if (QCOLORS.includes(answer.value.toLowerCase())) {
                    this.setState({ backgroundColor: answer.value.toLowerCase() });
                }
                break;
            }
            default:
                break;
        }
    }

    renderPreviousButton(onPress, enabled) {
        const { topicIndex } = this.state;
        if (topicIndex === 0) {
            return null;
        }

        const handlePress = () => {
            if (onPress) {
                onPress(); // Call the original onPress function
            }
            
            this.setState(prevState => ({
                topicIndex: prevState.topicIndex - 1,
            }));
        };
    
        return (
            <View style={{ flexGrow: 1, maxWidth: 100, marginTop: 10, marginBottom: 10 }}>
            <ButtonSolid
                title={'Previous'}
                textStyle={enabled ? { fontWeight: 'bold', fontFamily: FONT.bold } : {color: COLORS.lightWhite,  fontFamily: FONT.medium}}
                disabled={!enabled}
                onPress={handlePress}
                opacityReducer={5}
                useColor={tertiary}
                padding={10}
            />
        </View>
        );
    }
    

    renderNextButton(onPress, enabled) {
        const handlePress = () => {
            if (onPress) {
                onPress(); // Call the original onPress function
            }
            
            this.setState(prevState => ({
                topicIndex: prevState.topicIndex + 1,
              }));
        };
        return (
            <View style={{ flexGrow: 1, maxWidth: 100, marginTop: 10, marginBottom: 10}}>
                <ButtonSolid
                    title={'Next'}
                    textStyle={enabled ? { fontWeight: 'bold', fontFamily: FONT.bold } : {color: COLORS.lightWhite,  fontFamily: FONT.medium}}
                    disabled={!enabled}
                    onPress={handlePress}
                    opacityReducer={5}
                    useColor={tertiary}
                    padding={10}
                />

            </View>
        );
    }

    renderFinishedButton(onPress, enabled) {
        return (
            <View style={{ flexGrow: 1, maxWidth: 100, marginTop: 10, marginBottom: 10 }}>
                <ButtonSolid
                    title={'Finished'}
                    textStyle={enabled ? { fontWeight: 'bold', fontFamily: FONT.bold } : {color: COLORS.lightWhite,  fontFamily: FONT.medium}}
                    disabled={!enabled}
                    onPress={onPress}
                    opacityReducer={5}
                    useColor={secondary}
                    padding={10}
                />
            </View>
        );
    }

    renderButton(data, index, isSelected, onPress) {
        return (
            <View
                key={`selection_button_view_${index}`}
                style={{ marginTop: 5, marginBottom: 15, justifyContent: 'flex-start' }}
            >
                <ButtonOutline
                    title={data.optionText}
                    onPress={onPress}
                    opacityReducer={3}
                    useColor={isSelected ? COLORS.secondary : COLORS.primary}
                    padding={10}
                    textOpacityReducer={8}
                    textStyle={ isSelected ? {fontFamily: FONT.bold, textAlign: 'left', alignItems: 'flex-end', padding: 5} : {color: COLORS.primary, fontFamily: FONT.regular, textAlign: 'left', alignItems: 'flex-end'}}
                    key={`button_${index}`}
                    materialIconLeft={isSelected ? 'radio-button-on' : 'radio-button-off'}
                />
            </View>
        );
    }

    renderQuestionText(questionText) {
        return (
            <View style={{ marginLeft: 10, marginRight: 10 }}>
                <Text numLines={1} style={styles.questionText}>{questionText}</Text>
            </View>
        );
    }

    renderTextBox(onChange, value, placeholder, onBlur) {
        return (
            <View>
                <TextInput
                    style={styles.textBox}
                    onChangeText={text => onChange(text)}
                    numberOfLines={1}
                    underlineColorAndroid={'white'}
                    placeholder={placeholder}
                    placeholderTextColor={'rgba(184,184,184,1)'}
                    value={value}
                    multiline
                    onBlur={onBlur}
                    blurOnSubmit
                    returnKeyType='done'
                />
            </View>
        );
    }

    renderNumericInput(onChange, value, placeholder, onBlur) {
        return (<TextInput 
            style={styles.numericInput}
            onChangeText={text => { onChange(text); }}
            underlineColorAndroid={'white'}
            placeholderTextColor={'rgba(184,184,184,1)'}
            value={String(value)}
            placeholder={placeholder}
            keyboardType={'numeric'}
            onBlur={onBlur}
            maxLength={3}
        />);
    }

    renderInfoText(infoText) {
        return (
            <View style={{justifyContent: 'center', alignItems: 'center', marginLeft: 10, marginRight: 10, paddingTop: 200}}>
                <Text style={styles.infoText}>{infoText}</Text>
            </View>
        );
    }
    

    render() {
        const { topicIndex } = this.state;
        const { survey, isLoading, error} = this.props;

        if (isLoading) {
            return <ActivityIndicator size='large' color={COLORS.primary} />;
        }
          
        if (error) {
            return <Text>Something went wrong</Text>;
        }

        return (
            <View>
            <ScrollView style={{paddingRight: 10, paddingLeft: 10}}>
                <Header topic={topics[topicIndex]}/>
                <SimpleSurvey
                        ref={(s) => { this.surveyRef = s; }}
                        survey={survey}
                        renderSelector={this.renderButton.bind(this)}
                        containerStyle={styles.surveyContainer}
                        selectionGroupContainerStyle={styles.selectionGroupContainer}
                        navButtonContainerStyle={{ flexDirection: 'row', justifyContent: 'space-around' }}
                        renderPrevious={this.renderPreviousButton.bind(this)}
                        renderNext={this.renderNextButton.bind(this)}
                        renderFinished={this.renderFinishedButton.bind(this)}
                        renderQuestionText={this.renderQuestionText}
                        onSurveyFinished={(answers) => this.onSurveyFinished(answers)}
                        onAnswerSubmitted={(answer) => this.onAnswerSubmitted(answer)}
                        renderTextInput={this.renderTextBox}
                        renderNumericInput={this.renderNumericInput}
                        renderInfo={this.renderInfoText}
                    />
            </ScrollView>
            </View>
            // <View style={[styles.background, { backgroundColor: this.state.backgroundColor }]}>
            //     <View style={styles.container}>
            //     {this.props.isLoading ? (
            //         <Text>No Data Available</Text>
            //         ) : (
                        
            //     )}
            //     </View>
            //     {/* <ScrollView style={styles.answersContainer}>
            //         <Text style={{textAlign:'center'}}>JSON output</Text>
            //         <Text>{this.state.answersSoFar}</Text>
            //     </ScrollView> */}
            // </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        minWidth: '70%',
        maxWidth: '90%',
        alignItems: 'stretch',
        justifyContent: 'center',
        elevation: 20,
        borderRadius: 10,
        flex: 1, 
    },
    answersContainer: {
        width: '90%',
        maxHeight: '30%',
        marginTop: 60,
        paddingHorizontal: 30,
        paddingVertical: 20,
        marginBottom: 30,
        backgroundColor: COLORS.lightWhite,
        elevation: 20,
        borderRadius: 0,
    },
    surveyContainer: {
        width: '100%',
        height: '100%',
        alignSelf: 'flex-start',
        backgroundColor: COLORS.lightWhite,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        alignContent: 'flex-start',
        padding: 5,
        flexGrow: 0,
    },
    selectionGroupContainer: {
        flexDirection: 'column',
        backgroundColor: COLORS.lightWhite,
        alignContent: 'flex-end',
    },
    background: {
        flex: 1,
        minHeight: 800,
        maxHeight: 800,
        justifyContent: 'center',
        alignItems: 'center',
    },
    questionText: {
        marginBottom: 30,
        paddingTop: 20,
        paddingLeft: 5,
        fontSize: SIZES.xxLarge,
        fontFamily: FONT.bold,
        alignItems: 'flex-start',
        justifyContent: 'center',
        textAlign: 'left',
    },
    textBox: { // name
        borderWidth: 1,
        fontFamily: FONT.medium,
        borderColor: 'rgba(204,204,204,1)',
        backgroundColor: COLORS.lightWhite,
        borderRadius: 10,
        padding: 10,
        textAlignVertical: 'top',
        marginLeft: 10,
        marginRight: 10
    },
    numericInput: {
        borderWidth: 1,
        borderColor: 'rgba(204,204,204,1)',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        textAlignVertical: 'top',
        marginLeft: 10,
        marginRight: 10
    },
    infoText: {
        marginBottom: 20,
        fontFamily: FONT.medium,
        fontSize: SIZES.xLarge,
        marginLeft: 10,
        marginRight: 10,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
});
