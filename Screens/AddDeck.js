import React from 'react'
import { Text, TextInput, KeyboardAvoidingView, TouchableOpacity, StyleSheet } from 'react-native'
import { addDeck } from '../actions'
import { saveDeck } from '../utils/api'
import { connect } from 'react-redux'
import { white, black } from '../utils/colors'


const SubmitDeckBtn = ({ onPress }) => {
    return (
        <TouchableOpacity
            style={styles.submitBtn}
            onPress={onPress}>
            <Text style={styles.submitBtnText}>Create Deck</Text>
        </TouchableOpacity>
    )
}

class AddDeck extends React.Component{
    state = {
        nameOfDeck: ''
    }

    submit = () => {
        const { nameOfDeck } = this.state
        if(nameOfDeck === ''){
            alert('Give this deck a name!')
            return
        }
        const deckId = nameOfDeck
        const title = nameOfDeck
        const newDeck = {
            title: nameOfDeck.trim(), 
            questions: [] 
        }
        const { addDeck, navigation} = this.props
        addDeck(deckId, newDeck)
        this.setState({nameOfDeck: ''})
        saveDeck(deckId, newDeck) 
        navigation.navigate('Deck', {deckId, deckName: title})
    }

    render(){
        const { nameOfDeck } = this.state

        return(
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
                <Text style={styles.question}>Name your new deck!</Text>
                <TextInput
                    value={nameOfDeck}
                    style={styles.input}
                    onChangeText={(nameOfDeck) => this.setState({nameOfDeck})}
                />
                <SubmitDeckBtn onPress={this.submit} />
            </KeyboardAvoidingView>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    question: {
        fontSize: 30,
        marginLeft: 20,
        marginRight: 20,
        color: black
    },
    input: {
        width: 250,
        height: 44,
        padding: 8,
        borderWidth: 1,
        borderColor: black,
        margin: 20
    },
    submitBtn: {
        backgroundColor: black,
        padding: 10,
        borderRadius: 0,
        height: 45,
        marginLeft: 40,
        marginRight: 40,
        marginBottom: 60
    },
    submitBtnText: {
        color: white,
        fontSize: 22,
        textAlign: 'center'
    }
})

const mapStateToProps = () => {
    return {

    }
}

export default connect(mapStateToProps,{addDeck})(AddDeck)