import React from 'react';
import moment from 'moment'
// import {Button, Icon} from 'react-materialize'

class WireframeCard extends React.Component {

    render() {
        const { wireframe } = this.props;
        return (
            <div className="card z-depth-1 todo-list-link">
                <div className="card-content grey-text text-darken-3">
                    <span className="card-title"><strong>{wireframe.name}</strong></span>
                    <div><span>{ moment(wireframe.editedAt.toDate()).calendar() }</span></div>
                    {/* <Button
                        className="pink halfway pulse"
                        floating
                        icon={<Icon>delete_forever</Icon>}
                        small
                        node="button"
                        waves="light"
                    /> */}
                </div>
            </div>
        );
    }
}
export default WireframeCard;