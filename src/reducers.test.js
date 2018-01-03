import gameReducer from './reducer';
import {generateAuralUpdate, restartGame, makeGuess} from './actions';

describe('gameReducer', () => {
    it ('should set the initial state when nothing is passed in', () => {
        const state = gameReducer(undefined, {type: 'UNKNOWN'});
        expect(state.guesses).toEqual([]);
        expect(state.feedback).toEqual('Make your guess!');
        expect(state.auralStatus).toEqual('');
        expect(state.correctAnswer).toBeGreaterThan(0);
        expect(state.correctAnswer).toBeLessThan(101);
    });

    it('should return the current state on an unknown action', () => {
        let currentState = {};
        const state = gameReducer(currentState, {type:'UNKNOWN'});
        expect(state).toBe(currentState);
    });

    describe('restartGame', () => {
        it('should restart the game', () => {
            let state = {
                guesses: [2, 26, 54, 24],
                feedback: 'Awesome',
                auralStatus: '',
                correctAnswer: 24
            }
            const correctAnswer = 8
            state = gameReducer(state, restartGame(correctAnswer));
            expect(state).toEqual({
                guesses: [],
                feedback: 'Make your guess!',
                auralStatus: '',
                correctAnswer
            })
        });
    });

    describe('makeGuess', () => {
        it ('should let the user make a guess', () => {
            let state = {
                guesses: [],
                feedback: '',
                correctAnswer: 1
            }
            state = gameReducer(state, makeGuess(99));
            expect(state.guesses).toEqual([99]);
            expect(state.feedback).toEqual("You're Ice Cold...");

            state = gameReducer(state, makeGuess(40));
            expect(state.guesses).toEqual([99, 40]);
            expect(state.feedback).toEqual("You're Cold...");

            state = gameReducer(state, makeGuess(24));
            expect(state.guesses).toEqual([99, 40, 24]);
            expect(state.feedback).toEqual("You're Warm.");

            state = gameReducer(state, makeGuess(8));
            expect(state.guesses).toEqual([99, 40, 24, 8]);
            expect(state.feedback).toEqual("You're Hot!");

            state = gameReducer(state, makeGuess(1));
            expect(state.guesses).toEqual([99, 40, 24, 8, 1]);
            expect(state.feedback).toEqual('You got it!');
        });
    });

    describe('generateAuralUpdate', () => {
        it ('should generate an aural update', () => {
            let state = {
                guesses: [2, 50, 8, 23],
                feedback: "You're Hot!",
                auralStatus: '',
                correctAnswer: 24
            }
            state = gameReducer(state, generateAuralUpdate());
            expect(state.auralStatus).toEqual(
                "Here's the status of the game right now: You're Hot! You've made " + 
                "4 guesses. In order of most- to least-recent, they are: 23, 8, 50, 2"
            );
        });
    });
});