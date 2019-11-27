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
 * Gets a classroom by document reference.
 *
 * @param {string} ref Document reference of the classroom
 */
const getClassroomById = async ref => {
  return await db
    .collection("classrooms")
    .doc(ref)
    .get()
    .then(snapshot => snapshot.data());
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
    .then(snapshot => console.log("doc id: " + snapshot.id));
};

//TODO: Get doc id and set it to the corresponding teacher
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
const getActiveTeachers = async (day, currentHour) => {
  const q = await db.collection("courses");
  let query = q.where(`_${day}.start`, "<=", currentHour);

  query = await query
    .get()
    .then(snapshot => snapshot.docs.map(doc => doc.data()));

  query = query.map(q => {
    if (q[`_${day}`].end >= currentHour) {
      return q.teacher;
    }
  });
  query = query.filter(q => q != undefined);

  const listTeachers = await db
    .collection("teacher")
    .get()
    .then(snapshot => snapshot.docs);

  const ids = listTeachers.map(t => t.id);
  const teacherId = query.map(ref => ids.find(item => item == ref.id));

  const activeTeachers = teacherId.map(id =>
    listTeachers.find(t => t.id == id).data()
  );

  return activeTeachers;
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
  return await db
    .collection("classrooms")
    .add(classroom)
    .then(snapshot =>{
      return snapshot
    });
};

/**
 * Creates a new geofence in the firestore database.
 *
 * @param {object} geofence Javascript object with geofence information
 */
const newGeofence = async geofence => {
  await db
    .collection("geofences")
    .add(geofence)
    .then(snapshot => {
      debugger;
      console.log(snapshot)
    });
};



const getCourses = async () => {
  return await db
    .collection("courses")
    .get()
    .then(snapshot =>
      snapshot.docs.map(doc => {
        return {
          ...doc.data(),
          _id: doc.ref
        };
      })
    );
};


/**
 * Removes a document from the specified collection.
 *
 * @param {string} collection Name of the collection of the firebase db.
 * @param {string} field The field of that document that we want to evaluate with the conditional.
 * @param {string} value Value of the field we want to evaluate. 
 */
const removeCollectionsIfField = async (collection,field,value) => {
  return await db
    .collection(collection)
    .where(field,"==", "hola")
    .get()
    .then( (snapshot) => {
      let sn = snapshot.docs.map(doc => doc.ref.delete());
  });  
    // .collection(collection)
    // .where(field,"==",value)
    // .delete()
    // .then(snapshot => snapshot.data());
};

export {
  getGeofences,
  getClassrooms,
  getClassroomById,
  newTeacher,
  setAttendance,
  updateGeofence,
  getActiveTeachers,
  addCourses,
  newClassroom,
  newGeofence,
  getCourses,
  removeCollectionsIfField
};
