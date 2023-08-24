import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'

const News = (props) => {

  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)

  
  const capitalizeFunc = (string)=>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
 
  const updateNews = async() => {
    props.setProgress(10); 
    let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
  
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30); 
    let parsedData = await data.json();
    console.log(parsedData);
    props.setProgress(70); 
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    
    props.setProgress(100); 
  }
  
  
  
  useEffect(() => {
    document.title = `NEWZombie- ${capitalizeFunc(props.category)}`;
    updateNews();
    // eslint disable-next-line
    
  }, [])
  

//    handlePrevClick = async()=>{
//     // console.log("Prev");
    
//     // let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${this.state.page - 1}&pageSize=${props.pageSize}`;
//     // this.setState({loading: true});
//     // let data = await fetch(url);
//     // let parsedData = await data.json();
//     // console.log(parsedData);
//     // this.setState({
//     //   page: this.state.page - 1,
//     //   articles: parsedData.articles,
//     //   loading: false
//     // })
//     this.setState({page: this.state.page - 1});
//     this.updateNews();
//   }
  
//   handleNextClick = async()=>{
//     console.log("Next");
//     // if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/props.pageSize))){
      
//     //   let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${this.state.page + 1}&pageSize=${props.pageSize}`;
//     //   this.setState({loading: true});
//     //   let data = await fetch(url);
//     //   let parsedData = await data.json();
    
//     //   this.setState({
//       //     page: this.state.page + 1,
//       //     articles: parsedData.articles,
//       //     loading: false
//       //   })
//       // }
//       this.setState({page: this.state.page + 1});
//       this.updateNews();
// }

const fetchMoreData = async() => {
  
  let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
  setPage(page + 1);
    // this.setState({loading: true});
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults)
    
    // if (loading || (articles > hasMore)) {
    //   // Do not load if there's no more items
    //   return;
    // }
};




    return (
      <>
      <div className="container">

      
        <h2 className='mx-auto' style={{marginTop:"90px",textAlign:"center"}}>NEWZombie - Top <span style={{color:"#FF2E63"}}>{capitalizeFunc(props.category)}</span> headlines </h2>
        {loading && <Spinner/>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
        <div className="row my-3">
        {articles.map((element)=>{
          return(
        <div className="col-md-4 my-2" key={element.url}>
        <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} imgUrl={element.urlToImage} author={element.author?element.author:"unknown"} publishedAt={element.publishedAt} url={element.url} source={element.source.name}/>
        </div>
      
      )
    })}
    </div>
    </div>
    </InfiniteScroll>
      {/* <div className="container d-flex justify-content-between">
      <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
      <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
      </div> */}
        </div>
      </>
    )
  }


News.defaultProps ={
  country:"in",
  pageSize:8,
  category:"general"
}
News.propTypes ={
  country: PropTypes.string,
  pageSize:PropTypes,
  category:PropTypes.string,

}

export default News