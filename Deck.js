import React, { Component } from 'react';
import Card from './Card';
import axios from 'axios';
import './Deck.css';


const API_BASE_URL = "https://deckofcardsapi.com/api/deck/";

class Deck extends Component {

    constructor(props) {
        super(props);

        this.state = { deck: null, drawn: [] };
        this.getCard = this.getCard.bind(this);

    }

    async componentDidMount() {

        let deck = await axios.get(`${API_BASE_URL}new/shuffle/?deck_count=1`);
        this.setState({ deck: deck.data.deck_id });


    }

    async getCard() {
        // Make request using deck id        
        try {

            let cardRes = await axios.get(`${API_BASE_URL}${this.state.deck}/draw/?count=1`);
            if (!cardRes.data.success) {

                throw new Error("NO CARDS REMAINING!");
            }
            let card = cardRes.data.cards[0];
            // Set state using new card info from api
            this.setState(prevState => ({

                drawn: [...prevState.drawn,
                {
                    id: card.code,
                    image: card.image,
                    name: `${card.value} of ${card.suit}`
                }]

            }));

        } catch (err) {

            alert(err);

        }

    }


    render() {

        const cards = this.state.drawn.map(card => <Card key={card.id} image={card.image} name={card.name} />);

        return (

            <div className="Deck">
                <h1 className="Deck-title">💎 Adir The Card Dealer 💎</h1>
                <h4 className="Deck-title subtitle">A little demo made with React</h4>
                <button className="Deck-btn" onClick={this.getCard}>Get Card!</button>
                <div className="Deck-cardarea">
                    {cards}
                </div>
            </div>
        );
    }
}


export default Deck;
