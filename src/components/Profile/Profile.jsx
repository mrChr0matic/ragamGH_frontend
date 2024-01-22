import PropTypes from 'prop-types';
import './styles.scss';
import { motion } from 'framer-motion';

function Profile(props) {
  return (
    <motion.div
        className='profile-parent'
        initial={{ x: 1600 }}
        animate={{ x: 0 ,scale:1}}
        exit={{ x: 1600 }}
        transition={{type:'tween'}}
    >
        <div className='profile'>
            <div className='user'>
                <div className='name'>
                    <h1 className='name'>mrChr0matic</h1>
                    <img src={props.image} alt="pfp" />
                </div>
                <i onClick={() => { props.setClick(!props.click) }} className="fa-solid fa-x"></i>
            </div>
            <h1 className='about'>About</h1>
            <p>{props.bio}</p>
            <div className='items'>
                <ul>
                    <li>Your Repos</li>
                    <li>mail</li>
                    <li>disk usage</li>
                </ul>
            </div>
        </div>
    </motion.div>
  );
}

Profile.propTypes = {
  setClick: PropTypes.func.isRequired,
  click: PropTypes.bool.isRequired,
  image: PropTypes.string,
  bio: PropTypes.string
};

export default Profile;
