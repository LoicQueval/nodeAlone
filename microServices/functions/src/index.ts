import * as functions from 'firebase-functions';
import {HostelsModel} from './hostels.model';
import * as admin from 'firebase-admin';

admin.initializeApp();

exports.on_hostel_created = functions.firestore
    .document('hostels/{hostelId}')
    .onCreate((snap, context) => {

        const newHotel: HostelsModel = snap.data() as HostelsModel;
        newHotel.uId = snap.id;
        newHotel.created = admin.firestore.FieldValue.serverTimestamp();
        return snap.ref.set(newHotel)
    });
