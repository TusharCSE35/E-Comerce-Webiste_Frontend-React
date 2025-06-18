const checkStorage = key =>{
    if(localStorage.getItem(key)){
        try{
            return JSON.parse(localStorage.getItem(key))
        }catch(e){
            localStorage.removeItem(key)
            throw e
        }
    }
}

const removeFromStorage = key=>{
    if(localStorage.getItem(key)){
        localStorage.removeItem(key)
    }
}

const saveToStorage=(key,value)=>{
    localStorage.setItem(key, JSON.stringify(value))
}

export const LocalStorageService={
    checkStorage,
    saveToStorage,
    removeFromStorage
}