/*
* Fetch Posts
* Show Posts on PostList
* Each Element in PostList shows UserHeader
* UserHeader is given ID of user to show
* Each UserHeader attempts to fetch its user
* multiple fetch user calls
* Show users in each UserHeader
*/

import React from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../actions';

class UserHeader extends React.Component {
    componentDidMount(){
        // fetch user data, pass in userId prop from PropList
        this.props.fetchUser(this.props.userId);
    }
    render() {
       const user = this.props.users.find(user => user.id === this.props.userId);

        if(!user) {
            return <div>Loading...</div>;
        }
        return(
            <div className="header">
                {user.name}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { users: state.users };
}
export default connect(mapStateToProps, 
    {fetchUser}
    )(UserHeader);