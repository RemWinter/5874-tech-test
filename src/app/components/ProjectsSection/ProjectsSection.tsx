'use client';
import React, { useEffect, useRef, useState } from 'react'
import styles from './ProjectSection.module.css'
import {  Swiper, SwiperRef, SwiperSlide } from 'swiper/react'
import { Swiper as SwiperComponent } from 'swiper'
import 'swiper/swiper-bundle.css'
import { store, useAppDispatch, useAppSelector } from '../redux/store'
import { getProjectData, getTabs } from '../redux/landingSlice'
import { Provider } from 'react-redux';
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

const ProjectsSection = () => {

  return (
    <Provider store={store}>
      <div className={styles.projectsContainer}>
        <div>
          <h1 className={styles.projectsHeader}>
            Some of our<br/>
            <span style={{color:'#506473'}}>recent projects</span>
          </h1>
        </div>
          <Projects/>
      </div>
    </Provider>
  )
}

const Projects: React.FC = () => {
  const {projectTabs} = useAppSelector(state => state.landingSlice)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getTabs(null))
    dispatch(getProjectData({tab:'all'}))
      .unwrap()
      .then(res => {

      }).catch(() => {

      })
  },[])

  return (
    <div className={styles.tabsOuterContainer}>
      <Tabs tabs={projectTabs} dispatch={dispatch}/>
      <Carousel />
    </div>
  )
}

interface ProjectTab {
  title: string;
}

interface TabsProps {
  tabs: ProjectTab[] | null;
  dispatch: Function;
}

const Tabs: React.FC<TabsProps> = ({tabs, dispatch}) => {
  const [activeTab, setActiveTab] = useState<string>('all')
  const tabStyle = {
    borderBottom: '1px solid #506473'
  }
  const tabActiveStyle = {
    borderBottom: '2px solid #C0345E',
    marginBottom: '-0.5px',
  }
  const handleTabChange = (newTab:string) => {
    const payload = {
      tab: newTab
    }
    dispatch(getProjectData(payload))
      .unwrap()
      .then(() => setActiveTab(newTab))
  }
  return (
    <div className={styles.tabsContainer}>
      {tabs?.map(tab => (
        <div 
          className={styles.tab} 
          style={
            activeTab === tab.title ? tabActiveStyle : tabStyle
          }
          onClick={() => handleTabChange(tab.title)}
        >
          <h1 className={activeTab === tab.title ? styles.activeTab : ''}>{tab.title}</h1>
        </div>
      ))}
    </div>
  )
}

interface ProjectCard {
  image: string;
  title: string;
  description1: string;
  description2: string;
  cardSize: number;
}

const Carousel: React.FC = () => {
  const {projectData} = useAppSelector(state => state.landingSlice)
  const [chunkedData, setChunkedData] = useState<ProjectCard[][]>()
  const [swiper, setSwiper] = useState<SwiperComponent>()
  const [swiperIsStart, setSwiperIsStart] = useState<boolean | undefined>(true)
  const [swiperIsEnd, setSwiperIsEnd] = useState<boolean | undefined>(false)
  const dispatch = useAppDispatch()
  const chunkSize = 5


  useEffect(() => {
    dispatch(getProjectData({tab:'all'}))
      .unwrap()
      .then(() => {

      })
  },[])

  useEffect(() => {
    console.log(swiper?.width)
  },[swiper])

  useEffect(() => {
    if (projectData) {
      const data: ProjectCard[][] = []
      for (let i = 0; i < projectData?.length; i += chunkSize) {
        const chunk = projectData?.slice(i, i + chunkSize);
        data.push(chunk);
      }
      setChunkedData(data)
    }
  }, [projectData])

  const initSwiper = (swiper:SwiperComponent) => {
    setSwiper(swiper)
  }

  const chevronButtonDisabledStyle = {
    backgroundColor: '#50647380',
    color: '#506473'
  }
  const chevronButtonActiveStyle = {
    backgroundColor: '#19293A',
    color: '#fff'
  }

  const handleSlideChange = (swiper:SwiperComponent) => {
    setSwiperIsStart(swiper.isBeginning)
    setSwiperIsEnd(swiper.isEnd)
  }

  return (
    <div>
      <Swiper
        slidesPerView={1}
        spaceBetween={0}
        navigation
        pagination={{ clickable: true }}
        onSwiper={initSwiper}
        onSlideChange={handleSlideChange}
        style={{position:'relative'}}
      >
        {/* <div className={styles.projectsInnerContainer}> */}
          {chunkedData?.map((data, index) => (
            <SwiperSlide key={index} className={styles.projectsInnerContainer}>
              {data.map((project, index) => {
                const extraWidth = project.cardSize === 1 ? '0px' : '20px'
                return(
                    
                    <div 
                      className={styles.project} 
                      style={{
                        backgroundImage:`url(${project.image})`, minWidth:`calc(${project.cardSize*30}% + ${extraWidth})`
                      }}
                      >
                    </div>
                )
                })}

            </SwiperSlide>
          ))}
          <div className={styles.buttonGroup}>
            <div 
              className={styles.chevronButtonContainer}
              onClick={() => {swiper?.slidePrev()}}
              style={swiperIsStart ? chevronButtonDisabledStyle : chevronButtonActiveStyle}
            >
              <IoChevronBackOutline
              size={20}/>
            </div>
            <div 
              className={styles.chevronButtonContainer} 
              onClick={() => {swiper?.slideNext()}}
              style={swiperIsEnd ? chevronButtonDisabledStyle : chevronButtonActiveStyle}
            >
              <IoChevronForwardOutline
              size={20}/>
            </div>
          </div>
      </Swiper>
    </div>
  )
}

export default ProjectsSection