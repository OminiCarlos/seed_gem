
// from scripts.js - this sends a select query to app controller
async function fetchAndDisplayUsers() {
    const tableElement = document.getElementById('demotable');
    const tableBody = tableElement.querySelector('tbody');

    const response = await fetch('/demotable', {
        method: 'GET'
    });

    const responseData = await response.json();
    const demotableContent = responseData.data;

    // Always clear old, already fetched data before new fetching process.
    if (tableBody) {
        tableBody.innerHTML = '';
    }

    demotableContent.forEach(user => {
        const row = tableBody.insertRow();
        user.forEach((field, index) => {
            const cell = row.insertCell(index);
            cell.textContent = field;
        });
    });
}

// from appControler.js - this dispatches the subfunction fetchDemotableFromDb(), and package 
// the result into a json file. 
router.get('/demotable', async (req, res) => {
    const tableContent = await appService.fetchDemotableFromDb();
    res.json({data: tableContent});
});

// from appService.js - this sends the query to Oracle, return a list of tuples. 
async function fetchDemotableFromDb() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            // change the querys here. 
            `SELECT * 
            FROM DEMOTABLE
            WHERE`
        );
        return result.rows;
    }).catch(() => {
        return [];
    });
}