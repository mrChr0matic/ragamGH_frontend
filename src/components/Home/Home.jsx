import './styles.scss'
import Profile from '../Profile/Profile'
import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion';
import Users from '../User/User';
import Repos from '../Repos/Repos';

export default function Home(){
    const [click,setClick]=useState(false);
    const [userData,setUserData]=useState({});
    const [repos,setRepos]=useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [users,setUsers]=useState([]);
    const [repositories,setRepositories]=useState([]);

    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    useEffect(()=>{
        const fetchData = async () => {
            const userData =  await fetch("http://localhost:4000/getUserData",{
                method:"GET",
                headers:{
                    "Authorization": "Bearer " + localStorage.getItem("accessToken")
                }
            })
            const data = await userData.json();
            setUserData(data);
            const repoUrl = await fetch(data.repos_url, {
                method:"GET",
                headers:{
                    "Authorization": "Bearer " + localStorage.getItem("accessToken")
                }
            });
            const repoData = await repoUrl.json();
            setRepos(repoData);
        }

        fetchData();
    },[])

    const searchItem=()=>{
        const getItemGH=async()=>{
            const itemData=await fetch ("http://localhost:4000/getParticularUser",{
                method:"GET",
                headers:{
                    "Authorization": "Bearer " + localStorage.getItem("accessToken"),
                    "Username":searchQuery
                },
            })
            const user=await itemData.json();
            console.log(user);
            setUsers([user]);

            const getRepos=await fetch("http://localhost:4000/getRepositories",{
                method:"GET",
                headers:{
                    "Authorization": "Bearer " + localStorage.getItem("accessToken"),
                    "Reponame":searchQuery
                },
            })
            const repository=await getRepos.json();
            console.log(repository)
            setRepositories(repository)
        }
        getItemGH();
    }


    return(
        <div className='home'>
            <div className='pfp'>
                <i className="fa-brands fa-github"></i>
                <h3>GH Ragam</h3>
                <AnimatePresence>
                {
                    userData ? (
                        <img 
                            onClick={()=>{setClick(!click)}}
                            src={userData.avatar_url} alt="pfp"/>
                    ) : (
                        <img alt="pp" />
                    )
                }
                </AnimatePresence>
            </div>
            <div className='home-body'>
                <div className='repos'>
                    <div className='repos-heading'>
                        <h2>Repositories</h2>
                        <button className='button-3'>New</button>
                    </div>
                    <ul className='repos-list'>
                        {repos.map((repo, index) =>
                            <li key={index}>{repo.name}</li>
                        )}
                    </ul>
                    <div className='repos-text'>
                        <p>see all details related to your repositories here</p>
                    </div>
                </div>
                <div className='search'>
                    <div className='search-bar'>
                        <input placeholder='search for anything' type='text' className='bar'
                            value={searchQuery}
                            onChange={handleInputChange}
                        />
                        <button className='button-3' onClick={searchItem}><i className="fa-solid fa-magnifying-glass"></i></button>
                    </div>
                    <div className='item-tray'>
                        <div className='items'>
                            {repositories==[] ? <></> : repositories.map((repository,index) => (
                                <Repos key={index} name={repository.name} owner={repository.owner.login}  language={repository.language} description={repository.description}
                                        avatar_url={repository.owner.avatar_url}
                                />
                            ))}
                        </div>
                        <div className='items user-items'>
                            {users.map((user,index) => (
                                user.login ?
                                <Users key={index} avatar_url={user.avatar_url} login={user.login} html_url={user.html_url} repos_url={user.repos_url}/>
                                : <div key={index}></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <AnimatePresence>
                {click && <Profile click={click} setClick={setClick} image={userData.avatar_url} bio={userData.bio}/>}
            </AnimatePresence>
        </div>
    )
}