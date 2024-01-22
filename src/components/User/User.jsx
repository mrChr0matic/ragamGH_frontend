import { useEffect, useState } from 'react';
import './styles.scss'
import PropTypes from 'prop-types';
import { AnimatePresence,motion } from 'framer-motion';

export default function Users(props){
    const [repos,setRepos]=useState([]);
    const [view,setView]=useState(false);

    useEffect(()=>{
        const fetchRepo= async ()=>{
            const repoUrl = await fetch(props.repos_url, {
                method:"GET",
                headers:{
                    "Authorization": "Bearer " + localStorage.getItem("accessToken")
                }
            });
            const repoData = await repoUrl.json();
            setRepos(repoData);
        }

        fetchRepo();
    },[])

    return(
        <>
            <div className="users">
                <div className='profile'>
                    <img src={props.avatar_url} alt="pfp" />
                    <a href={props.html_url}>{props.login}</a>
                </div>
                <button className='button-3' onClick={()=>setView(true)}>See Repos</button>
            </div>
            <AnimatePresence>
                { view &&
                    <motion.div className='repo' onClick={()=>setView(false)} 
                        initial={{opacity:0.5, scale:0}}
                        whileInView={{opacity:1, scale:1}}
                        exit={{opacity:0.5,scale:0}}
                    >
                        <p>X</p>
                        <ul>
                            {repos.map((repo,index)=>(
                                <li key={index}><a href={repo.html_url}>{repo.name}</a></li>
                            ))}
                        </ul>
                    </motion.div>
                }
            </AnimatePresence>
        </>
    )
}

Users.propTypes = {
    avatar_url: PropTypes.string.isRequired,
    login: PropTypes.string.isRequired,
    html_url: PropTypes.string.isRequired,
    repos_url: PropTypes.string.isRequired,
};