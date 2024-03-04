const truncateString = (string, length)=>{
    let result = '';
    if(string.length <= length){
        return string;
    }

    for(let i=0; i < length; i++){
        result += string[i];
    }
    return (result + '...');
}

// logout user
const disconnectUser = ()=>{
    localStorage.clear();
    window.location.reload();
}

// filter sidebar elements
const filterSideBarElements = (sideBarElements, thing, field='route')=>{
    if(field==='route'){
        for (let indexParent = 0; indexParent < sideBarElements.length; indexParent++) {
            // if element have children then filter chidren
            if(sideBarElements[indexParent].children){
                const children = sideBarElements[indexParent].children;
                for (let childIndex = 0; childIndex < children.length; childIndex++) {
                    if(children[childIndex].name===thing){
                        return children[childIndex].route;
                    }
                }
            }

            
            if(sideBarElements[indexParent].name===thing){
                return sideBarElements[indexParent].route;
            }
            
        }
    }
}

const FUNCTIONS = {truncateString, disconnectUser, filterSideBarElements}

export default FUNCTIONS;