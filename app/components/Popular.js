import React from 'react';
import PropTypes from 'prop-types';

import { fetchPopularRepos } from '../utils/api';

function LanguagesNav ({ selected, onUpdateLanguage }) {
    const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python']
  
    return (
        <ul className='flex-center'>
            {languages.map((language) => (
                <li key={language}>
                <button
                    className='btn-clear nav-link'
                    style={language === selected ? { color: 'rgb(187, 46, 31)' } : null}
                    onClick={() => onUpdateLanguage(language)}>
                    {language}
                </button>
                </li>
            ))}
        </ul>
    )
}

LanguagesNav.propTypes = {
    selected: PropTypes.string.isRequired,
    onUpdateLanguage: PropTypes.func.isRequired
}


export default class Popular extends React.Component {
    constructor(props) {
        super(props)

        this._isMounted = false;
    
        this.state = {
          selectedLanguage: 'All',
          repos: {},
          error: null
        }
    
        this.updateLanguage = this.updateLanguage.bind(this)
        this.isLoading = this.isLoading.bind(this)
    }

    componentDidMount() {
        this._isMounted = true;
        this._isMounted && this.updateLanguage(this.state.selectedLanguage)
    }
    
    updateLanguage (selectedLanguage) {
        this.setState({
            selectedLanguage,
            error: null,
        })

        if (!this.state.repos[selectedLanguage]) {
            fetchPopularRepos(selectedLanguage)
              .then((data) => {
                this.setState(({ repos }) => ({
                  repos: {
                    ...repos,
                    [selectedLanguage]: data
                  }
                }))
              })
              .catch((error) => {
                console.warn('Error fetching repos: ', error)
      
                this.setState({
                  error: `There was an error fetching the repositories.`
                })
              })
          }
    }

    componentWillUnmount() {
        console.log("WIll Unmount");
        this._isMounted = false;
    }

    isLoading() {
        const { selectedLanguage, error, repos } = this.state;
        return !repos[selectedLanguage] && error === null
    }

    render() {
        const { selectedLanguage, repos, error } = this.state

        return (
            <React.Fragment>
                <LanguagesNav
                    selected={selectedLanguage}
                    onUpdateLanguage={this.updateLanguage}
                />

                {this.isLoading() && <p>Loading</p>}
                {repos[selectedLanguage] && <pre>{JSON.stringify(repos[selectedLanguage], null, 2)}</pre>}
                {error && <p>{error}</p>}
            </React.Fragment>
        )
    }
}