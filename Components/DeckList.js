import React from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import { black, white, gray } from '../utils/colors'
import { connect } from 'react-redux'

class DeckList extends React.Component {
    render() {
        const { id, title, count, navigation } = this.props

        return (
            <TouchableOpacity
             style={styles.item} 
             onPress={() => navigation.navigate('Deck', {deckId: id, deckName: title})}
            >
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.count}>{count} {count === 1 || count===0 ? `card` : `cards`}</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        color: black
    },
    count: {
        marginTop: 10,
        fontSize: 22,
        color: gray
    },
    item: {
        backgroundColor: white,
        borderRadius: 0,
        borderColor: black,
        borderWidth: 1,
        padding: 15,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 17,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

function mapStateToProps(decks, props) {
    const { id } = props
    return {
        id,
        title: decks[id].title,
        count: decks[id].questions.length
    }
}

export default connect(mapStateToProps)(DeckList)