import React from 'react';
import PropTypes from 'prop-types';

import { fetchPopularRepos } from '../utils/api';
import { FaUser, FaStar, FaCodeBranch, FaExclamationTriangle } from 'react-icons/fa';

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

function ReposGrid ({ repos }) {
    return (
        <ul className='grid space-around'>
            {/* <pre>{JSON.stringify(repos, null, 2)}</pre> */}
            {repos.map((repo, index) => {
                const { id, name, owner, html_url, stargazers_count, forks, open_issues } = repo;
                const { login, avatar_url } = owner;

                return (
                    <li key={id} className='repo bg-light m-4'>
                        <h4 className='header-lg text-center'>
                            #{index + 1}
                        </h4>
                        <img 
                            className='avatar'
                            src={avatar_url}
                            alt={`Avatar for ${login}`}    
                        >
                        </img>
                        <h2 className='text-center'>
                            <a className='link' href={html_url}>
                                {login}
                            </a>

                        </h2>

                        <ul className='card-list'>
                            <li>
                                <a href={`https://www.github.com/${login}`} >
                                    <FaUser color='rgb(190,190,190)' size={18}/>
                                    {" " + login}
                                </a> 
                            </li>
                            <li>
                                <a href={html_url} >
                                    <FaStar color='rgb(190,190,190)' size={18}/>{" " + stargazers_count.toLocaleString()} stars
                                </a>
                            </li>
                            <li>
                                <a href={html_url} >
                                    <FaCodeBranch color='rgb(190,190,190)' size={18}/>
                                    {" " + forks.toLocaleString()} forks
                                </a>
                            </li>
                            <li>
                                <a href={html_url} >
                                    <FaExclamationTriangle color='rgb(190,190,190)' size={18}/>{" " + open_issues.toLocaleString()} open issues
                                </a>
                            </li>
                        </ul>
                    </li>
                )
            })}
        </ul>  
    )
}

ReposGrid.propTypes = {
    repos: PropTypes.array.isRequired,
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

                {this.isLoading() && <p>Loading...</p>}
                {repos[selectedLanguage] && <ReposGrid repos={ repos[selectedLanguage] }/>}
                {error && <p>{error}</p>}
            </React.Fragment>
        )
    }
}