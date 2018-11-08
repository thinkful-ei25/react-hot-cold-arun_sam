import React from 'react';

import Header from './header';
import GuessSection from './guess-section';
import GuessCount  from './guess-count';
import GuessList from './guess-list';

export default class Game extends React.Component{
    constructor(props){
        super(props);
        this.state={
            count: 0,
            guesses : [],
            solution: this.generateNewSolution(),
        };
    }

    generateNewSolution() {
        return Math.floor(Math.random() * 100) + 1;
    }

    restartGame() {
        this.setState({
            guesses: [],
            solution: this.generateNewSolution(),
            count: 0,
        });
    }

    handleNewGuess(val){
        this.setState({
            count: this.state.count+1,
            guesses: [...this.state.guesses, val]
        });
    }

    computeFeedback(val){
        let difference = Math.abs(val-this.state.solution);
        if(difference >= 50){
            return 'cold'
        } else if (difference >= 25){
            return 'lukewarm'
        } else if (difference >=10){
            return 'warm'
        } else if (difference >=5){
            return 'hot'
        } else if (difference >0){
            return 'super hot'
        } else if (difference === 0){
            return 'You win!';
        }
        return 'Enter your guess!';
    }
    
    render() { 
        
        const feedback = this.computeFeedback(this.state.guesses[this.state.count-1]);

        return (
        <div>
            <Header onClick={() => this.restartGame()} />
            <GuessSection feedback={feedback} onSubmit={guess=>this.handleNewGuess(guess)}/>
            <GuessCount count={this.state.count} />
            <GuessList guesses={this.state.guesses} />
        </div>
    )};
}

