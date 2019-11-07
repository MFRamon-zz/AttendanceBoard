import firebase from "firebase/app";
import "firebase/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyAyq72XN4yce1c23BDFd2dUKe8RQ3LrAzE",
  authDomain: "ipuerk-dev.firebaseapp.com",
  projectId: "ipuerk-dev"
});

let db = firebase.firestore();

//TODO
const getActiveTeachers = () => {
  const actualHour = 0;
};

/**
 * Gets list of geofences
 */
const getGeofences = async () => {
  return await db
    .collection("geofences")
    .get()
    .then(snapshot => snapshot.docs.map(doc => doc.data()));
};

/**
 * Gets list of classrooms names by getting all the documents in the classrooms collection,
 * iterating each document and returning just the name property.
 */
const getClassrooms = async () => {
  return await db
    .collection("classrooms")
    .get()
    .then(snapshot => snapshot.docs.map(doc => doc.data().name));
};

//TODO: Position should change object type
/**
 * Inserting a new teacher by getting the reference of the teacher collection and
 * adding a new document with the information of the given param.
 *
 * @param {object} teacher Javascript object with the teacher params
 */
const newTeacher = teacher => {
  db.collection("teacher")
    .add(teacher)
    .then(snapshot => console.log("Bien: " + snapshot));
};

/**
 * Inserting the attendace info by getting the reference of the attendance collection
 * and adding a new document with the information of the given param.
 *
 * @param {object} attendace Javascript object with the attendance params
 */
const setAttendance = attendace => {
  db.collection("attendace")
    .add(attendace)
    .then(snapshot => console.log("Attendace: " + snapshot));
};

//TODO: Fix
/**
 * Updating a geofence by getting the reference of the geofences collection and
 *
 * @param {object} geofence Javascript object with the geofence params
 */
const updateGeofence = geofence => {
  db.collection("geofences")
    .add(geofence)
    .then(snapshot => console.log("Geofence updated: " + snapshot));
};

export {
  getGeofences,
  getClassrooms,
  newTeacher,
  setAttendance,
  updateGeofence
};
