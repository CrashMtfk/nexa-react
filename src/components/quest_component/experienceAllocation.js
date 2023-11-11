import axios from "axios";

export default function handleExperienceDistribution(quest) {
  const userId = localStorage.userId;
  let questExperience = quest.difficulty.experience;
  axios
    .get(`http://localhost:8080/user/current/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
      },
    })
    .then((resp) => {
      checkForLevelUp(resp.data, questExperience);
    })
    .catch((err) => console.log(err));
}

function checkForLevelUp(user, questExperience) {
  let addedExperience = user.experience + questExperience;
  if (addedExperience >= user.requiredExperience) {
    let excessExperience = addedExperience - user.requiredExperience;
    levelUp(excessExperience, user.id);
  } else {
    changeExperience(questExperience, user.id);
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
    .then((resp) => {
      console.log(resp.data);
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
