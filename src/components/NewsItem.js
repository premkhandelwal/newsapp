import React, { Component } from 'react'


export class NewsItem extends Component {
    render() {
        let {title, description, imageUrl, newsUrl} = this.props;
        return (
            <div className = "my-3">
                <div className="card">
                    <img src={imageUrl != null ? imageUrl : "data:image/png;base64,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"} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{description}...</p>
                        <a href={newsUrl} rel = "noreferrer" target = "_blank" className="btn btn-sm btn-dark">Read More</a>
                    </div>
                </div>

            </div>
        )
    }
}

export default NewsItem
