import React from 'react';

const Link = (props) => {
    return (
        props.Internal
            ? (<a href={props.hyper.Address}>{props.hyper.Text}</a>)
            : (<a href={props.hyper.Address} target="_blank" rel="noopener noreferrer">{props.hyper.Text}</a>)
    );
};

export default Link;
