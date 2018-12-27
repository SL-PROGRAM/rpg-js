class Creature {


    constructor(name) {
        this._name = name;
        this._force = 1;
        this._intelligence = 1;
        this._agilite = 1;
        this._constitution = 1;
        this._esprit = 1;
        this._niveau = 1;
        this._ami = 0;
        this._chance = 1;
        this._weak = [];
        this._immunity = [];
        this._items = [];

        this._degatsPhy = 0;
        this._defensePhy = 0;
        this._degatsMag = 0;
        this._defenseMag = 0;
        this._vie = 0;
        this._vieMax = 0;
        this._arme = 0;
        this._armure = 0;
        this._mana = 0;
        this._manaMax = 0;
    }


    // Mise en place des setters
    set _force(value) {
        this._force = value;
    }

    set _intelligence(value) {
        this._intelligence = value;
    }

    set _agilite(value) {
        this._agilite = value;
    }

    set _constitution(value) {
        this._constitution = value;
    }

    set _esprit(value) {
        this._esprit = value;
    }

    set _niveau(value) {
        this._niveau = value;
    }

    set _ami(value) {
        this._ami = value;
    }

    set _chance(value) {
        this._chance = value;
    }

//calcul setter


    setDegatPhy(objet = 0) {
        this._degats = Math.floor(this._force / 2) + this._arme + objet;
    }

    setDefensePhy(objet = 0) {
        this._defense = Math.floor(this._constitution / 3) + this._armure + objet;
    }

    setDegatMag(objet = 0) {
        this._degats = Math.floor(this._intelligence / 2) + this._arme + objet;
    }

    setDefenseMag(objet = 0) {
        this._defense = Math.floor(this._esprit / 3) + this._armure + objet;
    }

    setMana() {
        this._mana = this._intelligence * 10;
    }

    setVie() {
        this._vie = 50 + this._constitution * 10;
    }

    setManaMàx() {
        this._manaMax = this._intelligence * 10;
    }

    setVieMàx() {
        this._vieMax = 50 + this._constitution * 10;
    }

    setArme(value) {
        this._arme = value;
    }

    setArmure(value) {
        this._armure = value;
    }


    //fonction general

    faireAction(mana) {
        this._mana -= mana;
        if (this._mana() < 0) {
            const viePerdu = this._mana();
            this._mana = 0;
            this._vie -= viePerdu;
            this.blessure();
        }
    }



    gainVie() {
        this._vie += this._constitution;
        if (this._vie > this._vieMax) {
            this._vie = this._vieMax;
        }
    }

    gainMana() {
        this._mana += this._intelligence;
        if (this._mana > this._manaMax) {
            this._mana = this._manaMax;
        }
    }

    blessure() {
        //Mort
        if (this._vie <= 0) {
            alert(this._name + "est mort");
            this._vie = 0;
        }
        //mortelle
        else if (this._vie < this._vieMax * 0.1) {
            this.setDegatPhy(+2);
            this.setDefensePhy(-3);
            this.setDegatMag(+2);
            this.setDefenseMag(-3);
        }
        //Grave
        else if (this._vie < this._vieMax * 0.25) {
            this.setDegatPhy(-2);
            this.setDefensePhy(-1);
            this.setDegatMag(-2);
            this.setDefenseMag(-1);
        }
        //Moyenne
        else if (this._vie < this._vieMax * 0.5) {
            this.setDegatPhy(-2);
            this.setDegatMag(-2);
        }
        //Legère
        else if (this._vie < this._vieMax * 0.75) {
            this.setDegatPhy(-1);
            this.setDegatMag(-1);
        }
    }

    //action de combats

    neRienFaire() {
        this.gainMana();
        this.gainVie();
    }

    faireDegatsPhy(degats, typeDegats, adversaire, mana){
        this.faireAction(mana);
        if (adversaire._immunity[0] === typeDegats[0]){
            degats -= adversaire._immunity[1]*degats;
        }
        if (adversaire._weak[0] === typeDegats[0]){
            degats += adversaire._weak[1]*degats;
        }
        if (adversaire._defensePhy > degats) {
            alert(this._name + " a raté son attaque sur " + adversaire.name);
        } else {
            adversaire._vie -= degats;
            this.messageFaireDegats(degats, adversaire);
        }
    }

    faireDegatsMag(degats, adversaire, mana, typeDegats){
        this.faireAction(mana);
        if (adversaire._immunity[0] === typeDegats[0]){
            degats -= adversaire._immunity[1]*degats;
        }
        if (adversaire._weak[0] === typeDegats[0]){
            degats += adversaire._weak[1]*degats;
        }
        if (adversaire._defenseMag > degats) {
            alert(this._name + " a raté son attaque sur " + adversaire.name);
        } else {
            adversaire._vie -= degats;
            this.messageFaireDegats(degats, adversaire);
        }
    }


    messageFaireDegats(degats, adversaire) {
        if (degats === 1) {
            alert(this._name + " a infligé " + degats + "point de dégat à " + adversaire.name);
        } else {
            alert(this._name + " a infligé " + degats + "points de dégats à " + adversaire.name);
        }
    }

    attaqueMag(adversaire) {
        this.faireDegatsMag(this._degatsMag, adversaire, 5, "Mag");
    }

    attaquePhy(adversaire) {
        this.faireDegatsPhy(this._degatsPhy, adversaire, 5, "Phy");
    }

    defensePhy() {
        this.faireAction(1);
        this._defensePhy(2);
    }

    defenseMag() {
        this.faireAction(1);
        this._defenseMag(2);
    }

    utiliserObjet(item){
        this.faireAction(2);
    }

}
