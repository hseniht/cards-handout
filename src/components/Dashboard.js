import React, { Component } from 'react'

//init states
const cardsArr = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "X", "J", "Q", "K"];

const mapSuitsWithCards = (suite, cards) => {
   return cards.map(card => suite + "-" + card);
}

const spades = mapSuitsWithCards("S", cardsArr);
const hearts = mapSuitsWithCards("H", cardsArr);
const diamonds = mapSuitsWithCards("D", cardsArr);
const club = mapSuitsWithCards("C", cardsArr);

const deck = [].concat(spades, hearts, diamonds, club)

const shuffleCards = (arr) => {
   let array = [...arr]; //clone array
   let m = array.length, temp, i;
   // While there is items
   while (m) {
      i = Math.floor(Math.random() * m--);
      temp = array[m];
      array[m] = array[i];
      array[i] = temp;
   }
   return array;
}

export default class Dashboard extends Component {
   state = {
      cardsArr: cardsArr,
      people: [],
      inputt: "",
      cardSets: { spades, hearts, diamonds, club },
      deck: deck,
      shuffledDeck: shuffleCards(deck)

   }

   generatePeopleArray = () => {
      const s = this.state;
      let arr = [], inputt = s.inputt;
      let person = {}, rounds;
      let newDeck = [...s.shuffledDeck]
      if (inputt <= 0) {
         return alert("Nobody to distribute to :(");
      } else {
         for (let i = 1; i <= inputt; i++) {
            arr.push(i);
            person[i] = [];
            this.setState({
               people: arr,
               // collections: person
            })
         }
      }

      //Card distribution
      while (newDeck.length > 0) {
         //cards out per round based on no of person(input)
         rounds = newDeck.splice(0, inputt);
         //map that cards to persons. 
         for (let k = 1; k <= inputt; k++) {
            person[k].push(rounds[k - 1]); // "-1" to follow index
         }

      }
      this.setState({
         collections: person
      })
   }
   getInput = (e) => {
      this.setState({
         inputt: e.target.value
      })
   }
   render() {
      const { cardsArr, people, inputt, collections } = this.state;

      const renderOutputs = () => {
         return (
            <ul>
               {Object.keys(collections).map((v, i) => <li className="listing" key={i}>{`Person${v} : ` + collections[v].toString()}</li>)}
            </ul>
         )
      }

      return (
         <div>
            <h2>Card Deal</h2>
            <input type="number" value={this.state.inputt} onChange={this.getInput} />
            <br />
            <button type="button" onClick={this.generatePeopleArray}>Deal</button>
            <div></div>
            {
               collections && renderOutputs()
            }
         </div>
      )
   }
}
