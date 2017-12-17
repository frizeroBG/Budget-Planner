const host = 'http://localhost:5000/';

async function register(name, email, password) {
    const res = await fetch(host + 'auth/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name,
            email,
            password
        })
    });
    return await res.json();
}

async function login(email, password) {
    const res = await fetch(host + 'auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    });
    return await res.json();
}

async function getPlan(year) {
    const res = await fetch(host + 'plan/' + year, {
        method: 'GET',
        headers: {
            Authorization: 'bearer ' + localStorage.getItem('authToken')
        },
    });
    return await res.json();
}

async function getExpress(year, mount) {
    const res = await fetch(host + 'plan/' + year + '/' + mount, {
        method: 'GET',
        headers: {
            Authorization: 'bearer ' + localStorage.getItem('authToken')
        },
    });
    return await res.json();
}

async function updateExpress(year, mount, expressData) {
    const res = await fetch(host + 'plan/' + year + '/' + mount, {
        method: 'POST',
        headers: {
            Authorization: 'bearer ' + localStorage.getItem('authToken'),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(expressData)
    });
    return await res.json();
}

async function addExpress(year, mount, expressData) {
    const res = await fetch(host + 'plan/' + year + '/' + mount + '/expense', {
        method: 'POST',
        headers: {
            Authorization: 'bearer ' + localStorage.getItem('authToken'),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            amount: Number(expressData.amount),
            category: expressData.category,
            date: Number(expressData.date),
            name: expressData.name
        })
    });
    return await res.json();
}

async function deleteExpress(expenseId) {
    const res = await fetch(host + 'plan/expense/' + expenseId, {
        method: 'DELETE',
        headers: {
            Authorization: 'bearer ' + localStorage.getItem('authToken'),
        }
    });
    return await res.json();
}

export { register, login, getPlan, getExpress, updateExpress, addExpress, deleteExpress };