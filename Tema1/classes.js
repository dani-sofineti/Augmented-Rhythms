import utilitare from "./utilitare.js";

class AngajatIT {
    varstaAngajat = null;

    constructor(cnp, nume, prenume, vechime, departament) {
        this.cnp = cnp;
        this.nume = nume;
        this.prenume = prenume;
        this.vechime = vechime;
        this.departament = departament;
    }

    afiseazaVarsta() {
        this.varstaAngajat = this.calculeazaVarsta();
        console.log(`${this.prenume} are varsta de ${this.varstaAngajat} de ani`)
    }

    calculeazaVarsta() {
        const dataNastere = this.#extrageDataNastere(this.cnp);
        const diferentaAniMs = new Date() - new Date(dataNastere).getTime();
        return Math.floor(diferentaAniMs / utilitare.milisecInAn);
    }

    #extrageDataNastere(cnp) {
        const an = this.#extrageAn(cnp);
        const luna = this.#extrageLuna(cnp);
        const zi = this.#extrageZi(cnp);
        return new Date(an, luna, zi);
    }

    #extrageAn(cnp) {
        const cod = String(cnp).substr(0,1);
        const anNastere = String(cnp).substr(1,2);
        switch(cod) {
            case utilitare.codFCnpDin1990:
            case utilitare.codMCnpDin1900:
                return `${utilitare.prefixAnDin1990}${anNastere}`;
            case utilitare.codFCnpDin2000:
            case utilitare.codMCnpDin2000:
                return `${utilitare.prefixAnDin2000}${anNastere}`;
        }
        return null;
    }

    #extrageLuna(cnp) {
        return String(cnp).substr(3,2);;
    }

    #extrageZi(cnp) {
        return  String(cnp).substr(5,2);
    }

    afiseazaAnulAngajarii() {
        let anCurent = new Date().getFullYear();
        console.log(`anul nagajarii pentru ${this.prenume}: ${anCurent - this.vechime}`)
    }

    lucreaza() {
        console.log('Neimplementat');
    }
}

class QA extends AngajatIT {
    constructor(cnp, nume, prenume, vechime, departament) {
        super(cnp, nume, prenume, vechime, departament);
    }

    lucreaza() {
        console.log(`${this.prenume} ${this.nume} testează software!`);
    }
}

class Developer extends AngajatIT {
    constructor(cnp, nume, prenume, vechime, departament) {
        super(cnp, nume, prenume, vechime, departament);
    }

    lucreaza() {
        console.log(`${this.prenume} ${this.nume} scrie cod!`)
    }
}

console.log("################## Punctul 1 ##################")

const userQA = new QA('1920823244538', 'Popescu', 'Ion', 2, 'Quality assurance');
userQA.lucreaza();
userQA.afiseazaVarsta();
userQA.afiseazaAnulAngajarii();

const userDev = new Developer('2930629244541', 'Cristea', 'Maria', 3, 'Development')
userDev.lucreaza();
userDev.afiseazaVarsta();
userDev.afiseazaAnulAngajarii();