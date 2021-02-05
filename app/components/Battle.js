import React from 'react';
import { FaUserFriends, FaFighterJet, FaTrophy } from 'react-icons/fa';
import PropTypes from 'prop-types';

function Instruction () {
    return(
        <React.Fragment>
            <div className='instruction-container'>
                <h1 className='header-lg center-text'>
                    Instructions
                </h1>
                <ol className='container-sm grid center-text battle-instructions'>
                    <li>
                        <h3>Enter two Github</h3>

                        <FaUserFriends size={140} color={'black'}/>
                    </li>

                    <li>
                        <h3>Battle</h3>
                        <FaFighterJet size={140} color={'red'}/>
                    </li>

                    <li>
                        <h3>Enter tow Github users</h3>
                        <FaTrophy size={140} color={'orange'}/>
                    </li>

                </ol>
            </div>
        </React.Fragment>
    )
}

export default class Battle extends React.Component {
    render() {
        return ( 
            <Instruction />
        )
    }
}