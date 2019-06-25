import * as functions from 'firebase-functions';
import {HostelsModel, RoomsModel} from './hostels.model';
import * as admin from 'firebase-admin';

admin.initializeApp();

exports.on_hostel_created = functions.firestore
    .document('hostels/{hostelId}')
    .onCreate((snap, context) => {

        const newHotel: HostelsModel = snap.data() as HostelsModel;
        newHotel.uid = snap.id;
        newHotel.created = admin.firestore.FieldValue.serverTimestamp();
        return snap.ref.set(newHotel)
    });

exports.on_room_created = functions.firestore
    .document('rooms/{roomId}')
    .onCreate((snap, context) => {
        const newRoom: RoomsModel = snap.data() as RoomsModel;
        newRoom.uid = snap.id;
        newRoom.created = admin.firestore.FieldValue.serverTimestamp();
        return snap.ref.set(newRoom)
    });


