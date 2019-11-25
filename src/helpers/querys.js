import "firebase/firestore";
import app from "../config/firebaseConfig";

let db = app.firestore();

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

/**
 * Adds a new course in the database.
 *
 * @param {object} course Javascript object with course information
 */
const addCourses = async course => {
  await db
    .collection("courses")
    .add(course)
    .then(snapshot => console.log(snapshot));
};

/**
 * Creates a new classroom in the database.
 *
 * @param {object} classroom Javascript object with classroom information
 */
const newClassroom = async classroom => {
  await db
    .collection("classrooms")
    .add(classroom)
    .then(snapshot => console.log(snapshot));
};

//TODO: Update documentation
/**
 * Inserting the attendace info by getting the reference of the attendance collection
 * and adding a new document with the information of the given param.
 *
 * @param {object} attendace Javascript object with the attendance params
 */
const createAttendance = async (attendace, teacherRef) => {
  const tRef = db.collection("teachers").doc(teacherRef);

  const docRef = await db
    .collection("attendace")
    .add(attendace)
    .then(snapshot => snapshot.id);

  const teacherAttendance = await tRef
    .get()
    .then(snapshot => snapshot.data().attendace)
    .finally(async () => {
      teacherAttendance.push(db.doc(`attendance/${docRef}`));
      await tRef.update({ attendace: teacherAttendance });
    });
};

const teacherInsideClassroom = async (inside, attendanceRef) => {
  await db
    .collection("attendance")
    .doc(attendanceRef)
    .update({ inside: inside })
    .then(snapshot => console.log(snapshot));
};

const setAttendance = async attendanceRef => {
  const ref = db.collection("attendance").doc(attendanceRef);
  const attendance = await ref
    .get()
    .then(snapshot => snapshot.data())
    .finally(() => {
      ref.update({ attendace: attendance });
    });
};

//TODO: LISTEN FOR LOCATION CHANGES
db.collection("cities")
  .doc("SF")
  .onSnapshot(function(doc) {
    console.log("Current data: ", doc.data());
  });

export {
  getGeofences,
  getClassrooms,
  newTeacher,
  createAttendance,
  updateGeofence,
  getActiveTeachers,
  addCourses,
  newClassroom,
  teacherInsideClassroom,
  setAttendance
};
