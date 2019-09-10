import React, { Component } from 'react';
import './Track.css';

class Track extends Component {
    constructor(props) {
        super(props);

        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
    }

    addTrack() {
        this.props.onAdd(this.props.track);
    }

    removeTrack() {
        this.props.onRemove(this.props.track);
    }

    render() {
        const track = this.props.track;
        const isRemoval = this.props.isRemoval;
        return (
            <div className="Track">
                <div className="Track-information">
                    <h3>{track.name}</h3>
                    <p>{track.artist} | {track.album}</p>
                </div>
                <button className="Track-action" onClick={isRemoval ? this.removeTrack : this.addTrack}>{isRemoval ? '-' : '+'}</button>
            </div>
        )
    }
}

export default Track;