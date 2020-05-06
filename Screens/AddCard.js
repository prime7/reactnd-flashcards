import React from 'react'
import { Text, TextInput, KeyboardAvoidingView, TouchableOpacity, StyleSheet } from 'react-native'
import { addCard } from '../actions'
import { saveCard } from '../utils/api'
import { connect } from 'react-redux'
import { white, black } from '../utils/colors'

const SubmitBtn = ({ onPress }) => {
    return (
        <TouchableOpacity
            style={styles.submitBtn}
            onPress={onPress}
        >
            <Text style={styles.submitBtnText}>Create Card</Text>
        </TouchableOpacity>
    )
}

class AddCard extends React.Component{
    state = {
        question: '',
        answer: ''
    }


    submit = () => {
        const { question, answer } = this.state
        const { deckId, addCard } = this.props
        if(question === '' || answer === ''){
            alert('Please fill in both the input fields')
            return 
        }

        addCard(deckId, question, answer)
        this.setState({question: '',answer: ''})
        saveCard(deckId, question, answer)
        this.props.navigation.goBack()
    }

    render(){
        const { question, answer } = this.state
        
        return(
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
                <Text style={styles.label}>Question</Text>
                <TextInput
                    value={question}
                    style={styles.input}
                    onChangeText={(question) => this.setState({question})}
                    autoFocus={true}
                />
                <Text style={styles.label}>Answer</Text>
                <TextInput
                    value={answer}
                    style={styles.input}
                    onChangeText={(answer) => this.setState({answer})}
                />
                <SubmitBtn onPress={this.submit} />
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 40
    },
    question: {
        fontSize: 18,
        alignSelf: 'flex-start',
        color: black
    },
    input: {
        width: 250,
        height: 44,
        padding: 8,
        borderWidth: 1,
        borderColor: black,
        marginBottom: 15
    },
    submitBtn: {
        backgroundColor: black,
        padding: 10,
        borderRadius: 0,
        height: 45,
        marginLeft: 40,
        marginRight: 40,
        marginBottom: 100
    },
    submitBtnText: {
        color: white,
        fontSize: 22,
        textAlign: 'center'
    }
})

const mapStateToProps = (state, props) => {
    const { deckId } = props.route.params
    return {
        deckId
    }
}

export default connect(mapStateToProps,{addCard})(AddCard)