import { useContext } from 'react';
import '../../styles/nav.css';
import { UserContext } from '../User/UserProvider';
import Account from "./Account";
import { MenuNav } from './MenuNav';
import { Notification } from './Notification';
import { SignInUp } from './SignInUp';

const Nav = () => {
    const { user } = useContext(UserContext);
    console.log("user",user);
    return (
        <div className="nav">
            <div className="left-nav"><MenuNav /></div>
            <div className="right-nav">
                {
                    user ?
                        (<>
                            <Notification />
                            <Account />
                        </>) :
                        (<SignInUp />)
                }
            </div>
        </div>
    )
}

export default Nav;