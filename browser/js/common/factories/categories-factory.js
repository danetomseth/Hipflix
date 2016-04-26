core.factory("CategoriesFactory", ($http) => {
    return {
        fetchAll: ()=>{
            return $http.get('/api/categories')
            .then(categories => categories.data)
        },
        fetchOne: category => {
            return $http.get('/api/categories/'+category)
            .then(category => category.data)  // return movies in one category
        },
        create: newCategory => {
            return $http.post('/api/categories', newCategory)
            .then(newCategory => newCategory.data)
        }
    }
})
