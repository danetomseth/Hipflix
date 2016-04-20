app.factory("ReviewsFactory", ($http) => {
    return {
        fetchAll: ()=>{
            return $http.get('/api/reviews')
            .then(categories => categories.data)
        },
        fetchOne: category => {
            return $http.get('/api/categories/'+category)
            .then(category => category.data)
        },
        create: newCategory => {
            return $hhtp.post('/api/categories', {newCategory})
            .then(newCategory => newCategory.data)
        }
    }
})
