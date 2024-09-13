import { useContext, useEffect,useMemo,useState } from 'react'
import './RightSidebar.css'
import assets from '../../assets/assets'
import { logout } from '../../config/firebase'
import { AppContext } from '../../context/AppContext'

const RightSidebar = () => {

  const { chatUser,messages } = useContext(AppContext);
  // const [msgImages,setMsgImages] = useState([]);

  // useEffect(()=>{
  //   let tempVar = [];
  //   messages.map((msg)=>{
  //     if (msg.image) {
  //       tempVar.push(msg.image)
  //     }
  //   })
  //   setMsgImages(tempVar);
  // },[messages])


  // 优化 useEffect 依赖 useMemo 来缓存 msgImages，使得不需要每次都重新遍历 messages。
  const msgImages = useMemo(()=>{
    return messages.reduce((prev,msg) =>{
      if (msg.image) {
        prev.push(msg.image)
      }
      return prev
    },[])
  },[messages])
  
  return chatUser  ? (
    <div className='rs'>
      <div className='rs-profile'>
        <img src={chatUser.userData.avatar} alt="" />
        <h3>{Date.now() - chatUser.userData.lastSeen <= 70000 ?<img className='dot' src={assets.green_dot} alt=''/>:null}{chatUser.userData.name}</h3>
        <p>{chatUser.userData.bio}</p>
      </div>
      <hr />
      <div className="rs-media">
        <p>history photo</p>
        <div>
          {msgImages.map((url,index)=>(<img onClick={()=>window.open(url)} key={index} src={url} alt="" />))}
        </div>
      </div>
      <button onClick={()=>logout()}>Logout</button>
    </div>
  ) : <div className='rs'>
    <button onClick={()=>logout()}>Logout</button>
  </div>
}

export default RightSidebar
