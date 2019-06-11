"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser")); // important pour faire fonctionner req.body
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const admin = require('firebase-admin');
const serviceAccount = require('../nodeAlone/cle.json'); // bug path node '-'
const app = express_1.default();
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://myazerty.firebaseio.com",
});
const db = admin.firestore();
app.use(body_parser_1.default());
app.use(cors_1.default());
const ref = db.collection('hostels');
app.get('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const hostels = [];
    const hostelsref = yield ref.get();
    hostelsref.forEach((hostel) => hostels.push(hostel.data())); // hostel : ... Webstorm correction '-'
    res.send(hostels);
}));
app.post('/add', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const body = req.body;
    yield ref.add(body);
    res.send('post used');
}));
app.delete('/sup/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
    yield ref.doc(req.params.id).delete();
    res.send('Hostel Delete');
}));
app.put('/update/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const body2 = req.body;
    yield ref.doc(req.params.id).update(body2);
    res.send('update new hostel');
}));
app.patch('/modif/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const body3 = req.body;
    yield ref.doc(req.params.id).update(body3);
    res.send('Modifier');
}));
app.set('view engine', 'pug');
app.use(express_1.default.static('views'));
app.use(express_1.default.static('Asset'));
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
//# sourceMappingURL=index.js.map