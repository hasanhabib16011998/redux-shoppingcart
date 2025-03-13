import React from 'react'
import NavBar from '../components/navBar/NavBar'
import Tags from '../components/tags/Tags'
import VideoGrid from '../components/grid/VideoGrid'
import Pagination from '../components/ui/Pagination'
import Footer from '../components/footer/footer'

function Home() {
  return (
    <>
        <NavBar/>
        <Tags/>
        <VideoGrid/>
        <Pagination/>
        <Footer/>

    </>
  )
}

export default Home