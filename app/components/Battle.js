import React from 'react';
import { FaUserFriends, FaFighterJet, FaTrophy } from 'react-icons/fa';
import PropTypes from 'prop-types';

function Instructions () {
    return(
        <React.Fragment>
            <div className='instruction-container'>
                <h1 className='header-lg center-text'>
                    Instructions
                </h1>
                <ol className='container-sm grid center-text battle-instructions'>
                    <li>
                        <h3 className="header-sm">Enter two Github</h3>
                        <FaUserFriends className="bg-light" size={140} color={'black'}/>
                    </li>

                    <li>
                        <h3 className="header-sm">Battle</h3>
                        <FaFighterJet className="bg-light" size={140} color={'red'}/>
                    </li>

                    <li>
                        <h3 className="header-sm">Enter tow Github users</h3>
                        <FaTrophy className="bg-light" size={140} color={'orange'}/>
                    </li>

                </ol>
            </div>
        </React.Fragment>
    )
}

class PlayerInput extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault()

        this.props.onSubmit(this.state.username);

    }

    handleChange (event) {
        this.setState({
            username: event.target.value,
        })
    }

    render () {
        return(
            <form className='column player' onSubmit={this.handleSubmit}>
                <label htmlFor='username'className='player-label'>
                    {this.props.label}
                </label>
                <div className='row player-inputs'>
                    <input
                        type="text"
                        id='username'
                        className='input-light'
                        placeholder="githubuser"
                        autoComplete="off"
                        value={this.state.username}
                        onChange={this.handleChange}
                        
                    />
                    <button 
                        className='btn btn-dark'
                        type='submit'
                        disabled={!this.state.username}
                    >
                        Submit
                    </button>
                </div>
            </form>
            
        )
    }
}

PlayerInput.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired
}
export default class Battle extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            playerOne: null,
            playerTwo: null,
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit (id, player) {
        this.setState({
            [id]: player
        })
    }
    render() {
        const { playerOne, playerTwo } = this.state;
        return (
            <React.Fragment>

                <Instructions />

                <div className='players-container'>
                    <h1 className='center-text header-lg'>Players</h1>
                    <div className='row spce-around'>
                        {playerOne === null && 
                            <PlayerInput 
                                onSubmit={(player) => this.handleSubmit('playerOne', player)}
                                label='Player One'
                            />
                        }
                        {playerTwo === null && 
                            <PlayerInput 
                                onSubmit={(player) => this.handleSubmit('playerTwo', player)}
                                label='Player Two'
                            />
                        }
                    </div>
                </div>
            </React.Fragment>
        )
    }
}