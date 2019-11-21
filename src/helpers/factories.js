import firebase from "firebase/app";
import "firebase/firestore";

const newTeacher = (name, role, uid) => {
  return {
    name,
    role,
    position: firebase.firestore.GeoPoint(0, 0),
    uid,
    attendance: [],
    active: false
  };
};

const newAttendance = attendance => {
  return {
    attendance,
    date: firebase.firestore.Timestamp.fromDate(Date.now)
  };
};

const newClassroom = name => {
  return {
    name,
    courses: []
  };
};

const newGeofence = (classroom, lat, lng, length) => {
  return {
    classroom: firebase.firestore.DocumentReference(`/classroom/${classroom}`),
    coordinates: firebase.firestore.GeoPoint(lat, lng),
    length
  };
};

const newCourse = (title, teacherRef, startTime, endTime) => {
  return {
    title,
    schedule: {
      endTime,
      startTime
    },
    teacher: firebase.firestore.DocumentReference(`/teacher/${teacherRef}`)
  };
};

export { newTeacher, newAttendance, newClassroom, newGeofence, newCourse };
