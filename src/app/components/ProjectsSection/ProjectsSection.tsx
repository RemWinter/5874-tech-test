'use client';
import React, { useEffect, useRef, useState } from 'react'
import styles from './ProjectSection.module.css'
import heroCardStyles from '../common/HeroCard.module.css'
import {  Swiper, SwiperRef, SwiperSlide } from 'swiper/react'
import { Swiper as SwiperComponent } from 'swiper'
import 'swiper/swiper-bundle.css'
import { useAppDispatch, useAppSelector } from '../redux/store'
import { getProjectData, getTabs } from '../redux/landingSlice'
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

const ProjectsSection = () => {

  const { dimensions } = useAppSelector(state => state.landingSlice)
  const [isMobile, setIsMobile] = useState<boolean>(false)

  useEffect(() => {
    setIsMobile(!!((dimensions.x) <= 1050))
  }, [dimensions])

  return (
      <div className={styles.projectsContainer}>
        <div>
          <h1 className={styles.projectsHeader} style={{textAlign: isMobile ? 'center' : 'left'}}>
            Some of our<br/>
            <span style={{color:'#506473'}}>recent projects</span>
          </h1>
        </div>
          <Projects isMobile={isMobile}/>
      </div>
  )
}

interface ProjectProps {
  isMobile: boolean
}

const Projects: React.FC<ProjectProps> = ({isMobile}) => {
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
      { !isMobile && <Tabs tabs={projectTabs} dispatch={dispatch}/>}
      <Carousel isMobile={isMobile}/>
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
      {tabs?.map((tab, index) => (
        <div 
          key={index}
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

const Carousel: React.FC<{isMobile: boolean}> = ({isMobile}) => {
  const {projectData} = useAppSelector(state => state.landingSlice)
  const [chunkedData, setChunkedData] = useState<ProjectCard[][]>()
  const [swiper, setSwiper] = useState<SwiperComponent>()
  const [swiperIsStart, setSwiperIsStart] = useState<boolean | undefined>(true)
  const [swiperIsEnd, setSwiperIsEnd] = useState<boolean | undefined>(false)
  const [cardHover, setCardHover] = useState<number | null>(null)
  const dispatch = useAppDispatch()
  const chunkSize = 5

  useEffect(() => {
    dispatch(getProjectData({tab:'all'}))
      .unwrap()
      .then(() => {

      })
  },[])

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
      {!isMobile ?
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
                  const extraWidth = project.cardSize === 1 ? '0px' : '6%'
                  return(
                      
                      // <div 
                      //   className={styles.project} 
                      //   style={{
                      //     backgroundImage:`url(${project.image})`, minWidth:`calc(${project.cardSize*30}% + ${extraWidth})`
                      //   }}
                      //   >
                      // </div>
                      <div 
                        key={index}
                        onMouseOver={() => {setCardHover(index)}}
                        onMouseOut={() => setCardHover(null)}
                        className={styles.project} 
                        style={{
                          backgroundImage:`url(${project.image})`, minWidth:`calc(${project.cardSize*30}% + ${extraWidth})`,
                          // flex: 'unset',
                          overflow:'hidden'
                        }}
                        >
                          <div 
                            style={{
                              position:'absolute',
                              height: '100%',
                              width: '100%',
                              backgroundImage: 'linear-gradient(180deg, #00000054, #000000c9)',
                              borderRadius: '10px',
                              paddingBottom: '20px',
                              bottom: cardHover === index ? '0' : '-100%',
                              transition:'all 0.5s'
                            }}
                            >
                            <div style={{
                              display:'flex',
                              flexDirection:'column',
                              height: '100%',
                              justifyContent: 'flex-end',
                              textAlign:'left',
                              color: '#fff',
                              maxWidth: '86%',
                              margin: 'auto',
                            }}>
                              <h1 style={{fontSize: '15px', fontWeight: '400', letterSpacing: '1px'}}>{project.title}</h1>
                              <p style={{marginBottom: '5px', marginTop: '10px'}} className={styles.cardDescription}>{project.description1}</p>
                              <p className={styles.cardDescription}>{project.description2}</p>
                              <p 
                                className={heroCardStyles.link} 
                                style={{
                                  width: 'fit-content', 
                                  paddingBottom: '5px',
                                  borderBottomColor: '#fff',
                                  marginTop: '25px',
                                  textAlign:'left',
                                  fontSize: '14px'
                                  }}>
                                  Full project
                              </p>
                            </div>
                          </div>
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
        </Swiper> :
        <div style={{display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '500px', margin: 'auto'}}>
          {projectData?.slice(0,3).map((project, index) => {
            const extraWidth = project.cardSize === 1 ? '0px' : '6%'
            return(
                
                <div 
                  key={index}
                  className={styles.project} 
                  style={{
                    backgroundImage:`url(${project.image})`, minWidth:`calc(${project.cardSize*30}% + ${extraWidth})`,
                    flex: 'unset',
                  }}
                  >
                    <div style={{
                      position:'absolute',
                      height: '100%',
                      width: '100%',
                      backgroundImage: 'linear-gradient(180deg, #00000054, #000000c9)',
                      borderRadius: '10px',
                      paddingBottom: '20px'
                      }}>
                      <div style={{
                        display:'flex',
                        flexDirection:'column',
                        height: '100%',
                        justifyContent: 'flex-end',
                        textAlign:'center',
                        color: '#fff',
                        maxWidth: '66%',
                        margin: 'auto'
                      }}>
                        <h1 style={{fontSize: '18px', fontWeight: '400', letterSpacing: '1px'}}>{project.title}</h1>
                        <p style={{marginBottom: '5px', marginTop: '10px'}} className={styles.cardDescription}>{project.description1}</p>
                        <p className={styles.cardDescription}>{project.description2}</p>
                        <p 
                          className={heroCardStyles.link} 
                          style={{
                            width: 'fit-content', 
                            marginLeft:'auto', 
                            marginRight:'auto',
                            paddingBottom: '5px',
                            borderBottomColor: '#fff',
                            marginTop: '25px'
                            }}>
                            Full project
                        </p>
                      </div>
                    </div>
                </div>
                
            )
            })}
            <div style={{display:'flex', justifyContent: 'flex-end'}}>
              <a className={heroCardStyles.link} style={{color:'black', textAlign:'right'}} href={'#'}>See all</a>
            </div>
        </div>
      }
    </div>
  )
}

export default ProjectsSection