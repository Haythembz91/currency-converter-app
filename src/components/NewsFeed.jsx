import {useEffect, useState} from "react";




const NewsFeed = ()=>{

    const [articles,setArticles]=useState([])
    useEffect(()=>{
        const url = 'http://localhost:8000/news';

        fetch(url).then(response=>{
            return response.json()
        }).then(data=>{
            setArticles(data)
            console.log('fetched news')
        })
    },[])


    return (
        <div className={'news-feed'}>
            <h3>News Feed:</h3>
            {articles.map((article,index)=><a key={index} href={article.links['canonical']} target={"_blank"}><p key={index}>{article.attributes.publishOn.slice(0,10)} : {article.attributes.title}</p></a>)}
        </div>
    )
}

export default NewsFeed