app.factory("CategoriesFactory", ($http) => {
    return {
        fetchAll: ()=>{
            return $http.get('/api/categories')
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