import * as Types from './types'

export function addCard(deckId, question, answer) {
    return {
        type: Types.ADD_CARD,
        deckId,
        question,
        answer
    }
}

export function addDeck(deckId, deck) {
    return {
        type: Types.ADD_DECK,
        deckId,
        deck
    }
}

export function receiveDecks(decks) {
    return {
        type: Types.RECEIVE_DECKS,
        decks,
    }
}