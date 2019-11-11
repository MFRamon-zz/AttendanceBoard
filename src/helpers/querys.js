import firebase from "firebase/app";
import "firebase/firestore";
import config from "../config";

firebase.initializeApp(config.firebaseConfig);

let db = firebase.firestore();

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

/**
 * Updating a geofence by getting the reference of the geofence document attached to the given id
 * and replacing the info with the given object.
 *
 * @param {object} geofence Javascript object with the geofence params
 */
const updateGeofence = async (id, geofence) => {
  await db
    .collection("geofences")
    .doc(id)
    .set(geofence)
    .then(snapshot => console.log(snapshot));
  console.log("entro");
};

/**
 * Get the list of the active teachers depending on the current hour.
 *
 * @param {number} currentHour The current hour in 24 hours format
 */
const getActiveTeachers = async currentHour => {
  const query = db.collection("courses");
  query.where("schedule.startTime", "<=", currentHour);
  query.where("schedule.endTime", ">=", currentHour);

  const teacherRef = await query
    .get()
    .then(snapshot => snapshot.docs.map(doc => doc.data().teacher));
  const listTeachers = await db
    .collection("teacher")
    .get()
    .then(snapshot => snapshot.docs);

  const teacher = teacherRef.map(ref =>
    listTeachers
      .find(item => {
        if (item.ref === ref);
        {
          return item;
        }
      })
      .data()
  );

  return teacher;
};

export {
  getGeofences,
  getClassrooms,
  newTeacher,
  setAttendance,
  updateGeofence,
  getActiveTeachers
};
