class AngajatIT {
    constructor(cnp, nume, prenume, vechime, departament) {
        this.cnp = cnp;
        this.nume = nume;
        this.prenume = prenume;
        this.vechime = vechime;
        this.departament = departament;
    }

    afiseazaVarsta() {
        const cod = String(this.cnp).substr(0, 1)  
        let anNastere = String(this.cnp).substr(1, 2);
        if (cod == '1' || cod == '2')
        {
            anNastere = "19" + anNastere;
        }
         
        if (anNastere == '5' || anNastere == '6')
        {
            anNastere = '20' + anNastere;
        }
        console.log(this.prenume + ' are varsta de ' + parseInt(new Date().getFullYear() - parseInt(anNastere)))
    }

    afiseazaAnulAngajarii() {
        let anCurent = new Date().getFullYear();
        console.log('anul nagajarii pentru ' + this.prenume + ': ' + parseInt(anCurent - this.vechime))
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
        console.log(this.prenume + ' ' + this.nume +  ' testează software!');
    }
}

class Developer extends AngajatIT {
    constructor(cnp, nume, prenume, vechime, departament) {
        super(cnp, nume, prenume, vechime, departament);
    }

    lucreaza() {
        console.log(this.prenume + ' ' + this.nume +  ' scrie cod!')
    }
}

console.log("################## Punctul 1 ##################")

let userQA = new QA('1920823244538', 'Popescu', 'Ion', 2, 'Quality assurance');
userQA.lucreaza();
userQA.afiseazaVarsta();
userQA.afiseazaAnulAngajarii();


let userDev = new Developer('2930511244541', 'Cristea', 'Maria', 3, 'Development')
userDev.lucreaza();
userDev.afiseazaVarsta();
userDev.afiseazaAnulAngajarii();