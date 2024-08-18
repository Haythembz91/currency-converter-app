import {useEffect, useState} from "react";




const NewsFeed = ()=>{

    const [articles,setArticles]=useState([])
    
    const getNews = async()=>{
        try{
            const response = await fetch('http://localhost:8000/news')
            if(response.status===200){
                const data = await response.json()
                setArticles(data)
            }
            }catch(e){
                console.error(e)
            }
    }

    useEffect(()=>{
        getNews()
    },[])

    
    return (
        <div className={'news-feed'}>
            <h3>News Feed:</h3>
            {articles.map((article,index)=><a key={index} href={article.article_url} target={"_blank"}><p key={index}>{article.post_time_utc.slice(0,10)} : {article.article_title}</p></a>)}
        </div>
    )
}

export default NewsFeed
