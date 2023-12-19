
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../Context/auth.context";
import axios from "axios";
import "./index.css";


function UserProfilePage() {
  const { user, BACKEND } = useContext(AuthContext);
  const[loading,setLoading] = useState(true);
  const[profileOwner, setProfileOwner] = useState(null);
  const idToGet = useParams().userId;

  const handleFirstLoggin = (user) => {
  profileOwner?.firstLoggin ?
    axios.put(`${BACKEND}/api/teams/${user.team._id}/adduser`, { memberId: user._id })
    .then(response => {
      console.log(response.data);
      axios.put(`${BACKEND}/api/users/${user._id}`, { firstLoggin: false })
      .then(response => {
        console.log(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
      });
    })
    .catch(error => {
      console.error(error);
    })
    :
    setLoading(false);
  }
  
  useEffect(() => {
    if (user && user._id) {
      axios.get(`${BACKEND}/api/users/${idToGet}`)
        .then((response) => {
          setProfileOwner(response.data)
          handleFirstLoggin(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [user, loading]); 


  

return(

          <div className="to-blur profile-main-div ">
            <div className="profile-banner-div" style={{backgroundImage: loading ? `url("/Hogwarts-banner.png")` : `url(/${profileOwner.team.name}-banner.png)` }}>
            </div>
            {loading ?
            <img className="loading-gif" src="/loading.gif"/>
            :
            <div className="user-div">
            <div className="user-info-div">
              <h1>{profileOwner?.name}</h1>  
              <img className="profile-image" src={profileOwner?.image}></img>
              <p>Member since: {profileOwner?.firstJoined}</p>
              <p>Team: {profileOwner?.team.name}</p>
              <p>Total Points: {profileOwner?.totalPoints}</p>
              <p>Correct Answers: {(profileOwner.totalPoints / profileOwner?.solvedQuizz.length)/5}%</p>
            </div>
            <div className="user-quizz-div">
              <h2>Solved Quizzes:</h2>
              {profileOwner?.solvedQuizz.map((quizz)=>{
                return(
                  <div className="solved-quizz-card">
                    <img className="quizz-icon" src={`/${quizz._id}.jpg`}/>
                    <p>{quizz.name}</p>
                  </div>
                )
              })}
            </div>
            </div>}
            <div className="profile-banner-div" style={{backgroundImage: loading ? `url("/Hogwarts-banner.png")` : `url(/${profileOwner.team.name}-banner.png)` }}>
            </div>
          </div>

    )
};

export default UserProfilePage;
