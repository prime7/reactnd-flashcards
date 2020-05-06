import React from 'react'
import { View, FlatList, StyleSheet, Text } from 'react-native'
import { receiveDecks } from '../actions'
import { connect } from 'react-redux'
import { getDecks } from '../utils/api'
import DeckList from '../Components/DeckList'

class DeckLists extends React.Component{
    state = {
        loading: true
    }        
    

    componentDidMount() {
        getDecks()
        .then((decks) => this.props.receiveDecks(decks))
        .then(() => this.setState(() => ({loading: false})))
    }

    render(){
        const { loading } = this.state
        const { decks } = this.props
        if(loading === true)
            return <View><Text>loading</Text></View>

        return(
            <View style={styles.list}>
                <FlatList
                    data={Object.keys(decks).map((id) => { return { key: id } })}
                    renderItem={({item}) => (
                        <DeckList key={item.key} id={item.key} navigation={this.props.navigation}/>
                    )}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    list: {
        flex: 1,
        alignSelf: 'stretch'
    }
})

const mapStateToProps = (decks) => {
    return {
        decks
    }
}

export default connect(mapStateToProps,{receiveDecks})(DeckLists)