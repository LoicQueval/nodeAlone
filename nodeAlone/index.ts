import bodyParser from 'body-parser'; // important pour faire fonctionner req.body
import express from "express";
import {HostelsModel} from './hostels.model'
import cors from "cors";

const admin = require('firebase-admin');
const serviceAccount = require('../nodeAlone/cle.json'); // bug path node '-'
const app = express();

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://myazerty.firebaseio.com",
});

const db = admin.firestore();
app.use(bodyParser());
app.use(cors());
const ref = db.collection('hostels');


app.get('/', async (req, res) => {
    const hostels: HostelsModel[] = [];
    const hostelsref = await ref.get();
    hostelsref.forEach((value: { data: () => HostelsModel; }) => hostels.push(value.data() as HostelsModel)); // hostel : ... Webstorm correction '-'
    res.send(hostels);
});

app.post('/add', async (req, res) => {
    const hostel: HostelsModel = req.body;
    await ref.add(hostel);
    res.send(hostel);
});

app.delete('/sup/:id', async (req, res) => {
    await ref.doc(req.params.id).delete();
    res.send()
});

app.put('/update/:id', async (req, res) => {
    const body2 = req.body;
    await ref.doc(req.params.id).update(body2);
    res.send()
});

app.patch('/modif/:id', async (req, res) => {
    const body3 = req.body;
    await ref.doc(req.params.id).update(body3);
    res.send()
});

app.set('view engine', 'pug');

app.use(express.static('views'));
app.use(express.static('Asset'));

/*
app.get('/cv', (req, res) => {
    res.render('./index',
        {
            img: '/Asset/myFace.jpg',
            title: 'My CV',
            name: 'Queval Moreno Loïc',
            introduction: 'Connaissances en language informatique et en électronique',
            telephoneNumber: '06 38 86 99 73',
            street: '1 rue Pierre Dac 92110 Clichy',
            mail: 'queval.loic@gmail.com',
            brithday: '11 juin 1997',
            gender: 'Homme',
            skills: 'Compétences',
            programmation: 'Programmation',
            prog1: 'Langages C',
            prog2: 'PHP',
            prog3: 'HTML 5',
            prog4: 'CSS 3',
            prog5: 'MSQL',
            prog6: 'Javascript',
            prog7: 'Jquery',
            langages: 'Langues',
            lang1: 'Anglais lu : ',
            lang2: 'Anglais entendu : ',
            lang3: 'Anglais parlé : ',
            lang4: 'Espagnol lu : ',
            lang5: 'Espagnol entendu : ',
            lang6: 'Espagnol parlé : ',
            quality: 'Qualités',
            qualitys: 'Organisé, Sérieux, Patient, Travail en équipe',
            others: 'Divers',
            other: 'Loisirs',
            interest: 'Centres d\'intérêt : Livres, Informatique, Jeux Vidéo, Echecs',
            sport: 'Sports : Judo (4 ans, Coupe Technique), Handball (3 ans, catégorie minimes, champion interdistrict),\n' +
                'Badminton (2 ans, catégorie cadet)',
            diplome: 'Diplômes',
            bts: 'Bac Technicien Supérieur 2017',
            lieu1: 'Lycée Louis Armand à Nogent-sur-Marne',
            info1: 'Systèmes numériques - option électronique et communications',
            bac: 'Baccalauréat Technique 2015',
            lieu2: 'Lycée Newton à Clichy-sur-Seine :',
            info2: 'Sciences et technologies de l\'industrie et du développement durable - option Système d\'information\n' +
                'numérique (mention assez bien)',
            experiences: 'Expérience professionnel',
        });
});
*/


app.listen(4000, () => {
    console.log('Complete on port 4000!');
});
