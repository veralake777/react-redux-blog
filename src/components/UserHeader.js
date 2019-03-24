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
class UserHeader extends React.Component {
    render() {
        const {user} = this.props;
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

// map all your fetch logic for component
// ownProps
const mapStateToProps = (state, ownProps) => {
    return { user: state.users.find(user => user.id === ownProps.userId) };
}
export default connect(mapStateToProps)(UserHeader);