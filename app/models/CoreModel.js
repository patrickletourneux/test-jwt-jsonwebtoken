const client = require("../database");
const debug = require('debug')('coreModel');

class CoreModel {
    id;
    constructor(obj) {
        this.id = obj.id;
    }
    /* je récupère tous les users */
    static async findAll() {
                // je suis dans une méthode statique, le this se rapporte à la classe 
        const query = `SELECT * FROM "${this.tableName}"`;

        try {
            // users sera la tableau que je vais retourner
            const results = [];
            const result = await client.query(query);
            ////console.log(result);

            for (const row of result.rows) {
                //j'instancie un objet de type de la classe représentée par this à partir de la ligne récupérée en BDD
                const obj = new this(row);
                // le fait d'instancier la ligne retournée par la BDD, va me permettre après d'avoir des objets User et on aura donc accès aux méthodes des instances (insert,update,delete)
                results.push(obj);
            }

            return results;
        }
        catch (err) {
            //console.error(err);
        }
    };

    static async findById(id) {
        // j'utilise les requêtes préparées -- la requête préparée est une sécurité
        // le $1 sera remplacé par id (premier élément du tableau values)
        const query = `SELECT * FROM "${this.tableName}" WHERE id=$1`;
        const values = [id];

        try {
            const result = await client.query(query, values);
            ////console.log(result);

            // j'instancie un objet de type User à partir de la ligne récupérée en BDD
            const obj = new this(result.rows[0]);

            return obj;
        }
        catch (err) {
            //console.error(err);
        }
    };

    // params pourrait être {id:1},{firstname:"Chuck"}
    static async findBy(params) {
        const columns = [];
        const values = [];
        let counter = 1;
        for(const param in params){
            columns.push(param+"=$"+counter);
            values.push(params[param]);
            counter++;
        }

        // j'utilise les requêtes préparées -- la requête préparée est une sécurité
        // le $1 sera remplacé par id (premier élément du tableau values)

        // SELECT * FROM level WHERE name=$1
        const query = `SELECT * FROM "${this.tableName}" WHERE ${columns.join(" AND ")}`;
        console.log(query);
        try {
            const result = await client.query(query, values);
            ////console.log(result);

            // j'instancie les résultats dans la classe correcte
            // la classe correcte, c'est celle qui a appelé le findBy
            const results = [];
            for(const row of result.rows){
                //  je crèe une instance pour chaque ligne
                const obj = new this(row);
                // je mets tous les résultats dans un tableau
                results.push(obj);
            }

            return results;
        }
        catch (err) {
            //console.error(err);
        }
    };

    /**
     * Met à jour l'instance en BDD
     */
    async update(){
        const properties = Object.keys(this);
        // firstname"=$1,"lastname"=$2,"email"=$3,"password"=$4 
        const values = [];
        const columns = [];
        let counter = 1;
        for(const property of properties){
            const column = property+"=$"+counter;
            columns.push(column);
            values.push(this[property]);
            counter++;
        }

        // j'ajoute l'id en dernier pour qu'il soit en 5ème position ($5)
        values.push(this.id);

        // Je crèe ma requête
        const query = {
            // je demande à la base de données de me retourner l'id généré
            // on peut demander plus que que l'id, je pourrais ajouter le name...
            text:`UPDATE "${this.constructor.tableName}" SET ${columns.join(",")} WHERE id=$${counter}`,
            // le this représente ici l'instance qui appelle la méthode insert
            values
        };

        try{
            // Je mets à jour mon enregistrement dans ma base de données
            await client.query(query);
        }
        catch(err){
            //console.error("UPDATE =>",err);
        }
    }

    /**
     * Supprime l'instance courante
     */
    async delete(){
        // Je crèe ma requête
        const query = {
            // ici le this représente une instance, je peux accéder à la classe via une propriété native qui s'appelle constructor
            text:`DELETE FROM "${this.constructor.tableName}" WHERE id=$1`,
            // le this représente ici l'instance qui appelle la méthode delete
            values:[this.id]
        };
        //console.log(query);

        try{
            // Je l'envoie à la base de données
            await client.query(query);
        }
        catch(err){
            //console.error("DELETE =>",err);
        }
    };

    /**
     * Insère l'instance en BDD
     */
    async insert(){
        debug('insert');
        debug(this)
        const properties = Object.keys(this);
        //console.log("properties",properties);
        // résultat pour user : `"firstname","lastname","email","password"`
        const columns = [];
        const dollars = [];
        const values = [];
        let counter = 1;
        for(const property of properties){
            //console.log("property",property);
            columns.push(property);
            //console.log("dollar","$"+counter)
            dollars.push("$"+counter);
            /*
            le this représente l'instance, on a donc un objet avec ses valeurs
            le fait de faire this[property] va aller chercher dans l'instance, la valeur à la propriété property
            */
           //console.log("this[property",this[property]);
            values.push(this[property]);

            //console.log("#######################");
            counter++;
        }

        // Je crèe ma requête
        const query = {
            // je demande à la base de données de me retourner l'id généré
            // on peut demander plus que que l'id, je pourrais ajouter le name...
            text:`INSERT INTO "${this.constructor.tableName}" (${columns.join(",")}) VALUES (${dollars.join(",")}) RETURNING id`,
            // le this représente ici l'instance qui appelle la méthode insert
            /*  values : values */
            values
        };
        debug(query)

        try{
            //console.log(query);
            // Je l'envoie à la base de données
            const result = await client.query(query);
            //console.log(result);
            if(result.rows.length>0){
                // je mets à jour l'id de mon instance
                this.id = result.rows[0].id;
                //console.log(this);
            }
        }
        catch(err){
            //console.error("INSERT =>",err);
        }
    }

    async save(){
        /* si je n'ai pas d'id alors j'insère mon instance */
        if(!this.id){
            this.insert();
        }
        else{
            this.update();
        }
    }
}

module.exports = CoreModel;