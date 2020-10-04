import React, { Component } from 'react'

//initial card values
const cardsArr = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "X", "J", "Q", "K"];

//function to map suite to card sets
const mapSuitsWithCards = (suite, cards) => {
   return cards.map(card => suite + "-" + card);
}

const spades = mapSuitsWithCards("S", cardsArr);
const hearts = mapSuitsWithCards("H", cardsArr);
const diamonds = mapSuitsWithCards("D", cardsArr);
const club = mapSuitsWithCards("C", cardsArr);

//deck with all suite sets combined
const deck = [].concat(spades, hearts, diamonds, club)

//function to shuffle deck
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

const MSG_IRREGULARITY =  "Irregularity occured! Cards can't be distributed fairly among players from the input keyed."
const MSG_RETRY = "Please try a different value. Aborting.."
//component for card app
export default class Dashboard extends Component {
   state = {
      cardsArr: cardsArr,
      people: [],
      inputt: "",
      cardSets: { spades, hearts, diamonds, club },
      deck: deck,
      shuffledDeck: shuffleCards(deck),
      // collections: null
   }

   handleCardDistribution = () => {
      const s = this.state;
      let arr = [], inputt = s.inputt;
      let person = {}, rounds;
      let newDeck = [...s.shuffledDeck] //clone as copy
      //reset irregularity (not used)
      // this.setState({
      //    irregularity: false
      // })

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
         //map that cards to persons
         for (let k = 1; k <= inputt; k++) {
            person[k].push(rounds[k - 1]); // offset "-1" to follow array index which starts at "0"
            
            //there may not be enough cards to complete a distribution round, giving undefined value to array element
            //so we can set condition for a message
            //but uncommenting this out for now as not including it.
            // if(!rounds[k - 1] || inputt.length >=3) {
            //    alert(MSG_IRREGULARITY);
            //    alert(MSG_RETRY);
            //    this.setState({
            //       irregularity: true,
            //       inputt: ""
            //    })
            //    return this.reShuffleDeck();
            // }
         }

      }
      this.setState({
         collections: person
      })
   }

   getInput = (e) => {
      const input = e.target.value;
      //validation for only number (decimal not allowed)
      if(isNaN(input) || input.indexOf(".") !== -1){
         this.setState({
            inputt: "",
         })
         return alert("Input value does not exist or value is invalid")
      }

      this.setState({
         inputt: input,
      })
   }

   reShuffleDeck = () => {
      this.setState({
         shuffledDeck: shuffleCards(deck),
         collections: null
      })
      console.log("deck shuffeld");
   }

   render() {
      const { cardsArr, people, inputt, collections } = this.state;

      const renderOutputs = () => {
         return (
            <ul className="listing-section">
               {Object.keys(collections).map((v, i) => (
                  <li className="list" key={i}>
                     <span className="person">{`Person${v} : `}</span>
                     <span className="hands">{collections[v].toString()}</span>
                  </li>
               )
               )}
            </ul>
         )
      }

      return (
         <div className="container">
            <h2>Card Dealer &#9824;</h2>
            <h5 className="input-label">Enter number of people</h5>
            <input className="input-field" placeholder="Numbers e.g. 4" onChange={this.getInput} value={inputt} />
            <br />
            <button className="btn-custom deal" type="button" onClick={this.handleCardDistribution}>Deal</button>
            <button className="btn-custom reset" type="button" onClick={this.reShuffleDeck}>Reshuffle</button>
            {collections &&
               <div className="list-wrapper">
               <div className="legend"> Spade = S, Heart = H, Diamond = D, Club = C</div>
               {renderOutputs()}
            </div>
            }
         </div>
      )
   }
}
