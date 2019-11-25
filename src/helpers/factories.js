import firebase from "firebase/app";
import "firebase/firestore";

const newTeacher = (name, role, uid) => {
  return {
    name,
    role,
    position: new firebase.firestore.GeoPoint(90, 180),
    uid,
    attendance: [],
    active: false
  };
};

const newAttendance = () => {
  return {
    attendance: false,
    inside: false,
    date: firebase.firestore.Timestamp.fromDate(Date.now)
  };
};

const newClassroom = (name, courses) => {
  return {
    name,
    courses
  };
};

const newGeofence = (classroom, lat, lng, length) => {
  return {
    classroom: firebase.firestore.DocumentReference(`/classroom/${classroom}`),
    coordinates: firebase.firestore.GeoPoint(lat, lng),
    length
  };
};

const newCourse = (title, teacherRef, schedule) => {
  return {
    title,
    schedule,
    teacher: firebase.firestore().doc(`/teacher/${teacherRef}`)
  };
};

const newSchedule = (day, startTime, endTime) => {
  return {
    day,
    startTime,
    endTime
  };
};

export {
  newTeacher,
  newAttendance,
  newClassroom,
  newGeofence,
  newCourse,
  newSchedule
};
