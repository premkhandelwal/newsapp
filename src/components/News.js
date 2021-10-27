import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props)=> {

   const [articles, setArticles] = useState([]);
   const [loading, setLoading] = useState(true);
   const [page, setPage] = useState(1);
   const [totalResults, settotalResults] = useState(0);
    /* constructor(props) {
        super(props);
        state = {
            "articles": [],
            "loading": true,
            "page": 1,
            "totalResults": 0
        }
    } */

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const  updateNews = async() => {
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        // setState({ loading: true });
        setLoading(true);
        let data = await fetch(url);
        props.setProgress(30);
        let parsedData = await data.json();
        props.setProgress(70);
        setArticles(parsedData.articles);
        settotalResults(parsedData.totalResults);
        setLoading(false);
        
        props.setProgress(100);

    }

    useEffect(() => {
   document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`

        updateNews();

       
    }, [])



    const handlePrevClick = async () => {
        /* let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=0016f7af7b884bee95d4f8bab689e4b3&page=${state.page - 1}&pageSize=${props.pageSize}`;
        setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();
        setState({
            page: state.page -= 1,
            articles: parsedData.articles,
            loading: false
        }) */
        // setState({ page: state.page - 1 });
        setPage(page-1);
        updateNews();
    }
    const handleNextClick = async () => {
        /* if (!(state.page + 1 > Math.ceil(state.totalResults / props.pageSize))) {
            let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=0016f7af7b884bee95d4f8bab689e4b3&page=${state.page + 1}&pageSize=${props.pageSize}`;
            setState({ loading: true });
            let data = await fetch(url);
            let parsedData = await data.json();
            setState({
                page: state.page += 1,
                articles: parsedData.articles,
                loading: false
            })
        } */
        // setState({ page: state.page + 1 });
        setPage(page+1);

        updateNews();

    }

    const fetchMoreData = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
        setPage(page+1);
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(articles.concat(parsedData.articles));
        settotalResults(parsedData.totalResults)
        
    }
        return (

            
            <>
            
                <h2 className="text-center" style={{ margin: "40px 0px", marginTop:"90px" }}>NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines</h2>
                {loading && <Spinner />}
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults}
                    loader={<Spinner />}
                >
                    <div className="container" key = {articles.length}>
                        <div className="row">
                            {articles.map((element) => {
                                return <div className="col-md-4" key = {element.url}>
                                    <NewsItem title={element.title != null ? element.title.slice(0, 45) : ""} description={element.description != null ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />

                                </div>
                            })}

                        </div>
                    </div>

                </InfiniteScroll>
                {/*  <div className="container d-flex justify-content-between" >
                    <button disabled={state.page <= 1} type="button" className="btn btn-dark" onClick={handlePrevClick}>&larr; Prev</button>
                    <button disabled={state.page + 1 > Math.ceil(state.totalResults / props.pageSize)} type="button" className="btn btn-dark" onClick={handleNextClick}>Next &rarr;</button>
                </div> */}
            </>
        )
    }


 News.defaultProps = {
    country: "in",
    pageSize: 5,
    category: "general"
}
 News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}

export default News
