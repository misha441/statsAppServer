const {Router} = require("express")
const router = Router()
const sqlite3 = require('sqlite3').verbose()
const fs = require("fs")


async function dataB(){

    let rawdata = fs.readFileSync('./databases/users.json');
    let users = JSON.parse(rawdata);


    let db = await new sqlite3.Database('users.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            console.error(err.message);
        } else{
            console.log('Connected to the chinook database.');
        }
    });
    console.log('1')
    //db.run(`CREATE TABLE users(id, first_name, last_name, email, gender, ip_address)`)

    // const sql = `INSERT INTO users (id, first_name, last_name, email, gender, ip_address)
    //                 VALUES(?,?,?,?,?,?)`
    // users.forEach(row => {
    //     const {id, first_name, last_name, email, gender, ip_address} = row
    //     db.run(sql,[id, first_name, last_name, email, gender, ip_address])
    // })

    page = 4
    amount = 10

    const sql_get = `SELECT * FROM users ORDER BY id desc limit ${page*amount}, ${amount}`

    db.all(sql_get, [], (err, rows) => {
        if (err) {
            throw err;
        }
        rows.forEach((row) => {
            console.log(row)
        });
        console.log(rows)
    });

    db.close();
}


async function graphs(){

    // let rawdata = fs.readFileSync('./databases/users.json');
    // let users = JSON.parse(rawdata);
    //
    //
    // let db = await new sqlite3.Database('users.db', sqlite3.OPEN_READWRITE, (err) => {
    //     if (err) {
    //         console.error(err.message);
    //     } else{
    //         console.log('Connected to the chinook database.');
    //     }
    // });
    // console.log('1')
    // //db.run(`CREATE TABLE users(id, first_name, last_name, email, gender, ip_address)`)
    //
    // // const sql = `INSERT INTO users (id, first_name, last_name, email, gender, ip_address)
    // //                 VALUES(?,?,?,?,?,?)`
    // // users.forEach(row => {
    // //     const {id, first_name, last_name, email, gender, ip_address} = row
    // //     db.run(sql,[id, first_name, last_name, email, gender, ip_address])
    // // })
    //
    // page = 4
    // amount = 10
    //
    // const sql_get = `SELECT * FROM users ORDER BY id desc limit ${page*amount}, ${amount}`
    //
    // db.all(sql_get, [], (err, rows) => {
    //     if (err) {
    //         throw err;
    //     }
    //     rows.forEach((row) => {
    //         console.log(row)
    //     });
    //     console.log(rows)
    // });
    //
    // db.close();

    // let rawdata = fs.readFileSync('./databases/users_statistic.json');
    // let users = JSON.parse(rawdata);

    let db = await new sqlite3.Database('users_statistic.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            console.error(err.message);
        } else{
            console.log('Connected to the chinook database.');
        }
    });

    // db.run(`CREATE TABLE usersStats(user_id, date, page_views, clicks)`)


    // const sql = `INSERT INTO usersStats (user_id, date, page_views, clicks)
    //                 VALUES(?,?,?,?)`
    // users.forEach(row => {
    //     const {user_id, date, page_views, clicks} = row
    //     db.run(sql,[user_id, date, page_views, clicks])
    // })

    const user_id = 139
    const startDate = "'2019-10-08'"
    const endDate = "'2019-10-10'"
    const sql_get = `SELECT * FROM usersStats WHERE user_id = ${user_id} AND date >= ${startDate} AND date <= ${endDate}`
    console.log('1')
    db.all(sql_get, [], (err, rows) => {
        if (err) {
            throw err;
        }
        rows.forEach((row) => {
            console.log(row)
        });
    });

}



router.get('/users', async (req, res) => {
    try{

        const page = req.query.page;
        // const {page,amount} = res.body
        //
        // console.log(page, amount)

        // let rawdata = fs.readFileSync('./databases/users.json');
        // let users = JSON.parse(rawdata);


        let db = await new sqlite3.Database('users.db', sqlite3.OPEN_READWRITE, (err) => {
            if (err) {
                console.error(err.message);
            } else{
                console.log('Connected to the chinook database.');
            }
        });

        //db.run(`CREATE TABLE users(id, first_name, last_name, email, gender, ip_address)`)

        // const sql = `INSERT INTO users (id, first_name, last_name, email, gender, ip_address)
        //                 VALUES(?,?,?,?,?,?)`
        // users.forEach(row => {
        //     const {id, first_name, last_name, email, gender, ip_address} = row
        //     db.run(sql,[id, first_name, last_name, email, gender, ip_address])
        // })


        amount = 10

        const sql_get = `SELECT * FROM users ORDER BY id desc limit ${page*amount}, ${amount}`

        db.all(sql_get, [], (err, rows) => {
            if (err) {
                throw err;
            }
            // rows.forEach((row) => {
            //     console.log(row)
            // });
            // console.log(rows)

            //res.send(rows)
            return res.status(201).json(rows)
        });

        db.close();




    } catch (e){
        res.status(500).json({message: 'Что-то пошло не так...'})
    }
})


router.get('/usersAmount', async (req, res) => {
    try{

        let db = await new sqlite3.Database('users.db', sqlite3.OPEN_READWRITE, (err) => {
            if (err) {
                console.error(err.message);
            } else{
                console.log('Connected to the chinook database.');
            }
        });

        const sql_get = `SELECT COUNT(id) as amount FROM users`

        db.all(sql_get, [], (err, rows) => {
            if (err) {
                throw err;
            }
            return res.status(201).json(rows)
        });

        db.close();
    } catch (e){
        res.status(500).json({message: 'Что-то пошло не так...'})
    }
})

router.get('/userStatInfo', async (req, res) => {
    try{

        const user_id = req.query.user_id;
        const startDate = `'${req.query.startDate}'`
        const endDate = `'${req.query.endDate}'`

        console.log(startDate, endDate)

        let db = await new sqlite3.Database('users_statistic.db', sqlite3.OPEN_READWRITE, (err) => {
            if (err) {
                console.error(err.message);
            } else{
                console.log('Connected to the chinook database.');
            }
        });

        // user_id = 139
        // startDate = "'2019-10-08'"
        // endDate = "'2019-10-13'"
        const sql_get = `SELECT * FROM usersStats WHERE user_id = ${user_id} AND date >= ${startDate} AND date <= ${endDate}`

        db.all(sql_get, [], (err, rows) => {
            if (err) {
                throw err;
            }
            return res.status(201).json(rows)
        });

        db.close();
    } catch (e){
        res.status(500).json({message: 'Что-то пошло не так...'})
    }
})

router.get('/userById', async (req, res) => {
    try{

        const user_id = req.query.user_id;

        let db = await new sqlite3.Database('users.db', sqlite3.OPEN_READWRITE, (err) => {
            if (err) {
                console.error(err.message);
            } else{
                console.log('Connected to the chinook database.');
            }
        });

        const sql_get = `SELECT * FROM users WHERE id = ${user_id}`

        db.all(sql_get, [], (err, rows) => {
            if (err) {
                throw err;
            }
            return res.status(201).json(rows[0])
        });

        db.close();
    } catch (e){
        res.status(500).json({message: 'Что-то пошло не так...'})
    }
})

module.exports = router