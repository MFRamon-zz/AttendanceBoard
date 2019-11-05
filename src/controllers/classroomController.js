import firebase from "firebase/app";
import "firebase/database";

//TODO: will change to getTeachers
const getClassrooms = () => {
  firebase
    .database()
    .ref("classrooms/")
    .once("value")
    .then(snapshot => {
      console.log(snapshot.val());
      return snapshot.val();
    });
};

//TODO: WILL CHANGE
const getGeofences = () => {
  firebase
    .database()
    .ref("classrooms/")
    .once("value")
    .then(snapshot => {
      const geofences = snapshot.val().map(classroom => {
        return classroom.geofence;
      });
      console.log(geofences);
    });
};

const getClassroomsNames = () => {
  firebase
    .database()
    .ref("classrooms/")
    .once("value")
    .then(snapshot => {
      const classroomNames = snapshot.val().map(classroom => {
        return classroom.name;
      });
      console.log(classroomNames);
    });
};

export { getClassrooms, getGeofences, getClassroomsNames };
