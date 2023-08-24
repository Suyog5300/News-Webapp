import React from 'react'


 const NewsItem = (props) => {
  // constructor(){
  //   super();
  //   console.log("This is aConstructor")
  // }
    let {title, description, imgUrl, url, publishedAt, author,source} = props;
    return (
      <div>
        <div className="card my-2">
        <span class="position-absolute start-50 top-0 translate-middle badge rounded-pill bg-danger p-2 w-75" style={{margin:'0 auto', zIndex:'1', height:"30px"}}>
    {source}</span>

  <img src={!imgUrl?"https://img.freepik.com/free-vector/internet-network-warning-404-error-page-file-found-web-page-internet-error-page-issue-found-network-404-error-present-by-man-sleep-display_1150-55450.jpg?w=740&t=st=1664044121~exp=1664044721~hmac=8a3ea2a101fa45f5c11a6cb07f514004ca54bb312cf14bf09c434d5195a353b5":imgUrl} className="card-img-top" alt="..." style={{height:'200px'}}/>
  <div className="card-body d-flex flex-column"  style={{height:'380px'}}>
    
    <h5 className="card-title">{title} </h5>
    <p className="card-text">{description.slice(0, 200)}...</p>
    {/* <p className='h6 text-secondary'></p> */}
    <p className="card-text"><small className="text-muted">By {author} on {new Date(publishedAt).toGMTString()}</small></p>
    <a href={url} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-dark mt-auto" style={{alignitem:"end"}}>Read more</a>
  </div>
</div>
      </div>
    )
  }
export default NewsItem