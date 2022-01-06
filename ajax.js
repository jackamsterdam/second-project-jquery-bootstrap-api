//ajax logic

function getJSON(url) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: url,
            method: 'GET',
            success: data => {
                resolve(data)
            },
            error: err => {
                reject(err)
            }
        })
        
    })
}
