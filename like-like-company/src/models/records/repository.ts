export class Repository {

    protected createCurrentDateTime(){
        const date = new Date();
        const year = date.getFullYear();
        let month : string | number = date.getMonth()+1 === 13 ? 1 : date.getMonth()+1;
        let day : string | number = date.getDate();

        if(month < 10){
            month = `0${month}`
        };

        if(day < 10){
            day = `0${day}`
        };

        return `${year}-${month}-${day}`;
    };
}