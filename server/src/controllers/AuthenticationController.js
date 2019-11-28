const User = require('../models/User.js');
const Travel = require('../models/Travel.js');
const TravelUser = require('../models/TravelUser.js');
const Sequelize = require('sequelize');
const Op = Sequelize.Op
const bcrypt = require('bcrypt');
const saltRounds = 10;


module.exports = {
    async register(req, res) {
        try {    
            var hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);
            req.body.password = hashedPassword
            const user = await User.create(req.body);
            const userJson = user.toJSON()
            res.send({
                user: userJson
            })
        }
        catch (err) {
            res.status(400).send({
                error: 'Korisničko ime je već upotrebljeno.'
            })
        }
    },

    async registerForTravel(req, res) {
        try { 
            await TravelUser.create(req.body);
            res.send({
                msg: 'Uspešno ste se registrovali za putovanje'
            })
        }
        catch (err) {
            res.status(400).send({
                error: 'Već ste registrovani za putovanje'
            })
        }
    },

    async login(req, res) {
        try {
            const logedUser = await User.findOne({ where: {username: req.body.username} })
            if (!logedUser) {
                return res.status(403).send({
                  error: 'Nevalidno korisnicko ime'
                })
            }
            const match = await bcrypt.compare(req.body.password, logedUser.password)
            if (!match) {
                return res.status(403).send({
                  error: 'Pogresna lozinka'
                })
            }
            
            const userJson = logedUser.toJSON()
            res.send({
                user: userJson
            })
        }
        catch (err) {
            res.status(400).send({
                error: 'Greska'
            })
        }
    },

    async createTravel(req, res) {
        try {    
            await Travel.create({
                title: req.body.title,
                price: req.body.price,
                dateFrom: req.body.dateFrom,
                dateTo: req.body.dateTo,
                imageURL: "http://localhost:8888/" + req.file.path,
                description: req.body.description,
                type: req.body.type,
                transport: req.body.transport
            });
            res.send({
                msg: "Putovanje uspešno dodato!"
            })
        } catch (err) {
            res.status(400).send({
                error: 'Putovanje sa datim nazivom već postoji.'
            })
        }
    },

    async getTravels(req, res) {
        try {
            const travels = await Travel.findAll()
            res.send(travels)
        } catch (err) {
            res.status(400).send({
                error: 'Neuspelo dohvatanje putovanja'
            })
        } 
    },

    async getUserTravels(req, res) {
        try {
            const travels = await TravelUser.findAll({ where: {userId: req.body.userId} })
            let userTravels = []
            for (const travel of travels){
                const oneTravel = await Travel.findOne({ where: {id: travel.travelId} })
                userTravels.push(oneTravel)
            }
            res.send(userTravels)
        } catch (err) {
            res.status(400).send({
                error: 'Neuspelo dohvatanje putovanja'
            })
        } 
    },

    async deleteTravel(req, res) {
        try {    
            await Travel.destroy({ where: { id: req.body.travelId}})
            res.send({
                msg: "Putovanje uspešno obrisano!"
            })
        } catch (err) {
            res.status(400).send({
                error: 'Neuspelo brisanje putovanja.'
            })
        }
    },

    async cancelTravel(req, res) {
        try { 
            await TravelUser.destroy({ where: { [Op.and]: [{travelId: req.body.travelId}, {userId: req.body.userId}]}});
            res.send({
                msg: 'Uspešno ste obrisali putovanje'
            })
        }
        catch (err) {
            res.status(400).send({
                error: 'Neuspelo brisanje putovanja'
            })
        }
    },

    async updateTravel(req, res) {
        try{
            await Travel.update({
                title: req.body.title,
                price: req.body.price,
                dateFrom: req.body.dateFrom,
                dateTo: req.body.dateTo,
                description: req.body.description,
                type: req.body.type,
                transport: req.body.transport
            },
            {where: { title: req.body.oldTitle}});
            res.send({
                msg: "Putovanje uspešno izmenjeno!"
            })
        } catch (err) {
            res.status(400).send({
                error: 'Neuspesno menjanje putovanja'
            })
        }
    },

    async updateTravelImage(req, res) {
        try {   
            console.log(req.body) 
            await Travel.update({
                imageURL: "http://localhost:8888/" + req.file.path
            },
            {where: { title: req.body.title}});
            res.send({
                msg: "Fotografija putovanja uspesno promenjena!",
                imageURL: "http://localhost:8888/" + req.file.path
            })
        } catch (err) {
            res.status(400).send({
                error: 'Neuspesno menjanje fotografije putovanja'
            })
        }
    }
}
