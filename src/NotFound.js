import React, {Component} from 'react';
import { Link } from 'react-router-dom'

class NotFound extends Component {
    render() {
        return (
            <div>
                <Link to="/" className="close-search">Close</Link>
                <div className="not-found">
                        <h1>Page Not Found</h1>
                </div>
            </div>
        );
    }
}

export default NotFound;