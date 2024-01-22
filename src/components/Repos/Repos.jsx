import './styles.scss';
import PropTypes from 'prop-types';

export default function Repos(props){
    return(
        <div className='repository'>
            <div className='repo-stats'>
                <div className='owner'>
                    <div>
                        <h1><a href='#'>{props.name}</a></h1>
                        <h2><a href='#'>{props.owner}</a></h2>
                    </div>
                    <img src={props.avatar_url} alt="pfp"/>
                </div>
                <div className='lang'>
                    <h2>{props.language}</h2>
                </div>
            </div>
            <div className='desc'>
                <hr/>
                {props.description}
            </div>
        </div>
    )
}

Repos.propTypes = {
    name: PropTypes.string.isRequired,
    owner: PropTypes.string.isRequired,
    language: PropTypes.string,
    description: PropTypes.string,
    avatar_url: PropTypes.string
};