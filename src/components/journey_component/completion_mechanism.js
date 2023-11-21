import axios from "axios";

export function verifyCompletion(stages, journey){
    let areCompleted = true;
    stages.forEach(stage => {
        if(stage.status === false){
            areCompleted = false;
        }
    });
    if(!areCompleted){
        return false;
    } else {
        handleJourneyCompletion(journey);
        return true;
    }
}

function handleJourneyCompletion(journey){
    const userId = localStorage.userId;
    axios
    .get(`http://localhost:8080/user/current/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
      },
    })
    .then((resp) => {
        checkForLevelUp(resp.data, journey.experience);
    })
    .catch((err) => console.log(err));
}

function checkForLevelUp(user, journeyExperience) {
    let addedExperience = user.experience + journeyExperience;
    if (addedExperience >= user.requiredExperience) {
      let excessExperience = addedExperience - user.requiredExperience;
      levelUp(excessExperience, user.id);
    } else {
      changeExperience(journeyExperience, user.id);
    }
}

function levelUp(excessExperience, userId) {
    axios
      .patch(`http://localhost:8080/user/${userId}`, null, {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      })
      .then(() => {
        changeExperience(excessExperience, userId);
      })
      .catch((err) => console.log(err));
  }
  
  function changeExperience(experience, userId) {
    axios
      .patch(`http://localhost:8080/user/${userId}/${experience}`, null, {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      })
      .then(() => {
      })
      .catch((err) => {
        if (err.response) {
          console.log("Server Error Data:", err.response.data);
          console.log("Server Error Status:", err.response.status);
        } else {
          console.log("Request Error:", err.message);
        }
      });
  }